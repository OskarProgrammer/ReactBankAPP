import { useState } from 'react'
import { Login } from './components/Login'
import { Decide } from './components/Decide'
import { AdminPanel } from "./components/AdminPanel"
import { CustomerPanel } from "./components/CustomerPanel"
import './App.css'


const initialUsers = [
  {
    login: "Oskar",
    password: "root",
    isAdmin: "true",
    pin: 1234,
    key: 12,
  },
  {
    login: "Robert",
    password: "root",
    isAdmin: "false",
    pin: 1322,
    key: 14
  }
]

const initialAccounts = [
  {
    name: "Konto oszczednosciowe",
    ownerKey: 12,
    accountKey: 121,
    ownerName: "Oskar",
    saldo: 123332131,
  },
  {
    name: "Konto oszczednosciowe Roberta",
    ownerKey: 14,
    accountKey: crypto.randomUUID(),
    ownerName: "Robert",
    saldo: 12,
  },
  {
    name: "Konto oszczednosciowe Roberta 2",
    ownerKey: 14,
    accountKey: 11,
    ownerName: "Robert",
    saldo: 121321,
  }
]

const initialTransfers = [
  {title: "Przywitanie",
    fromName: "Oskar",
    fromKey: 121,
    toName: "Robert",
    toKey: 11,
    amount: 25
  },
  {title: "Przywitanie Roberta",
    fromName: "Robert",
    fromKey: 11,
    toName: "Oskar",
    toKey: 121,
    amount: 12
  }
]

function App() {
  const [isLogged, setIsLogged] = useState(false)
  const [isAdminUser, setIsAdminUser] = useState(false) 
  const [isLoginForm, setIsLoginForm] = useState(true)
  const [isAdminPanel, setIsAdminPanel] = useState(false)

  let [users, setUsers] = useState(initialUsers)
  let [accounts, setAccounts] = useState(initialAccounts)
  let [currentUserData, setCurrentUserData] = useState({})
  let [transfers, setTransfers] = useState(initialTransfers)


  const loginToAccount = (login, password, pin) => {

    users.map((user)=> {
      if (user.login == login && user.password == password && user.pin == pin){
        if (user.isAdmin == "true") {
          setIsAdminUser(true)
        }

        setIsLogged(true)
        setIsLoginForm(false)

        let newCurrentUserData = {}
        newCurrentUserData.login = login
        newCurrentUserData.password = password
        newCurrentUserData.isAdmin = user.isAdmin
        newCurrentUserData.pin = pin
        newCurrentUserData.key = user.key

        currentUserData = newCurrentUserData
        setCurrentUserData(newCurrentUserData)

        return true
      }
    })

  }

  const choice = (isAdmin) => {
    if (isAdmin) {
      setIsAdminPanel(true)
    }else{
      setIsAdminPanel(false)
      currentUserData.isAdmin = "false"
      setCurrentUserData(currentUserData)
    }
    setIsAdminUser(false)
    
  }

  const logOut = () => {
    setIsAdminPanel(false)
    setIsLogged(false)
    setIsLoginForm(true)
  }

  const changePass = (key, newPass) => {
    let newUsers = []

    for (let user of users) {
      if(user.key == key){
        user.password = newPass

         
        let newCurrentUser = user
        currentUserData = newCurrentUser
        setCurrentUserData(currentUserData)
      }
      newUsers.push(user)
    }
    console.log(users);

    users = newUsers
    setUsers(users)
  }

  const changePIN = (key, newPIN) => {
    let newUsers = []

    for (let user of users) {
      if(user.key == key){
        user.pin = newPIN

         
        let newCurrentUser = user
        currentUserData = newCurrentUser
        setCurrentUserData(currentUserData)
      }
      newUsers.push(user)
    }
    console.log(users);

    users = newUsers
    setUsers(users)
  }

  const removeAccount = (key) => {
      let newAccounts = []
      
      for (let account of accounts) {
        if (account.accountKey != key) {
          newAccounts.push(account)
        }
      }

      accounts = newAccounts
      setAccounts(accounts)
  }

  const transfer = (homeAccountKey, destinationAccountKey, title, value) => {
    let newTransfer = {title: title,
      fromName: "Robert",
      fromKey: homeAccountKey,
      toName: "Oskar",
      toKey: destinationAccountKey,
      amount: value
    }

    accounts.map((account) => {
      if (account.accountKey == homeAccountKey){
        account.saldo = account.saldo - parseInt(value)
        newTransfer.fromName = account.ownerName
      } else if (account.accountKey == destinationAccountKey) {
        account.saldo = account.saldo + parseInt(value)
        newTransfer.toName = account.ownerName
      }
    })

    transfers = [...transfers, newTransfer]
    setTransfers(transfers)
    setAccounts(accounts)

  }

  const createAccount = (name, key, ownerName) => {
      let newAccount = {
        name: name,
        ownerKey: key,
        accountKey: crypto.randomUUID(),
        ownerName: ownerName,
        saldo: 0,
      }

      accounts = [...accounts, newAccount]
      setAccounts(accounts)
  }

  return (
    <>
      {isLoginForm ? <Login onLogin={loginToAccount}/> : ""}
      {isAdminUser ? <Decide onChoice={choice}/> : ""}
      {isAdminPanel && isLogged? <AdminPanel onRemoveAccount={removeAccount} transfers={transfers} accounts={accounts} onChangePIN={changePIN} onChangePass={changePass} onLogOut={logOut} currentUserData={currentUserData} /> : ""}
      {!isAdminPanel && isLogged && !isAdminUser ? <CustomerPanel onCreateAccount={createAccount} onTransfer={transfer} onRemoveAccount={removeAccount} transfers={transfers} accounts={accounts} onChangePIN={changePIN} onChangePass={changePass} onLogOut={logOut} currentUserData={currentUserData} /> : ""}
    </>
  )
}

export default App

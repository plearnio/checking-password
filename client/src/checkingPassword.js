const Promise = require('bluebird')
const fs = require('fs')

const result = {
  isEightCharactor: false,
  isInDictionary: false,
  isPublicInformation: false,
  isUserId: false,
  isIdenticalOldPassword: false,
  isPattern: false
}

const checkDictionary = (password) => {
  fs.readFile('../words.txt', 'utf8', (data) => {
    console.log(data)
  })
}

const checkEightCharactor = (password) => {
  if (password.length < 8) {
    result.isEightCharactor = true
    return checkDictionary()
  }
  return true
}

const checkingPassword = (password) => {
  return checkEightCharactor(password)
}

export default checkingPassword

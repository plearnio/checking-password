const express = require('express')
const path = require('path')
const fs = require('fs')

const checking = express.Router()

const result = {
  isEightCharactor: false,
  isInDictionary: false,
  isPublicInformation: false,
  isUserId: false,
  isIdenticalOldPassword: false,
  isPattern: false
}

const USER_ID = 'plearnio'
let response = []

checking.use((req, res, next) => {
  console.log('get req')
  next()
})

const checkDateFormat = (password) => {
  const checkDate = new Date(password)
  console.log(checkDate)
  console.log(checkDate instanceof Date)
  if (d.toString() === 'Invalid Date') {
    console.log('ye!')
    response.send(result)
    return true
  }
  console.log(typeof (checkDate))
  result.isPublicInformation = true
  return false
}

const checkDictionary = (password) => {
  fs.readFile(path.join(__dirname, './words.txt'), 'utf8', (err, data) => {
    wordByLine = data.split('\n')
    wordByLine.map(word => word.toLowerCase())
    console.log(password)
    const check = wordByLine.indexOf(password.toLowerCase())
    // console.log(Object.keys(textByLine).length)
    console.log(check)
    if (check === -1) {
      result.isInDictionary = false
      return checkDateFormat(password)
    }
    result.isInDictionary = true
    return false
  })
}

const checkEightCharactor = (password) => {
  if (password.length >= 8) {
    result.isEightCharactor = true
    return checkDictionary(password)
  }
  return false
}

const checkSameAsUserId = (password) => {
  if (password.includes(USER_ID)) {
    result.isUserId = true
    return false
  }
  return checkEightCharactor(password)
}

const checkingPassword = (password) => {
  return checkSameAsUserId(password)
}

checking.route('/')
  .post((req, res) => {
    response = res
    password = req.body.data
    console.log(password)
    if(checkingPassword(password))
  })

module.exports = checking

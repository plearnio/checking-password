const express = require('express')
const Promise = require('bluebird')
const path = require('path')
const fs = require('fs')

const checking = express.Router()

checking.use((req, res, next) => {
  console.log('get req')
  next()
})

const checkDateFormat = (password) => {
  const checkDate = new Date(password)
  if (checkDate.toString() === 'Invalid Date') {
    return true
  } else {
    return false
  }
}

const checkDictionary = (password) => {
  const data = fs.readFileSync(path.join(__dirname, './words.txt'), 'utf8').toString()
  const words = data.split('\n')
  const index = words.indexOf(password)
  return index !== -1
}

const checkEightCharactor = password => password.length >= 8
// const checkSameAsUsername = password => password.includes(USER_ID)

const checkingPassword = (password) => {
  // if (!checkSameAsUsername(password)) return false
  if (!checkEightCharactor(password)) return false
  if (!checkDictionary(password)) return false
  if (!checkDateFormat(password)) return false
  return true
}

// const oldPasswords = [
//   { password: '345678fghj', keys: ['3456ertyh', '61524761b'] }
// ]
// checkingPassword(password, oldPasswords)

checking.route('/')
  .post((req, res) => {
    response = res
    password = req.body.data
    if (checkingPassword(password)) {
      res.send('fair')
    } else {
      res.send('weak')
    }
  })

module.exports = checking

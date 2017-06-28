const express = require('express')
const Promise = require('bluebird')
const path = require('path')
const fs = require('fs')

const checking = express.Router()

const resultAll = {
  isEightCharactor: false,
  isInDictionary: false,
  isPublicInformation: false,
  isUserId: false,
  isIdenticalOldPassword: false,
  isPattern: false
}

const USER_ID = 'plearnio'
const UESR_PROFILE = {
  name: 'pruek',
  surName: 'pakamatawee',
  tel: '0950063706',
}
let response = []

checking.use((req, res, next) => {
  console.log('get req')
  next()
})

const checkPublicInfo = (password) => {
  return new Promise((resolve) => {
    const newArr = Object.keys(UESR_PROFILE).map((data) => {
      if (password.includes(UESR_PROFILE[data])) {
        return false
      }
      return true
    })
    if (newArr.every(element => element)) {
      console.log(true+'asd')
      resolve(true)
    } else {
      console.log(false)
      resolve(false)
    }
  })
}

const checkDateFormat = (password) => {
  const checkDate = new Date(password)
  if (checkDate.toString() === 'Invalid Date') {
    return checkPublicInfo(password).then((result) => {
      return result
    })
  }
  resultAll.isPublicInformation = true
  return false
}

const checkDictionary = (password) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, './words.txt'), 'utf8', (err, data) => {
      if (err) reject(err)
      wordByLine = data.split('\n')
      wordByLine.map(word => word.toLowerCase())
      const check = wordByLine.indexOf(password.toLowerCase())
      if (check === -1) {
        resultAll.isInDictionary = false
        resolve(checkDateFormat(password))
      } else {
        resultAll.isInDictionary = true
        resolve(false)
      }
    })
  })
}

const checkEightCharactor = (password) => {
  if (password.length >= 8) {
    resultAll.isEightCharactor = true
    return true
    // checkDictionary(password).then((result) => {
    //   console.log(result)
    //   return result
    // })
  } return false
}

const checkSameAsUserId = (password) => {
  if (password.includes(USER_ID)) {
    resultAll.isUserId = true
    return false
  }
  return true
  // return checkEightCharactor(password)
  // if (!checkEightCharactor(password)) return false
  // return checkEightCharactor(password).then((result) => {
  //   return result
  // })
}

const checkingPassword = (password) => {
  if (!checkSameAsUserId(password)) return false
  if (!checkEightCharactor(password)) return false
  if (!checkDictionary(password).then(result => result)) return false
  else { return true }
}

checking.route('/')
  .post((req, res) => {
    response = res
    password = req.body.data
    if (checkingPassword(password)) {
      res.send('fair')
    } else {
      res.send('waek')
    }
  })

module.exports = checking

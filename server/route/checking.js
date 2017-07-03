const express = require('express')
const crypto = require('crypto')
const path = require('path')
const moment = require('moment')
const fs = require('fs')

const DICTIONARY_DATA = fs.readFileSync(path.join(__dirname, './words.txt'), 'utf8').toString()

const checking = express.Router()

checking.use((req, res, next) => {
  console.log('get request')
  next()
})

const checkPattern = (password) => {
  const lengthPassword = password.length
  const tempPattern = []
  tempPattern[0] = password[0]
  let numTemp = 0
  for (let i = 0; i < lengthPassword - 1; i += 1) {
    if (password[i + 1].charCodeAt(0) === (password[i].charCodeAt(0)) + 1) {
      tempPattern[numTemp] += password[i + 1]
    } else if (password[i + 1].charCodeAt(0) === (password[i].charCodeAt(0)) - 1) {
      tempPattern[numTemp] += password[i + 1]
    } else if (password[i + 1] === password[i]) {
      tempPattern[numTemp] += password[i + 1]
    } else {
      numTemp += 1
      tempPattern[numTemp] = password[i + 1]
    }
  }
  const result = !tempPattern.every((element) => {
    if (element.length === 1) return false
    return true
  })
  return result
}

const checkOldPassword = (password, oldPasswords) => {
  const data = password
  const pwd = oldPasswords.map((objPassword) => {
    const hash = crypto.createHash('sha256')
    hash.update(data)
    for (let i = 0; i < objPassword.secret.length; i += 1) {
      hash.update(objPassword.secret[i])
    }
    return objPassword.password === hash.digest('hex')
  })
  if (pwd.every(element => !element)) return true
  return false
}

const checkRangeDate = (datePassword, format) => {
  const timeNow = moment(datePassword, format, true)
  if (timeNow.isValid()) {
    const rangeYear = 100
    const yearNow = new Date().getFullYear()
    const yearNowTh = yearNow + 543
    const year = timeNow.format('YYYY')
    if ((year <= yearNow + rangeYear && year >= yearNow - rangeYear) ||
      (year <= yearNowTh + rangeYear && year >= yearNowTh - rangeYear)) {
      return true
    }
  }
  return false
}

const checkDateFormat = (password) => {
  const regexPassword = password.replace(/[^a-zA-Z0-9]/g, '')
  const formatMoment = [
    'DDMMYYYY',
    'DDYYYYMM',
    'MMDDYYYY',
    'MMYYYYDD',
    'YYYYDDMM',
    'YYYYMMDD',

    'DDMMMYYYY',
    'DDYYYYMMM',
    'MMMDDYYYY',
    'MMMYYYYDD',
    'YYYYDDMMM',
    'YYYYMMMDD',

    'DMMMYYYY',
    'DYYYYMMM',
    'MMMDYYYY',
    'MMMYYYYD',
    'YYYYDMMM',
    'YYYYMMMD',

    'DDYYMMMM',
    'DDMMMMYY',
    'YYDDMMMM',
    'YYMMMMDD',
    'MMMMDDYY',
    'MMMMYYDD',

    'DDYYYYMMMM',
    'DDMMMMYYYY',
    'YYYYDDMMMM',
    'YYYYMMMMDD',
    'MMMMDDYYYY',
    'MMMMYYYYDD',

    'DYYYYMMMM',
    'DMMMMYYYY',
    'YYYYDMMMM',
    'YYYYMMMMD',
    'MMMMDYYYY',
    'MMMMYYYYD'
  ]
  for (let i = 0; i < formatMoment.length; i += 1) {
    if (checkRangeDate(regexPassword, formatMoment[i])) return false
  }
  return true
}

const checkDictionary = (password) => {
  const words = DICTIONARY_DATA
  const index = words.indexOf(password)
  if (index === -1) return true
  return false
}

const checkEightCharactor = password => password.length >= 8
// const checkSameAsUsername = password => password.includes(USER_ID)

const checkingPassword = (password, oldPasswords) => {
  // if (!checkSameAsUsername(password)) return false
  if (!checkEightCharactor(password)) return false
  if (!checkDictionary(password)) return false
  if (!checkDateFormat(password)) return false
  if (!checkOldPassword(password, oldPasswords)) return false
  if (!checkPattern(password)) return false
  return true
}

checking.route('/')
  .post((req, res) => {
    const oldPasswords = [
      { // 'password2'
        password: 'c47c0cd848da37a44dad3dae15f363649f47f74d1a95e47fd4a4d398791a8074',
        secret: ['secret1', 'secret2']
      },
      { // 'password22'
        password: 'e4ce53817ebaf97d2e1e0b34311037faf99a909fbcf116f711b03cd211d027f5',
        secret: ['secret1', 'secret2']
      }
    ]
    response = res
    password = req.body.data
    console.log(`password : ${password}`)    
    if (checkingPassword(password, oldPasswords)) {
      console.log('result : fair')
      res.send('fair')
    } else {
      console.log('result : weak')
      res.send('weak')
    }
  })
module.exports = {
  checking,
  checkPattern,
  checkOldPassword,
  checkDateFormat,
  checkDictionary,
  checkEightCharactor
}

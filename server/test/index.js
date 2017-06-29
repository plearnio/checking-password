
const server = require('../server')
const {
  checkPattern,
  checkOldPassword,
  checkDateFormat,
  checkDictionary,
  checkEightCharactor
} = require('../route/checking')

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

describe('Checking 8 characters method', () => {
  it('it should return false if password length less than 8 characters', (done) => {
    checkEightCharactor('1234567').should.equal(false)
    done()
  })
  it('it should return true if password length more than 8 characters', (done) => {
    checkEightCharactor('12345678').should.equal(true)
    done()
  })
})

describe('Checking word in dictionary method', () => {
  it('it should return false if password is in the dictionary', (done) => {
    checkDictionary('television').should.equal(false)
    done()
  })
  it('it should return true if password is not in the dictionary', (done) => {
    checkDictionary('12345678').should.equal(true)
    done()
  })
})

describe('Checking date format method', () => {
  it('it should return false if password is in a date format', (done) => {
    checkDateFormat('25may1995').should.equal(false)
    checkDateFormat('may251995').should.equal(false)
    checkDateFormat('1995may25').should.equal(false)
    done()
  })
  it('it should return true if password is not in the dictionary', (done) => {
    checkDateFormat('0950062706').should.equal(true)
    done()
  })
})

describe('Checking old password method', () => {
  it('it should return false if password contains in old password', (done) => {
    checkOldPassword('password2', oldPasswords).should.equal(false)
    checkOldPassword('password22', oldPasswords).should.equal(false)
    done()
  })
  it('it should return true if password does not contain in old password', (done) => {
    checkOldPassword('password222', oldPasswords).should.equal(true)
    done()
  })
})

describe('Checking passtern and repeat method', () => {
  it('it should return false if password is a set of pattern', (done) => {
    checkPattern('abcabcabc').should.equal(false)
    checkPattern('testtesttest').should.equal(false)
    done()
  })
  it('it should return false if password is double and triple', (done) => {
    checkPattern('aabbccaabbcc').should.equal(false)
    checkPattern('aaabbbccc').should.equal(false)
    done()
  })
  it('it should return false if password is a sequence', (done) => {
    checkPattern('12312312121').should.equal(false)
    checkPattern('abcdefedcba').should.equal(false)
    done()
  })
  it('it should return true if password is not pattern, double, triple or sequence', (done) => {
    checkPattern('bigdaddynotails').should.equal(true)
    done()
  })
})

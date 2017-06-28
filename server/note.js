// Object.defineProperty(Array.prototype, 'map2', {
//   enumerable: false,
//   value: function value(fn) {
//     const newArray = []
//     for (const value of this) {
//       newArray.push(fn(value))
//     }
//     return newArray
//   }
// })
// const numbers = [1, 2]
// console.log(numbers.map2((number) => number !== 1))

// const USER_ID = 'plearnio'
// const UESR_PROFILE = {
//   name: 'pruek',
//   surName: 'pakamatawee',
//   tel: '0950063706',
// }

// const checkPublicInfo = (password) => {
//   const newArr = Object.keys(UESR_PROFILE).map((data) => {
//     if (password.includes(UESR_PROFILE[data])) {
//       return false
//     }
//     return true
//   })
//   if (newArr.every(element => element)) {
//     return true
//   } else {
//     return false
//   }
// }
/* ===== Persist data with LevelDB ===================================
|  Learn more: level: https://github.com/Level/level     |
|  =============================================================*/

const level = require('level')
const chainDB = './chaindata'
const db = level(chainDB);

// Get data from levelDB with key
function getLevelDBData(key) {
  return new Promise((resolve, reject) => {
    db.get(key, function (err, value) {
      if (err) {
        if (err.type == 'NotFoundError') {
          console.warn('Not found')
          resolve(undefined)
        } else {
          console.log('Block ' + key + ' get failed', err)
          reject(err)
        }
      } else {
        resolve(value)
      }
    })
  })
}

// Add data to levelDB with key and value (Promise)
function addLevelDBData(key, value) {
  return new Promise((resolve, reject) => {
    db.put(key, value, function (err) {
      if (err) {
        console.log('Block ' + key + ' submission failed', err)
        reject(err)
      }
      console.log(`Block added to key: ${key}`)
      resolve(value)
    })
  })
}

//Add data to levelDB with value
async function addDataToLevelDB(value) {
  let i = 0
  return await new Promise((resolve, reject) => {
    db.createReadStream()
      .on('data', function (data) {
        i++
      })
      .on('error', function (err) {
        resovle(err)
      })
      .on('close', function () {
        console.log('Block #' + i)
        addLevelDBData(i, value)
        resolve(value)
      })
  })
}

//for creating Testing blocks  
// ;(function theLoop(i) {
//   setTimeout(function () {
//     addDataToLevelDB('Testing data')
//     if (--i) theLoop(i)
//   }, 100)
// })(10)

module.exports = {
  getLevelDBData,
  addLevelDBData,
}

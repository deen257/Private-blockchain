const { Block, Blockchain } = require('./simpleChain.js')

const myBlockChain = new Blockchain()
//Function to add new Blocks - DELETE chaindata FOLDER BEFORE USE IT
// ;(function theLoop(i) {
//   setTimeout(function () {
//     let blockTest = new Block('Test Block - ' + (i + 1))
//     myBlockChain.addBlock(blockTest).then((result) => {
//       console.log(result)})
//       if (--i) theLoop(i)
//       }, 100)
//       })(10)
  



// Getting a block
myBlockChain
  .getBlock(5)
  .then((res) => console.log('GETTING NEW BLOCK: \n', res))

// // Validate block
myBlockChain
  .validateBlock(6)
  .then((resp) => console.log('VALIDATING THE NEW BLOCK: \n', resp))

// Validate chain
myBlockChain.validateChain()
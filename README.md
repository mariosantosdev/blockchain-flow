# Blockchain Flow

This project was created just to study. It don't earn nothing!

## How to run

1. Clone the repository
2. Run `npm i` _or_ `yarn` to install dependencies
3. Run `npm run build` _or_ `yarn build` to build the application from Typescript to Javascript
4. Run `node .` to running the blockchain

   ### Arguments

   The code `node .` accepts some arguments to foward the blockchain.<br/>
   The arguments should follow the sequence below:

   - Difficult: Accept a `number` to define the difficult to mining blocks (default is 4)
   - Block Counts: Accept a `number` to define the count of blocks generate in blockchain (default is 5) _This value don't increment with the genesis block, then wait see *block counts* + *genesis block*._
   - Debbuger: Accept a `boolean` to define whether the console logs will be display (default is false)
   - Debbuger Mine Fail: Accept a `boolean` to define whether the console logs of mining fail will be display(default is false)

   Example running with default arguments: `node . 4 5 false false`

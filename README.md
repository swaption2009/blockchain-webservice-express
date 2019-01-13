# Udacity Blockchain P3: RESTful Web API with ExpressJS

This is the implementation of P3 project to build a webservice using ExpressJS to interact with blockchain.


## How to use this app

1. Clone the repository to your local computer.
2. Open the terminal and install the packages: `npm install`.
3. Open the file `app.js`and `BlockController.js` and start coding.
4. Run your application `node app.js`


## API

1. Get a block from blockchain by index

- Webservice URL: `GET <url address>/block/:index`
- function: `getBlockByIndex()`

2. Post a new block into blockchain

- Webservice URL: `POST <url address>/block`
- function: `postNewBlock()`


## Error handling

1. `getBlockByIndex()`: validate if index is not in blockchain.
2. `postNewBlock()`: validate if block data is not empty.

## License

MIT License: you're free to do anything with this code
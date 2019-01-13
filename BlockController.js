const SHA256 = require('crypto-js/sha256');
const BlockClass = require('./Block.js');

/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

    /**
     * Constructor to create a new BlockController, you need to initialize here all your endpoints
     * @param {*} app
     */
    constructor(app) {
        this.app = app;
        this.blocks = [];
        this.initializeMockData();
        this.getBlockByIndex();
        this.postNewBlock();
    }

    /**
     * Implement a GET Endpoint to retrieve a block by index, url: "/block/:height"
     */
    getBlockByIndex() {
        this.app.get("/block/:index", (req, res) => {
            // validate if index is not in blockchain
            if(req.params.index > this.blocks.length) {
                res.send('Index is not in blockchain!');
            }

            // build query
            const index = req.params.index;
            const indexBlock = JSON.stringify(this.blocks[index])
            // return query to webservice
            res.send(indexBlock);
        });
    }

    /**
     * Implement a POST Endpoint to add a new Block, url: "/block"
     */
    postNewBlock() {
        this.app.post("/block", (req, res) => {
            // validate if req.body.data is null
            if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
                res.send('Blockchain data cannot be empty!');
            }

            // build new Block
            let postBlock = new BlockClass.Block(`${req.body.data}`);
            postBlock.height = this.blocks.length;
            postBlock.hash = SHA256(JSON.stringify(postBlock)).toString();

            if(this.blocks.length>0) {
                postBlock.previousBlockHash = this.blocks[this.blocks.length-1].hash;
            }
            // add to blockchain
            this.blocks.push(postBlock);
            // send response to webservice
            res.json(postBlock);
        });
    }

    /**
     * Help method to inizialized Mock dataset, adds 10 test blocks to the blocks array
     */
    initializeMockData() {
        if(this.blocks.length === 0){
            for (let index = 0; index < 10; index++) {
                let blockAux = new BlockClass.Block(`Test Data #${index}`);
                blockAux.height = index;
                blockAux.hash = SHA256(JSON.stringify(blockAux)).toString();
                this.blocks.push(blockAux);
            }
        }
    }

}

/**
 * Exporting the BlockController class
 * @param {*} app
 */
module.exports = (app) => { return new BlockController(app);}
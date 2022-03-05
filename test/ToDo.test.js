const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const compiledToDoApp = require('../ethereum/build/ToDoApp.json');
const compiledToDo = require('../ethereum/build/ToDo.json');

let accounts;
let todoapp;
let todoappAddress;
let todo;

beforeEach(async () => {

    accounts = await web3.eth.getAccounts();

    //create a factory contract and deploying
    todoapp = await new web3.eth.Contract(compiledToDoApp.abi)
        .deploy({data: compiledToDoApp.evm.bytecode.object})
        .send({from: accounts[0], gas: '5000000'});

    
    //deploying a todo using the todoapp
    await todoapp.methods.createToDo().send({
        from: accounts[0],
        gas : '5000000'
    });

    //getting the adress of the deployed todo
    [todoappAddress] = await todoapp.methods.getCreatedToDoLists().call();

    //accesing the deployed todo with its address
    todo = await new web3.eth.Contract(
        compiledToDo.abi, 
        todoappAddress
    )

});

describe('ToDoAApp', () => {

    it('deploys a ToDoApp and ToDo', () => {
        assert.ok(todoapp.options.address);
        assert.ok(todo.options.address);
    });

    it('Only allows a creator to use the app', async () => {

        const creator = await todo.methods.creator().call();

        assert.equal(accounts[0] , creator);

    });

});

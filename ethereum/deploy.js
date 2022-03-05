const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const compiledToDoApp= require('../ethereum/build/ToDoApp.json');

const provider = new HDWalletProvider(
  'music purchase speak play rotate before east gravity toss hotel soccer music',
  // remember to change this to your own phrase!
  'https://ropsten.infura.io/v3/419296db6d784560a3055bcad3ae33ae'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const factory = await new web3.eth.Contract(compiledToDoApp.abi)
    .deploy({ data: compiledToDoApp.evm.bytecode.object })
    .send({ gas: '5000000', from: accounts[0] });

  console.log('Contract deployed to', factory.options.address);

  provider.engine.stop();
};
deploy();

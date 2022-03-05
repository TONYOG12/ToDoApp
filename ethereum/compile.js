const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'ToDo.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
      'todo': {
        content: source
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  const mainOutput = output.contracts['todo'];
//   console.log(output);

  fs.ensureDirSync(buildPath); 

  for(let contract in mainOutput) {
      fs.outputJsonSync(
          path.resolve(buildPath, contract + '.json'),
          mainOutput[contract]
      );
      
  }
//   module.exports = {
//       campaign : {
//           interface: output.contracts['Campaign.sol']['Campaign'].abi,
//           bytecode: output.contacts['Campaign.sol']['Campaign'].evm.bytecode.object
//       },

//       campaignFactory : {
//         interface: output.contracts['Campaign.sol']['CampaignFactory'].abi,
//         bytecode: output.contacts['Campaign.sol']['CampaignFactory'].evm.bytecode.object

//       }
//   }

//   console.log(module.exports.campaign.interface);
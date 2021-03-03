const HDWalletProvider = require('@truffle/hdwallet-provider');
const path = require('path');

const mnemonic = "pill abuse man jelly mutual client devote come dance math leave ghost";

module.exports = {
	// See <http://truffleframework.com/docs/advanced/configuration>
	// to customize your Truffle configuration!
	contracts_build_directory: path.join(__dirname, 'client/src/contracts'),
	networks: {
		develop: {
			port: 7545,
		},
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/6bcfea9539ac4511ae7e25388b5eb41e");
      },
      network_id: 3,
    }
	},
};

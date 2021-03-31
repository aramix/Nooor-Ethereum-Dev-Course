import React, { Component } from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CampaignFactoryContract from './contracts/CampaignFactory.json';
import CampaignContract from './contracts/Campaign.json';
import getWeb3 from './getWeb3';

import Campaigns from './Pages/Campaigns';

class App extends Component {
	state = { web3: null, accounts: null, contract: null };

	componentDidMount = async () => {
		try {
			// Get network provider and web3 instance.
			const web3 = await getWeb3();
			// Use web3 to get the user's accounts.
			const accounts = await web3.eth.getAccounts();
			// Get the contract instance.
			const networkId = await web3.eth.net.getId();
			const deployedNetwork = CampaignFactoryContract.networks[networkId];
			const contract = new web3.eth.Contract(
				CampaignFactoryContract.abi,
				deployedNetwork && deployedNetwork.address
			);
			// Set web3, accounts, and contract to the state, and then proceed with an
			// example of interacting with the contract's methods.
			this.setState({ web3, accounts, contract });
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(`Failed to load web3, accounts, or contract. Check console for details.`);
			console.error(error);
		}
	};

	render() {
		const { contract, web3, accounts } = this.state;
		return (
			<>
				<Dimmer active={!web3}>
					<Loader />
				</Dimmer>
				<Router>
					<Switch>
						<Route path="/">
							<Campaigns contract={contract} web3={web3} accounts={accounts} />
						</Route>
					</Switch>
				</Router>
			</>
		);
	}
}

export default App;

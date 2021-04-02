import React, { useEffect, useState } from 'react';
import { Dimmer, Loader, Container } from 'semantic-ui-react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CampaignFactoryContract from './contracts/CampaignFactory.json';
import CampaignContract from './contracts/Campaign.json';
import getWeb3 from './getWeb3';

import Header from './Components/Header';
import Campaigns from './Pages/Campaigns';
import CampaignNew from './Pages/CampaignNew';

const App = () => {
	const [state, setState] = useState({ web3: null, accounts: null, contract: null });

	useEffect(() => {
		const init = async () => {
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
				setState({ web3, accounts, contract });
			} catch (error) {
				// Catch any errors for any of the above operations.
				alert(`Failed to load web3, accounts, or contract. Check console for details.`);
				console.error(error);
			}
		};
		init();
	}, []);

	const { contract, web3, accounts } = state;
	return (
		<>
			<Dimmer active={!web3}>
				<Loader />
			</Dimmer>
			<Router>
				<Header />
				<Container>
					<Switch>
						<Route path="/campaign/new">
							<CampaignNew />
						</Route>
						<Route exact path="/">
							<Campaigns factoryContract={contract} web3={web3} accounts={accounts} />
						</Route>
					</Switch>
				</Container>
			</Router>
		</>
	);
};

export default App;

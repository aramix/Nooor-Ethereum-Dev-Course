import React, { Component } from 'react';
import { Button, Dimmer, Loader, Segment } from 'semantic-ui-react';

class Campaigns extends Component {
	componentDidMount = async () => {
		this.loadCampaigns();
	};

	loadCampaigns = async () => {
		const { web3, accounts, contract } = this.props;

		// // Stores a given value, 5 by default.
		// await contract.methods.set(5).send({ from: accounts[0] });

		// // Get the value from the contract to prove it worked.
		// const response = await contract.methods.get().call();

		// // Update state with the result.
		// this.setState({ storageValue: response });
	};

	render() {
		const { web3 } = this.props;
		return (
			<>
				<Dimmer active={!web3}>
					<Loader />
				</Dimmer>
				<div className="Campaigns">
					<Button>Create Campaign</Button>
				</div>
			</>
		);
	}
}

export default Campaigns;

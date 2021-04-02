import React, { useEffect, useState } from 'react';
import { Button, Dimmer, Loader, Card } from 'semantic-ui-react';

const Campaigns = ({ web3, accounts, factoryContract }) => {
	const [campaigns, setCampaigns] = useState([
		'0x787adf',
		'0x18761873817632',
		'0x187826734234',
		'0x3721864232',
	]);

	useEffect(() => {
		const loadCampaigns = async () => {
			if (factoryContract) {
				// setCampaigns(await factoryContract.methods.getCampaigns().call());
			}
		};
		loadCampaigns();
	}, [factoryContract]);

	return (
		<>
			<Dimmer active={!web3}>
				<Loader />
			</Dimmer>
			<div className="Campaigns">
				<Button icon="add" labelPosition="left">
					Create Campaign
				</Button>
				<Card.Group>
					{campaigns.map((campaign) => (
						<Card>
							<Card.Content>
								<Card.Header>{campaign}</Card.Header>
								<Card.Meta>{campaign}</Card.Meta>
							</Card.Content>
							<Card.Content extra>
								<div className="ui two buttons">
									<Button basic color="green">
										View Campaign
									</Button>
								</div>
							</Card.Content>
						</Card>
					))}
				</Card.Group>
			</div>
		</>
	);
};

export default Campaigns;

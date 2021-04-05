import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Dimmer, Loader, Card } from 'semantic-ui-react';

const Campaigns = ({ web3, factoryContract }) => {
	const [campaigns, setCampaigns] = useState([]);

	useEffect(() => {
		const loadCampaigns = async () => {
			if (factoryContract) {
				const campaigns = await factoryContract.methods.getCampaigns().call();
				if (campaigns.length) setCampaigns(campaigns);
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
				<Card.Group itemsPerRow={2}>
					{campaigns.map((campaignAddress) => (
						<Card>
							<Card.Content>
								<Card.Header>{campaignAddress}</Card.Header>
								<Card.Meta>{campaignAddress}</Card.Meta>
							</Card.Content>
							<Card.Content extra>
								<div className="ui two buttons">
									<Button
										as={Link}
										basic
										color="green"
										to={`/campaigns/${campaignAddress}`}
									>
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

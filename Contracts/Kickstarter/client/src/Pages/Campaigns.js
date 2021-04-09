import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Dimmer, Loader, Card } from 'semantic-ui-react';

const Campaigns = ({ web3, factoryContract }) => {
	const [campaigns, setCampaigns] = useState([]);

	useEffect(() => {
		const loadCampaigns = async () => {
			if (factoryContract) {
				const campaignsCount = await factoryContract.methods.getCampaignsCount().call();
				console.log('campaignsCount', campaignsCount);
				if (campaignsCount) {
					const campaigns = await Promise.all(
						Array(campaignsCount)
							.fill()
							.map((e, index) =>
								factoryContract.methods.deployedCampaigns(index).call()
							)
					);
					setCampaigns(campaigns);
					console.log(campaigns);
				}
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
					{campaigns.map(({ campaignAddress, description, name }) => (
						<Card key={campaignAddress}>
							<Card.Content>
								<Card.Header>{name}</Card.Header>
								<Card.Meta>{campaignAddress}</Card.Meta>
								<Card.Description>{description}</Card.Description>
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

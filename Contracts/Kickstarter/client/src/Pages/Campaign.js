import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Card } from 'semantic-ui-react';

export default ({ web3, accounts, contract }) => {
	const { address } = useParams();
	const [summary, setSummary] = useState({});
	const [minimumContribution, setMimimumContribution] = useState(1);

	useEffect(() => {
		if (!web3) return;
		console.log(address);
		const campaign = new web3.eth.Contract(contract.abi, address);
		const loadCampaign = async () => {
			const campaignSummary = await campaign.methods.getSummary().call();
			setSummary({
				manager: campaignSummary[0],
				contributorsCount: campaignSummary[1],
				minimumContribution: campaignSummary[2],
				balance: campaignSummary[3],
				numberOfRequests: campaignSummary[4],
			});
		};
		loadCampaign();
	}, [web3, accounts, address]);

	return (
		<Card.Group itemsPerRow={2}>
			{summary &&
				Object.keys(summary).map((key) => (
					<Card>
						<Card.Header>{key}</Card.Header>
						<Card.Description>{summary[key]}</Card.Description>
					</Card>
				))}
		</Card.Group>
	);
};

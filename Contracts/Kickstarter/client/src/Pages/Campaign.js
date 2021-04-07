import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Card, List, Grid } from 'semantic-ui-react';

export default ({ campaign, address, summary, accounts }) => {
	const [contributionAmount, setContributionAmount] = useState(summary.minimumContribution);

	const handleContribution = (e) => {
		setContributionAmount(parseInt(e.currentTarget.value));
	};

	const contribute = async () => {
		await campaign.methods.contribute().send({
			from: accounts[0],
			value: contributionAmount,
		});
	};

	return (
		<Grid divided="vertically">
			<h1>Campaign Details</h1>
			<Grid.Row columns={2}>
				<Grid.Column>
					<Card fluid>
						<Card.Content>
							<Card.Header>{address}</Card.Header>
							<Card.Meta>{`Minimum: ${summary.minimumContribution}`}</Card.Meta>
							<List>
								<List.Item header="Campaign creator" content={summary.manager} />
								<List.Item header="Balance" content={summary.balance} />
								<List.Item
									header="Contributors count"
									content={summary.contributorsCount}
								/>
								<List.Item
									header="Number of requests"
									content={summary.numberOfRequests}
								/>
							</List>
						</Card.Content>
					</Card>
				</Grid.Column>
				<Grid.Column>
					<Form onSubmit={contribute}>
						<Form.Field>
							<label>Contribution amount (wei)</label>
							<input
								type="number"
								onChange={handleContribution}
								placeholder="Enter amount to contribute in wei"
								min={summary.minimumContribution}
							/>
						</Form.Field>
						<Button type="submit" floated="right">
							Contribute
						</Button>
					</Form>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};

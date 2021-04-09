import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Card, List, Grid, Message, Label, Input } from 'semantic-ui-react';

export default ({ web3, campaign, address, summary, accounts }) => {
	const [error, setError] = useState();
	const [contributionAmount, setContributionAmount] = useState(summary.minimumContribution);

	const handleContribution = (e) => {
		setContributionAmount(e.currentTarget.value);
	};

	const contribute = async () => {
		try {
			await campaign.methods.contribute().send({
				from: accounts[0],
				value: web3.utils.toWei(contributionAmount, 'ether'),
			});
		} catch (error) {
			const parsedError = JSON.parse(
				error.message
					.replace('Error: [ethjs-query] while formatting outputs from RPC ', '')
					.replace("'{", '{')
					.replace("}'", '}')
			);
			const errorObj = parsedError.value.data.data;
			const errorReason = errorObj[Object.keys(errorObj)[0]].reason;
			setError(errorReason);
		}
	};

	return (
		<Grid divided="vertically">
			<h1>Campaign Details</h1>
			<Grid.Row columns={2}>
				<Grid.Column>
					<Card fluid>
						<Card.Content>
							<Card.Header>{address}</Card.Header>
							<Card.Meta>{`Minimum: ${`${summary.minimumContribution} ether`}`}</Card.Meta>
							<List>
								<List.Item header="Campaign creator" content={summary.manager} />
								<List.Item header="Balance" content={`${summary.balance} ether`} />
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
						<Card.Content extra>
							<div className="ui two buttons">
								<Button
									as={Link}
									basic
									color="green"
									to={`/campaigns/${address}/requests`}
								>
									View Campaign Requests
								</Button>
							</div>
						</Card.Content>
					</Card>
				</Grid.Column>
				<Grid.Column>
					<Form onSubmit={contribute} error>
						<Message negative hidden={!error}>
							<p>{error}</p>
						</Message>
						<Form.Field>
							<label>Contribution amount</label>
							<Input labelPosition="right" type="text" placeholder="Amount">
								<input
									type="number"
									step="0.000000000000000001"
									min={summary.minimumContribution}
									onChange={handleContribution}
									placeholder="Enter the amount to contribute"
								/>
								<Label>ether</Label>
							</Input>
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

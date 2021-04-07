import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';

export default ({ accounts, factoryContract }) => {
	const history = useHistory();
	const [minimumContribution, setMimimumContribution] = useState(1);
	const createCampaign = async () => {
		await factoryContract.methods.createCampaign(minimumContribution).send({
			from: accounts[0],
		});
		history.push('/');
	};

	const handleMinimumContribution = (e) => {
		setMimimumContribution(parseInt(e.currentTarget.value));
	};

	return (
		<Form onSubmit={createCampaign}>
			<h1>Create a New Campaign</h1>
			<Form.Field>
				<label>Minimum Contribution</label>
				<input
					type="number"
					name="minimumContribution"
					placeholder="Enter minimum contribution"
					onChange={handleMinimumContribution}
					min="1"
				/>
			</Form.Field>
			<Button type="submit" floated="right">
				Create
			</Button>
		</Form>
	);
};

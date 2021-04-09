import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Input, Label } from 'semantic-ui-react';

export default ({ web3, accounts, factoryContract }) => {
	const history = useHistory();
	const [inputValues, setInputValues] = useState();
	const createCampaign = async () => {
		const { minimumContribution, name, description } = inputValues;
		await factoryContract.methods
			.createCampaign(web3.utils.toWei(minimumContribution, 'ether'), name, description)
			.send({
				from: accounts[0],
			});
		history.push('/');
	};

	const handleInput = ({ currentTarget: { name, value } }) => {
		setInputValues({
			...inputValues,
			[name]: value,
		});
	};

	return (
		<Form onSubmit={createCampaign}>
			<h1>Create a New Campaign</h1>
			<Form.Field>
				<label>Minimum Contribution</label>

				<Input labelPosition="right" type="text" placeholder="Amount">
					<input
						type="number"
						name="minimumContribution"
						placeholder="Enter minimum contribution"
						onChange={handleInput}
						step="0.0000001"
						min="0.0000001"
					/>
					<Label>ether</Label>
				</Input>
				<label>Name</label>
				<input
					name="name"
					placeholder="Enter name"
					onChange={handleInput}
					step="0.0000001"
					min="0.0000001"
				/>
				<label>Description</label>
				<input
					name="description"
					placeholder="Enter description"
					onChange={handleInput}
					step="0.0000001"
					min="0.0000001"
				/>
			</Form.Field>
			<Button type="submit" floated="right">
				Create
			</Button>
		</Form>
	);
};

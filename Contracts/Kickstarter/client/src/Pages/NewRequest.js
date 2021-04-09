import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Input, Label } from 'semantic-ui-react';

export default ({ web3, campaign, address, accounts }) => {
	const history = useHistory();
	const [inputValues, setInputValues] = useState();
	const createRequest = async () => {
		await campaign.methods
			.createRequest(
				inputValues.description,
				web3.utils.toWei(inputValues.transferAmount, 'ether'),
				inputValues.recepient
			)
			.send({
				from: accounts[0],
			});
		history.push(`/campaigns/${address}/requests`);
	};

	const handleInput = ({ currentTarget: { name, value } }) => {
		setInputValues({
			...inputValues,
			[name]: value,
		});
	};

	return (
		<Form onSubmit={createRequest}>
			<h1>Create a New Request</h1>
			<Form.Field>
				<label>Description</label>
				<input name="description" placeholder="Enter description" onChange={handleInput} />
			</Form.Field>
			<Form.Field>
				<label>Amount</label>
				<Input labelPosition="right" type="text" placeholder="Amount">
					<input
						type="number"
						min="0.000001"
						step="0.000001"
						name="transferAmount"
						placeholder="Enter amount transfer to recepient"
						onChange={handleInput}
					/>
					<Label>ether</Label>
				</Input>
			</Form.Field>
			<Form.Field>
				<label>Recepient</label>
				<input
					name="recepient"
					placeholder="Enter minimum contribution"
					onChange={handleInput}
				/>
			</Form.Field>
			<Button type="submit" floated="right">
				Create
			</Button>
		</Form>
	);
};

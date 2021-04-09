import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Dimmer, Loader, Card, Table } from 'semantic-ui-react';

export default ({ web3, campaign, accounts, address }) => {
	const [requests, setRequests] = useState([]);
	const [contributorsCount, setContributorsCount] = useState(0);
	useEffect(() => {
		if (!web3 || !campaign) return;
		const loadRequests = async () => {
			setContributorsCount(await campaign.methods.contributorsCount().call());
			const requestsCount = parseInt(await campaign.methods.getRequestsCount().call());
			console.log(requestsCount);
			const fetchedRequests = await Promise.all(
				Array(requestsCount)
					.fill()
					.map(async (r, index) => await campaign.methods.requests(index).call())
			);
			setRequests(fetchedRequests);
		};
		loadRequests();
	}, [web3, campaign]);

	const approveRequest = async (index) => {
		if (!web3 || !campaign) return;
		await campaign.methods.approveRequest(index).send({
			from: accounts[0],
		});
	};

	return (
		<>
			<h1>Campaign Requests</h1>
			<Button
				as={Link}
				floated="right"
				style={{ marginBottom: 15 }}
				to={`/campaigns/${address}/requests/new`}
			>
				Create Request
			</Button>
			<Table columns={5}>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>ID</Table.HeaderCell>
						<Table.HeaderCell>Description</Table.HeaderCell>
						<Table.HeaderCell>Amount</Table.HeaderCell>
						<Table.HeaderCell>Recepient</Table.HeaderCell>
						<Table.HeaderCell>Approvals/Contributors</Table.HeaderCell>
						<Table.HeaderCell>Action</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{web3 &&
						requests.length > 0 &&
						requests.map(
							({ description, value, complete, approvalCount, recipient }, index) => (
								<Table.Row key={index}>
									<Table.Cell>{index}</Table.Cell>
									<Table.Cell>{description}</Table.Cell>
									<Table.Cell>{web3.utils.fromWei(value, 'ether')}</Table.Cell>
									<Table.Cell>{recipient}</Table.Cell>
									<Table.Cell>
										{approvalCount.toString()}/{contributorsCount}
									</Table.Cell>
									<Table.Cell>
										<Button
											primary
											disabled={complete}
											onClick={() => approveRequest(index)}
										>
											{complete ? 'Approved' : 'Approve'}
										</Button>
									</Table.Cell>
								</Table.Row>
							)
						)}
				</Table.Body>
			</Table>
		</>
	);
};

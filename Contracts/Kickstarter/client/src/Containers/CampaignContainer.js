import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default ({ web3, accounts, contract, component: Component }) => {
	const { address } = useParams();
	const [summary, setSummary] = useState({});
	const [campaign, setCampaign] = useState();

	useEffect(() => {
		if (!web3) return;
		const campaignInstance = new web3.eth.Contract(contract.abi, address);

		const loadCampaign = async () => {
			const campaignSummary = await campaignInstance.methods.getSummary().call();
			setCampaign(campaignInstance);
			setSummary({
				manager: campaignSummary[0],
				contributorsCount: campaignSummary[1],
				minimumContribution: web3.utils.fromWei(campaignSummary[2], 'ether'),
				balance: web3.utils.fromWei(campaignSummary[3], 'ether'),
				numberOfRequests: campaignSummary[4],
			});
		};
		loadCampaign();
	}, [web3, accounts, address]);

	return (
		<Component
			web3={web3}
			summary={summary}
			address={address}
			campaign={campaign}
			accounts={accounts}
		/>
	);
};

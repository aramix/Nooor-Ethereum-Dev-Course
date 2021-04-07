import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Campaign from '../Pages/Campaign';

export default ({ web3, accounts, contract, component: Component }) => {
	const { address } = useParams();
	const [summary, setSummary] = useState({});
	const [campaign, setCampaign] = useState();

	useEffect(() => {
		if (!web3) return;
		console.log(address);
		const campaignInstance = new web3.eth.Contract(contract.abi, address);

		const loadCampaign = async () => {
			console.log('loading campaign...');
			const campaignSummary = await campaignInstance.methods.getSummary().call();
			setCampaign(campaignInstance);
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
		<Component summary={summary} address={address} campaign={campaign} accounts={accounts} />
	);
};

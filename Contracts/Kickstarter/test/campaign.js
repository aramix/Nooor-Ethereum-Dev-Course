const CampaignFactory = artifacts.require('./CampaignFactory.sol');
const Campaign = artifacts.require('./Campaign.sol');

contract('Campaign', (accounts) => {
	let campaignFactoryInstance;
	let campaignInstance;
	const campaignCreator = accounts[1];
	const campaignContributor1 = accounts[2];
	const campaignContributor2 = accounts[3];
	const requestRecepient = accounts[9];

	before(async () => {
		console.log(accounts);
		campaignFactoryInstance = await CampaignFactory.deployed();

		await campaignFactoryInstance.createCampaign(web3.utils.toWei('1', 'ether'), {
			from: campaignCreator,
		});

		const deployedCampaignAddress = await campaignFactoryInstance.deployedCampaignAddresses(0);
		campaignInstance = await Campaign.at(deployedCampaignAddress);
	});

	it('should deploy a campaign', async () => {
		assert(campaignInstance, 'campaign deployment failed');
	});

	it('should allow someone to contribute', async () => {
		const before = await campaignInstance.contributorsCount();

		await campaignInstance.contribute({
			from: campaignContributor1,
			value: web3.utils.toWei('2', 'ether'),
		});

		const after = await campaignInstance.contributorsCount();
		assert(after - before == 1, 'failed to contribute');
	});

	it('should contribute more than the minimum', async () => {
		try {
			await campaignInstance.contribute({
				from: campaignContributor1,
				value: 2,
			});
		} catch (error) {
			return assert(error);
		}
		assert(false);
	});

	it('should add to contributors', async () => {
		await campaignInstance.contribute({
			from: campaignContributor2,
			value: web3.utils.toWei('2', 'ether'),
		});

		const contributedAmount = await campaignInstance.contributors(campaignContributor2);
		assert.equal(
			contributedAmount.toString(),
			web3.utils.toWei('2', 'ether'),
			'failed to add to contributors'
		);
	});
});

import React from 'react';
import { useHistory } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export default () => {
	const history = useHistory();

	return (
		<Menu fixed="top" size="huge" inverted>
			<Menu.Item name="branding">Kickstarter dApp</Menu.Item>
			<Menu.Menu position="right">
				<Menu.Item name="campaigns" onClick={() => history.push('/')}>
					Campaigns
				</Menu.Item>
				<Menu.Item name="newCampaign" onClick={() => history.push('/campaign/new')}>
					+
				</Menu.Item>
			</Menu.Menu>
		</Menu>
	);
};

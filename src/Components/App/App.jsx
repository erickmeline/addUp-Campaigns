import React from 'react';
import FetchData from '../../util/FetchData.js';
import RowData from './RowData.jsx';

let endpoint = 'https://addup.sierraclub.org/api/v1/campaigns';
let url = endpoint; // local testing data
// url = './campaigns.json'; // local testing data

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			campaigns: [],
			slugs: []
		};
	}

	componentWillMount() {
		FetchData(url).then(response => {
			return response.data;
		}).then((data) => {
			const slugs = [];
			data.forEach(campaign => {
				slugs.push(campaign.slug);
			})
			this.setState({slugs: slugs})
		});
	}

	getCampaigns() {
		const { slugs } = this.state;
		const promises = slugs.map(slug => FetchData(endpoint+'/'+slug).then(response => response.data));
		Promise.all(promises).then(results => {
			const cleanResults = results.map((campaign) => {
				if (campaign) return campaign
			})
			this.setState({campaigns: cleanResults})
		});
	}

	render() {
		const { slugs, campaigns } = this.state;
		if (slugs.length > 0 && campaigns.length < 1) {
			this.getCampaigns();
		}
		return (
			<div className="App">
				<header>Current AddUp Campaigns</header>
				<table>
					<thead>
						<tr>
							<th>Organizer</th>
							<th>Title</th>
							<th>GAU</th>
							<th>Status</th>
							<th>Link</th>
							<th>Club Entity</th>
							<th>Start Date</th>
							<th>End Date</th>
							<th>C3 / C4</th>
							<th>SF ID</th>
						</tr>
					</thead>
					<tbody>
						{
							campaigns.length < 1 ? <tr><td colSpan="10"><div className="loading"/></td></tr> : null
						}
						{
							this.state.campaigns.map(campaign => {
								return <RowData campaign={campaign} key={campaign.id} />
							})
						}
					</tbody>
				</table>
			</div>
		);
	}
}

export default App;

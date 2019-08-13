import React from 'react';
import FetchData from '../../util/FetchData.js';
import RowData from './RowData.jsx';

let endpoint = 'https://addup.sierraclub.org/api/v1/campaigns';
let url = endpoint;
let count = 0;
url = './campaigns.json'; // local testing data

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
		const promises = slugs.map(slug => {
			count++;
			return FetchData(endpoint+'/'+slug).catch(console.warn.bind(console)).then(response => response.data)
		});
		Promise.all(promises).then(results => {
			this.setState({campaigns: results});
		});
	}

	render() {
		const { slugs, campaigns } = this.state;
		if (slugs.length > 0 && campaigns.length < 1) {
			this.getCampaigns();
		}
		return (
			<div className="App">
				<header>Current AddUp Campaigns: {campaigns.length < 1 ? <span>loading </span> : null} {count}</header>
				<table>
					<thead>
						<tr>
							<th> # </th>
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
							campaigns.length < 1 ? <tr><td colSpan="11"><div className="loading"/></td></tr> : null
						}
						{
							this.state.campaigns.map((campaign, index) => {
								return <RowData campaign={campaign} key={campaign.id} index={index}/>
							})
						}
					</tbody>
				</table>
			</div>
		);
	}
}

export default App;

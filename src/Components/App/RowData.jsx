import React from 'react';

const endpoint = 'https://addup.sierraclub.org/api/v1/campaigns';

const RowData = props => {
	let { campaign, index } = props;
	index++;
	let { 
		club_id_name, 
		title, 
		c_code, 
		gau_id, 
		publish_status, 
		salesforce_id, 
		slug, 
		actions, 
		created_by,
		start_date,
		end_date
	} = campaign;
	actions.forEach((obj) => {
		if(obj.hasOwnProperty('gau_id')) {
			gau_id = obj.gau_id;
			c_code = obj.c_code;
		}
	});

	return (
		<tr>
			<td>{index}</td>
			<td>{created_by || 'n/a'}</td>
			<td>{title || 'n/a'}</td>
			<td>{gau_id || 'n/a'}</td>
			<td>{publish_status || 'n/a'}</td>
			<td><a href={`${endpoint}/${slug}`} target="_blank">{`${endpoint}/${slug}`}</a></td>
			<td>{club_id_name || 'n/a'}</td>
			<td>{start_date || 'n/a'}</td>
			<td>{end_date || 'n/a'}</td>
			<td>{c_code || 'n/a'}</td>
			<td>{salesforce_id || 'n/a'}</td>
		</tr>
	)
}

export default RowData;

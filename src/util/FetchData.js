const FetchData = async (url) => {
	const headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
	const response = await fetch(url, headers);
	if (!response.ok) {
		throw response
	}
	try {
		const data = await response.json();
		return data;
	}
	catch (error) {
		throw error.text() || 'Uncaught Fetch Error Occured'
	}
}

export default FetchData;

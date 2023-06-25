export const searchCharacters = async (search) => {
	const queryString = `titleStartsWith=${search}`
	try {
		const r = await fetch(`http://localhost:8204/todos`, {
			method: 'GET',
		})
    console.log('r', r)
		const r_1 = await r.json()
    console.log('r_1', r_1)
		return r_1.data.results
	} catch (error) {
		console.error('error', error)
		return []
	}
}

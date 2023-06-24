export const searchCharacters = async (search) => {
	const queryString = `titleStartsWith=${search}`
	try {
		const r = await fetch(
			`http://localhost:8204/todos/${queryString}`,
			{
				method: 'GET',
			}
		)
		const r_1 = await r.json()
		return r_1.data.results
	} catch (error) {
		console.error(error)
		return []
	}
}

import { useState, useEffect } from 'react'

export const useRequestGetTodos = (refreshTodos) => {
	const [isLoadingJsonServerComponent, setIsLoadingJsonServerComponent] =
		useState(false)
	const [todosServer, setTodosServer] = useState([])

	useEffect(() => {
		setIsLoadingJsonServerComponent(true)

		fetch('http://localhost:8204/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodo) => {
				setTodosServer(loadedTodo)
			})
			.finally(() => setIsLoadingJsonServerComponent(false))
	}, [refreshTodos])

	return {
		isLoadingJsonServerComponent,
		todosServer,
	}
}

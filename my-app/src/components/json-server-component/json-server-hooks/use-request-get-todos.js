import { useState, useEffect } from 'react'

export const useRequestGetTodos = (refreshTodos, setTodosServer) => {
	const [isLoadingJsonServerComponent, setIsLoadingJsonServerComponent] =
		useState(false)

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
	}
}

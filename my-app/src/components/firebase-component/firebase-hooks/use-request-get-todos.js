import { useState, useEffect } from 'react'

export const useRequestGetTodos = (refreshTodos, setTodosServer, sortTitle) => {
	const [isLoadingFirebaseComponent, setIsLoadingFirebaseComponent] =
		useState(false)

	useEffect(() => {
		setIsLoadingFirebaseComponent(true)
		sortTitle
			? fetch('http://localhost:8204/todos?_sort=title')
					.then((loadedData) => loadedData.json())
					.then((loadedTodo) => {
						setTodosServer(loadedTodo)
					})
					.finally(() => setIsLoadingFirebaseComponent(false))
			: fetch('http://localhost:8204/todos')
					.then((loadedData) => loadedData.json())
					.then((loadedTodo) => {
						setTodosServer(loadedTodo)
					})
					.finally(() => setIsLoadingFirebaseComponent(false))
	}, [refreshTodos, sortTitle])

	return {
		isLoadingFirebaseComponent,
	}
}

import { useState, useEffect } from 'react'

export const useRequestGetTodos = (refreshTodos, setTodosServer, sortTitle) => {
	const [isLoadingJsonServerComponent, setIsLoadingJsonServerComponent] =
		useState(false)

	useEffect(() => {
		setIsLoadingJsonServerComponent(true)
		sortTitle
			? fetch('http://localhost:8204/todos?_sort=title')
					.then((loadedData) => loadedData.json())
					.then((loadedTodo) => {
						setTodosServer(loadedTodo)
					})
					.finally(() => setIsLoadingJsonServerComponent(false))
			: fetch('http://localhost:8204/todos')
					.then((loadedData) => loadedData.json())
					.then((loadedTodo) => {
						setTodosServer(loadedTodo)
					})
					.finally(() => setIsLoadingJsonServerComponent(false))
	}, [refreshTodos, sortTitle, setTodosServer])

	return {
		isLoadingJsonServerComponent,
	}
}

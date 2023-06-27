import { useState } from 'react'

export const useRequestAddTodo = (
	refreshTodos,
	setRefreshTodos,
	todo,
	setTodo
) => {
	const [isCreating, setIsCreating] = useState(false)

	const requestAddTodo = () => {
		if (todo !== '') {
			setIsCreating(true)

			fetch('http://localhost:8204/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					title: todo,
					completed: false,
				}),
			})
				.then((rawResponse) => rawResponse.json())
				.then((response) => {
					setTodo('')
					setRefreshTodos(!refreshTodos)
				})
				.finally(() => setIsCreating(false))
		}
	}

	return {
		isCreating,
		requestAddTodo,
	}
}

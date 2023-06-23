import { useState } from 'react'

export const useRequestAddTodo = (refreshTodos, setRefreshTodos, todo) => {
	const [isCreating, setIsCreating] = useState(false)

	const requestAddTodo = () => {
		setIsCreating(true)

		fetch('http://localhost:3005/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: todo,
				completed: false,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log(`Добавлена задача ${todo}, ответ сервера:`, response)
				setRefreshTodos(!refreshTodos)
			})
			.finally(() => setIsCreating(false))
	}

	return {
		isCreating,
		requestAddTodo,
	}
}

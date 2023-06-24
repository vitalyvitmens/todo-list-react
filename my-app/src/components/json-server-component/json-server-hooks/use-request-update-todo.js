import { useState } from 'react'

export const useRequestUpdateTodo = (
	refreshTodos,
	setRefreshTodos,
	todo,
	setTodo
) => {
	const [isUpdating, setIsUpdating] = useState(false)

	const requestUpdateTodo = () => {
		setIsUpdating(true)

		fetch(`http://localhost:8204/todos/4`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: todo,
				completed: false,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setTodo('')
				console.log(
					`Задача: ${todo} с id: ${response.id} обновлена, ответ сервера:`,
					response
				)
				setRefreshTodos(!refreshTodos)
			})
			.finally(() => setIsUpdating(false))
	}

	return {
		isUpdating,
		requestUpdateTodo,
	}
}

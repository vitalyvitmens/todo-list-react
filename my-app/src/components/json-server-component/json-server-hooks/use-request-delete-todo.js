import { useState } from 'react'

export const useRequestDeleteTodo = (refreshTodos, setRefreshTodos) => {
	const [isDeleting, setIsDeleting] = useState(false)

	const requestDeleteTodo = () => {
		setIsDeleting(true)

		fetch('http://localhost:8204/todos/5', {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log(`Задача удалена, ответ сервера:`, response)
				setRefreshTodos(!refreshTodos)
			})
			.finally(() => setIsDeleting(false))
	}

	return {
		isDeleting,
		requestDeleteTodo,
	}
}

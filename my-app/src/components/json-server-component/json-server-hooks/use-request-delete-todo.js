import { useState } from 'react'

export const useRequestDeleteTodo = (refreshTodos, setRefreshTodos, todo) => {
	const [isDeleting, setIsDeleting] = useState(false)

	const requestDeleteTodo = () => {
		setIsDeleting(true)

		fetch('http://localhost:3005/todos/5', {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log(`Задача ${todo} удалена, ответ сервера:`, response)
				setRefreshTodos(!refreshTodos)
			})
			.finally(() => setIsDeleting(false))
	}

	return {
		isDeleting,
		requestDeleteTodo,
	}
}

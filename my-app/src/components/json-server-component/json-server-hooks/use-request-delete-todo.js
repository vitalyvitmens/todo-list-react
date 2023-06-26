import { useState } from 'react'

export const useRequestDeleteTodo = (refreshTodos, setRefreshTodos) => {
	const [isDeleting, setIsDeleting] = useState(false)

	const requestDeleteTodo = (id) => {
		setIsDeleting(true)

		fetch(`http://localhost:8204/todos/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setRefreshTodos(!refreshTodos)
			})
			.finally(() => setIsDeleting(false))
	}

	return {
		isDeleting,
		requestDeleteTodo,
	}
}

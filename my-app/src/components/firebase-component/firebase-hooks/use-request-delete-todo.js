import { useState } from 'react'
import { ref, remove } from 'firebase/database'
import { db } from '../../../firebase'

export const useRequestDeleteTodo = (refreshTodos, setRefreshTodos) => {
	const [isDeleting, setIsDeleting] = useState(false)

	const requestDeleteTodo = (id) => {
		setIsDeleting(true)

		const todoDeleteDbRef = ref(db, `todos/${id}`)

		remove(todoDeleteDbRef, {})
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

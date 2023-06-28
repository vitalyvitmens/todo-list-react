import { useState } from 'react'
import { ref, set } from 'firebase/database'
import { db } from '../../../firebase'

export const useRequestUpdateTodo = (
	refreshTodos,
	setRefreshTodos,
	todo,
	setTodo
) => {
	const [isUpdating, setIsUpdating] = useState(false)

	const requestUpdateTodo = (id) => {
		setIsUpdating(true)

		const todoUpdateDbRef = ref(db, `todos/${id}`)

		set(todoUpdateDbRef, {
			title: todo,
			completed: false,
		})
			.then((response) => {
				setTodo('')
				setRefreshTodos(!refreshTodos)
			})
			.finally(() => setIsUpdating(false))
	}

	return {
		isUpdating,
		requestUpdateTodo,
		setIsUpdating,
	}
}

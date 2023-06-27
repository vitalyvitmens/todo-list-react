import { useState } from 'react'
import { ref, push } from 'firebase/database'
import { db } from '../../../firebase'

export const useRequestAddTodo = (todo, setTodo) => {
	const [isCreating, setIsCreating] = useState(false)

	const requestAddTodo = () => {
		if (todo !== '') {
			setIsCreating(true)

			const todosDbRef = ref(db, 'todos')

			push(todosDbRef, {
				title: todo,
				completed: false,
			})
				.then((response) => {
					setTodo('')
				})
				.finally(() => setIsCreating(false))
		}
	}

	return {
		isCreating,
		requestAddTodo,
	}
}

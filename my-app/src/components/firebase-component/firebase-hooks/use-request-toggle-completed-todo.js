import { ref, update } from 'firebase/database'
import { db } from '../../../firebase'

export const useRequestToggleCompletedTodo = (
	refreshTodos,
	setRefreshTodos,
	completed
) => {
	const requestUpdateCompletedTodo = (id) => {
		const todoUpdateDbRef = ref(db, `todos/${id}`)

		update(todoUpdateDbRef, {
			completed: completed,
		}).then((response) => {
			setRefreshTodos(!refreshTodos)
		})
	}

	return {
		requestUpdateCompletedTodo,
	}
}

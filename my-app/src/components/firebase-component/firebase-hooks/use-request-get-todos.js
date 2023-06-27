import { useState, useEffect } from 'react'
import { ref, onValue } from 'firebase/database'
import { db } from '../../../firebase'

export const useRequestGetTodos = (setTodos) => {
	const [isLoadingFirebaseComponent, setIsLoadingFirebaseComponent] =
		useState(false)

	useEffect(() => {
		const todosDbRef = ref(db, 'todos')

		return onValue(todosDbRef, (snapshot) => {
			const loadedTodos = snapshot.val() || []

			setTodos(loadedTodos)
			setIsLoadingFirebaseComponent(false)
		})
	}, [])

	return {
		isLoadingFirebaseComponent,
	}
}

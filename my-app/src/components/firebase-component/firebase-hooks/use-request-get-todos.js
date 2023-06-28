import { useState, useEffect } from 'react'
import { ref, onValue } from 'firebase/database'
import { db } from '../../../firebase'

export const useRequestGetTodos = (todo, setTodos) => {
	const [isLoadingFirebaseComponent, setIsLoadingFirebaseComponent] =
		useState(true)

	useEffect(() => {
		const todosDbRef = ref(db, 'todos')

		return onValue(todosDbRef, (snapshot) => {
			const loadedTodos = snapshot.val() || {}

			setTodos(loadedTodos)
			setIsLoadingFirebaseComponent(false)
		})
	}, [todo, setTodos])

	return {
		isLoadingFirebaseComponent,
	}
}

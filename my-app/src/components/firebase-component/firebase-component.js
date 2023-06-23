import { useEffect, useState } from 'react'
import styles from './firebase-component.module.css'

export const FirebaseComponent = ({ Loader }) => {
	const [todosFirebase, setTodosFirebase] = useState([])
	const [isLoadingFirebaseComponent, setIsLoadingFirebaseComponent] =
		useState(false)

	useEffect(() => {
		setIsLoadingFirebaseComponent(true)

		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodo) => {
				setTodosFirebase(loadedTodo)
			})
			.finally(() => setIsLoadingFirebaseComponent(false))
	}, [])

	return (
		<div className={styles.container}>
			<h3>3. Firebase</h3>
			{isLoadingFirebaseComponent ? (
				<Loader />
			) : (
				todosFirebase.map(({ id, title }) => (
					<div key={id}>
						<ol>
							<span>{id}</span>
							{title}
						</ol>
					</div>
				))
			)}
		</div>
	)
}

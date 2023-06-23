import { useEffect, useState } from 'react'
import styles from './json-placeholder-component.module.css'

export const JsonPlaceholderComponent = ({ Loader }) => {
	const [todosJsonPlaceholder, setTodosJsonPlaceholder] = useState([])
	const [
		isLoadingJsonPlaceholderComponent,
		setIsLoadingJsonPlaceholderComponent,
	] = useState(false)

	useEffect(() => {
		setIsLoadingJsonPlaceholderComponent(true)

		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodo) => {
				setTodosJsonPlaceholder(loadedTodo)
			})
			.finally(() => setIsLoadingJsonPlaceholderComponent(false))
	}, [])

	return (
		<div className={styles.container}>
			<h3>1. JSON Placeholder</h3>
			{isLoadingJsonPlaceholderComponent ? (
				<Loader />
			) : (
				todosJsonPlaceholder.map(({ id, title }) => (
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

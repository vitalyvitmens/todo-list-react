import { useEffect, useState } from 'react'
import styles from './app.module.css'

export const App = () => {
	const [todos, setTodos] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)

		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodo) => {
				setTodos(loadedTodo)
			})
			.finally(() => setIsLoading(false))
	}, [])

	return (
		<div className={styles.dataContainer}>
			<h3>
				1. Реализовать приложение на базе Create React App — страницу со списком
				дел (Todo list):
			</h3>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				todos.map(({ id, title }) => (
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

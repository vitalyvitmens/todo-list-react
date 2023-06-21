import { useEffect, useState } from 'react'
import styles from './app.module.css'

export const App = () => {
	const [todos, setTodos] = useState([])

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodo) => {
				setTodos(loadedTodo)
			})
	}, [])

	return (
		<div className={styles.dataContainer}>
			{todos.map(({ id, userId, title, completed }) => (
				<div key={id}>
					<ol>
						<h5>{id}</h5>
						{title}
					</ol>
				</div>
			))}
		</div>
	)
}

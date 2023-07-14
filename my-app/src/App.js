import { useEffect, useState } from 'react'
import { Todo } from './components'
import styles from './app.module.css'

export const App = () => {
	const [todos, setTodos] = useState([])

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((todosData) => todosData.json())
			.then((loadedTodos) => setTodos(loadedTodos))
	}, [])

	return (
		<div className={styles.app}>
			<div>
				{todos.map(({ id, title, completed }) => (
					<Todo key={id} title={title} completed={completed} />
				))}
			</div>
		</div>
	)
}

import { useEffect, useState } from 'react'
import { Todo, ControlPanel } from './components'
import { readTodos } from './api'
import styles from './app.module.css'

export const App = () => {
	const [todos, setTodos] = useState([])

	useEffect(() => {
		readTodos().then((loadedTodos) => setTodos(loadedTodos))
	}, [])

	return (
		<div className={styles.app}>
			<ControlPanel />
			<div>
				{todos.map(({ id, title, completed }) => (
					<Todo key={id} id={id} title={title} completed={completed} />
				))}
			</div>
		</div>
	)
}

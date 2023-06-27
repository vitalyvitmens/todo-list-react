import styles from './todo-list.module.css'

export const TodoList = ({
	todosServer,
	requestUpdateTodo,
	requestDeleteTodo,
	todo,
	setTodo,
	setIsUpdating,
}) => {
	return todosServer.map(({ id, title }) => (
		<ol key={id}>
			<span>{id}</span>
			{title}
			<button
				className={!todo ? styles.updateBtnYellow : styles.updateBtnGreen}
				onClick={() => {
					if (todo === '') {
						setIsUpdating(true)
						setTodo(title)
					} else {
						requestUpdateTodo(id)
						setTodo('')
					}
				}}
			>
				✎
			</button>
			<button
				className={styles.deleteBtn}
				onClick={() => requestDeleteTodo(id)}
			>
				X
			</button>
		</ol>
	))
}

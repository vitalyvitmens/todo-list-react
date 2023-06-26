import styles from './todo-list.module.css'

export const TodoList = ({
	todosServer,
	requestUpdateTodo,
	requestDeleteTodo,
	todo,
	setTodo,
	setIsUpdating,
}) => {
	return todosServer.map((t) => (
		<ol key={t.id}>
			<span>{t.id}</span>
			{t.title}
			<button
				className={!todo ? styles.updateBtnYellow : styles.updateBtnGreen}
				onClick={() => {
					if (todo === '') {
						setIsUpdating(true)
						setTodo(t.title)
					} else {
						requestUpdateTodo(t.id)
						setTodo('')
					}
				}}
			>
				✎
			</button>
			<button
				className={styles.deleteBtn}
				onClick={() => requestDeleteTodo(t.id)}
			>
				X
			</button>
		</ol>
	))
}

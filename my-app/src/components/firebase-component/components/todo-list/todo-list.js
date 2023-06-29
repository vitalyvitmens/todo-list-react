import styles from './todo-list.module.css'

export const TodoList = ({
	todo,
	todos,
	setTodo,
	requestUpdateTodo,
	requestDeleteTodo,
	setIsUpdating,
	toggleCompletedHandler,
	requestUpdateCompletedTodo,
}) => {
	return Object.entries(todos).map(([id, { title, completed }]) => (
		<ol key={id}>
			<span>😎</span>
			<div
				className={completed ? styles.todoLineThrough : styles.todo}
				onClick={() => {
					toggleCompletedHandler()
					requestUpdateCompletedTodo(id)
				}}
			>
				{title}
			</div>
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

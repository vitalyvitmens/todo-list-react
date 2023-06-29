import styles from './todo-list-sort.module.css'

export const TodoListSort = ({
	todos,
	requestUpdateTodo,
	requestDeleteTodo,
	todo,
	setTodo,
	setIsUpdating,
	search,
}) => {
	return todos
		.filter((todo) => {
			return search ? todo.title.includes(search) : todo
		})
		.map(({ id, title }) => (
			<ol key={title}>
				<span>😎</span>
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

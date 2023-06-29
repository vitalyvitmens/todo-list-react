import styles from './todo-list-search.module.css'

export const TodoListSearch = ({
	todo,
	todos,
	setTodo,
	requestUpdateTodo,
	requestDeleteTodo,
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

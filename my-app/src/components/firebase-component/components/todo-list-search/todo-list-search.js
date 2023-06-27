import styles from './todo-list-search.module.css'

export const TodoListSearch = ({
	todosServer,
	requestUpdateTodo,
	requestDeleteTodo,
	todo,
	setTodo,
	setIsUpdating,
	search,
}) => {
	return todosServer
		.filter((todo) => {
			return search ? todo.title.includes(search) : todo
		})
		.map(({ id, title }) => (
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

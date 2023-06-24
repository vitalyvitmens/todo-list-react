import { useState } from 'react'
import {
	useRequestAddTodo,
	useRequestDeleteTodo,
	useRequestGetTodos,
	useRequestUpdateTodo,
} from './json-server-hooks/index'
import styles from './json-server-component.module.css'

//! JSON Server
// https://www.npmjs.com/package/json-server
// 1). npm install -g json-server
// 2). Create a db.json file with some data
// 3). cd my-app
//! 4). json-server --watch src/db.json --port 8204 --delay 2000 (запуск json-server с задержкой подгрузки данных в 2 секунды)

export const JsonServerComponent = ({ Loader }) => {
	const [todo, setTodo] = useState('')
	const [refreshTodos, setRefreshTodos] = useState(false)

	const { isLoadingJsonServerComponent, todosServer } =
		useRequestGetTodos(refreshTodos)
	const { isCreating, requestAddTodo } = useRequestAddTodo(
		refreshTodos,
		setRefreshTodos,
		todo,
		setTodo
	)
	const { isUpdating, requestUpdateTodo } = useRequestUpdateTodo(
		refreshTodos,
		setRefreshTodos,
		todo
	)
	const { isDeleting, requestDeleteTodo } = useRequestDeleteTodo(
		refreshTodos,
		setRefreshTodos,
		todo
	)

	const onTodoChange = ({ target }) => {
		setTodo(target.value)
	}

	const onSubmit = (e) => {
		e.preventDefault()
		console.log(e.target)
	}

	return (
		<div className={styles.container}>
			<h3>2. JSON Server</h3>
			<h2>My To-Do List</h2>
			<form className={styles.form} onSubmit={onSubmit}>
				<input
					type="text"
					name="todo"
					value={todo}
					placeholder="New todo"
					onChange={onTodoChange}
				></input>
				<button disabled={isCreating} onClick={requestAddTodo}>
					Add
				</button>
			</form>
			{isLoadingJsonServerComponent ? (
				<Loader />
			) : (
				todosServer.map(({ id, title }) => (
					<ol onClick={onSubmit} key={id}>
						<span>{id}</span>
						{title}
						<button
							disabled={isUpdating}
							className={styles.updateBtn}
							onClick={requestUpdateTodo}
						>
							✎
						</button>
						<button
							disabled={isDeleting}
							className={styles.deleteBtn}
							onClick={requestDeleteTodo}
						>
							X
						</button>
					</ol>
				))
			)}
		</div>
	)
}

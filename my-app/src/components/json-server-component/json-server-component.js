import { useEffect, useState } from 'react'
import styles from './json-server-component.module.css'

//! JSON Server
// https://www.npmjs.com/package/json-server
// 1). npm install -g json-server
// 2). Create a db.json file with some data
// 3). cd my-app
//! 4). json-server --watch src/db.json --port 3005 --delay 2000 (запуск json-server с задержкой подгрузки данных в 2 секунды)

export const JsonServerComponent = ({ Loader }) => {
	const [todosServer, setTodosServer] = useState([])
	const [isLoadingJsonServerComponent, setIsLoadingJsonServerComponent] =
		useState(false)
	const [isCreating, setIsCreating] = useState(false)
	const [isUpdating, setIsUpdating] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const [todo, setTitle] = useState('')
	const [refreshTodos, setRefreshTodos] = useState(false)

	const onTodoChange = ({ target }) => {
		setTitle(target.value)
	}

	useEffect(() => {
		setIsLoadingJsonServerComponent(true)

		fetch('http://localhost:3005/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodo) => {
				setTodosServer(loadedTodo)
			})
			.finally(() => setIsLoadingJsonServerComponent(false))
	}, [refreshTodos])

	const requesAddTodo = () => {
		setIsCreating(true)

		fetch('http://localhost:3005/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: todo,
				completed: false,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log(`Добавлена задача ${todo}, ответ сервера:`, response)
				setRefreshTodos(!refreshTodos)
			})
			.finally(() => setIsCreating(false))
	}

	const requesUpdateTodo = () => {
		setIsUpdating(true)

		fetch(`http://localhost:3005/todos/4`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: todo,
				completed: false,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log(
					`Задача: ${todo} с id: ${response.id} обновлена, ответ сервера:`,
					response
				)
				setRefreshTodos(!refreshTodos)
			})
			.finally(() => setIsUpdating(false))
	}

	const requesDeleteTodo = () => {
		setIsDeleting(true)

		fetch('http://localhost:3005/todos/5', {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log(`Задача ${todo} удалена, ответ сервера:`, response)
				setRefreshTodos(!refreshTodos)
			})
			.finally(() => setIsDeleting(false))
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
				<button disabled={isCreating} onClick={requesAddTodo}>
					Add
				</button>
			</form>
			{isLoadingJsonServerComponent ? (
				<Loader />
			) : (
				todosServer.map(({ id, title }) => (
					<div key={id}>
						<ol>
							<span>{id}</span>
							{title}
							<button
								disabled={isUpdating}
								className={styles.updateBtn}
								onClick={requesUpdateTodo}
							>
								✎
							</button>
							<button
								disabled={isDeleting}
								className={styles.deleteBtn}
								onClick={requesDeleteTodo}
							>
								X
							</button>
						</ol>
					</div>
				))
			)}
		</div>
	)
}

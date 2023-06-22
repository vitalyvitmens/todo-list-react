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
	const [title, setTitle] = useState('')

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
	}, [title])

	const requesAddTodo = () => {
		fetch('http://localhost:3005/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: title,
				completed: false,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log(`Добавлена задача ${title}, ответ сервера:`, response)
			})
	}

	const onSubmit = (e) => {
		e.preventDefault()
	}

	return (
		<div className={styles.container}>
			<h3>
				2. Переделать приложение, заменив JSON Placeholder на JSON Server:
			</h3>
			<h4>My To-Do List</h4>
			<form className={styles.form} onSubmit={onSubmit}>
				<input
					type="text"
					name="todo"
					value={title}
					placeholder="New todo"
					onChange={onTodoChange}
				></input>
				<button onClick={requesAddTodo}>Add</button>
			</form>
			{isLoadingJsonServerComponent ? (
				<Loader />
			) : (
				todosServer.map(({ id, title }) => (
					<div key={id}>
						<ol>
							<span>{id}</span>
							{title}
						</ol>
					</div>
				))
			)}
		</div>
	)
}

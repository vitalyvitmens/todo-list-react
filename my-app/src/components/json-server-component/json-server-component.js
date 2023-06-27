import React, { useState } from 'react'
import { TodoForm, TodoList, TodoListSearch } from './components'
import {
	useRequestAddTodo,
	useRequestDeleteTodo,
	useRequestGetTodos,
	useRequestUpdateTodo,
} from './json-server-hooks/index'
import styles from './json-server-component.module.css'

//! JSON Server
// json-server --watch src/db.json --port 8204

export const JsonServerComponent = ({ Loader }) => {
	const [todo, setTodo] = useState('')
	const [todosServer, setTodosServer] = useState([])
	const [refreshTodos, setRefreshTodos] = useState(false)
	const [editId, setEditId] = useState(false)
	const [sortTitle, setSortTitle] = useState(false)
	const [search, setSearch] = useState('')

	const { isLoadingJsonServerComponent } = useRequestGetTodos(
		refreshTodos,
		setTodosServer,
		sortTitle
	)

	const { isCreating, requestAddTodo } = useRequestAddTodo(
		refreshTodos,
		setRefreshTodos,
		todo,
		setTodo
	)

	const { isUpdating, requestUpdateTodo, setIsUpdating } = useRequestUpdateTodo(
		refreshTodos,
		setRefreshTodos,
		todo,
		setTodo
	)

	const { isDeleting, requestDeleteTodo } = useRequestDeleteTodo(
		refreshTodos,
		setRefreshTodos,
		todo
	)

	const onSubmit = (e) => {
		e.preventDefault()

		if (editId) {
			const editTodo = todosServer.find((i) => i.id === editId)
			const updatedTodos = todosServer.map((t) =>
				t.id === editTodo.id
					? (t = { id: t.id, todo })
					: { id: t.id, todo: t.todo }
			)
			setTodosServer(updatedTodos)
			setEditId(0)
			setTodo('')
			return
		}

		if (todo !== '') {
			setTodosServer([{ id: `${todo}-${Date.now()}`, todo }, ...todosServer])
			setTodo('')
		}
	}

	const sortHandler = () =>
		sortTitle ? setSortTitle(false) : setSortTitle(true)

	return (
		<div className={styles.container}>
			<h3>2. JSON Server</h3>
			<h2>My To-Do List</h2>
			<input
				type="text"
				value={search}
				placeholder="Найти задачу..."
				onChange={({ target }) => setSearch(target.value)}
				className="input-field"
			/>
			<p></p>
			<TodoForm
				onSubmit={onSubmit}
				todo={todo}
				editId={editId}
				setTodo={setTodo}
				requestAddTodo={requestAddTodo}
				isUpdating={isUpdating}
			/>
			<p></p>
			<button
				className={styles.btnGreen}
				onClick={sortHandler}
				disabled={todosServer.length === 0}
			>
				{sortTitle
					? 'Отфильтровать задачи по id'
					: 'Отфильтровать задачи по алфавиту'}
			</button>
			{isLoadingJsonServerComponent ? (
				<Loader />
			) : search ? (
				<TodoListSearch
					todo={todo}
					todosServer={todosServer}
					setTodo={setTodo}
					requestUpdateTodo={requestUpdateTodo}
					requestDeleteTodo={requestDeleteTodo}
					setIsUpdating={setIsUpdating}
					search={search}
				/>
			) : (
				<TodoList
					todo={todo}
					todosServer={todosServer}
					setTodo={setTodo}
					requestUpdateTodo={requestUpdateTodo}
					requestDeleteTodo={requestDeleteTodo}
					setIsUpdating={setIsUpdating}
				/>
			)}
		</div>
	)
}

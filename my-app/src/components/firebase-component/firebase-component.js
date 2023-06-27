import { useState } from 'react'
import {
	useRequestAddTodo,
	useRequestDeleteTodo,
	useRequestGetTodos,
	useRequestUpdateTodo,
} from './firebase-hooks'
import { TodoForm, TodoList, TodoListSearch } from './components'
import styles from './firebase-component.module.css'

export const FirebaseComponent = ({ Loader }) => {
	const [todo, setTodo] = useState('')
	const [todos, setTodos] = useState([])
	const [refreshTodos, setRefreshTodos] = useState(false)
	const [editId, setEditId] = useState(false)
	const [sortTitle, setSortTitle] = useState(false)
	const [search, setSearch] = useState('')

	const { isLoadingFirebaseComponent } = useRequestGetTodos(
		setTodos,
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
			const editTodo = todos.find((i) => i.id === editId)
			const updatedTodos = todos.map((t) =>
				t.id === editTodo.id
					? (t = { id: t.id, todo })
					: { id: t.id, todo: t.todo }
			)
			setTodos(updatedTodos)
			setEditId(0)
			setTodo('')
			return
		}

		if (todo !== '') {
			setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos])
			setTodo('')
		}
	}

	const sortHandler = () =>
		sortTitle ? setSortTitle(false) : setSortTitle(true)

	return (
		<div className={styles.container}>
			<h3>3. Firebase</h3>
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
				// disabled={todos.length === 0}
			>
				{sortTitle
					? 'Отфильтровать задачи по id'
					: 'Отфильтровать задачи по алфавиту'}
			</button>
			{isLoadingFirebaseComponent ? (
				<Loader />
			) : search ? (
				<TodoListSearch
					todo={todo}
					todos={todos}
					setTodo={setTodo}
					requestUpdateTodo={requestUpdateTodo}
					requestDeleteTodo={requestDeleteTodo}
					setIsUpdating={setIsUpdating}
					search={search}
				/>
			) : (
				<TodoList
					todo={todo}
					todos={todos}
					setTodo={setTodo}
					requestUpdateTodo={requestUpdateTodo}
					requestDeleteTodo={requestDeleteTodo}
					setIsUpdating={setIsUpdating}
				/>
			)}
		</div>
	)
}

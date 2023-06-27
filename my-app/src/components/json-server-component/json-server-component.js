import React, { useState, useEffect } from 'react'
import { TodoForm, TodoList } from './components'
import {
	useRequestAddTodo,
	useRequestDeleteTodo,
	useRequestGetTodos,
	useRequestUpdateTodo,
	useDebounce,
} from './json-server-hooks/index'
import { searchCharacters } from './json-server-utils/search-characters'
import styles from './json-server-component.module.css'

//! JSON Server
// https://www.npmjs.com/package/json-server
// 1). npm install -g json-server
// 2). Create a db.json file with some data
// 3). cd my-app
//! 4). json-server --watch src/db.json --port 8204 --delay 2000 (запуск json-server с задержкой подгрузки данных в 2 секунды)

export const JsonServerComponent = ({ Loader }) => {
	const [todo, setTodo] = useState('')
	const [todosServer, setTodosServer] = useState([])
	const [refreshTodos, setRefreshTodos] = useState(false)
	const [editId, setEditId] = useState(false)
	const [sortTitle, setSortTitle] = useState(false)

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

	// Состояние и сеттер состояния для поискового запроса
	const [searchTerm, setSearchTerm] = useState('')
	// Состояние и сеттер состояния для результатов поиска
	const [results, setResults] = useState([])
	// Состояние для статуса поиска (есть ли ожидающий запрос API)
	const [isSearching, setIsSearching] = useState(false)

	// Теперь мы вызываем наш хук, передавая текущее значение searchTerm.
	// Хук вернет только последне значение (которое мы передали) ...
	// ... если прошло более 500ms с последнего вызова.
	// Иначе он вернет предыдущее значение searchTerm.
	// Цель в том, чтобы вызвать АПИ только после того, как пользователь перестанет
	// печатать и в итоге мы не будем вызвать АПИ слишком часто.
	const debouncedSearchTerm = useDebounce(searchTerm, 500)

	// Здесь происходит вызов АПИ
	// Мы используем useEffect, так как это асинхронное действие
	useEffect(
		() => {
			// Убедиться что у нас есть значение (пользователь ввел что-то)
			if (debouncedSearchTerm) {
				// Выставить состояние isSearching
				setIsSearching(true)
				// Сделать запрос к АПИ
				searchCharacters(debouncedSearchTerm).then((results) => {
					// Выставить состояние в false, так-как запрос завершен
					setIsSearching(false)
					// Выставит состояние с результатом
					setResults(results)
				})
			} else {
				setResults([])
			}
		},
		// Это массив зависимостей useEffect
		// Хук useEffect сработает только если отложенное значение изменится ...
		// ... и спасибо нашему хуку, что оно изменится только тогда ...
		// когда значение searchTerm не менялось на протяжении 500ms.
		[debouncedSearchTerm]
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

	return (
		<div className={styles.container}>
			<h3>2. JSON Server</h3>
			<h2>My To-Do List</h2>
			<input
				placeholder="Найти задачу"
				onChange={(e) => setSearchTerm(e.target.value)}
			/>

			{isSearching && <div>Поиск ...</div>}

			{results.map((result) => (
				<div key={result.id}>
					<h4>{result.title}</h4>
					<img
						src={`${result.thumbnail.path}/portrait_incredible.${result.thumbnail.extension}`}
					/>
				</div>
			))}
			<p></p>
			<TodoForm
				onSubmit={onSubmit}
				todo={todo}
				editId={editId}
				setTodo={setTodo}
				requestAddTodo={requestAddTodo}
				isUpdating={isUpdating}
			/>
			{isLoadingJsonServerComponent ? (
				<Loader />
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

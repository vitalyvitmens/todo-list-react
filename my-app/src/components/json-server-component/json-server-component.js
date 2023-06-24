import React, { useState, useEffect } from 'react'
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
			<div>
				<input
					placeholder="Search Marvel Comics"
					onChange={(e) => setSearchTerm(e.target.value)}
				/>

				{isSearching && <div>Searching ...</div>}

				{results.map((result) => (
					<div key={result.id}>
						<h4>{result.title}</h4>
						<img
							src={`${result.thumbnail.path}/portrait_incredible.${result.thumbnail.extension}`}
						/>
					</div>
				))}
			</div>
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

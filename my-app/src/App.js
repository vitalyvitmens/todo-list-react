import { useEffect, useState } from 'react'
import { Todo, ControlPanel } from './components'
import { readTodos, updateTodo, deleteTodo } from './api'
import { findTodo, removeTodoInTodos, setTodoInTodos } from './utils'
import styles from './app.module.css'

export const App = () => {
	const [todos, setTodos] = useState([])

	const onTodoSave = (id) => {
		const { title } = findTodo(todos, id) || {}

		updateTodo({ id, title }).then(() => {
			setTodos(setTodoInTodos(todos, { id, isEditing: false }))
		})
	}

	const onTodoEdit = (id) => {
		setTodos(setTodoInTodos(todos, { id, isEditing: true }))
	}

	const onTodoTitleChange = (id, newTitle) => {
		setTodos(setTodoInTodos(todos, { id, title: newTitle }))
	}

	const onTodoCompletedChange = (id, newCompleted) => {
		updateTodo({ id, completed: newCompleted }).then(() => {
			setTodos(setTodoInTodos(todos, { id, completed: newCompleted }))
		})
	}

	const onTodoRemove = (id) => {
		deleteTodo(id).then(() => setTodos(removeTodoInTodos(todos, id)))
	}

	useEffect(() => {
		readTodos().then((loadedTodos) => setTodos(loadedTodos))
	}, [])

	return (
		<div className={styles.app}>
			<ControlPanel />
			<div>
				{todos.map(({ id, title, completed, isEditing = false }) => (
					<Todo
						key={id}
						id={id}
						title={title}
						completed={completed}
						isEditing={isEditing}
						onEdit={() => onTodoEdit(id)}
						onTitleChange={(newTitle) => onTodoTitleChange(id, newTitle)}
						onCompletedChange={(newCompleted) =>
							onTodoCompletedChange(id, newCompleted)
						}
						onSave={() => onTodoSave(id)}
						onRemove={() => onTodoRemove(id)}
					/>
				))}
			</div>
		</div>
	)
}

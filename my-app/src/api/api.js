import { HTTP_METHOD } from '../constants'

export const fetchServer = (method, { id, ...payload } = {}, params = '') => {
	let url = `http://localhost:8204/todos`
	let options = {
		method,
		headers: { 'Content-Type': 'application/json' },
	}

	if (method === HTTP_METHOD.GET) {
		url += ''
	} else {
		if (method !== HTTP_METHOD.POST) {
			url += `/${id}`
		}

		if (method !== HTTP_METHOD.DELETE) {
			options.body = JSON.stringify(payload)
		}
	}

	return fetch(url, options).then((jsonData) => jsonData.json())
}

export const createTodo = (newTodo) => fetchServer('POST', newTodo)

export const readTodos = () => fetchServer('GET')

export const updateTodo = (todoData) => fetchServer('PATCH', todoData)

export const deleteTodo = (todoId) => fetchServer('DELETE', { id: todoId })

import axios from 'axios'
import Constants from 'expo-constants'

// Resolve API base for physical devices by reading Expo manifest/debuggerHost
function getDevHost() {
	try {
		const manifest: any = (Constants as any).manifest || (Constants as any).expoConfig || {}
		const debuggerHost = manifest.debuggerHost || manifest.hostUri
		if (debuggerHost) {
			// debuggerHost is like '192.168.1.10:19000' or 'localhost:19000'
			return debuggerHost.split(':')[0]
		}
	} catch (e) {
		// ignore
	}
	return 'localhost'
}

const DEFAULT_PORT = 3001
const API_BASE = process.env.API_BASE_URL || `http://${getDevHost()}:${DEFAULT_PORT}`

const api = axios.create({ baseURL: API_BASE, timeout: 5000 })

export { API_BASE }

// Log requests and errors to help debugging on device
api.interceptors.request.use((cfg) => {
	// console.log('API request', cfg.method, cfg.url)
	return cfg
}, (err) => {
	console.error('API request error', err)
	return Promise.reject(err)
})

api.interceptors.response.use((res) => res, (err) => {
	console.error('API response error', err && err.response ? { status: err.response.status, data: err.response.data } : err)
	return Promise.reject(err)
})

export const fetchTasks = () => api.get('/tasks')
export const fetchTask = (id: number) => api.get(`/tasks/${id}`)
export const createTask = (data: any) => api.post('/tasks', data)
export const updateTask = (id: number, data: any) => api.put(`/tasks/${id}`, data)
export const deleteTask = (id: number) => api.delete(`/tasks/${id}`)
export const fetchCategories = () => api.get('/categories')
export const createCategory = (data: any) => api.post('/categories', data)

export default api

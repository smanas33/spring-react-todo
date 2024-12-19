import { apiClient } from './ApiClient'

export const retrieveHelloWorldBean = (username, token) => apiClient.get(`/hello-world/path-variable/${username}`)
const axios = require('axios');

// URL base del servicio externo público que maneja tareas
const BASE_URL = 'https://jsonplaceholder.typicode.com/todos'; // Ejemplo público

const TodoClient = {
  async getTasks() {
    const response = await axios.get(BASE_URL);
    return response.data; // Array de tareas
  },

  async getTask(id) {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data; // Una tarea
  },

  async createTask(task) {
    const response = await axios.post(BASE_URL, task);
    return response.data; // Tarea creada
  },

  async updateTask(id, updates) {
    const response = await axios.put(`${BASE_URL}/${id}`, updates);
    return response.data; // Tarea actualizada
  },

  async deleteTask(id) {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.status === 200; // true si eliminado
  }
};

module.exports = TodoClient;

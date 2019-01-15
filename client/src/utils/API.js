import axios from "axios";

export default {
  // Gets all Todos
  getTodos: function () {
    return axios.get("/api/todos");
  },
  // Gets the Todo with the given id
  getTodo: function (id) {
    return axios.get("/api/todos/" + id);
  },
  // Deletes the Todo with the given id
  deleteTodo: function (id) {
    return axios.delete("/api/todos/" + id);
  },
  // Saves a Todo to the database
  saveTodo: function (TodoData) {
    return axios.post("/apitTodos", TodoData);
  }
};

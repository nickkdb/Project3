import axios from "axios";

export default {
  // Gets all users
  getUsers: function() {
    return axios.get("/api/users");
  },
  // Gets the user with the given id
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },
  getProfile: function(id) {
    return axios.get("/api/users/profile/" + id);
  },
//update the user model
  addCard: function(id, body) {
    return axios.post("/api/cards/" + id, body)
  },
  updateCard: function(id, body) {
    return axios.put("/api/cards/" + id, body)
  },
  deleteCard: function(id, uuid) {
    return axios.delete("/api/cards/" + id + "/" + uuid);
  },
  // Deletes the user with the given id
  // deleteUser: function(id) {
  //   return axios.delete("/api/users/" + id);
  // },
  // Saves a user to the database
  createUser: function(user) {
    return axios.post("/api/users", user);
  }
};
import axios from "axios";

export default {
  // Gets all users
  getUsers: function() {
    return axios.get("/api/users");
  },
  // Gets the user with the given id
  getUser: function(email) {
    return axios.get("/api/users" + email);
  },
//update the user model
  addCard: function(id) {
    return axios.put("/api/cards/" + id)
  },
  // Deletes the user with the given id
  deleteUser: function(id) {
    return axios.delete("/api/users/" + id);
  },
  // Saves a user to the database
  createUser: function(user) {
    return axios.post("/api/users", user);
  }
};
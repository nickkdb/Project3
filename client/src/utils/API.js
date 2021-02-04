import axios from "axios";

const API = {
  getUsers: function(id) {
    return axios.get(`/api/users/${id}`);
  }
};

export default API;

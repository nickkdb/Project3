import axios from "axios";

const API = {
  getUsers: function(id) {
    return axios.get('/api/users');
  }
};

export default API;

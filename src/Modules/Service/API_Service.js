import axios from "axios";

const BASE_URL = "http://localhost:5048"
//const BASE_URL="http://nahid007-001-site1.ktempurl.com"

const APIService = {
    GetService: async (endpoint) => {
        let Session = getToken();
        const AuthStr = Session !== null && Session !== undefined ? 'Bearer '.concat(Session) : "";
        const response = await axios.get(BASE_URL + endpoint, { headers: { Authorization: AuthStr } })
        return response.data;
    },

    PostService: async (endpoint, data) => {
        let Session = getToken();
        const AuthStr = Session !== null && Session !== undefined ? 'Bearer '.concat(Session) : "";
        const response = await axios.post(BASE_URL + endpoint, data, { headers: { Authorization: AuthStr } }).catch(err => err);
        if (response.status != 200) {
            return response.message
        }
        return response.data;
    },
    PostFormService: async (endpoint, data) => {
        let Session = getToken();
        const AuthStr = Session !== null && Session !== undefined ? 'Bearer '.concat(Session) : "";
        const response = await axios.post(BASE_URL + endpoint, data, { headers: { 'Authorization': AuthStr, 'Content-Type': 'multipart/form-data' } }).catch(err => err);
        if (response.status != 200) {
            return response.message
        }
        return response.data;
    }
}

const getToken = () => {
    let session = window.localStorage.getItem("session");
    if (session !== null && session !== undefined && session !== "") {
        return JSON.parse(session).token
    }
    else {
        return null;
    }
}

export default APIService;
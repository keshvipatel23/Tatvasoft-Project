import request from "./request";

const ENDPOINT = "api/user";

const login = async(data) => {
    const urlLogin = `${ENDPOINT}/login`;
    return request.post(urlLogin,data).then((res) => {
        return res;
    });
};

const create = async(data) => {
    const urlCreate = `${ENDPOINT}`;
    return request.post(urlCreate,data).then((res) => {
        return res.data;
    });
};

const authService ={
    login,
    create,
};

export default authService;
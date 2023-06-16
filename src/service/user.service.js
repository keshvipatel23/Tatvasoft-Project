import request from "./request";

const ENDPOINT = "api/user";

const getAllUsers = async(params) => {
    const urlAllUser = `${ENDPOINT}`;
    return request.get(urlAllUser,{params}).then((res)=>{
        return res;
    });
};

const getAllRoles = async() => {
    const urlAllRoles = `${ENDPOINT}/roles`;
    return request.get(urlAllRoles).then((res) => {
        return res;
    });
};

const getById = async(id) => {
    const urlId = `${ENDPOINT}/byId?id=${id}`;
    return request.get(urlId).then((res) => {
        return res;
    });
};

const deleteUser = async(id) => {
    const urlDelete = `${ENDPOINT}?id=${id}`;
    return request.delete(urlDelete).then((res) => {
        return res;
    });
};

const update = async(data) => {
    const urlUpdate = `${ENDPOINT}`;
    return request.put(urlUpdate,data).then((res) => {
        return res;
    });
};

const updateProfile = async(data) => {
    const urlUpdateProfile = `${ENDPOINT}`;
    return request.put(urlUpdateProfile,data).then((res) => {
        return res;
    });
};

const userService = {
    getAllUsers,
    getAllRoles,
    getById,
    deleteUser,
    update,
    updateProfile,
};

export default userService;
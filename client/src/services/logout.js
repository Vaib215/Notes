import http from "./httpService";

const logoutUser = async () => {
    await http.post("/auth/logout").then((response) => {
        return response
    }).catch((error) => {
        return error
    });
}

export default logoutUser;
import axiosInstance from "@/config/axios";

// user
export const apiGetHotAuthor = async(data) => {
    const url = "/user/hot-author";
    const response = await axiosInstance.get(url, data);
    return response.data;
};

export const apiGetAuthor = async(username) => {
    const url = `/user/${username}`;
    const response = await axiosInstance.get(url);
    return response.data;
};

export const apiGetAllUserAdmin = async() => {
    try {
        const response = await axiosInstance.get('/user/');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const apiUpdateUser = async(userId, userData) => {
    try {
        const response = await axiosInstance.put(`/user/${userId}`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const apiDeleteUser = async(userId) => {
    try {
        const response = await axiosInstance.delete(`/user/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


// category
export const apiGetAllCategory = async(data) => {
    const url = "/categorys/";
    const response = await axiosInstance.get(url, data);
    return response.data;
}
export const apiGetCategoryBySlug = async(slug) => {
    const url = `/categorys/${slug}`;
    const response = await axiosInstance.get(url);
    return response.data;
}
export const getPostsByCategory = async(cateID) => {
    const url = `/posts/cate/${cateID}`;
    const response = await axiosInstance.get(url);
    return response.data;
};

// post
export const apiGetAllPost = async(sort, page) => {
    const url = `/posts/?sort=${sort}&page=${page}`;
    const response = await axiosInstance.get(url);
    return response.data;
};
export const getPostsBySlug = async(slug) => {
    const url = `/posts/${slug}`;
    const response = await axiosInstance.get(url);
    return response.data;
};
export const apiCreatePost = async(data) => {
    const url = "/posts/create";
    const response = await axiosInstance.post(url, data);
    return response;
};
export const apiTopPostOfMonth = async() => {
    const url = "/posts/top-month";
    const response = await axiosInstance.get(url);
    return response.data;
};
export const apiGetPostsByUserName = async(username) => {
    const url = `/posts/user/${username}`;
    const response = await axiosInstance.get(url);
    return response.data;
};
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

export const apiUpdateUser = async(userId, user) => {
    try {
        const response = await axiosInstance.put(`/user/${userId}`, user);
        return response.data;
    } catch (error) {
        console.error("Failed to update user:", error);
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
// Hàm cập nhật category
export const apiUpdateCategory = async(categoryId, category) => {
    try {
        const response = await axiosInstance.put(`/categorys/${categoryId}`, category);
        return response.data;
    } catch (error) {
        console.error("Failed to update category:", error);
        throw error;
    }
};

// Hàm xóa category
export const apiDeleteCategory = async(categoryId) => {
    try {
        const response = await axiosInstance.delete(`/categorys/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to delete category:", error);
        throw error;
    }
};
// Hàm tạo category
export const apiCreateCategory = async(newCategory) => {
    try {
        const response = await axiosInstance.post(`/categorys/create`, newCategory);
        return response.data; // Trả về dữ liệu của category đã được tạo
    } catch (error) {
        console.error("Failed to create category:", error);
        throw error;
    }
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
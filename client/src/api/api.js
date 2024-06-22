import axiosInstance from "@/config/axios";


// auth 
export const apiRegister = async (data) => {
  const url = "/auth/register";
  const response = await axiosInstance.post(url, data);
  return response;
};

// user
export const apiGetHotAuthor = async (data) => {
  const url = "/user/hot-author";
  const response = await axiosInstance.get(url, data);
  return response.data;
};

export const apiGetAuthor = async (username) => {
  const url = `/user/${username}`;
  const response = await axiosInstance.get(url);
  return response.data;
};
export const apiGetCurentUser = async () => {
  const url = `/user/profile`;
  const response = await axiosInstance.get(url);
  return response.data;
};
export const apiUpdateUserInfo = async (data) => {
  const url = `/user/update`;
  const response = await axiosInstance.put(url, data);
  return response.data;
};
export const apiChangePass = async (data) => {
  const url = `/user/change-password`;
  const response = await axiosInstance.put(url, data);
  return response.data;
};

// add user saved
export const apiGetPostUserSaved = async (userId) => {
  const url = `/user/${userId}/saved`;
  const response = await axiosInstance.get(url);
  return response.data;
};
export const apiAddUserSaved = async (userId, postId) => {
  const url = `/user/${userId}/saved`;
  const response = await axiosInstance.post(url, postId);
  return response.data;
};
export const apiRemoveUserSaved = async (userId, postId) => {
  const url = `/user/${userId}/saved/${postId}`;
  const response = await axiosInstance.delete(url);
  return response.data;
};

// category
export const apiGetAllCategory = async (data) => {
    const url = "/categorys/"; 
    const response = await axiosInstance.get(url, data);
    return response.data;
}
export const apiGetCategoryBySlug = async ( slug) => {
    const url = `/categorys/${slug}`; 
    const response = await axiosInstance.get(url);
    return response.data;
}
export const getPostsByCategory = async (cateID) => {
  const url = `/posts/cate/${cateID}`;
  const response = await axiosInstance.get(url);
  return response.data;
};

// post
export const apiGetAllPost = async (sort, page) => {
  const url = `/posts/?sort=${sort}&page=${page}`;
  const response = await axiosInstance.get(url);
  return response.data;
};
export const getPostsBySlug = async (slug) => {
  const url = `/posts/${slug}`;
  const response = await axiosInstance.get(url);
  return response.data;
};
export const apiCreatePost = async (data) => {
  const url = "/posts/create";
  const response = await axiosInstance.post(url, data);
  return response;
};
export const apiTopPostOfMonth = async () => {
  const url = "/posts/top-month";
  const response = await axiosInstance.get(url);
  return response.data;
};
export const apiGetPostsByUserName = async (username) => {
  const url = `/posts/user/${username}`;
  const response = await axiosInstance.get(url);
  return response.data;
};
export const apiUpdateViewPost = async (id) => {
  const url = `/posts/${id}/update-view`;
  const response = await axiosInstance.put(url);
  return response.data;
};
export const apiUpdateVote = async (id, action) => {
  const url = `/posts/${id}/vote`;
  const response = await axiosInstance.post(url, action);
  return response.data;
};

// history
export const apiGetPostUserHistory= async (userId) => {
  const url = `/user/${userId}/history`;
  const response = await axiosInstance.get(url);
  return response.data;
};
export const apiAddUserHistory = async (userId, postId) => {
  const url = `/user/${userId}/history`;
  const response = await axiosInstance.post(url, postId);
  return response.data;
};
export const apiRemoveUserHistory = async (userId, postId) => {
  const url = `/user/${userId}/history/${postId}`;
  const response = await axiosInstance.delete(url);
  return response.data;
};

// comment
export const apiGetCommentByPost = async (postId) => {
  const url = `/comments/${postId}`;
  const response = await axiosInstance.get(url);
  return response.data;
};
export const apiCreateComment = async (data) => {
  const url = "/comments/create";
  const response = await axiosInstance.post(url, data);
  return response;
};

// message
export const apiSendMessage = async (selectedConversation,data) => {
  const url = `/messages/send/${selectedConversation}`;
  const response = await axiosInstance.post(url, data);
  return response.data;
};
export const apiGetMessage = async (selectedConversation,data) => {
  const url = `/messages/${selectedConversation}`;
  const response = await axiosInstance.get(url, data);
  return response.data;
};
export const apiGetUserMessage = async (data) => {
  const url = "/user/all";
  const response = await axiosInstance.get(url, data);
  return response.data;
};
export const apiGetConversations = async (userId,data) => {
  const url = `/conversations/${userId}`;
  const response = await axiosInstance.get(url, data);
  return response.data;
};
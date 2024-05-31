import axiosInstance from "@/config/axios";

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
export const getPostsBySlug = async (slug) => {
  const url = `/posts/${slug}`;
  const response = await axiosInstance.get(url);
  return response.data;
};
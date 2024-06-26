import React, { useState, useEffect } from 'react';
import './postManager.scss';
import { apiGetAllPost, apiCreatePost, apiDeletePost, apiUpdatePost } from '@/api/api';
import { FaPlus } from 'react-icons/fa';

function PostManager() {
    const [posts, setPosts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postManager = await apiGetAllPost();
                setPosts(postManager.data.posts);
            } catch (error) {
                console.error("Không thể lấy bài viết:", error);
            }
        };

        fetchPosts();
    }, []);

    const handleEdit = (post) => {
        setIsEditing(true);
        setIsCreating(false);
        setCurrentPost(post);
    };

    const handleDelete = async (postId) => {
        try {
            await apiDeletePost(postId);
            setPosts(posts.filter(post => post._id !== postId));
        } catch (error) {
            console.error("Không thể xóa bài viết:", error);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            let updatedPost = { ...currentPost };

            if (avatarFile) {
                const reader = new FileReader();
                reader.onload = async (event) => {
                    updatedPost.image = event.target.result;
                    await savePost(updatedPost);
                };
                reader.readAsDataURL(avatarFile);
            } else {
                await savePost(updatedPost);
            }
        } catch (error) {
            console.error("Không thể cập nhật bài viết:", error);
        }
    };

    const savePost = async (post) => {
        try {
            if (isCreating) {
                const response = await apiCreatePost(post);
                setPosts([...posts, response.data]);
                setIsCreating(false);
            } else {
                const response = await apiUpdatePost(post._id, post);
                setPosts(posts.map(p => (p._id === post._id ? response.data : p)));
                setIsEditing(false);
            }
            setAvatarFile(null);
            setCurrentPost(null);
        } catch (error) {
            console.error("Không thể lưu bài viết:", error);
        }
    };

    const handleCreate = () => {
        setIsCreating(true);
        setIsEditing(false);
        setCurrentPost({ title: '', content: '', description: '', image: '', author: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentPost({ ...currentPost, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
        }
    };

    return (
        <div className="post-management-table">
            <h2>Quản lý bài viết</h2>
            {!isEditing && !isCreating && (
                <button className="create-button" onClick={handleCreate}>
                    <FaPlus /> Tạo
                </button>
            )}
            {(isEditing || isCreating) && (
                <div className="edit-form">
                    <h3>{isCreating ? 'Tạo bài viết' : 'Chỉnh sửa bài viết'}</h3>
                    <form onSubmit={handleSave}>
                        <label>
                            Tiêu đề:
                            <input
                                type="text"
                                name="title"
                                value={currentPost.title}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Nội dung:
                            <textarea
                                name="content"
                                value={currentPost.content}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Mô tả:
                            <textarea
                                name="description"
                                value={currentPost.description}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Tác giả:
                            <input
                                type="text"
                                name="author"
                                value={currentPost.author}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Ảnh:
                            <input
                                type="file"
                                onChange={handleFileChange}
                            />
                        </label>
                        <button type="submit" className="save-button">
                            Lưu
                        </button>
                        <button type="button" className="cancel-button" onClick={() => { setIsEditing(false); setIsCreating(false); }}>
                            Hủy
                        </button>
                    </form>
                </div>
            )}
            {!isEditing && !isCreating && (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Ảnh</th>
                            <th>Tiêu đề</th>
                            <th>Nội dung</th>
                            <th>Mô tả</th>
                            <th>Tác giả</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts && posts.map((post) => (
                            <tr key={post._id}>
                                <td><img src={post.image || ''} alt={post.title || ''} /></td>
                                <td>{post.title || ''}</td>
                                <td>{post.content || ''}</td>
                                <td>{post.description || ''}</td>
                                <td>{post.author || ''}</td>
                                <td>
                                    <button onClick={() => handleEdit(post)} className="btn btn-link">
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button onClick={() => handleDelete(post._id)} className="btn btn-link btn-delete">
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default PostManager;

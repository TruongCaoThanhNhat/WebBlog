import React, { useState, useEffect } from 'react';
import './categoryManager.scss';
import { apiGetAllCategory, apiUpdateCategory, apiDeleteCategory, apiCreateCategory } from '@/api/api';
import { FaPlus } from 'react-icons/fa';

function CategoryManager() {
    const [categories, setCategories] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({ name: '' });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await apiGetAllCategory();
                setCategories(response.data.categories);
            } catch (error) {
                console.error("Không thể lấy danh mục:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleEdit = (category) => {
        setIsEditing(true);
        setIsCreating(false);
        setCurrentCategory(category);
    };

    const handleDelete = async (categoryId) => {
        try {
            await apiDeleteCategory(categoryId);
            setCategories(categories.filter(category => category._id !== categoryId));
        } catch (error) {
            console.error("Không thể xóa danh mục:", error);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (isCreating) {
                const response = await apiCreateCategory(currentCategory);
                setCategories([...categories, response]); // Thêm category mới vào danh sách hiện tại
                setIsCreating(false);
            } else {
                const response = await apiUpdateCategory(currentCategory._id, currentCategory);
                setCategories(categories.map(c => (c._id === currentCategory._id ? response : c)));
                setIsEditing(false);
            }
            setCurrentCategory({ name: '' });
        } catch (error) {
            console.error("Không thể lưu danh mục:", error);
        }
    };
    
    const handleCreate = () => {
        setIsCreating(true);
        setIsEditing(false);
        setCurrentCategory({ name: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentCategory({ ...currentCategory, [name]: value });
    };

    return (
        <div className="category-management-table">
            <h2>Quản lý danh mục</h2>
            {!isEditing && !isCreating && (
                <button className="create-button" onClick={handleCreate}>
                    <FaPlus /> Create
                </button>
            )}
            {(isEditing || isCreating) && (
                <div className="edit-form">
                    <h3>{isCreating ? 'Tạo danh mục' : 'Chỉnh sửa danh mục'}</h3>
                    <form onSubmit={handleSave}>
                        <label>
                            Tên:
                            <input
                                type="text"
                                name="name"
                                value={currentCategory.name}
                                onChange={handleChange}
                                required
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
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category._id}>
                                <td>{category.name}</td>
                                <td>
                                    <button onClick={() => handleEdit(category)} className="btn btn-link">
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button onClick={() => handleDelete(category._id)} className="btn btn-link btn-delete">
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

export default CategoryManager;

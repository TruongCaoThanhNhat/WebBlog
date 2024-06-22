import React, { useState, useEffect } from 'react';
import './categoryManager.scss';
import { apiGetAllCategory, apiUpdateCategory, apiDeleteCategory } from '@/api/api';

function CategoryManager() {
    const [categories, setCategories] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoryManager = await apiGetAllCategory();
                setCategories(categoryManager.data.categories);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleEdit = (category) => {
        setIsEditing(true);
        setCurrentCategory(category);
    };

    const handleDelete = async (categoryId) => {
        try {
            await apiDeleteCategory(categoryId);
            setCategories(categories.filter(category => category._id !== categoryId));
        } catch (error) {
            console.error("Failed to delete category:", error);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await apiUpdateCategory(currentCategory._id, currentCategory);
            setCategories(categories.map(c => (c._id === currentCategory._id ? response.data : c)));
            setIsEditing(false);
            setCurrentCategory(null);
        } catch (error) {
            console.error("Failed to update category:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentCategory({ ...currentCategory, [name]: value });
    };

    return (
        <div className="category-management-table">
            <h2>Quản lý chuyên mục</h2>
            {isEditing ? (
                <div className="edit-form">
                    <h3>Edit Category</h3>
                    <form onSubmit={handleSave}>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={currentCategory.name}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <button type="submit" className="save-button">
                            Save
                        </button>
                        <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                    </form>
                </div>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories && categories.map((category) => (
                            <tr key={category._id}>
                                <td>{category.name || ''}</td>
                                <td>
                                    <button onClick={() => handleEdit(category)} className="btn btn-link">
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button onClick={() => handleDelete(category._id)} className="btn btn-link">
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

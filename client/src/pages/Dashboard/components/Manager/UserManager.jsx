import React, { useState, useEffect } from 'react';
import './userManager.scss';
import { apiGetAllUserAdmin, apiUpdateUser, apiDeleteUser } from '@/api/api';

function UserManager() {
    const [users, setUsers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userManager = await apiGetAllUserAdmin();
                setUsers(userManager.data.users);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        setIsEditing(true);
        setCurrentUser(user);
    };

    const handleDelete = async (userId) => {
        try {
            await apiDeleteUser(userId);
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            let updatedUser = { ...currentUser };

            if (avatarFile) {
                const reader = new FileReader();
                reader.onload = async (event) => {
                    updatedUser.avatar = event.target.result;
                    await saveUser(updatedUser);
                };
                reader.readAsDataURL(avatarFile);
            } else {
                await saveUser(updatedUser);
            }
        } catch (error) {
            console.error("Failed to update user:", error);
        }
    };

    const saveUser = async (user) => {
        try {
            const response = await apiUpdateUser(user._id, user);
            setUsers(users.map(u => (u._id === user._id ? response.data : u)));
            setIsEditing(false);
            setAvatarFile(null);
            setCurrentUser(null);
        } catch (error) {
            console.error("Failed to save user:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser({ ...currentUser, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
        }
    };

    return (
        <div className="user-management-table">
            <h2>Quản lý người dùng</h2>
            {isEditing ? (
                <div className="edit-form">
                    <h3>Edit User</h3>
                    <form onSubmit={handleSave}>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="userName"
                                value={currentUser.userName}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="text"
                                name="email"
                                value={currentUser.email}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Mobile:
                            <input
                                type="text"
                                name="mobile"
                                value={currentUser.mobile}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Address:
                            <input
                                type="text"
                                name="address"
                                value={currentUser.address}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Avatar:
                            <input
                                type="file"
                                onChange={handleFileChange}
                            />
                        </label>
                        <button type="submit" className="save-button">
                            Lưu
                        </button>
                        <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>
                            Hủy
                        </button>
                    </form>
                </div>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map((user) => (
                            <tr key={user._id}>
                                <td><img src={user.avatar || ''} alt={user.userName || ''} /></td>
                                <td>{user.userName || ''}</td>
                                <td>{user.email || ''}</td>
                                <td>{user.mobile || ''}</td>
                                <td>{user.address || ''}</td>
                                <td>
                                    <button onClick={() => handleEdit(user)} className="btn btn-link">
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button onClick={() => handleDelete(user._id)} className="btn btn-link">
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

export default UserManager;

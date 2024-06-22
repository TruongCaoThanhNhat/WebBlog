import React, { useState } from 'react'
import './postManager.scss'

function PostManager() {
    const [users, setUsers] = useState([
        {
            id: 1,
            avatar: 'https://via.placeholder.com/50',
            name: 'John Doe',
            date: '2023-06-01',
            postTitle: 'First Post'
        },
        {
            id: 2,
            avatar: 'https://via.placeholder.com/50',
            name: 'Jane Smith',
            date: '2023-06-05',
            postTitle: 'Second Post'
        },
        {
            id: 3,
            avatar: 'https://via.placeholder.com/50',
            name: 'Sam Wilson',
            date: '2023-06-10',
            postTitle: 'Third Post'
        }
    ]);

    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);

    const handleEdit = (user) => {
        setIsEditing(true);
        setCurrentUser(user);
    };

    const handleDelete = (userId) => {
        setUsers(users.filter(user => user.id !== userId));
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (avatarFile) {
            // Upload avatar file logic (e.g., using FormData or uploading to server)
            // For demonstration, let's assume we're updating the avatar URL directly
            const reader = new FileReader();
            reader.onload = function (event) {
                setCurrentUser({ ...currentUser, avatar: event.target.result });
                setUsers(users.map(user => (user.id === currentUser.id ? { ...user, avatar: event.target.result } : user)));
                setIsEditing(false);
                setAvatarFile(null);
            };
            reader.readAsDataURL(avatarFile);
        } else {
            setUsers(users.map(user => (user.id === currentUser.id ? currentUser : user)));
            setIsEditing(false);
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
            <h2>Quản lý bài đăng</h2>
            {isEditing ? (
                <div className="edit-form">
                    <h3>Chỉnh sửa bài đăng</h3>
                    <form onSubmit={handleSave}>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={currentUser.name}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Date:
                            <input
                                type="date"
                                name="date"
                                value={currentUser.date}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Post Title:
                            <input
                                type="text"
                                name="postTitle"
                                value={currentUser.postTitle}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Current Avatar:
                            <img src={currentUser.avatar} alt={currentUser.name} />
                        </label>
                        <label>
                            New Avatar:
                            <div className="file-input">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                <label>Choose File</label>
                            </div>
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
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Post Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td><img src={user.avatar} alt={user.name} /></td>
                                <td>{user.name}</td>
                                <td>{user.date}</td>
                                <td>{user.postTitle}</td>
                                <td>
                                    <button onClick={() => handleEdit(user)} className="btn btn-link">
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button onClick={() => handleDelete(user.id)} className="btn btn-link">
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

export default PostManager
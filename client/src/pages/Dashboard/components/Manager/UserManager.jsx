import React from 'react';
import './userManager.scss';

function UserManager() {
    const users = [
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
    ];

    const handleEdit = (userId) => {
        // Xử lý logic sửa người dùng ở đây
        console.log('Edit user with ID:', userId);
    };

    const handleDelete = (userId) => {
        // Xử lý logic xóa người dùng ở đây
        console.log('Delete user with ID:', userId);
    };

    return (
        <div className="user-management-table">
            <h2>User Management</h2>
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
                                <button onClick={() => handleEdit(user.id)} className="btn btn-link">
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
        </div>
    );
}

export default UserManager;

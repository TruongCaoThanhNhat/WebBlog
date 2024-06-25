import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './searchresult.scss';
import { apiGetSearch } from '@/api/api'; // Đảm bảo import API từ đúng đường dẫn

const SearchResults = () => {
    const location = useLocation();
    const [results, setResults] = useState({ posts: [], users: [] });
    const query = new URLSearchParams(location.search).get('q'); // Lấy giá trị của tham số 'q' từ URL

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                if (query) {
                    const data = await apiGetSearch(query);
                    setResults(data.data || { posts: [], users: [] }); // Đảm bảo data không null/undefined
                } else {
                    setResults({ posts: [], users: [] });
                }
            } catch (error) {
                console.error('Error fetching search results', error);
                setResults({ posts: [], users: [] });
            }
        };

        fetchSearchResults(); // Gọi hàm fetchSearchResults mỗi khi query thay đổi

    }, [query]); // Đặt query là dependency để useEffect gọi lại khi query thay đổi

    console.log('Current query:', query); // Log giá trị của query để debug
    console.log('Current results:', results); // Log giá trị của results để debug

    return (
        <div className="search-results">
            <h2>Kết quả tìm kiếm cho "{query}"</h2>
            <div className="results">
                <div className="posts">
                    <h3>Bài viết</h3>
                    {results.posts && results.posts.length > 0 ? (
                        results.posts.map(post => (
                            <div key={post._id} className="post-item">
                                <img src={post.img} alt={post.title} />
                                <div className="post-info">
                                    <h4>{post.title}</h4>
                                    <p>{post.desc}</p>
                                    <Link to={`/post/${post._id}`}>Đọc thêm</Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Không có bài viết nào.</p>
                    )}
                </div>
                <div className="users">
                    <h3>Người dùng</h3>
                    {results.users && results.users.length > 0 ? (
                        results.users.map(user => (
                            <div key={user._id} className="user-item">
                                <img src={user.avatar} alt={user.displayName} />
                                <div className="user-info">
                                    <h4>{user.displayName}</h4>
                                    <Link to={`/user/${user.userName}`}>Xem trang cá nhân</Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Không có người dùng nào.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchResults;

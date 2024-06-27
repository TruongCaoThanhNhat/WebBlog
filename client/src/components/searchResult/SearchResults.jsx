import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './searchresult.scss';
import { apiGetSearch } from '@/api/api'; // Đảm bảo import API từ đúng đường dẫn

const SearchResults = () => {
    const location = useLocation(); // Hook để lấy thông tin về địa chỉ URL hiện tại
    const navigate = useNavigate(); // Hook để điều hướng qua các route trong ứng dụng
    const [results, setResults] = useState({ posts: [], users: [] }); // State lưu trữ kết quả tìm kiếm
    const [suggestions, setSuggestions] = useState([]); // State lưu trữ gợi ý từ khóa tìm kiếm
    const [searchType, setSearchType] = useState('posts'); // State lưu trữ loại tìm kiếm ('posts' hoặc 'users')
    const [query, setQuery] = useState(new URLSearchParams(location.search).get('q') || ''); // State lưu trữ từ khóa tìm kiếm từ URL

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                if (query) {
                    const data = await apiGetSearch(query); // Gọi API để lấy kết quả tìm kiếm dựa trên từ khóa
                    setResults(data.data || { posts: [], users: [] }); // Cập nhật kết quả vào state
                } else {
                    setResults({ posts: [], users: [] }); // Nếu không có từ khóa, đặt kết quả là rỗng
                }
            } catch (error) {
                console.error('Error fetching search results', error);
                setResults({ posts: [], users: [] }); 
            }
        };
    
        fetchSearchResults(); 
    }, [query]); 
    

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setQuery(value); // Cập nhật từ khóa tìm kiếm vào state
        if (value) {
            try {
                const response = await axios.get(`/api/suggestions?q=${value}`); // Gọi API để lấy gợi ý từ khóa tìm kiếm
                setSuggestions(response.data.suggestions || []); // Cập nhật gợi ý vào state
            } catch (error) {
                console.error('Error fetching suggestions', error);
                setSuggestions([]); // Xử lý lỗi nếu gặp phải khi lấy gợi ý từ API
            }
        }
    };
    

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion); // Cập nhật từ khóa tìm kiếm với từ khóa gợi ý đã chọn
        setSuggestions([]); // Đóng danh sách gợi ý
        navigate(`/search?q=${suggestion}`); // Điều hướng đến trang tìm kiếm với từ khóa đã chọn
    };
    

    return (
        <div className="search-results">
            {/* Hiển thị gợi ý từ khóa tìm kiếm */}
            {suggestions.length > 0 && (
                <div className="suggestions">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="suggestion-item"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
            {/* Hiển thị kết quả tìm kiếm dựa trên từ khóa */}
            <h1 className="text-search">Kết quả tìm kiếm cho "{query}"</h1>
            {/* Lựa chọn loại tìm kiếm (Bài viết hoặc Người dùng) */}
            <div className="search-type">
                <div className={`search-option ${searchType === 'posts' ? 'active' : ''}`} onClick={() => setSearchType('posts')}>
                    Bài viết
                </div>
                <div className={`search-option ${searchType === 'users' ? 'active' : ''}`} onClick={() => setSearchType('users')}>
                    Người dùng
                </div>
            </div>
            {/* Hiển thị kết quả tìm kiếm theo loại đã chọn */}
            <div className="results">
                {searchType === 'posts' && (
                    <div className="posts">
                        {results.posts && results.posts.length > 0 ? (
                            results.posts.map(post => (
                                <div key={post._id} className="post-item">
                                    <img src={post.image} className="post-image" />
                                    <div className="post-info">
                                        {/* <h4>{post.title}</h4> */}
                                        <h4><Link to={`/post/${post.slug}`}>{post.title}</Link></h4>
                                        <p>{post.description}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-result">Không có bài viết nào.</p>
                        )}
                    </div>
                )}
                {searchType === 'users' && (
                    <div className="users">
                        {results.users && results.users.length > 0 ? (
                            results.users.map(user => (
                                <div key={user._id} className="user-item">
                                    <img src={user.avatar} alt={user.displayName} />
                                    <div className="user-info">
                                        <h4><Link to={`/user/${user.userName}`}>{user.displayName}</Link></h4>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-result">Không có người dùng nào.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
    

export default SearchResults;

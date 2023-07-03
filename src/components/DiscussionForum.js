import React, { useContext, useState } from 'react';
import PostsContext from '../Contexts/PostsContext';
import { UserContext } from '../Contexts/UserContext';
import { AdminContext } from '../Contexts/AdminContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const DiscussionForum = () => {
    const { posts, setPosts, addPost, deletePost, addReply } = useContext(PostsContext);
    const { loggedInUser } = useContext(UserContext);
    const { adminIsLoggedIn } = useContext(AdminContext);
    const [newPostContent, setNewPostContent] = useState('');
    const [newReplyContent, setNewReplyContent] = useState({});
    const [replyToPostId, setReplyToPostId] = useState(null);
    const [showRepliesId, setShowRepliesId] = useState(null);

    const handleNewPostChange = (event) => {
        setNewPostContent(event.target.value);
    };

    const handleNewPostSubmit = (event) => {
        event.preventDefault();
        if (loggedInUser || adminIsLoggedIn) {
            const authorName = adminIsLoggedIn ? 'ADMIN' : loggedInUser?.username;
            addPost(loggedInUser?.id, authorName, newPostContent);
            setNewPostContent('');
        }
    };

    const handleNewReplyChange = (event) => {
        setNewReplyContent({
            ...newReplyContent,
            [replyToPostId]: event.target.value,
        });
    };

    const handleNewReplySubmit = (event) => {
        event.preventDefault();
        if (loggedInUser && replyToPostId) {
            addReply(
                replyToPostId,
                loggedInUser.id,
                loggedInUser.username,
                newReplyContent[replyToPostId]
            );
            setNewReplyContent({ ...newReplyContent, [replyToPostId]: '' });
        }
    };

    const handleReplyToPost = (postId) => {
        setReplyToPostId(postId);
    };

    const handleShowHideReplies = (postId) => {
        if (postId === showRepliesId) {
            setShowRepliesId(null);
        } else {
            setShowRepliesId(postId);
        }
    };

    const handleDeletePost = (postId) => {
        deletePost(postId);
    };

    const handleDeleteReply = (postId, replyId) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) => {
                if (post.id === postId) {
                    post.replies = post.replies.filter((reply) => reply.id !== replyId);
                }
                return post;
            })
        );
    };

    const renderReplies = (replies, postId) => {
        const visibleReplies =
            showRepliesId === postId ? replies : replies.slice(Math.max(replies.length - 1, 0));
        return visibleReplies.map((reply) => (
            <div key={reply.id}>
                <h6>{reply.authorName}</h6>
                <p>
                    {reply.isDeletedByAdmin
                        ? '(the message has been deleted by the administrator)'
                        : reply.content}
                </p>
                {loggedInUser && loggedInUser.id === reply.authorId && (
                    <button
                        onClick={() => handleDeleteReply(postId, reply.id)}
                        className="btn btn-danger btn-sm"
                    >
                        Delete
                    </button>
                )}
            </div>
        ));
    };

    const renderPostContent = (post) => {
        if (post.isDeletedByAdmin) {
            return <p>(The post has been deleted by the administrator)</p>;
        } else {
            return <p>{post.content}</p>;
        }
    };

    return (
        <div className="container py-3">
            <h3 className="mb-3">Discussion</h3>
            <form onSubmit={handleNewPostSubmit} className="mb-3">
                <textarea
                    value={newPostContent}
                    placeholder="Your post"
                    onChange={handleNewPostChange}
                    className="form-control mb-2"
                />
                <button type="submit" className="btn btn-primary">
                    Send
                </button>
            </form>
            {posts.map((post) => {
                const renderMoreCommentsButton = () => {
                    const commentsCount = post.replies.length;
                    if (commentsCount > 1) {
                        return (
                            <button
                                onClick={() => handleShowHideReplies(post.id)}
                                className="btn btn-info btn-sm"
                            >
                                {showRepliesId === post.id ? 'Hide' : `Show more (${commentsCount})`}
                            </button>
                        );
                    } else {
                        return null;
                    }
                };

                return (
                    <div key={post.id} className="card mb-2">
                        <div className="card-header">
                            <h5>{post.authorName}</h5>
                        </div>
                        <div className="card-body">
                            {renderPostContent(post)}
                            {(loggedInUser && loggedInUser.id === post.authorId && !adminIsLoggedIn) && (
                                <button
                                    onClick={() => handleDeletePost(post.id)}
                                    className="btn btn-danger btn-sm mr-2"
                                >
                                    Delete post
                                </button>
                            )}
                            {loggedInUser && (
                                <button
                                    onClick={() => handleReplyToPost(post.id)}
                                    className="btn btn-secondary btn-sm mr-2"
                                >
                                    Reply
                                </button>
                            )}
                            {renderMoreCommentsButton()}
                            {renderReplies(post.replies, post.id)}
                        </div>
                        {replyToPostId === post.id && (
                            <div className="card-footer">
                                <form onSubmit={handleNewReplySubmit}>
                                    <textarea
                                        value={newReplyContent[replyToPostId] || ''}
                                        placeholder="Your comment"
                                        onChange={handleNewReplyChange}
                                        className="form-control mb-2"
                                    />
                                    <button type="submit" className="btn btn-primary btn-sm">
                                        Reply
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default DiscussionForum;

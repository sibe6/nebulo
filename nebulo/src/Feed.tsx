
import './css/Feed.css';
import './css/Animations.css';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from './AuthContext';
import { useAuthFetch } from './useAuthFetch';
import { formatDate } from './Helpers';

interface Post {
  _id: number;
  username: string;
  content: string;
  createdAt: string;
}

const Feed = () => {
  const { token } = useAuth();
  const authFetch = useAuthFetch();
  const [newPost, setNewPost] = useState("")
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  let role = null;
  let username = null;

  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      role = decoded.role;
      username = decoded.username;
      console.log('Role:', role);
    } catch (e) {
      console.error('Failed to decode token');
    }
  }

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(() => {
      fetchPosts();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNewPost = () => {
    if (newPost.length > 400) {
      alert("Post is too long");
    } else if (newPost.length > 0) {
      publishPost();
    } else {
      alert("Post cannot be empty");
    }
  };

  const fetchPosts = async () => {
    let url = '/api/feed/posts';

    if (posts.length > 0) {
      url += `?after=${posts[0]._id}`;
    }

    const res = await authFetch(url);

    if (res.ok) {
      const data = await res.json();
      if (data.length > 0) {
        setPosts((prevPosts) => {
          const newPosts: Post[] = data.filter((post: Post) => !prevPosts.some((p: Post) => p._id === post._id));
          return [...newPosts, ...prevPosts];
        });
      }
    } else {
      console.error("Failed to fetch posts:", await res.text());
    }
  };

  const publishPost = async () => {
    setLoading(true);
    try {
      const res = await authFetch('/api/feed/newPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newPost,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setNewPost("");
        setPosts((prevPosts) => [data, ...prevPosts]);
      } else {
        alert(`Failed to post: ${await res.text()}`);
      }
    } catch (e) {
      console.error('Failed to post content:', e);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId: number) => {
    setLoading(true);
    try {
      const res = await authFetch(`/api/feed/deletePost/${postId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      } else {
        alert(`Failed to delete post: ${await res.text()}`);
      }
    } catch (e) {
      console.error('Failed to delete post:', e);
    } finally {
      setLoading(false);
    }
  };

  interface PostProps {
    post: Post;
  }

  const Post: React.FC<PostProps> = ({ post }) => {
    return (
      <div className="post">
        {role === "admin" ? (
          <>
            <div className="post-header">
              <p onClick={() => deletePost(post._id)}>Delete</p>
            </div>
            <div className='post-content'>
                {post.content}
            </div>
          </>
        ) : (
          <div className='post-content padding-top'>
              {post.content}
          </div>
        )}
        <div className='post-meta'>
            <p className='post-date'>{formatDate(post.createdAt)}</p>
            <p className='post-username'>- {post.username}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="feed-wrapper">
        <div className='posts-wrapper'>
          <div className="posts">
            {posts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </div>
        </div>
        <div>
          <div className="new-post">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Write your post..."
            ></textarea>
            <button onClick={() => handleNewPost()}>
              {loading ? <span className="loading-dots"><span>.</span><span>.</span><span>.</span></span> : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Feed;

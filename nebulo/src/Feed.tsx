
import './css/Feed.css';
import { useState } from 'react';

const Feed = () => {
  const [newPost, setNewPost] = useState("")

  const posts = [
      {
        id: 1,
        username: "user1",
        content: "This is the first post very long content that should be truncated as it is too long to fit in the box",
      },
      {
        id: 2,
        username: "sibe",
        content: "This is the first post very long content that should be truncated as it is too long to fit in the box",
      },
      {
        id: 3,
        username: "sibe",
        content: "This is the second post",
      },
      {
        id: 4,
        username: "sibe",
        content: "This is the second post",
      },
      {
        id: 5,
        username: "sibe",
        content: "This is the second post",
      },
      {
        id: 6,
        username: "sibe",
        content: "This is the second post",
      },
      {
        id: 7,
        username: "sibe",
        content: "This is the second post",
      },
      {
        id: 8,
        username: "sibe",
        content: "This is the second post",
      },
      {
        id: 9,
        username: "sibe",
        content: "This is the second post",
      },
      {
        id: 10,
        username: "sibe",
        content: "This is the second post",
      },
      {
        id: 11,
        username: "sibe",
        content: "This is thesecond post",
      },
      {
        id: 12,
        username: "sibe",
        content: "This is the second post",
      },
      {
        id: 13,
        username: "sibe",
        content: "This is the second post",
      },
      {
        id: 14,
        username: "sibe",
        content: "This is thesecond post",
      },
      {
        id: 15,
        username: "sibe",
        content: "This is the second post",
      },
      {
        id: 16,
        username: "sibe",
        content: "This is the second post",
      },
    ]

  type PostProps = {
    post: {
      id: number;
      username: string;
      content: string;
    };
  };

  const Post: React.FC<PostProps> = ({ post }) => {
    return (
      <div className="post">
        <div className='post-content'>
            {post.content}
        </div>
        <div className='post-meta'>
            <p className='post-date'>2023-10-01</p>
            <p className='post-username'>- {post.username}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="feed-wrapper">
        <div className="posts">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
        <div>
          <div className="new-post">
            <textarea placeholder="Write your post..."></textarea>
            <button>Post</button>
          </div>
        </div>
      </div>
    </>
  )}


export default Feed;
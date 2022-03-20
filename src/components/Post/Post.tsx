import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import GQL_DELETE_POST from '../../graphql/mutations/delete-post';
import './styles.css';

type PostProps = {
  post: {
    id: string;
    body: string;
    title: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
    };
  };
  authData: {
    userId: string;
  };
};

const Post = ({ post, authData }: PostProps) => {
  const [deletePost, { loading: loadingDelete, error: errorDelete }] =
    useMutation(GQL_DELETE_POST, {
      update: (cache) => {
        cache.modify({
          fields: {
            posts: (existing, { readField }) => {
              return existing.filter((postRef: any) => {
                const refId = readField('id', postRef);
                return post.id !== refId;
              });
            },
          },
        });
      },
    });

  const handleDeletePost = async (postId: string) => {
    const shouldBeDeleted = confirm('do you really want delete this post ?');

    if (shouldBeDeleted) {
      await deletePost({
        variables: {
          deletePostId: postId,
        },
      });

      if (errorDelete) {
        toast(errorDelete.message, {
          className: 'message',
        });
      }
    }
  };

  return (
    <li className="post" key={post.id}>
      <h3>{post.title}</h3>
      <p>
        {post.body.length >= 200 ? post.body.slice(0, 200) + '...' : post.body}
      </p>
      {post.user.id === authData.userId ? (
        <div className="control-buttons">
          <button
            disabled={loadingDelete}
            onClick={() => handleDeletePost(post.id)}
          >
            Delete
          </button>
          <Link to={`/edit-post/${post.id}`}>Edit</Link>
        </div>
      ) : (
        <></>
      )}
    </li>
  );
};

export default Post;

import { useMutation, useQuery } from '@apollo/client';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import GQL_DELETE_POST from '../../graphql/mutations/delete-post';
import GQL_GET_POST from '../../graphql/queries/get-post';
import { useAuthVar } from '../../graphql/reactive-vars/auth';
import LoadingComponent from '../Loading/Loading';
import './styles.css';

type PostDetails = {
  post: {
    id: string;
    body: string;
    title: string;
    comments: {
      comment: string;
    }[];
    user: {
      id: string;
      firstName: string;
      lastName: string;
    };
  };
};

const PostDetails = () => {
  const authData = useAuthVar();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading: loadingGet, data } = useQuery<PostDetails>(GQL_GET_POST, {
    variables: {
      postId: id,
    },
  });

  const [deletePost, { loading: loadingDelete, error: errorDelete }] =
    useMutation(GQL_DELETE_POST, {
      onCompleted: () => {
        navigate({ pathname: '/' });
      },
      update: (cache) => {
        cache.modify({
          fields: {
            posts: (existing, { readField }) => {
              return existing.filter((postRef: any) => {
                const refId = readField('id', postRef);
                return data?.post.id !== refId;
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

  if (loadingGet) {
    return <LoadingComponent />;
  }

  return (
    <div className="post-details-container">
      <div className="post">
        <h3>{data?.post.title}</h3>
        <p>{data?.post.body}</p>
        {data?.post.user.id === authData.userId ? (
          <div className="control-buttons">
            <button
              disabled={loadingDelete}
              onClick={() => handleDeletePost(data?.post.id)}
            >
              Delete
            </button>
            <Link to={`/edit-post/${data?.post.id}`}>Edit</Link>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="post-comments">
        <h3>Comments: </h3>
        {data?.post.comments.map((comment) => (
          <p className="comment" key={comment.comment}>
            {comment.comment}
          </p>
        ))}
      </div>
      <div className="post-create-comment">
        <h3>Send a commentary: </h3>
        <textarea></textarea>
        <button>Send</button>
      </div>
    </div>
  );
};

export default PostDetails;

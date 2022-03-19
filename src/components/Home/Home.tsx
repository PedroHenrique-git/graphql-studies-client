import { useMutation, useQuery } from '@apollo/client';
import toast from 'react-hot-toast';
import GQL_DELETE_POST from '../../graphql/mutations/delete-post';
import { GQL_GET_POSTS } from '../../graphql/queries/get-posts';
import { useAuthVar } from '../../graphql/reactive-vars/auth';
import LoadingComponent from '../Loading/Loading';
import Wrapper from '../Wrapper/Wrapper';
import './styles.css';

type Posts = {
  posts: {
    id: string;
    body: string;
    title: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
    };
  }[];
};

const Home = () => {
  const authData = useAuthVar();
  const { data, loading, error, fetchMore, previousData } = useQuery<Posts>(
    GQL_GET_POSTS,
    {
      notifyOnNetworkStatusChange: true,
    },
  );

  const [deletePost, { loading: loadingDelete, error: errorDelete }] =
    useMutation(GQL_DELETE_POST);

  const handleLoadMore = async () => {
    await fetchMore({
      variables: {
        start: data?.posts.length,
      },
    });
  };

  const handleDeletePost = async (postId: string) => {
    if (confirm('do you really want delete this post ?')) {
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

  if (loading && !previousData) {
    return <LoadingComponent />;
  }

  if (error) {
    toast(error.message, {
      className: 'message',
    });
  }

  return (
    <Wrapper hasFooter hasHeader>
      <ul className="posts-list">
        {data?.posts.map((post) => (
          <li className="post" key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            {post.user.id === authData.userId ? (
              <div className="control-buttons">
                <button
                  disabled={loadingDelete}
                  onClick={() => handleDeletePost(post.id)}
                >
                  Delete
                </button>
                <button>Edit</button>
              </div>
            ) : (
              <></>
            )}
          </li>
        ))}
      </ul>
      <button
        disabled={loading}
        className="load-more-btn"
        onClick={handleLoadMore}
      >
        {loading ? 'Loading...' : 'Load more'}
      </button>
    </Wrapper>
  );
};

export default Home;

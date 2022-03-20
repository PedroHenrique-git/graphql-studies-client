import { useQuery } from '@apollo/client';
import toast from 'react-hot-toast';
import LoadingComponent from '../../components/Loading/Loading';
import Post from '../../components/Post/Post';
import Wrapper from '../../components/Wrapper/Wrapper';
import { GQL_GET_POSTS } from '../../graphql/queries/get-posts';
import { useAuthVar } from '../../graphql/reactive-vars/auth';
import './styles.css';

type Posts = {
  posts: {
    id: string;
    body: string;
    title: string;
    numberOfComments: number;
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

  const handleLoadMore = async () => {
    await fetchMore({
      variables: {
        start: data?.posts.length,
      },
    });
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
          <Post post={post} authData={authData} key={post.id} />
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

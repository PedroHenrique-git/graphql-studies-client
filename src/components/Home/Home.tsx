import { useQuery } from '@apollo/client';
import toast from 'react-hot-toast';
import { GQL_GET_POSTS } from '../../graphql/queries/get-posts';
import LoadingComponent from '../Loading/Loading';
import Wrapper from '../Wrapper/Wrapper';
import './styles.css';

type Posts = {
  posts: {
    id: string;
    body: string;
    title: string;
    user: {
      firstName: string;
      lastName: string;
    };
  }[];
};

const Home = () => {
  const { data, loading, error, fetchMore } = useQuery<Posts>(GQL_GET_POSTS);

  const handleLoadMore = async () => {
    await fetchMore({
      variables: {
        start: data?.posts.length,
      },
    });
  };

  if (loading) {
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
          </li>
        ))}
      </ul>
      <button
        disabled={loading}
        className="load-more-btn"
        onClick={handleLoadMore}
      >
        Load more
      </button>
    </Wrapper>
  );
};

export default Home;

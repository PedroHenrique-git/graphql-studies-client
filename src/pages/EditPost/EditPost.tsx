import PostForm from '../../components/PostForm/PostForm';
import Wrapper from '../../components/Wrapper/Wrapper';

const EditPost = () => {
  return (
    <Wrapper hasFooter hasHeader>
      <PostForm isEdit />
    </Wrapper>
  );
};

export default EditPost;

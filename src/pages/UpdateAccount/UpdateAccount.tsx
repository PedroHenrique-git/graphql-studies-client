import UserForm from '../../components/UserForm/UserForm';
import Wrapper from '../../components/Wrapper/Wrapper';

const UpdateAccount = () => {
  return (
    <Wrapper hasFooter hasHeader>
      <UserForm isEdit />
    </Wrapper>
  );
};

export default UpdateAccount;

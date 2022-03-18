import { ApolloProvider } from '@apollo/client';
import { Toaster } from 'react-hot-toast';
import { client } from './graphql/apollo/client';
import MyRoutes from './routes/MyRoutes';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <MyRoutes />
      <Toaster />
    </ApolloProvider>
  );
};

export default App;

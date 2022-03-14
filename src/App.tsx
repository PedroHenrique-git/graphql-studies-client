import { ApolloProvider } from '@apollo/client';
import Index from './components/Index/Index';
import { client } from './graphql/apollo/client';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Index />
    </ApolloProvider>
  );
};

export default App;

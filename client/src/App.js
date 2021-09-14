import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import ProductList from "components/productList";
import "./App.css";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1 className="display-1">G.P Electric</h1>
        <ProductList />
      </div>
    </ApolloProvider>
  );
}

export default App;

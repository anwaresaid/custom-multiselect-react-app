import MultiSelect from "./components/MultiSelect";
import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <h1> Multi Select Case Study</h1>
        <h3>using rick and morty api</h3>
        <h3>
          creator: <strong>Anwar Esaid</strong>
        </h3>
        <MultiSelect placeholder={"Enter key word"} />
      </div>
    </ApolloProvider>
  );
}

export default App;

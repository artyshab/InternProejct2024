import { ApolloProvider } from "@apollo/client";
import AppRoutes from "./AppRoutes";
import "./design/Main.scss";
import client from "./graphql/client";

function App() {
  return (
    <>
    <ApolloProvider client={client}>
      <AppRoutes />
    </ApolloProvider>
      
    </>
  );
}

export default App;

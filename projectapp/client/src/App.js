import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Home from './pages/Home';
import Stock from './pages/Stocks';
import NotFound from './pages/NotFound';
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        members: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        stocks: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const member = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={member}>
        <Router>
          <Header />
          <div className='container'>
            <Routes>
               <Route  path="/login" element={<Login />}/>
              <Route  path="/signup"element={<Signup />}/>
              <Route path='/' element={<Home />} />
              <Route path='/stocks/:id' element={<Stock />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;

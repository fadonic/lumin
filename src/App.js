import ApolloClient from 'apollo-boost'
import { Component } from 'react'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import store from './store'
import ProductContainer from './components/ProductContainer'
import Cart from './components/Cart'
import Navbar from './components/Navbar'

const client = new ApolloClient({
  uri: 'https://pangaea-interviews.now.sh/api/graphql'
})

class App extends Component {
  render () {
    let defaultCurrency = 'NGN'
    localStorage.setItem('currency', defaultCurrency)
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Cart />
          <Navbar />
          <ProductContainer currency={defaultCurrency} />
        </ApolloProvider>
      </Provider>
    )
  }
}

export default App

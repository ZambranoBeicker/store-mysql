import { checkSubscriber, fetchData, initSubscriber } from './helpers'

export default {
  subscriber: null,
  searchButton: null,

  initialize(subscriber, button) {
    this.subscriber = initSubscriber(this.subscriber, subscriber)
    this.searchButton = initSubscriber(this.searchButton, button)
  },

  addEventListener(showResults) {
    checkSubscriber(this.subscriber)
    const url = 'https://mysql-store-app.herokuapp.com/product?search='

    this.subscriber.addEventListener('keyup', (event) => {
      event.preventDefault()
      const value = event.target.value

      if (event.keyCode === 13) {
        fetchData(url + value).then((products) => {
          showResults(products.data)
        })
      }
    })
    this.searchButton.addEventListener('click', () => {
      fetchData(url + this.subscriber.value).then((products) => {
        showResults(products.data)
      })
    })
  },
}

import { checkSubscriber, fetchData, initSubscriber } from './helpers'

//TODO: Trigger the same event for the button next to thi input
export default {
  subscriber: null,

  initialize(subscriber) {
    this.subscriber = initSubscriber(this.subscriber, subscriber)
  },

  addEventListener(showResults) {
    checkSubscriber(this.subscriber)
    this.subscriber.addEventListener('keyup', (event) => {
      event.preventDefault()
      const value = event.target.value

      if (event.keyCode === 13) {
        fetchData(
          'https://mysql-store-app.herokuapp.com/product?search=' + value
        ).then((products) => {
          showResults(products.data)
        })
      }
    })
  },
}

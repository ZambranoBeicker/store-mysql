import {
  printLoadingFeedback,
  printResults,
  fetchData,
  checkSubscriber,
  printCardList,
  initSubscriber,
} from './helpers'

export const products = {
  subscriber: null,
  initialize(subscriber) {
    this.subscriber = initSubscriber(this.subscriber, subscriber)
  },
  showResults(results) {
    checkSubscriber(this.subscriber)
    this.subscriber.innerHTML = printResults(results)
  },
  firstPaint(products) {
    checkSubscriber(this.subscriber)
    this.showLoadingFeedback()
    fetchData('https://mysql-store-app.herokuapp.com/category').then((res) => {
      this.subscriber.innerHTML = ''
      res.data.forEach((category) => {
        this.subscriber.innerHTML += printCardList(
          category.name,
          category.id,
          products
        )
      })
    })
  },

  showLoadingFeedback() {
    checkSubscriber(this.subscriber)
    this.subscriber.innerHTML = printLoadingFeedback()
  },
}

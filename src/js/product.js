import {
  printLoadingFeedback,
  printResults,
  fetchData,
  checkSubscriber,
  printCardList,
  initSubscriber,
} from './helpers'

//Set all the actions we can do with products
export const products = {
  subscriber: null,
  initialize(subscriber) {
    this.subscriber = initSubscriber(this.subscriber, subscriber)
  },
  //Set how the products data will be shown
  showResults(results) {
    checkSubscriber(this.subscriber)
    this.subscriber.innerHTML = printResults(results)
  },
  //Set what will happen after the page load
  //Fetch data and show every product ordered by categories
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

  //A function to show a loading feedback to the user
  showLoadingFeedback() {
    checkSubscriber(this.subscriber)
    this.subscriber.innerHTML = printLoadingFeedback()
  },
}

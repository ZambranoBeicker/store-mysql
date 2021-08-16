import { checkSubscriber, fetchData, initSubscriber } from './helpers'

export default {
  subscriber: null,
  searchButton: null,
  searchSuggestions: null,

  initialize(subscriber, button, suggestions) {
    this.subscriber = initSubscriber(this.subscriber, subscriber)
    this.searchButton = initSubscriber(this.searchButton, button)
    this.searchSuggestions = initSubscriber(this.searchSuggestions, suggestions)

    console.log('this is my suggestions: ', this.searchSuggestions)
    console.log('this is my subscriber: ', this.subscriber)
  },

  addEventListener(showResults, beforeFetch) {
    checkSubscriber(this.subscriber)
    const url = 'https://mysql-store-app.herokuapp.com/product?search='

    const switchSuggstionsVisibility = () => {
      if (this.searchSuggestions.classList.contains('display-none')) {
        this.searchSuggestions.classList.remove('display-none')
      } else {
        this.searchSuggestions.classList.add('display-none')
      }
    }

    this.subscriber.addEventListener('focus', switchSuggstionsVisibility, true)
    this.subscriber.addEventListener('blur', switchSuggstionsVisibility, true)

    this.subscriber.addEventListener('keyup', (event) => {
      event.preventDefault()
      const value = event.target.value

      if (event.keyCode === 13) {
        beforeFetch()
        fetchData(url + value).then((products) => {
          showResults(products.data)
        })
      }
    })
    this.searchButton.addEventListener('click', () => {
      beforeFetch()
      fetchData(url + this.subscriber.value).then((products) => {
        showResults(products.data)
      })
    })
  },
}

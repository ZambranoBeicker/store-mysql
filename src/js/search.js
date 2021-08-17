import {
  checkSubscriber,
  fetchData,
  initSubscriber,
  printCategorySuggestions,
} from './helpers'

export default {
  subscriber: null,
  searchButton: null,
  searchSuggestions: null,

  initialize(subscriber, button, suggestions) {
    this.subscriber = initSubscriber(this.subscriber, subscriber)
    this.searchButton = initSubscriber(this.searchButton, button)
    this.searchSuggestions = initSubscriber(this.searchSuggestions, suggestions)
  },

  addEventListener(showResults, beforeFetch) {
    checkSubscriber(this.subscriber)
    const url = 'https://mysql-store-app.herokuapp.com/'

    const switchSuggstionsVisibility = () => {
      this.searchSuggestions.classList.remove('display-none')
      fetchData(url + 'category').then((res) => {
        this.searchSuggestions.innerHTML = printCategorySuggestions(res.data)
        this.searchSuggestions.style.height = 'initial'
        Array.from(this.searchSuggestions.children).forEach((suggestion) => {
          suggestion.addEventListener(
            'click',
            (event) => {
              if (suggestion.nodeName === 'SPAN') {
                this.searchSuggestions.classList.add('display-none')
                return
              }

              const { id } = res.data.find(
                (item) => item.name === suggestion.innerText
              )
              console.log('this is the ID: ', id)
              fetchData(url + 'product?category=' + id).then((res) => {
                showResults(res.data)
              })
            },
            true
          )
        })
      })
    }

    this.subscriber.addEventListener('focus', switchSuggstionsVisibility, true)

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
      fetchData(url + 'product?search=' + this.subscriber.value).then(
        (products) => {
          showResults(products.data)
        }
      )
    })
  },
}

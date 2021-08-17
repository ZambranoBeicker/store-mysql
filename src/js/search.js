import {
  checkSubscriber,
  fetchData,
  initSubscriber,
  printCategorySuggestions,
  addEventToChildren,
} from './helpers'

export default {
  subscriber: null,
  searchButton: null,
  searchSuggestions: null,
  url: 'https://mysql-store-app.herokuapp.com/',

  initialize(subscriber, button, suggestions) {
    this.subscriber = initSubscriber(this.subscriber, subscriber)
    this.searchButton = initSubscriber(this.searchButton, button)
    this.searchSuggestions = initSubscriber(this.searchSuggestions, suggestions)
  },

  addEventListener(showResults, beforeFetch) {
    checkSubscriber(this.subscriber)

    this.subscriber.addEventListener(
      'focus',
      () => {
        this.searchSuggestions.classList.remove('display-none')
        fetchData(this.url + 'category').then((res) => {
          this.searchSuggestions.innerHTML = printCategorySuggestions(res.data)
          this.searchSuggestions.style.height = 'initial'

          addEventToChildren(
            Array.from(this.searchSuggestions.children),
            res.data,
            (suggestion, getId) => {
              this.closeSuggestionsOrShowResults(suggestion, 'SPAN', () => {
                const { id: categoryId } = getId()
                beforeFetch()
                fetchData(this.url + 'product?category=' + categoryId).then(
                  (res) => {
                    showResults(res.data)
                  }
                )
              })
            }
          )
        })
      },
      true
    )

    this.subscriber.addEventListener('keyup', (event) => {
      event.preventDefault()
      const value = event.target.value

      if (event.keyCode === 13) {
        beforeFetch()
        fetchData(this.url + 'product?search=' + value).then((products) => {
          showResults(products.data)
        })
      }
    })
    this.searchButton.addEventListener('click', () => {
      beforeFetch()
      fetchData(this.url + 'product?search=' + this.subscriber.value).then(
        (products) => {
          showResults(products.data)
        }
      )
    })
  },
  closeSuggestionsOrShowResults(suggestion, tag, show) {
    if (suggestion.nodeName === tag) {
      this.searchSuggestions.classList.add('display-none')
      return
    }
    show()
  },
}

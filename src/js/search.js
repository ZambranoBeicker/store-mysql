import {
  checkSubscriber,
  fetchData,
  initSubscriber,
  printCategorySuggestions,
  addEventToChildren,
} from './helpers'

//Set all the searching behaviors
export default {
  //These values will be used for all the data structure
  subscriber: null,
  searchButton: null,
  searchSuggestions: null,
  url: 'https://mysql-store-app.herokuapp.com/',

  //Set all my needed elements
  initialize(subscriber, button, suggestions) {
    this.subscriber = initSubscriber(this.subscriber, subscriber)
    this.searchButton = initSubscriber(this.searchButton, button)
    this.searchSuggestions = initSubscriber(this.searchSuggestions, suggestions)
  },

  //Add all my needed events
  addEventListener(showResults, beforeFetch) {
    checkSubscriber(this.subscriber)

    //A listener for showing the suggestions
    this.subscriber.addEventListener(
      'focus',
      () => {
        //Hide the suggestions and fetch categories to build buttons
        //with its corresponding name
        this.searchSuggestions.classList.remove('display-none')
        fetchData(this.url + 'category').then((res) => {
          this.searchSuggestions.innerHTML = printCategorySuggestions(res.data)
          this.searchSuggestions.style.height = 'initial'

          //Make the buttons (searchSuggestions children) change the results on click
          //using a helper function
          addEventToChildren(
            Array.from(this.searchSuggestions.children),
            res.data,
            (suggestion, getId) => {
              //Check if the child is the 'close' button and if it is,
              //do the corresponding action.
              this.closeSuggestionsOrShowResults(suggestion, 'SPAN', () => {
                //If not, just fetch data and show it into the results
                const categoryId = getId()
                const endpoint =
                  categoryId === 'All'
                    ? 'product'
                    : 'product?category=' + categoryId
                beforeFetch()
                fetchData(this.url + endpoint).then((res) => {
                  showResults(res.data)
                })
              })
            }
          )
        })
      },
      true
    )

    //Add event to fetch products when 'Enter' key is typed
    this.subscriber.addEventListener('keyup', (event) => {
      event.preventDefault()
      const value = event.target.value

      if (event.keyCode === 13) {
        this.closeSuggestions()
        beforeFetch()
        fetchData(this.url + 'product?search=' + value).then((products) => {
          showResults(products.data)
        })
      }
    })

    //Add the same previous functionality adapted to the search button
    this.searchButton.addEventListener('click', () => {
      this.closeSuggestions()
      beforeFetch()
      fetchData(this.url + 'product?search=' + this.subscriber.value).then(
        (products) => {
          showResults(products.data)
        }
      )
    })
  },
  //Check elements and hide suggestions if the condition is true
  //otherwise, just show the corresponding data
  closeSuggestionsOrShowResults(suggestion, tag, show) {
    if (suggestion.nodeName === tag) {
      this.searchSuggestions.classList.add('display-none')
      return
    }
    show()
  },
  //A function to close suggestions and blur the search bar
  closeSuggestions() {
    this.searchSuggestions.classList.add('display-none')
    this.subscriber.blur()
  },
}

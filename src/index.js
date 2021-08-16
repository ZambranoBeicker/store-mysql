import app from './js/app'
import { products } from './js/product'
import search from './js/search'

import './css/index.css'

const mainContentTarget = document.getElementById('main-content')
const searchBarTarget = document.getElementById('search-bar')
const searchButtonTarget = document.getElementById('search-button')
const searchSuggestionsTarget = document.getElementById('search-suggestions')

products.initialize(mainContentTarget)
search.initialize(searchBarTarget, searchButtonTarget, searchSuggestionsTarget)

search.addEventListener(
  (results) => {
    products.showResults(results)
  },
  () => {
    products.showLoadingFeedback()
  }
)

app.fetchInitialData((res) => {
  products.firstPaint(res.data)
})

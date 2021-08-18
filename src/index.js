import app from './js/app'
import { products } from './js/product'
import search from './js/search'

import './css/index.css'

//Get all the needed elements for the app
const mainContentTarget = document.getElementById('main-content')
const searchBarTarget = document.getElementById('search-bar')
const searchButtonTarget = document.getElementById('search-button')
const searchSuggestionsTarget = document.getElementById('search-suggestions')

//This will be the default actions after load the main page
products.initialize(mainContentTarget)
search.initialize(searchBarTarget, searchButtonTarget, searchSuggestionsTarget)

//Set the tasks for the search bar
search.addEventListener(
  (results) => {
    products.showResults(results)
  },
  () => {
    products.showLoadingFeedback()
  }
)

//Fetch products data and show it on the page
app.fetchInitialData((res) => {
  products.firstPaint(res.data)
})

import app from './js/app'
import { products } from './js/product'
import search from './js/search'

import './css/index.css'

const mainContentTarget = document.getElementById('main-content')
const searchBarTarget = document.getElementById('search-bar')

products.initialize(mainContentTarget)
search.initialize(searchBarTarget)

search.addEventListener((results) => {
  products.showResults(results)
})

app.fetchInitialData((res) => {
  products.firstPaint(res.data)
})

import app from './js/app'
import { products } from './js/product'
//TODO: Make a 'search bar' module with its logic

import './css/index.css'

const mainContentTarget = document.getElementById('main-content')
//TODO: Manage the search bar target

products.initialize(mainContentTarget)

app.fetchInitialData((res) => {
  products.paintContent(res.data)
})

//TODO: Create the search feature

import CartIcon from '../assets/-shopping-cart_90604.svg'
import Default from '../assets/no-image.png'

//Here are all the helper functions
//Those with 'print' prefix just return a string

//Return a card template with a given name, price and image url
const printProductCard = (name, price, image) => `
<div class="card">
      <div class="card__image">
        <img
          src=${!!image ? image : Default}
          alt="Placeholder image"
        />
      </div>

      <div class="card__title">
      <h5>${name}</h5>
      </div>

      <div class="card__buy">
      <span>$${price}</span>
        <button>
          <img src=${CartIcon} alt="Cart icon" />
        </button>
      </div>
    </div>

`

//Return the "Not Found" template to be showed to the user
const printNotFound = () => {
  return `
      <div style="margin:2rem auto;">
        <h2>Error 404: Not Found</h2>
      </div>`
}

//This will map an array of product objects and make
//product cards using the previous functions for it
const productsToString = (data) => {
  if (data.length === 1) {
    return printProductCard(data[0].name, data[0].price, data[0].url_image)
  }
  return data.reduce((previous, current) =>
    typeof previous === 'object'
      ? printProductCard(previous.name, previous.price, previous.url_image) +
        printProductCard(current.name, current.price, current.url_image)
      : previous +
        printProductCard(current.name, current.price, current.url_image)
  )
}

//Return list template with all the products of each category
export const printCardList = (title, id, products) => {
  const filteredProducts = products.filter((item) => item.category === id)
  const cards = productsToString(filteredProducts)

  return `
      <div class="card-list">
        <div class="card-list__title">
          <h2>${title}</h2>
        </div>
        <div class="card-list__wrapper">
          ${cards}
        </div>
      </div>
  `
}

//Abstract the subscriber checking to use it in every data structure
export const initSubscriber = (currentSubscriber, newSubscriber) => {
  if (!!currentSubscriber) {
    throw new Error('Subscriber cannot be defined again')
  }

  return Object.freeze(newSubscriber)
}

//A functions to throw an error if the subscriber is invalid
export const checkSubscriber = (subscriber) => {
  if (!Boolean(subscriber)) {
    throw new Error('Subscriber is invalid')
  }
}

//An abstraction for the fetching data functionality
export const fetchData = async (url) => {
  try {
    const response = await fetch(url)
    const parsedResponse = await response.json()

    return parsedResponse
  } catch (e) {
    throw e
  }
}

//Return a template list of the results to show
//if there's no result, return the template for "Not Found" error
export const printResults = (data) => {
  if (!Boolean(data) || data.length < 1) {
    return printNotFound()
  }
  const results = productsToString(data)
  return `
      <div class="card-list">
        <div class="card-list__title">
          <h2>Results: </h2>
        </div>
        <div class="card-list__wrapper">
          ${results}
        </div>
      </div>

  `
}

//Return a template to show a loading feedback
//to the user
export const printLoadingFeedback = () => {
  return `
      <div style="margin:0 auto;">
        <p>Loading...</p>
      </div>
  `
}

//Return a template with all the suggestions elements
//to filter by category
export const printCategorySuggestions = (categories) => {
  let suggestions = '<span>X</span><button>All</button>'

  categories.forEach((category) => {
    suggestions += `<button>${category.name}</button>`
  })

  return suggestions
}

//Abstract the adding of events for every children in the suggestions
//container
export const addEventToChildren = (children, data, event) => {
  children.forEach((child) => {
    child.addEventListener('click', () => {
      event(child, () => {
        if (child.innerText !== 'All') {
          return data.find((item) => item.name === child.innerText).id
        }
        return 'All'
      })
    })
  })
}

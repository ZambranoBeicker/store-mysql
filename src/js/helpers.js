const printProductCard = (name, price, image) =>
  `
    <div class="card">
      <div class="card__image">
        <img
          src=${image}
          alt="Placeholder image"
        />
      </div>

      <div class="card__title">
      <h5>${name}</h5>
      </div>

      <div class="card__buy">
      <span>$${price}</span>
        <button>I</button>
      </div>
    </div>

`

const productsToString = (data) => {
  return data.reduce((previous, current) =>
    typeof previous === 'object'
      ? printProductCard(previous.name, previous.price, previous.url_image) +
        printProductCard(current.name, current.price, current.url_image)
      : previous +
        printProductCard(current.name, current.price, current.url_image)
  )
}

export const printCardList = (title, id, data) => {
  const filteredCards = data.filter((item) => item.category === id)
  const cards = productsToString(filteredCards)

  return `
      <div class="card-list">
        <div class="card-list__title">
          <h2>${title}</h2>
              ${cards}
        </div>
      </div>

  `
}

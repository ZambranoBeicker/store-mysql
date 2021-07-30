export const renderProductCard = (name, price, image) =>
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

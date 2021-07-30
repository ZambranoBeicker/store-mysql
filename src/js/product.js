import { renderProductCard } from './helpers'

export const products = {
  subscriber: null,
  initialize(subscriber) {
    if (this.subscriber !== null) {
      throw new Error('Subscriber cannot be defined again')
    }

    this.subscriber = Object.freeze(subscriber)
  },
  paintContent(data) {
    if (!Boolean(this.subscriber)) {
      throw new Error('Subscriber is invalid')
    }

    //TODO: Here you need to render cards grouped by category
    data.forEach((element) => {
      this.subscriber.innerHTML += renderProductCard(
        element.name,
        element.price,
        element.url_image
      )
    })
  },
}

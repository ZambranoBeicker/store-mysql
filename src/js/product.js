import { printCardList } from './helpers'

export const products = {
  subscriber: null,
  initialize(subscriber) {
    if (this.subscriber !== null) {
      throw new Error('Subscriber cannot be defined again')
    }

    this.subscriber = Object.freeze(subscriber)
  },
  paintContent(products) {
    if (!Boolean(this.subscriber)) {
      throw new Error('Subscriber is invalid')
    }

    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'http://mysql-store-app.herokuapp.com/category'
        )
        const parsedResponse = await response.json()

        return parsedResponse
      } catch (e) {
        throw e
      }
    }

    fetchCategories().then((res) => {
      res.data.forEach((category) => {
        this.subscriber.innerHTML += printCardList(
          category.name,
          category.id,
          products
        )
      })
    })
  },
}

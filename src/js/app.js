export default {
  fetchInitialData: async (paint) => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'http://mysql-store-app.herokuapp.com/product'
        )
        const parsedResponse = await response.json()

        return parsedResponse
      } catch (e) {
        throw e
      }
    }
    const data = await fetchProducts()
    paint(data)
  },
}

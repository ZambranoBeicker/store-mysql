import { fetchData } from './helpers'

export default {
  fetchInitialData: async (paint) => {
    fetchData('https://mysql-store-app.herokuapp.com/product').then((res) => {
      paint(res)
    })
  },
}

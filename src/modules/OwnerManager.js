import APIManager from "./APIManager.js"

export default {
    get(resource, id) {

        return APIManager.get(resource, id)
      },

      getAll(resource) {
        return APIManager.all(resource)
      },

      post(resource) {
          return APIManager.post(resource)
        },

      removeAndList(resource, id) {
          return APIManager.delete(resource, id)
          .then( () => this.getAll(resource))

  }


}
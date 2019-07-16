import APIManager from "./APIManager.js"

export default {
    get(resource, id) {

        return APIManager.get(resource, id)
      },

      getAll(resource) {
        return APIManager.all(resource)
      }


}
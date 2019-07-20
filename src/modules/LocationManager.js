
import APIManager from "./APIManager.js"

export default {
    get(resource, id) {

        return APIManager.get(resource, id)
      },

    getAll(resource) {
        return APIManager.all(resource)
      },

    post(resource, locationObj) {
        return APIManager.post(resource, locationObj)
    },

    removeAndList(resource, id) {
        return APIManager.delete(resource, id)
        .then( () => this.getAll(resource))
    },

    put(resource, resourceObjId) {
      return APIManager.put(resource, resourceObjId)
    }

}
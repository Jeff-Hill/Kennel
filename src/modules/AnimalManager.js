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


}

}


// export default Object.create(null, {
//     get:{
//         value: function(resource, id) {
//           return APIManager.get(resource, id)
//     }},

//     getAll:{
//         value: function(resource) {
//           return APIManager.all(resource)
//     }},

//     post:{
//         value: function(resource) {
//           return APIManager.post(resource)
//     }},

//     removeAndList: {
//         value: function(resource, id) {
//           return APIManager.delete(resource, id)


//   }}

//   })


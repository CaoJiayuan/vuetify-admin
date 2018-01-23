const Api = {
  getData(url, params = {}){
    return axios.get(url, {
      params : params
    }).then(response => response.data)
  }
}

export default Api;
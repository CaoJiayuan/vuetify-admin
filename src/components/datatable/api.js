const Api = {
  getData(url, params = {}){
    return axios.get(url, {
      params : params
    })
  }
}

export default Api;

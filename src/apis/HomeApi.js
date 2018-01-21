const HomeApi = {
    getNavigation(){
        return axios.get('/navigation').then(response => response.data)
    },

    stats(){
        return axios.get('/home/stats').then(response => response.data);
    }
};

export default HomeApi;

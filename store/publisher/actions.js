const actions = {
  async GET_PUBLISHER({ commit }) {
    const token = this.$cookies.get("slate-token");
    try {
      const { data } = await this.$axios.get(
        `/app/publisher/slate_token/${token}/fetch_details/`
      );
      commit("setPublisher", data);
    } catch (error) {
      return error;
    }
  },
  async GET_TOKEN ({ commit }) {
    const token = this.$cookies.get("slate-token");
    try {
      const { data } = await this.$axios.post('/app/publisher/login/', {
        slate_token: token
      })
      this.$cookies.set('publisher-token', data.data.token)
      commit('setToken', data.data)
    } catch (error) {
      return error
    }
  },
  async GET_BOOKS({ commit }, { name }) {
    try {
      const { data } = await this.$axios.get('/app/publisher/books', {
        params: { name },
      })
      console.log(data)
      commit('setBooks', data.data)
    } catch (error) {
      return error
    }
  },
  async GET_BOOK({ commit }, payload) {
    try {
      const { data } = await this.$axios.get(`/app/publisher/book/${payload}/`)
      console.log(data)
      commit('setBook', data)
    } catch (error) {
      console.log(error)
    }
  }
};

export default actions;

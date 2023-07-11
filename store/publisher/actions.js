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
      this.$toast({
        type: 'info',
        text: data.message
      })
      this.$cookies.set('publisher-token', data.data.token)
      commit('setToken', data.data)
    } catch (error) {
      return error
    }
  },
  async GET_BOOKS({ commit }, { name, status }) {
    try {
      const { data } = await this.$axios.get('/app/publisher/books', {
        params: { name, status },
      })
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
  },
  logout({ commit }) {
    commit('logout')
    this.$cookies.remove('publisher-token')
    this.$cookies.remove('slate-token')
  }
};

export default actions;

import createPersistedState from 'vuex-persistedstate'


export default ({ store }) => {
  createPersistedState({
    key: 'publisher',
    paths: ['publisher'],
  })(store)
}

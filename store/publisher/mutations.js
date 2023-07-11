const mutations = {
    setPublisher(state, publisher) {
        state.publisherDetails = publisher
    },
    setBooks(state, books) {
        state.books = books
    },
    setBook(state, book) {
        state.book = book
    },
    setToken(state, token) {
        state.token = token
    },
    logout (state) {
        state.publisherDetails = {}
        state.token = {}
      },
}

export default mutations
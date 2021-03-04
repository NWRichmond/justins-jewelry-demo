export const state = () => ({
  searchData: {
    products: []
  },
  searchOptions: {
    relevanceThreshold: 0.5,
    keys: ['title']
  },
  searchWorker: null,

  // global search state
  globalQuery: null,
  globalResults: [],
  isSearchingGlobal: false,
  autocompleteVisible: false,

  // in-page search state
  pageQuery: null,
  pageResults: [],
  filteredData: null,
  isLoading: false,
  resultsToDisplay: 12
})

export const getters = {
  hasProductData(state) {
    return state.searchData.products.length > 0
  },

  productData(state, getters) {
    return getters.hasProductData ? state.searchData.products : []
  }
}

export const mutations = {
  setQuery(state, { query, position }) {
    position === 'global'
      ? (state.globalQuery = query)
      : (state.pageQuery = query)
  },

  setFilteredData(state, data) {
    state.filteredData = data
  },

  showMoreResults(state) {
    state.resultsToDisplay = state.resultsToDisplay + 12
  },

  resetResults(state) {
    state.resultsToDisplay = 12
  },

  setAutocompleteVisible(state, isVisible) {
    state.autocompleteVisible = isVisible
  },

  setSearchData(state, data) {
    state.searchData = {
      ...state.searchData,
      ...data
    }
  },

  setLoading(state, isLoading) {
    state.isLoading = isLoading
  },
  setSearchingGlobal(state, isSearching) {
    state.isSearchingGlobal = isSearching
  },
  setResults(state, { results, position }) {
    position === 'global'
      ? (state.globalResults = results)
      : (state.pageResults = results)
  },
  startSearchWorker(state, searchData) {
    state.searchWorker = state.searchWorker || new Worker('/worker/search.js')
    state.searchWorker.postMessage({ searchData })
  }
}

export const actions = {
  getSearchData({ commit, getters, state }) {
    if (getters.hasProductData && !state.isLoading) {
      return
    }
    commit('setLoading', true)

    const worker = new Worker('/worker/productCatalog.js')
    worker.postMessage(null)
    worker.onmessage = (e) => {
      const products = e.data.product
      commit('setSearchData', { products })
      commit('setLoading', false)
      worker.terminate()
    }
  },

  searchCatalog({ state, getters, commit }, { value, position }) {
    commit('startSearchWorker', getters.productData)
    commit('setSearchingGlobal', true)

    state.searchWorker.postMessage({
      options: state.searchOptions,
      value
    })
    state.searchWorker.onmessage = (e) => {
      commit('setResults', { results: e.data, position })
      commit('setSearchingGlobal', false)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}

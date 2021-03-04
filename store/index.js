import { keys, del } from 'idb-keyval'

export const state = () => ({
  collectionLimit: 12,
  productIdbState: null,
  indexedDbWorker: null
})

export const mutations = {
  setProductIdbState(state, newState) {
    state.productIdbState = newState
  },
  startIndexedDbWorker: (state) => {
    state.indexedDbWorker =
      state.indexedDbWorker || new Worker('/worker/indexedDb.js')
  }
}

export const actions = {
  async nuxtClientInit(ctx, context) {
    await this.$nacelle.nacelleNuxtServerInit(ctx, context)
  },
  async nuxtServerInit(ctx, context) {
    await this.$nacelle.nacelleNuxtServerInit(ctx, context)
  },
  async clearProductIdb({ state, commit }) {
    if (!state.productIdbState) {
      commit('setProductIdbState', 'clearing')
      const idbKeys = await keys()

      const cleared = idbKeys
        .filter((key) => key.startsWith('product/'))
        .map((key) => del(key))

      await Promise.all(cleared)
      commit('setProductIdbState', 'cleared')
    }
  },
  getIndexedDbWorker({ state, commit }) {
    if (!state.indexedDbWorker) {
      commit('startIndexedDbWorker')
    }

    return state.indexedDbWorker
  }
}

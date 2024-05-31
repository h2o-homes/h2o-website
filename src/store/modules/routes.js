import { asyncRoutes, constantRoutes } from '@/router'
import { filterRoutes } from '@/utils/routes'

const state = () => ({
    routes: []
})
const getters = {
    routes: (state) => state.routes
}
const mutations = {
    setRoutes(state, routes) {
        state.routes = routes
    }
}
const actions = {
    async setRoutes({ commit }) {
        const finallyRoutes = filterRoutes([...constantRoutes, ...asyncRoutes])
        commit('setRoutes', finallyRoutes)
        return [...asyncRoutes]
    }
}
export default { state, getters, mutations, actions }

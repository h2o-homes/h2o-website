import {
    createWeb3Modal,
    defaultConfig,
    useWeb3ModalAccount
} from '@web3modal/ethers5/vue'
import { watchEffect } from 'vue'
import Web3 from 'web3'
import { rpcConfig } from '@/config/web3'
import { setUpContracts } from '@/contracts'

const state = () => ({
    accounts: [],
    defaultAccount: undefined,
    currentNetworkId: undefined,
    contracts: null,
    balance: '0'
})
const getters = {
    defaultAccount: (state) => {
        return state.defaultAccount
    },
    currentNetworkId: (state) => {
        return state.currentNetworkId
    },
    balance: (state) => {
        return state.balance
    },
    contracts: (state) => {
        return state.contracts
    }
}
const mutations = {
    setNetworkId(state, payload) {
        state.currentNetworkId = payload
    },

    setAccounts(state, payload) {
        state.accounts = payload.accounts

        if (payload.accounts.length > 0) {
            state.defaultAccount = payload.accounts[0]
        } else {
            state.defaultAccount = null
        }
    },

    setAccountBalance(state, payload) {
        state.balance = payload
    },

    setContracts(state, payload) {
        state.contracts = payload
    }
}
const actions = {
    async initialize({ commit, dispatch }, payload = {}) {
        const { accounts, chainId } = payload
        commit('setAccounts', { accounts })
        commit('setNetworkId', chainId)

        await dispatch('setUpContracts')
    },

    setAccounts({ commit }, accounts) {
        commit('setAccounts', { accounts })
    },

    disconnect() {
        window.web3Modal.disconnect()
    },

    async setUpContracts({ commit }) {
        const contracts = await setUpContracts()
        commit('setContracts', contracts)
    },

    async fetchUserDetails() {
        const promises = []
        await Promise.all([promises])
    },

    async fetchBalance({ state, commit }) {
        const res = await window.web3.eth.getBalance(state.defaultAccount)
        commit('setAccountBalance', res.toString())
    },
    initWeb3Modal({ dispatch }) {
        // 1. Get projectId at https://cloud.walletconnect.com
        const projectId = '25a0d58ff26d16144604b40200c88160'

        // 2. Set chains
        const chains = []
        for (let key in rpcConfig) {
            const {
                networkId,
                chainName,
                currencyName,
                rpcUrls,
                blockExplorerUrls
            } = rpcConfig[key]
            const obj = {
                chainId: networkId,
                name: chainName,
                currency: currencyName,
                explorerUrl: blockExplorerUrls[0],
                rpcUrl: rpcUrls[0]
            }
            chains.push(obj)
        }

        // 3. Create your application's metadata object
        const metadata = {
            name: 'H2O',
            description:
                'The first decentralized traffic distribution platform that provides community members with the latest blockchain industry information and industry benefits.',
            url: window.location.href, // url must match your domain & subdomain
            icons: ['https://h2o.homes/file/h2o_logo.png']
        }

        // 4. Create Ethers config
        const ethersConfig = defaultConfig({
            /*Required*/
            metadata,

            /*Optional*/
            enableEIP6963: true, // true by default
            enableInjected: true, // true by default
            enableCoinbase: false // true by default
            // rpcUrl: '...', // used for the Coinbase SDK
            // defaultChainId: 1 // used for the Coinbase SDK
        })

        // 5. Create a Web3Modal instance
        window.web3Modal = createWeb3Modal({
            ethersConfig,
            projectId,
            chains: chains,
            allowUnsupportedChain: true, // Allow users to switch to an unsupported chain.
            enableAnalytics: true, // Optional - defaults to your Cloud configuration
            // enableOnramp: false, // Optional - false as default Enable users to buy crypto with fiat currency.
            // themeMode: 'light',
            themeVariables: {
                '--w3m-font-family': 'Avenir',
                '--w3m-accent': '#00FFE0',
                // '--w3m-color-mix': '#000',
                // '--w3m-color-mix-strength': '100',
                // '--w3m-border-radius-master': '2px', // *9
                '--w3m-z-index': 1001
            }
        })

        const { address, chainId, isConnected } = useWeb3ModalAccount()

        watchEffect(async () => {
            console.log('address:', address.value)
            console.log('chainId:', chainId.value)
            console.log('isConnected', isConnected.value)

            const provider = window.web3Modal.getWalletProvider()
            window.web3 = new Web3(provider)

            await dispatch('initialize', {
                accounts: [address.value],
                chainId: chainId.value
            })
        })
    }
}

export default { state, getters, mutations, actions }

import { message } from 'ant-design-vue'
import Web3 from 'web3'

let provider = window.ethereum

const api = {
    add() {
        window.open('https://metamask.io/download/')
    },
    async connect() {
        if (!provider) {
            this.add()
            return Promise.reject('Provider not set or invalid')
        }
        return provider
            .request({ method: 'eth_requestAccounts' })
            .then(() => {
                window.web3 = new Web3(provider)
            })
            .catch((requestError) => {
                return this.handleError(requestError)
            })
    },
    async connectToNetwork($networkConfig) {
        if (!provider) {
            this.add()
            return Promise.reject('Provider not set or invalid')
        }
        const { chainId } = $networkConfig
        const netId = await provider.request({ method: 'net_version' })
        if (netId !== chainId) {
            await this.configureNetwork($networkConfig)
        }
        await this.connect()
    },
    async configureNetwork($networkConfig) {
        if (!provider) {
            this.add()
            return Promise.reject('Provider not set or invalid')
        }
        const {
            chainId,
            chainName,
            rpcUrls,
            blockExplorerUrls,
            currencyName,
            currencySymbol,
            currencyDecimals
        } = $networkConfig
        try {
            await provider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId }]
            })
        } catch (switchError) {
            if (switchError.code === 4902) {
                try {
                    await provider.request({
                        method: 'wallet_addEthereumChain',
                        params: JSON.parse(
                            JSON.stringify([
                                {
                                    chainId,
                                    chainName,
                                    nativeCurrency: {
                                        name: currencyName,
                                        symbol: currencySymbol,
                                        decimals: currencyDecimals
                                    },
                                    rpcUrls,
                                    blockExplorerUrls
                                }
                            ])
                        )
                    })
                } catch (error) {
                    return this.handleError(error)
                }
            } else {
                return this.handleError(switchError)
            }
        }
    },
    async getAccounts() {
        return await provider?.request({ method: 'eth_accounts' })
    },
    handleError(error) {
        if (error.code === -32002) {
            message.warning('Request already pending. Please wait.')
        }
        return Promise.reject(error)
    }
}

export default api

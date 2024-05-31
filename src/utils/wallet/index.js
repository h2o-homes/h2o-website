import storage from '@/utils/storage'
import wallet from '@/utils/wallet/web3modal'
import store from '@/store'

export async function walletConnect() {
    storage.set('logged_out', false)
    await wallet.connect()
    // await store.dispatch('web3/initialize')
}

/**
 * @returns {Promise<void>}
 */
export async function walletConnectToNetwork(networkSetting) {
    await wallet.connectToNetwork(networkSetting)
    // await store.dispatch('web3/initialize')
}

/**
 * @returns {Promise<void>}
 */
export async function walletConnectTry() {
    const disconnect = storage.get('logged_out')
    if (disconnect) {
        return
    }
    const accounts = await wallet.getAccounts()
    if (accounts?.length) {
        await walletConnect()
    }
}

/**
 * @returns {Promise<void>}
 */
export async function walletLogout() {
    storage.set('logged_out', true)
    await store.dispatch('web3/disconnect')
}

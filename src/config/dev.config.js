const rpcConfig = {
    ETHEREUM: {
        chainSymbol: 'Sepolia',
        networkId: 11155111,
        chainId: '0xaa36a7',
        chainName: 'Sepolia Test Network',
        currencyName: 'sETH',
        currencySymbol: 'sETH',
        currencyDecimals: 18,
        rpcUrls: ['https://ethereum-sepolia.rpc.subquery.network/public'],
        blockExplorerName: 'Etherscan',
        blockExplorerUrls: ['https://goerli.etherscan.io']
    },
    BSC: {
        chainSymbol: 'BSC',
        networkId: 97,
        chainId: '0x61',
        chainName: 'Binance Smart Chain Testnet',
        currencyName: 'tBNB',
        currencySymbol: 'tBNB',
        currencyDecimals: 18,
        rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
        blockExplorerName: 'Bscscan',
        blockExplorerUrls: ['https://testnet.bscscan.com']
    }
}
module.exports = rpcConfig

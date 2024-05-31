const rpcConfig = {
    // ETHEREUM: {
    //     chainSymbol: 'Ethereum',
    //     networkId: 1,
    //     chainId: '0x1',
    //     chainName: 'Ethereum Mainnet',
    //     currencyName: 'ETH',
    //     currencySymbol: 'ETH',
    //     currencyDecimals: 18,
    //     rpcUrls: ['https://ethereum-rpc.publicnode.com'],
    //     blockExplorerName: 'Etherscan',
    //     blockExplorerUrls: ['https://etherscan.io']
    // },
    BSC: {
        chainSymbol: 'BSC',
        networkId: 56,
        chainId: '0x38',
        chainName: 'BNB Chain',
        currencyName: 'BNB',
        currencySymbol: 'BNB',
        currencyDecimals: 18,
        rpcUrls: ['https://bsc.nodereal.io'],
        blockExplorerName: 'Bscscan',
        blockExplorerUrls: ['https://bscscan.com/']
    }
}
module.exports = rpcConfig

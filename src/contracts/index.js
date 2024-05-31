import Web3 from 'web3'
import { abi as AirdropTokenDistributorpAbi } from '@/contracts/abi/AirdropTokenDistributor.json'
import CONTRACT_ADDRESS from '@/contracts/address'
import { rpcConfig } from '@/config/web3'

const rpcUrlMap = {}
for (let key in rpcConfig) {
    const id = rpcConfig[key].networkId
    rpcUrlMap[id] = rpcConfig[key].rpcUrls[0]
}

// export const _CyberHarborMembership = (networkId) => {
//     const web3 = new Web3(rpcUrlMap[networkId])
//     return new web3.eth.Contract(
//         CyberHarborMembershipAbi,
//         CONTRACT_ADDRESS[networkId]?.CyberHarborMembership
//     )
// }

export async function setUpContracts() {
    const AirdropTokenDistributor = (networkId) => {
        return new window.web3.eth.Contract(
            AirdropTokenDistributorpAbi,
            CONTRACT_ADDRESS[networkId]?.AirdropTokenDistributor
        )
    }

    return {
        AirdropTokenDistributor
    }
}

<template>
    <div class="benefits">
        <div class="container">
            <h1 class="h-title">Benefit</h1>
            <result :isLoading="loading" :isEmpty="!projects.length">
                <div class="grid">
                    <div
                        v-for="item in projects"
                        :key="item.id"
                        class="item"
                        :class="{
                            soon: item.status === 'SOON',
                            progress:
                                item.status === 'PROGRESS' ||
                                item.status === 'ACT-PROGRESS',
                            end: item.status === 'END'
                        }"
                    >
                        <div class="header">
                            <span class="logo">
                                <img
                                    class="img"
                                    :src="item.logo"
                                    :alt="item.name"
                                />
                            </span>
                            <div class="detail">
                                <span class="name">{{ item.name }}</span>
                                <div class="tags">
                                    <span class="status">
                                        {{ item.statusTag }}
                                    </span>
                                    <span class="chain">
                                        {{ item.network }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="body">
                            <div class="intro">
                                {{ item.description }}
                            </div>
                        </div>
                        <div class="btns">
                            <a-button type="link" @click="viewDetail(item)">
                                Details
                            </a-button>
                            <a-button
                                ghost
                                class="claim-btn"
                                :loading="item.claiming"
                                :class="{ disabled: isClaimDisabled(item) }"
                                @click="claimToken(item)"
                            >
                                Claim
                                <svg-icon icon-class="arrow-down"></svg-icon>
                            </a-button>
                        </div>
                    </div>
                </div>
            </result>
        </div>

        <detail
            :is-show="showDetail"
            :pDetail="pDetail"
            @close="this.showDetail = false"
            @claim="claimToken(pDetail)"
        />
    </div>
</template>

<script>
    import Web3 from 'web3'
    import { mapGetters } from 'vuex'
    import { fetchProject } from '@/api/statistics'
    import AirdropContract from '@/contracts/abi/AirdropTokenDistributor.json'
    import Result from '@/components/common/Result.vue'
    import Detail from './detail.vue'

    export default {
        name: 'Benefits',
        components: {
            Result,
            Detail
        },
        data() {
            return {
                visible: false,
                projects: [],
                pDetail: {},
                showConnect: false,
                showDetail: false,
                loading: true
            }
        },

        computed: {
            ...mapGetters({
                contracts: 'web3/contracts',
                defaultAccount: 'web3/defaultAccount',
                currentNetworkId: 'web3/currentNetworkId'
            })
        },
        watch: {
            defaultAccount() {
                this.getProject()
            }
        },
        created() {
            this.getProject({ isCreated: true })
        },
        methods: {
            formateStatusTag(status) {
                const config = {
                    END: 'ENDING',
                    SOON: 'COMING SOON',
                    PROGRESS: 'IN PROGRESS',
                    'ACT-PROGRESS': 'IN PROGRESS'
                }
                return config[status]
            },
            isProgress(item) {
                return item.status === 'PROGRESS'
            },
            isClaimDisabled(item = {}) {
                const { whiteList, isClaimd, claiming } = item
                return (
                    !this.isProgress(item) || !whiteList || isClaimd || claiming
                )
            },
            showDisableReason(item = {}) {
                const { whiteList, isClaimd } = item
                if (!this.isProgress(item)) {
                    this.$message.warn('Not within the claiming period')
                } else if (!whiteList) {
                    this.$message.warn('Not eligible to claim')
                } else if (isClaimd) {
                    this.$message.warn('Already claimed')
                }
            },
            async getProject({ isCreated = false } = {}) {
                this.loading = true
                const res = await fetchProject({
                    userAddress: this.defaultAccount
                })
                const projects = res.data.content || []
                if (isCreated && this.projects.length) {
                    this.loading = false
                    return
                }

                const now = Date.now() / 1000
                projects.forEach((item) => {
                    item.isClaimd = true
                    item.rpcInfo.chainId = item.rpcInfo.chainId.toString()
                    if (now > item.endTime) {
                        item.status = 'END'
                    } else if (now < item.activityStartTime) {
                        item.status = 'SOON'
                    } else {
                        item.status = 'ACT-PROGRESS'
                    }
                    if (now > item.startTime && now < item.endTime) {
                        item.status = 'PROGRESS'
                    }
                    item.statusTag = this.formateStatusTag(item.status)
                })
                this.projects = projects
                await this.getProjectClaimStatus()
                this.loading = false
            },
            async getProjectClaimStatus() {
                const projects = this.projects.filter((item) => {
                    return this.isProgress(item) && item.whiteList
                })

                const calls = []
                projects.forEach((item) => {
                    const { abi } = AirdropContract
                    const { url } = item.rpcInfo
                    const web3 = new Web3(url)
                    const AirdropTokenDistributor = new web3.eth.Contract(
                        abi,
                        item.contractAddress
                    )
                    calls.push(
                        AirdropTokenDistributor.methods
                            .isClaimed(item.whiteList.claimIndex)
                            .call()
                    )
                })
                // console.log('getProjectClaimStatus projects:: ', projects);
                const res = await Promise.all(calls)
                // console.log('claimed:: ', res);
                projects.forEach((project, index) => {
                    if (!res[index]) {
                        this.projects.forEach((item) => {
                            if (
                                item.contractAddress === project.contractAddress
                            ) {
                                item.isClaimd = false
                            }
                        })
                    }
                })
            },
            async claimToken(item) {
                if (!this.defaultAccount) {
                    window.web3Modal.open()
                    return
                }
                if (this.isClaimDisabled(item)) {
                    this.showDisableReason(item)
                    return
                }
                const { chainId } = item.rpcInfo
                // console.log(chainId, typeof chainId, this.currentNetworkId)
                if (chainId !== this.currentNetworkId.toString()) {
                    await window.web3Modal.switchNetwork(Number(chainId))
                }
                item.claiming = true
                const { userAddress, proof, amount, claimIndex } =
                    item.whiteList
                const { abi } = AirdropContract
                const AirdropTokenDistributor = new window.web3.eth.Contract(
                    abi,
                    item.contractAddress
                )
                const merkleProof = proof.split(',')
                console.log(claimIndex, userAddress, amount, merkleProof)

                const gasPrice = await window.web3.eth.getGasPrice()
                AirdropTokenDistributor.methods
                    .claim(claimIndex, userAddress, amount, merkleProof)
                    .send({
                        gasPrice,
                        from: this.defaultAccount
                    })
                    .then((data) => {
                        if (data.status) {
                            item.isClaimd = true
                            this.$message.success('Claim successful')
                            setTimeout(() => {
                                this.addToken(item)
                            }, 200)
                        }
                    })
                    .catch((e) => {
                        if (e.code !== 4001) {
                            // User denied
                            this.$message.error(e.message)
                        }
                    })
                    .finally(() => {
                        item.claiming = false
                    })
            },
            async addToken(item) {
                const { tokenAddress, tokenImage, tokenDecimals, tokenSymbol } =
                    item
                await window.web3.currentProvider.request({
                    method: 'wallet_watchAsset',
                    params: {
                        type: 'ERC20',
                        options: {
                            address: tokenAddress,
                            symbol: tokenSymbol,
                            decimals: tokenDecimals,
                            image: tokenImage
                        }
                    }
                })
            },
            viewDetail(project = {}) {
                this.showDetail = true
                this.pDetail = project
            }
        }
    }
</script>

<style scoped lang="less">
    .benefits {
        padding-bottom: 60px;
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 10px;
        }

        .item {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 42px 30px 24px 40px;
            height: 100%;
            background: linear-gradient(137deg, #101229 0%, #000000 100%);
            border: 1px solid @border-color-base;
            border-radius: @border-radius-base;
            text-align: left;
            overflow: hidden;

            &.end {
                .header .detail .status {
                    background: #8987a1;
                }
            }
            &.progress {
                .header .detail .status {
                    background: #00ffe0;
                }
            }
            &.soon {
                .header .detail .status {
                    background: #626aff;
                }
            }

            .header {
                display: flex;
                align-items: center;
                .logo {
                    flex-shrink: 0;
                    margin-right: 16px;
                    width: 78px;
                    height: 78px;
                    border-radius: 50%;
                    > img {
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
                .detail {
                    display: flex;
                    flex-direction: column;
                    font-weight: 600;
                    .name {
                        display: inline-block;
                        margin-bottom: 12px;
                        line-height: 1;
                        font-size: 22px;
                        font-weight: bold;
                    }
                    .tags {
                        display: flex;
                        grid-gap: 10px;
                        font-size: 12px;
                        color: #000000;
                        > span {
                            display: inline-block;
                            padding: 6px 10px;
                            white-space: nowrap;
                            line-height: 1;
                            border-radius: 5px;
                            background: #ffffff;
                        }
                    }
                }
            }

            .body {
                padding: 24px 0;
                .intro {
                    height: calc(1.5 * 14px * 4);
                    line-height: 1.5;
                    color: @text-color-secondary;
                    box-sizing: content-box;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                }
            }

            .btns {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .claim-btn {
                    display: flex;
                    gap: 4px;
                    width: 100px;
                    height: 40px;
                    font-size: 16px;
                }
            }
        }
    }

    @media (max-width: 991px) {
        .benefits {
            .grid {
                grid-template-columns: 1fr 1fr;
            }
        }
    }
    @media (max-width: 767px) {
        .benefits {
            .grid {
                grid-template-columns: 1fr;
            }
            .item {
                padding: 42px 12px 16px;
                border-radius: 8px;
                .header {
                    .logo {
                        margin-right: 12px;
                    }
                    .detail {
                        .name {
                            font-weight: normal;
                        }
                    }
                }

                .body {
                    padding: 16px 0;
                    margin-bottom: 16px;
                }
                .btns {
                    .claim-btn {
                        font-size: 14px;
                    }
                }
            }
        }
    }
</style>

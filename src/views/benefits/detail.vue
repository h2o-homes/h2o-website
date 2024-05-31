<template>
    <a-modal
        v-model:visible="visible"
        centered
        @cancel="closeDialog"
        class="detail-dialog"
        :width="640"
    >
        <template #title>
            <div class="header">
                <span class="logo">
                    <img class="img" :src="pDetail.logo" :alt="pDetail.name" />
                </span>
                <div class="detail">
                    <span class="name">{{ pDetail.name }}</span>
                    <div class="tags">
                        <span
                            class="status"
                            :class="{
                                soon: pDetail.status === 'SOON',
                                progress:
                                    pDetail.status === 'PROGRESS' ||
                                    pDetail.status === 'ACT-PROGRESS',
                                end: pDetail.status === 'END'
                            }"
                        >
                            {{ pDetail.statusTag }}
                        </span>
                        <span class="chain">
                            {{ pDetail.network }}
                        </span>
                        <div class="contact">
                            <a
                                :href="pDetail.twitter"
                                v-if="pDetail.twitter"
                                target="_blank"
                            >
                                <svg-icon icon-class="twitter-fill"></svg-icon>
                            </a>
                            <a
                                :href="pDetail.telegram"
                                v-if="pDetail.telegram"
                                target="_blank"
                            >
                                <svg-icon icon-class="telegram-fill"></svg-icon>
                            </a>
                            <a
                                :href="pDetail.discord"
                                v-if="pDetail.discord"
                                target="_blank"
                            >
                                <svg-icon icon-class="discord-fill"></svg-icon>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #footer>
            <div class="footer">
                <a-button
                    ghost
                    :loading="pDetail.claiming"
                    class="claim-btn"
                    :class="{ disabled: isClaimDisabled(pDetail) }"
                    @click="claimToken"
                >
                    Claim
                    <svg-icon icon-class="arrow-down"></svg-icon>
                </a-button>
            </div>
        </template>
        <div class="body">
            <div class="content">
                <div class="desc">Contract: {{ pDetail.tokenAddress }}</div>
                <p class="desc">{{ pDetail.description }}</p>
                <p class="desc" style="white-space: pre-wrap">
                    {{ pDetail.claimConditions }}
                </p>
                <p class="desc">
                    For more details please check
                    <a :href="pDetail.activityDetail" target="_blank">
                        {{ pDetail.activityDetail }}
                    </a>
                </p>
                <div>
                    Number of claims:
                    <span v-if="pDetail.whiteList">
                        {{
                            formattedClaimAmount(pDetail.whiteList.claimAmount)
                        }}
                        {{ pDetail.tokenSymbol }}
                    </span>
                    <span v-else>Not eligible to claim</span>
                </div>
                <div>
                    Activity time:
                    <div>
                        {{ formatClaimTime(pDetail.activityStartTime * 1000) }}
                        --
                        {{ formatClaimTime(pDetail.activityEndTime * 1000) }}
                    </div>
                </div>
                <div>
                    Claim time:
                    <div>
                        {{ formatClaimTime(pDetail.startTime * 1000) }} --
                        {{ formatClaimTime(pDetail.endTime * 1000) }}
                    </div>
                </div>
            </div>
        </div>
    </a-modal>
</template>

<script>
    import { fromWeiEther } from '@/utils/common'
    import { formatTime } from '@/utils'
    export default {
        props: {
            isShow: {
                type: Boolean,
                default: false
            },
            pDetail: {
                type: Object,
                default: () => ({})
            }
        },
        data() {
            return {
                visible: false
            }
        },
        watch: {
            isShow(newVal) {
                this.visible = newVal
            }
        },
        methods: {
            closeDialog() {
                this.$emit('close')
            },
            claimToken() {
                this.$emit('claim')
            },
            formatClaimTime(value) {
                return formatTime(value, 'yyyy-MM-dd hh:mm')
            },
            formattedClaimAmount(value) {
                return fromWeiEther(value)
            },
            isClaimDisabled(item = {}) {
                return (
                    item.status !== 'PROGRESS' ||
                    !item.whiteList ||
                    item.isClaimd ||
                    item.claiming
                )
            }
        }
    }
</script>

<style lang="less" scoped>
    .detail-dialog {
        .body {
            .content {
                padding-bottom: 24px;
                padding-right: 24px;
                max-height: 380px;
                line-height: 30px;
                font-weight: 500;
                font-size: 16px;
                overflow-y: scroll;
                mask: linear-gradient(rgb(255, 255, 255) 86%, transparent);
                &::-webkit-scrollbar {
                    width: 4px;
                    height: 4px;
                }
                &::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 3px;
                }
                &::-webkit-scrollbar-track {
                    background-color: transparent;
                    border-radius: 5px;
                }
            }

            .data {
                margin-bottom: 16px;
            }

            .desc {
                margin-bottom: 24px;
                line-height: 1.6;
                > a {
                    color: @primary-color;
                }
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
                }
                .tags {
                    display: flex;
                    grid-gap: 10px;
                    font-size: 12px;
                    color: #000000;
                    > span {
                        display: inline-block;
                        padding: 6px 10px;
                        line-height: 1;
                        border-radius: 5px;
                        background: #ffffff;
                    }
                    .status {
                        &.end {
                            background: #8987a1;
                        }
                        &.progress {
                            background: #00ffe0;
                        }
                        &.soon {
                            background: #626aff;
                        }
                    }
                    .contact {
                        display: flex;
                        justify-content: flex-end;
                        gap: 8px;
                        margin-left: 10px;
                        > a {
                            display: inline-flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 24px;
                            color: @text-color;
                            &:hover {
                                color: @primary-color;
                            }
                        }
                    }
                }
            }
        }
        .footer {
            display: flex;
            justify-content: center;
            .claim-btn {
                display: flex;
                grid-gap: 4px;
                width: 100%;
                height: 40px;
                font-size: 16px;
            }
        }
    }
    @media (max-width: 767px) {
        .detail-dialog {
            .header {
                .logo {
                    margin-right: 8px;
                    width: 64px;
                    height: 64px;
                }
                .detail {
                    .name {
                        font-weight: normal;
                        font-size: 20px;
                    }
                    .tags {
                        > span {
                            white-space: nowrap;
                        }
                        .contact {
                            margin-left: 0;
                        }
                    }
                }
            }
            .body {
                .content {
                    max-height: 368px;
                    font-size: 14px;
                }
                .data {
                    margin-bottom: 6px;
                }
                .desc {
                    margin-bottom: 14px;
                }
            }
        }
    }
</style>

<template>
    <div class="explore">
        <div class="container">
            <div class="h-title">Explore</div>
            <result :isLoading="loading" :isEmpty="!backers.length">
                <div class="community-list">
                    <div class="item" v-for="item in backers" :key="item.id">
                        <div class="banner">
                            <img :src="item.imageUrl" alt="" />
                        </div>
                        <div class="content">
                            <div class="header">
                                <span class="logo">
                                    <img :src="item.logoUrl" alt="" />
                                </span>
                                <div>
                                    <p class="name">{{ item.name }}</p>
                                    <p class="follower">
                                        {{ converter(item.followerCount, 0) }}
                                        Followers
                                    </p>
                                </div>
                            </div>
                            <div class="desc">
                                <p class="ellipsis">{{ item.introduction }}</p>
                            </div>
                            <div class="btn">
                                <a-button
                                    ghost
                                    @click="goTwitter(item.twitterUrl)"
                                >
                                    Twitter
                                    <svg-icon icon-class="twitter"></svg-icon>
                                </a-button>
                            </div>
                        </div>
                    </div>
                </div>
            </result>
        </div>
    </div>
</template>

<script>
    import { converter } from '@/utils'
    import { fetchCommunity } from '@/api/statistics'
    import Result from '@/components/common/Result.vue'

    export default {
        name: 'Explore',
        components: {
            Result
        },
        data() {
            return {
                backersCarousel: [],
                backers: [],
                loading: true
            }
        },
        created() {
            this.getBackers()
        },
        methods: {
            converter,
            async getBackers() {
                this.loading = true
                const res = await fetchCommunity({
                    page: 0,
                    size: 40
                })
                this.backers = res.data.content
                this.backersCarousel = this.backers.filter((item) => {
                    return item.isCarousel
                })
                this.loading = false
            },
            goTwitter(url) {
                window.open(url)
            }
        }
    }
</script>

<style scoped lang="less">
    .explore {
        padding-bottom: 60px;

        .community-list {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 10px;

            .item {
                color: #fff;
                background: linear-gradient(137deg, #101229 0%, #000000 100%);
                border: 1px solid @border-color-base;
                border-radius: @border-radius-base;
                .banner {
                    border-radius: 10px 10px 0 0;
                    overflow: hidden;
                    > img {
                        display: inline-block;
                        width: 100%;
                        height: 180px;
                        object-fit: cover;
                    }
                }
                .content {
                    padding: 32px 40px 38px;
                }
                .header {
                    margin-bottom: 24px;
                    display: flex;
                    align-items: center;
                    .logo {
                        display: inline-flex;
                        margin-right: 16px;
                        width: 78px;
                        height: 78px;
                        border-radius: 50%;
                        overflow: hidden;
                        // background: #fff;
                        > img {
                            width: 100%;
                        }
                    }
                    .name {
                        margin-bottom: 7px;
                        font-weight: 500;
                        font-size: 22px;
                    }
                    .follower {
                        font-size: 14px;
                    }
                }
                .desc {
                    margin-bottom: 16px;
                    color: #8987a1;
                    > span {
                        display: inline-flex;
                        margin-bottom: 8px;
                        font-weight: 500;
                        font-size: 14px;
                    }
                    .ellipsis {
                        height: calc(1.5 * 14px * 2);
                        line-height: 1.5;
                        overflow: hidden;
                        display: -webkit-box;
                        text-overflow: ellipsis;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                }
                .btn {
                    text-align: center;
                    .ant-btn {
                        width: 100%;
                        height: 40px;
                        font-size: 16px;
                    }
                    .svg-icon {
                        margin-left: 8px;
                        font-size: 20px;
                    }
                }
            }
        }
    }
    @media (max-width: 991px) {
        .explore {
            .community-list {
                grid-template-columns: 1fr 1fr;
                .item {
                    .banner {
                        > img {
                            height: 140px;
                        }
                    }
                    .content {
                        padding: 24px 32px;
                    }
                    .header {
                        margin-bottom: 16px;
                        .logo {
                            margin-right: 12px;
                            width: 60px;
                            height: 60px;
                        }
                        .name {
                            margin-bottom: 4px;
                            font-size: 18px;
                        }
                    }
                }
            }
        }
    }
    @media (max-width: 767px) {
        .explore {
            .community-list {
                grid-template-columns: 1fr;
                .item {
                    .banner {
                        > img {
                            height: 120px;
                        }
                    }
                    .content {
                        padding: 24px;
                    }
                    .header {
                        margin-bottom: 8px;
                        .logo {
                            width: 48px;
                            height: 48px;
                        }
                        .name {
                            font-size: 16px;
                        }
                        .follower {
                            font-size: 12px;
                        }
                    }
                    .btn {
                        .ant-btn {
                            height: 36px;
                            font-size: 14px;
                        }
                        .svg-icon {
                            margin-left: 8px;
                            font-size: 16px;
                        }
                    }
                }
            }
        }
    }
</style>

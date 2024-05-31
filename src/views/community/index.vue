<template>
    <div class="backers">
        <div class="container">
            <div class="swiper backers-swiper">
                <div class="swiper-wrapper">
                    <div
                        class="swiper-slide"
                        v-for="item in backersCarousel"
                        :key="item.id"
                    >
                        <div class="item">
                            <div>
                                <div class="header">
                                    <span class="logo">
                                        <img :src="item.logoUrl" alt="" />
                                    </span>
                                    <div>
                                        <p class="name">{{ item.name }}</p>
                                        <p class="follower">
                                            {{
                                                converter(item.followerCount, 0)
                                            }}
                                            Followers
                                        </p>
                                    </div>
                                </div>
                                <div class="desc">
                                    <span>Community Description</span>
                                    <p>
                                        {{ item.introduction }}
                                    </p>
                                </div>
                                <div class="btn">
                                    <a-button
                                        type="primary"
                                        @click="goTwitter(item.twitterUrl)"
                                    >
                                        <svg-icon
                                            icon-class="twitter"
                                        ></svg-icon>
                                        twitter
                                    </a-button>
                                </div>
                            </div>
                            <div class="banner">
                                <img :src="item.imageUrl" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
            <result :isLoading="loading" :isEmpty="!backers.length">
                <div class="community-list">
                    <div class="item" v-for="item in backers" :key="item.id">
                        <div class="banner">
                            <img :src="item.imageUrl" alt="" />
                        </div>
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
                            <span>Community Description</span>
                            <p class="ellipsis">{{ item.introduction }}</p>
                        </div>
                        <div class="btn">
                            <a-button
                                type="primary"
                                @click="goTwitter(item.twitterUrl)"
                            >
                                <svg-icon icon-class="twitter"></svg-icon>
                                twitter
                            </a-button>
                        </div>
                    </div>
                </div>
            </result>
        </div>
    </div>
</template>

<script>
    import { fetchCommunity } from '@/api/statistics'
    import Result from '@/components/common/Result.vue'
    import { converter } from '@/utils'

    export default {
        name: 'Airdrop',
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
        mounted() {
            this.initSwiper()
        },
        methods: {
            converter,
            initSwiper() {
                new window.Swiper('.backers-swiper', {
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                })
            },
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
    .backers {
        padding-top: 24px;
        padding-bottom: 72px;
        .community-list {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 24px;
            .item {
                padding: 24px 20px 30px;
                border-radius: 16px;
                color: #000000;
                background: #ffffff;
                .banner {
                    margin-bottom: 20px;
                    border-radius: 16px;
                    overflow: hidden;
                    > img {
                        width: 100%;
                        height: 142px;
                        object-fit: cover;
                    }
                }
                .header {
                    margin-bottom: 20px;
                    display: flex;
                    align-items: center;
                    .logo {
                        display: inline-flex;
                        margin-right: 16px;
                        width: 72px;
                        height: 72px;
                        border-radius: 50%;
                        overflow: hidden;
                        > img {
                            width: 100%;
                        }
                    }
                    .name {
                        margin-bottom: 8px;
                        white-space: nowrap;
                        font-weight: 500;
                        font-size: 24px;
                    }
                }
                .desc {
                    margin-bottom: 30px;
                    > span {
                        display: inline-flex;
                        margin-bottom: 8px;
                        font-weight: 500;
                        font-size: 20px;
                    }
                    .ellipsis {
                        overflow: hidden;
                        display: -webkit-box;
                        text-overflow: ellipsis;
                        -webkit-line-clamp: 4;
                        -webkit-box-orient: vertical;
                        height: 104px;
                        line-height: 26px;
                    }
                }
                .btn {
                    text-align: center;
                    .ant-btn {
                        display: inline-flex;
                        align-items: center;
                    }
                    .svg-icon {
                        margin-right: 8px;
                        font-size: 20px;
                    }
                }
            }
        }
        .backers-swiper {
            margin-bottom: 20px;
            border-radius: 16px;
            background: #ffffff;
            &:hover {
                .swiper-button-prev,
                .swiper-button-next {
                    visibility: visible;
                }
            }
            .swiper-button-prev,
            .swiper-button-next {
                visibility: hidden;
                width: 48px;
                height: 48px;
                border-radius: 16px;
                background-color: rgba(0, 0, 0, 0.3);
                transition: all 0.3s cubic-bezier(0.65, 0.05, 0.36, 1);
                &:after {
                    font-size: 24px;
                    color: #ffffff;
                }
            }
            .item {
                display: grid;
                grid-template-columns: 1fr 1.3fr;
                grid-gap: 36px;
                padding: 30px;
                color: #000000;
                .banner {
                    height: 384px;
                    border-radius: 16px;
                    overflow: hidden;
                    > img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .header {
                    margin-bottom: 30px;
                    display: flex;
                    align-items: center;
                    .logo {
                        display: inline-flex;
                        margin-right: 16px;
                        width: 92px;
                        height: 92px;
                        border-radius: 50%;
                        overflow: hidden;
                        > img {
                            width: 100%;
                        }
                    }
                    .name {
                        margin-bottom: 8px;
                        font-weight: 500;
                        font-size: 24px;
                    }
                }
                .desc {
                    margin-bottom: 20px;
                    > span {
                        display: inline-flex;
                        margin-bottom: 12px;
                        font-weight: 500;
                        font-size: 20px;
                    }
                    > p {
                        line-height: 26px;
                    }
                }
                .btn {
                    .ant-btn {
                        display: inline-flex;
                        align-items: center;
                    }
                    .svg-icon {
                        margin-right: 8px;
                        font-size: 20px;
                    }
                }
            }
        }
    }
    @media (max-width: 991px) {
        .backers {
            .backers-swiper {
                display: none;
            }
            .community-list {
                grid-template-columns: 1fr 1fr;
                .item {
                    padding: 12px 12px 28px;
                    .header {
                        margin-bottom: 16px;
                        .logo {
                            margin-right: 12px;
                            width: 64px;
                            height: 64px;
                        }
                        .name {
                            margin-bottom: 8px;
                            white-space: nowrap;
                            font-size: 16px;
                        }
                        .follower {
                            font-size: 12px;
                        }
                    }
                    .desc {
                        margin-bottom: 20px;
                        > span {
                            font-size: 16px;
                        }
                        .ellipsis {
                            height: 88px;
                            line-height: 22px;
                        }
                    }
                    .btn {
                        .ant-btn {
                            height: 32px;
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }
    @media (max-width: 575px) {
        .backers {
            .backers-swiper {
                display: none;
            }
            .community-list {
                grid-template-columns: 1fr;
                .item {
                    padding: 12px 12px 28px;
                    .header {
                        margin-bottom: 16px;
                        .logo {
                            margin-right: 12px;
                            width: 64px;
                            height: 64px;
                        }
                        .name {
                            margin-bottom: 8px;
                            font-size: 16px;
                        }
                        .follower {
                            font-size: 12px;
                        }
                    }
                    .desc {
                        margin-bottom: 20px;
                        > span {
                            font-size: 16px;
                        }
                        .ellipsis {
                            height: 88px;
                            line-height: 22px;
                        }
                    }
                    .btn {
                        .ant-btn {
                            height: 32px;
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }
</style>

<template>
    <div class="news">
        <div class="container">
            <h1 class="h-title">News</h1>
            <div class="content">
                <div class="list">
                    <a-row
                        class="item"
                        v-for="item in news"
                        :key="item.id"
                        justify="space-between"
                        algin="stretch"
                        @click="gotoRead(item.sourceUrl)"
                    >
                        <a-col class="logo" :lg="8" :md="8" :sm="24" :xs="24">
                            <img :src="item.image" alt="" />
                        </a-col>
                        <a-col
                            class="content"
                            :lg="16"
                            :md="16"
                            :sm="24"
                            :xs="24"
                        >
                            <div class="title">
                                {{ item.title }}
                            </div>
                            <div class="time">
                                <span>
                                    {{
                                        formatTime(
                                            item.publishTime * 1000,
                                            'yyyy.MM.dd'
                                        )
                                    }}
                                </span>
                                <span>from {{ item.fromUrl }}</span>
                            </div>
                            <div class="desc">
                                {{ item.content }}
                            </div>
                        </a-col>
                    </a-row>
                </div>
                <Observer @intersect="loadMore" v-if="news.length" />
                <result
                    :isLoading="loading"
                    :isEmpty="!news.length"
                    :isLoadMore="page !== 0"
                ></result>
            </div>
        </div>
    </div>
</template>

<script>
    import { formatTime } from '@/utils'
    import { findNews } from '@/api/statistics'
    import Result from '@/components/common/Result.vue'
    import Observer from '@/components/common/Observer.vue'

    export default {
        name: 'News',
        components: {
            Result,
            Observer
        },
        data() {
            return {
                searchKey: '',
                page: 0,
                size: 10,
                isLastPage: false,
                totalElements: 0,
                news: [],
                loading: true
            }
        },
        created() {
            this.getNews()
        },
        methods: {
            formatTime,
            async getNews() {
                this.loading = true
                let param = {
                    page: this.page,
                    size: this.size,
                    title: this.searchKey
                }
                const res = await findNews(param)
                this.news = this.news.concat(res.data.content)
                this.isLastPage = res.data.isLastPage
                this.totalElements = res.data.totalElements
                this.loading = false
            },

            gotoRead(readUrl) {
                window.open(readUrl)
            },

            loadMore() {
                if (this.news.length >= this.totalElements) {
                    return
                }
                if (this.loading) {
                    return
                }
                ++this.page
                this.getNews()
            }
        }
    }
</script>

<style scoped lang="less">
    .news {
        padding-bottom: 60px;
        .content {
            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 40px;
                .label {
                    font-weight: 500;
                    font-size: 28px;
                }
                :deep(.ant-input-affix-wrapper) {
                    width: 480px;
                    height: 48px;
                    .ant-input-suffix {
                        font-size: 16px;
                        cursor: pointer;
                    }
                    .close-icon {
                        margin-right: 12px;
                    }
                    ::placeholder {
                        color: rgba(255, 255, 255, 0.6);
                        font-weight: 300;
                    }
                }
            }
            .item {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                padding: 36px;
                border-radius: @border-radius-base;
                border: 1px solid @border-color-base;
                background: linear-gradient(137deg, #101229 0%, #000000 100%);
                .logo {
                    padding-right: 45px;
                    height: 230px;
                    > img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        background: #f5f5f5;
                        border-radius: 16px;
                    }
                }
                .time {
                    margin-bottom: 20px;
                    color: @text-color-secondary;
                    > span:first-child {
                        margin-right: 16px;
                    }
                }
                .title {
                    margin-bottom: 8px;
                    font-weight: 600;
                    font-size: 26px;
                    line-height: 36px;
                    cursor: pointer;
                }
                .desc {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                    cursor: pointer;
                }
                &:hover {
                    .desc {
                        text-decoration: underline;
                    }
                }
            }
        }
    }

    @media (max-width: 767px) {
        .news {
            .content {
                .header {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 20px;
                    .label {
                        font-size: 16px;
                        margin-bottom: 28px;
                    }
                    :deep(.ant-input-affix-wrapper) {
                        width: 100%;
                        height: 40px;
                        font-size: 14px;
                        .ant-input-suffix {
                            font-size: 14px;
                        }
                        .close-icon {
                            margin-right: 8px;
                        }
                        ::placeholder {
                            font-size: 14px;
                        }
                    }
                }
                .item {
                    padding: 12px 12px 24px;
                    border-radius: 8px;
                    .logo {
                        padding-right: 0;
                        height: 192px;
                        > img {
                            border-radius: 8px;
                        }
                    }
                    .content {
                        margin-top: 16px;
                        .time {
                            font-size: 14px;
                            margin-bottom: 8px;
                            > span:first-child {
                                margin-right: 40px;
                            }
                        }
                        .title {
                            margin-bottom: 8px;
                            font-size: 16px;
                            line-height: 1.6;
                        }
                        .desc {
                            font-size: 14px;
                            -webkit-line-clamp: 6;
                        }
                    }
                }
            }
        }
    }
</style>

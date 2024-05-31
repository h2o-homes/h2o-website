<template>
    <div :class="['vab-result', isLoadMore && 'vab-result-loadmore']">
        <div v-if="isLoading" class="loading">
            <loading-icon />
        </div>
        <div v-else-if="isEmpty" class="empty">
            <a-empty :image="simpleImage">
                <template #description>
                    <span class="empty-text">
                        {{ emptyText }}
                    </span>
                </template>
            </a-empty>
        </div>
        <slot v-else></slot>
    </div>
</template>

<script>
    import { Empty } from 'ant-design-vue'
    import LoadingIcon from './LoadingIcon.vue'
    export default {
        name: 'Result',
        components: { LoadingIcon },
        props: {
            isLoading: {
                type: Boolean,
                default: false
            },
            isEmpty: {
                type: Boolean,
                default: false
            },
            emptyText: {
                type: String,
                default: 'No Data'
            },
            isLoadMore: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                simpleImage: Empty.PRESENTED_IMAGE_SIMPLE
            }
        }
    }
</script>

<style scoped lang="less">
    .vab-result {
        position: relative;
        min-height: 444px;
        .loading,
        .empty {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .empty {
            font-size: 16px;
            font-weight: 300;
        }

        &-loadmore {
            min-height: 180px;
        }
    }
</style>
<style lang="less">
    .empty-text {
        color: #fff;
    }
</style>

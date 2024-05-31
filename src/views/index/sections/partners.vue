<template>
    <section class="partners">
        <div class="gallery">
            <div class="list">
                <div
                    class="list-item"
                    v-for="item in partnersList"
                    :key="item.name"
                >
                    <img
                        class="item-img"
                        :width="item.width"
                        :src="
                            require('@/assets/img/partners/' +
                                item.name +
                                '.png')
                        "
                    />
                </div>
            </div>
            <div class="list">
                <div
                    class="list-item"
                    v-for="item in partnersList"
                    :key="item.name"
                >
                    <img
                        class="item-img"
                        :width="item.width"
                        :src="
                            require('@/assets/img/partners/' +
                                item.name +
                                '.png')
                        "
                    />
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import { partnersList } from '../config'

    export default {
        data() {
            return {
                partnersList
            }
        },
        computed: {}
    }
</script>

<style scoped lang="less">
    .partners {
        @marginRight: 56px;
        margin-bottom: 168px;
        padding: 60px 0;
        .gallery {
            width: 100%;
            display: flex;
            flex-direction: row;
            position: relative;
            overflow: hidden;
            mask-image: linear-gradient(
                to left,
                transparent,
                black 80px,
                black calc(100% - 80px),
                transparent
            );
            .list {
                flex: 0 0 auto;
                min-width: 100%;
                z-index: 1;
                display: flex;
                flex-direction: row;
                align-items: center;
                animation: scroll 40s linear 0s infinite;
                animation-play-state: running;
                animation-delay: 0s;
                animation-direction: normal;

                @keyframes scroll {
                    0% {
                        transform: translateX(0%);
                    }
                    100% {
                        transform: translateX(-100%);
                    }
                }
                .list-item {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: @marginRight;
                    cursor: pointer;
                }
            }
        }
    }
</style>

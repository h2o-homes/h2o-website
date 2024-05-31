<template>
    <div class="features">
        <div class="header">Core Features</div>
        <div :class="isMobileType ? 'container m-swiper-container' : ''">
            <div class="swiper">
                <div class="swiper-wrapper">
                    <div
                        class="swiper-slide"
                        v-for="item in features"
                        :key="item.key"
                    >
                        <div class="item">
                            <div class="icon">
                                <img
                                    :src="
                                        require('@/assets/img/index/' +
                                            item.img)
                                    "
                                    alt=""
                                />
                            </div>

                            <div class="desc">
                                <div
                                    class="title"
                                    v-html="item.mTitle"
                                    v-if="isMobileType"
                                ></div>
                                <div
                                    class="title"
                                    v-html="item.title"
                                    v-else
                                ></div>
                                <div class="text">
                                    <p>
                                        {{ item.desc }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="swiper-button-prev">
                    <svg-icon icon-class="arrow-left"></svg-icon>
                </div>
                <div class="swiper-button-next">
                    <svg-icon icon-class="arrow-right"></svg-icon>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                breakPoint: 4,
                features: [
                    {
                        key: 'f1',
                        title: 'Dynamic Learning and <br />Information Nexus',
                        mTitle: `Dynamic Learning and Information Nexus`,
                        img: 'f1.png',
                        desc: 'A comprehensive platform featuring a task-based learning system, up-to-date news aggregation, and a community welfare system that includes token airdrops and whitelisting opportunities.'
                    },
                    {
                        key: 'f2',
                        title: 'Community <br />Empowerment Hub',
                        mTitle: 'Community Empowerment Hub',
                        img: 'f2.png',
                        desc: 'H2O aggregates community insights and resources, providing members with early testing opportunities, token rewards, and exclusive participation mechanisms.'
                    },
                    {
                        key: 'f3',
                        title: 'Innovative <br />Launchpad',
                        mTitle: 'Innovative <br /> Launchpad',
                        img: 'f3.png',
                        desc: 'H2O showcases selected community projects, offering unparalleled industry support and exposure to foster their development.'
                    }
                ]
            }
        },
        mounted() {
            this.initSwiper()
        },
        computed: {
            ...mapGetters({
                screenLevel: 'settings/screenLevel'
            }),
            isMobileType() {
                return this.screenLevel < this.breakPoint
            }
        },
        watch: {
            screenLevel() {
                this.initSwiper()
            }
        },
        methods: {
            initSwiper() {
                const flag = this.screenLevel >= this.breakPoint // >=992
                if (flag) {
                    this.initDeskSwiper()
                } else {
                    this.initSwiperMobile()
                }
            },
            initDeskSwiper() {
                new window.Swiper('.swiper', {
                    effect: 'coverflow',
                    initialSlide: 1,
                    grabCursor: false,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    coverflowEffect: {
                        rotate: 0,
                        stretch: 0,
                        depth: 0,
                        modifier: 2,
                        slideShadows: true
                    },
                    keyboard: {
                        enabled: true
                    },
                    mousewheel: false,
                    spaceBetween: 34,
                    loop: false,
                    paginationClickable: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                })
            },
            initSwiperMobile() {
                new window.Swiper('.swiper', {
                    initialSlide: 1,
                    grabCursor: false,
                    centeredSlides: true,
                    // slidesPerView: 'auto',
                    keyboard: {
                        enabled: true
                    },
                    mousewheel: false,
                    loop: false,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .features {
        margin-bottom: 174px;
        .header {
            margin-bottom: 48px;
            text-align: center;
            font-weight: 700;
            font-size: 45px;
        }
        .m-swiper-container {
            .swiper {
                mask-image: none;
                .swiper-button-prev,
                .swiper-button-next {
                    display: none;
                }
            }
        }
        .swiper {
            mask-image: linear-gradient(
                to left,
                transparent,
                black 400px,
                black calc(100% - 400px),
                transparent
            );
            .swiper-button-prev,
            .swiper-button-next {
                width: 78px;
                height: 78px;
                font-size: 24px;
                color: @text-color;
                border: 1px solid @text-color;
                border-radius: 50%;
                transition: border-color 0.3s;
                &:after {
                    display: none;
                }
                &:hover {
                    border-color: @primary-color;
                }
            }
            .swiper-button-prev {
                left: 50%;
                transform: translateX(-494px);
            }
            .swiper-button-next {
                right: 50%;
                transform: translateX(494px);
            }
        }
        .swiper-slide {
            width: 800px;
            max-width: 100%;
            &:first-child {
                .item {
                    .desc {
                        width: 96%;
                    }
                }
            }
        }
        .item {
            padding: 60px;
            text-align: center;
            border: 1px solid @border-color-base;
            border-radius: @border-radius-base;
            background: linear-gradient(137deg, #101229 0%, #000000 100%);
            .icon {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 auto;
                width: 464px;
                height: 290px;
                > img {
                    max-width: 100%;
                    max-height: 100%;
                }
            }
            .desc {
                margin-top: 40px;
                width: 82%;
                text-align: left;
                .title {
                    margin-bottom: 24px;
                    font-weight: 600;
                    font-size: 45px;
                    line-height: 1;
                }
                .text {
                    color: @text-color-secondary;
                }
            }
        }
    }

    @media screen and (max-width: 767px) {
        .features {
            margin-bottom: 80px;
            .header {
                margin-bottom: 40px;
                font-size: 24px;
            }
            .item {
                padding: 30px 48px 64px;
                .icon {
                    width: 196px;
                    height: 196px;
                }
                .desc {
                    width: 100%;
                    .title {
                        font-size: 24px;
                    }
                }
            }
        }
    }
</style>

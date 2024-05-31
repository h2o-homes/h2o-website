<template>
    <section class="banner">
        <div class="wrapper">
            <div class="container">
                <div class="content">
                    <div class="header">
                        Unlock the
                        <br v-if="screenLevel === 1" />
                        power of
                        <br />
                        the Blockchain
                        <div class="bold">with H2O</div>
                    </div>
                    <div class="desc">
                        Your portal to the latest industry insights and
                        exclusive community benefits. Connect and thrive in the
                        decentralized digital era.
                    </div>
                </div>
                <div class="btn">
                    <a-button type="h2o" @click="goExplore">
                        Go Explore
                        <svg-icon icon-class="arrow-right"></svg-icon>
                    </a-button>
                    <a-button ghost @click="viewGitbook">
                        Gitbook
                        <svg-icon icon-class="arrow-right"></svg-icon>
                    </a-button>
                </div>
            </div>
        </div>
        <partners v-if="screenLevel < 3" />
    </section>
</template>
<script>
    import { mapGetters } from 'vuex'
    import Partners from '@/views/index/sections/partners.vue'

    export default {
        components: { Partners },
        computed: {
            ...mapGetters({
                screenLevel: 'settings/screenLevel'
            })
        },
        methods: {
            goExplore() {
                this.$router.push({
                    name: 'Explore'
                })
            },
            viewGitbook() {
                window.open('https://h2o-1.gitbook.io/h2o-witepaper')
            }
        }
    }
</script>

<style scoped lang="less">
    .banner {
        position: relative;
        background: linear-gradient(to bottom, #072fff, transparent);
        .partners {
            position: absolute;
            bottom: 10vh;
            width: 100%;
            margin: 0;
            padding: 0;
        }
        &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 450px;
            background: url('../../../assets/img/index/banner-i1.png') center
                no-repeat;
            background-size: 910px 450px;
        }
        .wrapper {
            position: relative;
            display: flex;
            align-items: center;
            margin: 0 auto;
            //width: 1000px;
            height: 100vh;
            max-width: 100%;
            min-height: 100vh;
            .content {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 64px 0;
                text-align: center;
                //border: 1px solid;
                &:before {
                    content: '';
                    position: absolute;
                    left: -192px;
                    bottom: -176px;
                    width: 600px;
                    height: 600px;
                    background: url('../../../assets/img/index/c2.png') center
                        no-repeat;
                    background-size: 100% 100%;
                }
                &:after {
                    content: '';
                    position: absolute;
                    right: -184px;
                    bottom: -32px;
                    width: 468px;
                    height: 468px;
                    background: url('../../../assets/img/index/c3.png') center
                        no-repeat;
                    background-size: 100% 100%;
                }
            }
            .header {
                position: relative;
                margin-bottom: 36px;
                font-size: 75px;
                line-height: 1;
                &:before {
                    content: '';
                    position: absolute;
                    left: -208px;
                    top: -196px;
                    width: 328px;
                    height: 328px;
                    background: url('../../../assets/img/index/c3.png') center
                        no-repeat;
                    background-size: 100% 100%;
                }
                .bold {
                    font-weight: 700;
                }
            }
            .desc {
                max-width: 100%;
                width: 424px;
                font-size: 18px;
                color: #b6b6b6;
            }
            .btn {
                display: flex;
                gap: 20px;
                justify-content: center;
                margin-top: 8px;
                .ant-btn {
                    padding: 20px 40px;
                    height: 70px;
                    font-size: 20px;
                    .svg-icon {
                        margin-left: 12px;
                    }
                }
            }
        }
    }

    @media (min-width: 991px) {
        .banner {
            .wrapper {
                > .container {
                    width: 1000px;
                }
            }
        }
    }

    @media (max-width: 991px) {
        .banner {
            .content {
                &:before {
                    display: none;
                }
            }
        }
    }

    @media (max-width: 767px) {
        .banner {
            &:after {
                content: '';
                position: absolute;
                right: -130px;
                top: 50%;
                transform: translateY(-200px);
                width: 260px;
                height: 260px;
                background: url('../../../assets/img/index/c2.png') center
                    no-repeat;
                background-size: 100% 100%;
            }
            .wrapper {
                .content {
                    padding: 32px 0;
                    align-items: flex-start;
                    text-align: left;
                    &:before,
                    &:after {
                        display: none;
                    }
                    .header {
                        margin-bottom: 32px;
                        font-size: 40px;
                        &:before {
                            display: none;
                        }
                    }
                    .desc {
                        padding-right: 24px;
                        font-size: 15px;
                    }
                }
                .btn {
                    .ant-btn {
                        padding: 16px 24px;
                        height: 54px;
                        font-size: 16px;
                    }
                }
            }
        }
    }
</style>

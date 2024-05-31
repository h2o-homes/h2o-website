<template>
    <div class="footer">
        <div class="container">
            <div class="wrapper">
                <div class="contact">
                    <img src="@/assets/img/logo.png" alt="" class="logo" />
                    <div class="grid">
                        <span>
                            <a
                                href="https://github.com/h2o-homes"
                                target="_blank"
                            >
                                <svg-icon icon-class="github-fill"></svg-icon>
                            </a>
                        </span>
                        <span>
                            <a
                                href="https://medium.com/@H2O_Homes"
                                target="_blank"
                            >
                                <svg-icon icon-class="medium-fill"></svg-icon>
                            </a>
                        </span>
                        <span>
                            <a href="https://t.me/H2OHomesNews" target="_blank">
                                <svg-icon icon-class="telegram-fill"></svg-icon>
                            </a>
                        </span>
                        <span>
                            <a
                                href="https://twitter.com/H2O_Homes"
                                target="_blank"
                            >
                                <svg-icon icon-class="twitter-fill"></svg-icon>
                            </a>
                        </span>
                    </div>
                </div>
                <div class="desc">
                    Experience the future of DAO.
                    <br />
                    With H2O DAO, endless possibilities are available.
                </div>
            </div>
            <div class="m-wrapper">
                <img src="@/assets/img/logo.png" alt="" class="logo" />
                <div class="copyright">
                    Copyright
                    <b>H2O DAO</b>
                    All right reserved.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Footer',
        data() {
            return {
                year: new Date().getFullYear()
            }
        },
        methods: {}
    }
</script>

<style scoped lang="less">
    .footer {
        display: flex;
        justify-content: center;
        padding-bottom: 98px;
        .wrapper {
            display: block;
            padding: 50px 70px 60px;
            border: 1px solid @border-color-base;
            border-radius: @border-radius-base;
            background: linear-gradient(137deg, #101229 0%, #000000 100%);
        }
        .m-wrapper {
            display: none;
            text-align: center;
            .logo {
                margin-bottom: 24px;
                width: 104px;
            }
            .copyright {
                color: @text-color-secondary;
            }
        }
        .contact {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 96px;

            .grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                grid-gap: 12px;
            }
            .logo {
                width: 86px;
            }
            .svg-icon {
                font-size: 38px;
                cursor: pointer;
            }
        }
        .desc {
            font-size: 16px;
            color: @text-color-secondary;
        }
    }

    @media (max-width: 767px) {
        .footer {
            .wrapper {
                display: none;
            }
            .m-wrapper {
                display: block;
            }
        }
    }
</style>

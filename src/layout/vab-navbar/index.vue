<template>
    <nav>
        <header class="header">
            <div class="container">
                <a href="#" class="logo-wrap" @click="goHome">
                    <img
                        class="logo"
                        src="../../assets/img/logo.png"
                        alt="h2o"
                    />
                </a>
                <ul class="nav-list-wrap">
                    <li
                        v-for="item in navList"
                        :key="item.key"
                        :class="{
                            'active-nav': activeKey === item.key
                        }"
                        class="nav__list-item"
                        @click="handleLink(item)"
                    >
                        <a v-if="item.href" :href="item.href" target="_blank">
                            {{ item.label }}
                        </a>
                        <a v-else href="#">
                            {{ item.label }}
                        </a>
                    </li>
                </ul>
                <div class="action">
                    <a-dropdown
                        v-if="currentRoute === 'Index'"
                        placement="bottomRight"
                        overlayClassName="trade-dropdown"
                    >
                        <a-button type="link">TRADE NOW</a-button>
                        <template v-slot:overlay>
                            <a-menu>
                                <a-menu-item @click="toHuobi">
                                    Huobi
                                </a-menu-item>
                                <a-menu-item @click="toHucoin">
                                    Kucoin
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>

                    <vab-avatar v-else />
                </div>
                <div class="menu-icon">
                    <span class="menu-icon__line menu-icon__line-left"></span>
                    <span class="menu-icon__line"></span>
                    <span class="menu-icon__line menu-icon__line-right"></span>
                </div>
            </div>
        </header>

        <!--Mobile Mask Layer-->
        <div class="nav">
            <div class="nav__content">
                <div class="container">
                    <ul class="nav__list">
                        <li
                            v-for="item in navList"
                            :key="item.key"
                            :class="{ 'active-nav': activeKey === item.key }"
                            class="nav__list-item"
                            @click="target(item)"
                        >
                            <a
                                class="link"
                                v-if="item.href"
                                :href="item.href"
                                target="_blank"
                            >
                                {{ item.label }}
                            </a>
                            <a class="link" v-else href="#">
                                {{ item.label }}
                            </a>
                        </li>
                        <li class="nav__list-item list-item-action">
                            <div class="title" @click="toHuobi">TRADE NOW</div>
                            <a :href="huobi" target="_blank">HUOBI</a>
                            <a :href="kucoin" target="_blank">KUCOIN</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
    import VabAvatar from '@/layout/vab-avatar/index.vue'

    export default {
        components: { VabAvatar },
        data() {
            return {
                activeKey: 'metars',
                navList: [
                    {
                        type: 'route',
                        label: 'BENEFITS',
                        key: 'Benefits'
                    },
                    {
                        type: 'route',
                        label: 'EXPLORE',
                        key: 'Explore'
                    },
                    {
                        type: 'route',
                        label: 'NEWS',
                        key: 'News'
                    },
                    {
                        type: 'href',
                        label: 'GITBOOK',
                        href: 'https://h2o-1.gitbook.io/h2o-witepaper'
                    }
                ],
                kucoin: 'https://www.kucoin.com/trade/H2O-USDT',
                huobi: 'https://www.htx.com/trade/h2o_usdt'
            }
        },
        computed: {
            currentRoute() {
                return this.$route.name
            }
        },
        mounted() {
            this.initData()
        },
        methods: {
            initData() {
                const body = document.querySelector('body')
                const menu = document.querySelector('.menu-icon')
                menu.addEventListener('click', () => {
                    this.toggleClass(body, 'nav-active')
                })
            },
            toggleClass(element, stringClass) {
                if (element.classList.contains(stringClass))
                    element.classList.remove(stringClass)
                else element.classList.add(stringClass)
            },
            target(item) {
                const body = document.querySelector('body')
                this.toggleClass(body, 'nav-active')
                this.handleLink(item)
            },
            goHome() {
                const body = document.querySelector('body')
                if (body.classList.contains('nav-active')) {
                    body.classList.remove('nav-active')
                }
                this.$router.push({
                    name: 'Index'
                })
            },
            handleLink(route) {
                if (route.type === 'href') {
                    window.open(route.href)
                    return
                }
                this.$router.push({
                    name: route.key
                })
            },
            toHuobi() {
                window.open(this.huobi)
            },
            toHucoin() {
                window.open(this.kucoin)
            }
        }
    }
</script>
<style lang="less">
    body.nav-active {
        overflow: hidden;
    }
    .trade-dropdown {
        .ant-dropdown-menu {
            .ant-dropdown-menu-item {
                &:hover {
                    color: #0753ed;
                }
                &:focus {
                    color: @disabled-bg;
                }
            }
        }
    }
</style>
<style scoped lang="less">
    .header {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        height: @vab-header-height;
        width: 100%;
        font-weight: 600;
        z-index: 100;
        > .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo-wrap {
            width: 128px;
            cursor: pointer;
            .logo {
                width: 84px;
            }
        }
        .nav-list-wrap {
            display: flex;
            gap: 48px;
            //font-family: Amiri;
            font-weight: 600;
        }

        .action {
            display: flex;
            justify-content: flex-end;
            width: 128px;
            :deep(.ant-btn) {
                font-weight: 600;
            }
        }
        .menu-icon {
            position: relative;
            display: none;
            height: 20px;
            width: 20px;
            cursor: pointer;
            z-index: 2;
            .menu-icon__line {
                display: block;
                height: 2px;
                width: 20px;
                margin-bottom: 5px;
                background-color: #fff;
                transition: transform 0.2s;
            }
        }
    }

    .nav {
        position: fixed;
        z-index: 98;
        &:before {
            content: '';
            position: fixed;
            width: 100vw;
            height: 100vh;
            top: 0;
            background: rgb(0, 0, 0);
            border-bottom-left-radius: 200%;
            z-index: -1;
            transition: transform cubic-bezier(0.77, 0, 0.175, 1) 0.5s,
                border-radius linear 0.4s;
            transform: translateX(100%) translateY(-100%);
        }
        .nav__content {
            position: fixed;
            top: 0;
            margin-top: 140px;
            width: 100%;
            visibility: hidden;
        }

        .nav__list {
            padding: 0;
            margin: 0;
            z-index: 2;
            .nav__list-item {
                display: block;
                opacity: 0;
                color: #fff;
                font-size: 24px;
                line-height: 50px;
                transition: opacity 0.2s;
                > a {
                    display: block;
                }
            }
            .list-item-action {
                > a {
                    font-size: 20px;
                }
            }
        }
    }

    .nav-active {
        .menu-icon__line {
            transform: translate(0px, 0px) rotate(-45deg);
        }
        .menu-icon__line-left {
            transform: translate(0, 7px) rotate(45deg);
        }
        .menu-icon__line-right {
            transform: translate(0, -6.5px) rotate(45deg);
        }

        .nav {
            &::before {
                background: rgba(0, 0, 0, 0.95);
                transform: translateX(0%) translateY(0%);
                border-radius: 0;
                transition-delay: 0s;
            }
            .nav__content {
                visibility: visible;
            }
            .nav__list-item {
                opacity: 1;
                transform: translateX(0%);
                transition: opacity 0.3s, color 0.3s;
                transition-delay: 0.4s;
            }
        }
    }

    @media (max-width: 991px) {
        .header {
            position: absolute;
            height: @vab-trigger-height;
            .nav-list-wrap {
                display: none;
            }
            .action {
                display: none;
            }
            .menu-icon {
                display: inline-block;
            }
        }
    }
</style>

<template>
    <div class="navbar" id="navbar">
        <div class="header">
            <span class="brand" @click="goHome">
                <img src="../../../assets/img/logo.png" alt="" class="logo" />
            </span>
            <div class="menu">
                <div class="menu-list">
                    <span
                        class="menu-item"
                        v-for="route in routeList"
                        :key="route.key"
                        :class="{
                            'current-menu-item': currentRoute === route.key
                        }"
                    >
                        <a @click="handleLink(route)">{{ route.label }}</a>
                    </span>
                </div>

                <a-dropdown
                    placement="bottom"
                    class="navbar-dropdown"
                    trigger="['click']"
                >
                    <div class="menu-icon">
                        <span
                            class="menu-icon__line menu-icon__line-left"
                        ></span>
                        <span class="menu-icon__line"></span>
                        <span
                            class="menu-icon__line menu-icon__line-right"
                        ></span>
                    </div>
                    <template #overlay>
                        <a-menu class="navbar-dropdown-menu">
                            <a-menu-item
                                class="link"
                                v-for="item in routeList"
                                :class="{
                                    active: currentRoute === item.key
                                }"
                                :key="item.label"
                                @click="handleLink(item)"
                            >
                                <span>
                                    {{ item.label }}
                                </span>
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Navbar',
        data() {
            return {
                activeKey: 'Home',
                routeList: [
                    {
                        type: 'route',
                        label: 'Home',
                        key: 'Home'
                    },
                    {
                        type: 'route',
                        label: 'Airdrop',
                        key: 'Airdrop'
                    },
                    {
                        type: 'route',
                        label: 'Community',
                        key: 'Community'
                    },
                    {
                        type: 'route',
                        label: 'News',
                        key: 'News'
                    },
                    {
                        type: 'href',
                        label: 'Gitbook',
                        href: 'https://h2o-1.gitbook.io/h2o-witepaper'
                    }
                ]
            }
        },
        computed: {
            currentRoute() {
                return this.$route.name
            }
        },
        components: {},
        mounted() {},
        methods: {
            handleLink(route) {
                if (route.type === 'href') {
                    window.open(route.href)
                    return
                }
                this.$router.push({
                    name: route.key
                })
            },
            goHome() {
                this.$router.push({
                    name: 'Home'
                })
            }
        }
    }
</script>

<style lang="less">
    body.nav-active {
        overflow: hidden;
    }
</style>
<style scoped lang="less">
    @navHeight: 100vh;
    @activeColor: #19ffc7;
    @maskBg: rgba(12, 132, 211, 0.9);
    .navbar {
        transition: transform 0.3s;
        &.navbar-bar--fixed {
            transform: translateY(-100px);
        }
        .header {
            position: absolute;
            top: 0;
            display: flex;
            align-items: center;
            padding: 0 32px;
            width: 100%;
            height: @vab-header-height;
            z-index: 100;
            transition: ease 0.4s;
        }
        .brand {
            padding: 0 16px;
            cursor: pointer;
            .logo {
                width: 110px;
                max-width: 110px;
            }
        }

        .menu {
            display: flex;
            align-items: center;
            list-style: none;
            padding: 0;
            overflow: hidden;
            margin: 0 0 0 auto;
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
                    transition: transform 0.2s ease;
                }
                &.ant-dropdown-open {
                    .menu-icon__line {
                        transform: translate(0px, 0px) rotate(-45deg);
                        //background-color: #000000;
                    }
                    .menu-icon__line-left {
                        transform: translate(0, 7px) rotate(45deg);
                    }
                    .menu-icon__line-right {
                        transform: translate(0, -6.5px) rotate(45deg);
                    }
                }
            }
            .menu-list {
                display: flex;
                .menu-item {
                    position: relative;
                    cursor: pointer;
                    &:hover {
                        color: @activeColor;
                    }
                    &.current-menu-item {
                        color: @activeColor;
                        &:after {
                            opacity: 1;
                            transform: scale(1);
                        }
                    }
                    &:after {
                        content: '';
                        background-color: @activeColor;
                        width: 4px;
                        height: 4px;
                        border-radius: 50%;
                        position: absolute;
                        left: calc(50% - 2px);
                        bottom: 0;
                        opacity: 0;
                        transform: scale(0);
                        transition: all 0.5s cubic-bezier(0.85, 0, 0.15, 1);
                    }
                    > a {
                        display: flex;
                        padding: 8px 16px;
                    }
                }
            }
        }
    }
    @media (max-width: 767px) {
        .navbar {
            .header {
                padding: 0 16px;
            }
            .brand {
                padding: 0;
                .logo {
                    width: 16vw;
                }
            }
            .menu {
                .menu-list {
                    display: none;
                }
                .menu-icon {
                    display: inline-block;
                }
            }
        }
    }
</style>

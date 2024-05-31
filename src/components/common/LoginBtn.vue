<template>
    <div class="comp-login-btn">
        <a-button :type="btnType" @click="login" v-if="!defaultAccount">
            CONNECT WALLET
        </a-button>
        <slot v-else>
            <a-button :type="btnType" @click="login">
                {{
                    defaultAccount.slice(0, 2) +
                    '...' +
                    defaultAccount.slice(-5)
                }}
            </a-button>
        </slot>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    window.web3Modal = null

    export default {
        computed: {
            ...mapGetters({
                defaultAccount: 'web3/defaultAccount'
            })
        },
        props: {
            showIcon: {
                default: true
            },
            btnType: {
                default: 'link'
            }
        },
        methods: {
            login() {
                window.web3Modal.open()
            }
        }
    }
</script>

<style scoped lang="less">
    .comp-login-btn {
        .ant-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            &.ant-btn-link {
                text-decoration: underline;
            }
        }
    }
</style>

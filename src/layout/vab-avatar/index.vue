<template>
    <div class="vab-avatar">
        <login-btn></login-btn>
    </div>
</template>

<script>
    import LoginBtn from '@/components/common/LoginBtn.vue'

    export default {
        name: 'VabAvatar',
        components: { LoginBtn },
        created() {
            this.$store.dispatch('web3/initWeb3Modal')
        }
    }
</script>
<style lang="less">
    .vab-avatar {
        display: flex;
        align-items: center;
        margin-left: 24px;
        .ant-btn {
            display: flex;
            align-items: center;
            padding: 0;
            .svg-icon {
                margin-left: 6px;
                color: #000000;
            }
            &.ant-btn-background-ghost {
                border-width: 2px;
            }
            &.ant-btn-text {
                display: flex;
                align-items: center;
                padding: 0;
                color: #ffffff;
                .svg-icon {
                    margin-left: 6px;
                    color: #ffffff;
                }
            }
        }
    }
    @media (max-width: 767px) {
        .vab-avatar {
            .ant-btn {
                padding: 0 20px;
                height: 32px;
                font-weight: 300;
                font-size: 14px;
                &.m-btn {
                    display: block;
                }
                &.d-btn {
                    display: none;
                }
            }
        }
    }
</style>

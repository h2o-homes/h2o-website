<template>
    <div class="footer container">
        <div class="row">
            <a href="https://twitter.com/H2O_Homes" target="_blank">
                <svg-icon icon-class="twitter"></svg-icon>
            </a>
            <a-dropdown placement="top">
                <svg-icon icon-class="telegram"></svg-icon>
                <template #overlay>
                    <a-menu>
                        <a-menu-item>
                            <a href="https://t.me/H2OHomes" target="_blank">
                                Group
                            </a>
                        </a-menu-item>
                        <a-menu-item>
                            <a href="https://t.me/H2OHomesNews" target="_blank">
                                Channel
                            </a>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
            <a href="https://discord.gg/fMC5mMGrqr" target="_blank">
                <svg-icon icon-class="discord"></svg-icon>
            </a>
        </div>

        <div class="copyright">Copyright ©️ H2O 2022. All Rights Reserved</div>
    </div>
</template>

<script>
    export default {
        name: 'Footer',
        methods: {}
    }
</script>

<style scoped lang="less">
    .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: rgba(255, 255, 255, 0.6);
        background-color: rgba(255, 255, 255, 0.1);
        > .row {
            padding: 48px 0 112px;
            width: 100%;
        }
        .contact {
            .svg-icon {
                width: 32px;
                height: 32px;
                cursor: pointer;
            }
        }
    }
</style>

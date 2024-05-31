<template>
    <a-modal
        :footer="null"
        v-model:visible="visible"
        @cancel="close"
        wrapClassName="notice-modal"
        class="h-notice-dialog"
        centered
    >
        <template #title>
            <div class="title">
                <svg-icon icon-class="notice"></svg-icon>
                Announcement
            </div>
        </template>
        <p>
            The H2O platform is committed to following all applicable laws and
            regulations in various countries and regions. However, due to strict
            regulations on encrypted assets in certain countries, such as United
            States of America, Northern Mariana Islands, Afghanistan, Iran,
            Iraq, Albania, Belarus, Puerto Rico, Guam, Syria, Mainland China,
            Cuba, Japan, North Korea, and Zimbabwe, the platform is currently
            unable to provide services to users in these countries. We apologize
            for any inconvenience caused.
        </p>
    </a-modal>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: 'Announcement',
        data() {
            return {
                visible: false
            }
        },
        computed: {
            ...mapGetters({
                showNotice: 'settings/showNotice'
            })
        },
        watch: {
            showNotice(newVal) {
                this.visible = newVal
            }
        },
        mounted() {
            this.visible = this.showNotice
        },
        methods: {
            ...mapActions({ handleShowNotice: 'settings/handleShowNotice' }),
            close() {
                this.handleShowNotice(false)
            }
        }
    }
</script>
<style lang="less">
    .h-notice-dialog {
        padding-bottom: 0;
        .ant-modal-content {
            border: 1px solid @border-color-base;
            border-radius: @border-radius-base;
            background: linear-gradient(137deg, #101229 0%, #000000 100%);
            .ant-modal-header {
                .ant-modal-title {
                    .title {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 10px;
                        font-size: 24px;
                        text-align: center;
                        > img {
                            margin-right: 10px;
                            width: 26px;
                        }
                    }
                }
            }
            .ant-modal-body {
                padding: 0 32px 40px;
                line-height: 2;
                text-align: center;
            }
        }
    }
    @media (max-width: 767px) {
        .notice-dialog {
            width: calc(100vw - 72px) !important;
            .ant-modal-content {
                .ant-modal-header {
                    padding-top: 40px;
                    .ant-modal-title {
                        .title {
                            font-size: 16px;
                            text-align: center;
                            > img {
                                margin-right: 8px;
                                width: 20px;
                            }
                        }
                    }
                }
                .ant-modal-body {
                    padding: 8px 20px 20px;
                    font-size: 12px;
                }
            }
        }
    }
</style>

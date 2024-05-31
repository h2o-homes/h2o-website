<template>
    <router-view />
</template>
<script>
    import { mapActions } from 'vuex'

    export default {
        beforeMount() {
            window.addEventListener('resize', this.handleLayouts)
        },
        beforeUnmount() {
            window.removeEventListener('resize', this.handleLayouts)
        },
        mounted() {
            this.handleLayouts()
        },
        methods: {
            ...mapActions({
                toggleDevice: 'settings/toggleDevice',
                toggleScreenLevel: 'settings/toggleScreenLevel'
            }),
            handleLayouts() {
                const width = document.body.getBoundingClientRect().width
                if (this.width !== width) {
                    const isMobile = width < 768
                    this.toggleDevice(isMobile ? 'mobile' : 'desktop')
                    let level = 5
                    if (width >= 992) {
                        level = 4
                    } else if (width >= 768) {
                        level = 3
                    } else if (width >= 576) {
                        level = 2
                    } else {
                        level = 1
                    }
                    this.toggleScreenLevel(level)
                    this.width = width
                }
            }
        }
    }
</script>
<style lang="less">
    .chart-tooltip {
        position: absolute;
        font-size: 14px;
        color: #000;
        font-weight: 900;
        height: auto;
        width: auto;
    }
</style>

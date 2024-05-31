<template>
    <a-layout class="vab-layout">
        <div id="vab-layout-wrapper">
            <div id="vab-layout-content">
                <vab-navbar />
                <vab-content />
                <vab-footer />
            </div>
        </div>
    </a-layout>
</template>
<script>
    import VabNavbar from './vab-navbar'
    import VabContent from './vab-content'
    import VabFooter from './vab-footer'

    export default {
        components: {
            VabNavbar,
            VabContent,
            VabFooter
        },
        data() {
            return {}
        },
        mounted() {},
        computed: {
            currentRoute() {
                return this.$route.name
            }
        },
        methods: {}
    }
</script>
<style lang="less">
    .vab-layout {
        position: relative;
    }
</style>

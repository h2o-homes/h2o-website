<template>
    <a-layout-content class="vab-content">
        <router-view v-slot="{ Component }">
            <transition mode="out-in" name="fade-transform">
                <component :is="Component" />
            </transition>
        </router-view>
    </a-layout-content>
</template>

<script>
    export default {
        name: 'VabContent',
        data() {
            return {}
        }
    }
</script>

<style lang="less">
    .fade-transform-leave-active,
    .fade-transform-enter-active {
        transition: all 0.2s;
    }

    .fade-transform-enter {
        opacity: 0;
        transform: translateX(30px);
    }

    .fade-transform-leave-to {
        opacity: 0;
        transform: translateX(-30px);
    }

    .vab-content {
        //min-height: calc(100vh - @vab-header-height) !important;
        min-height: 100vh;
        padding: 0;
        .error-container {
            height: calc(
                100vh - @vab-header-height - @vab-padding - @vab-padding -
                    @vab-padding - @vab-padding - @vab-padding
            ) !important;
        }
    }
</style>

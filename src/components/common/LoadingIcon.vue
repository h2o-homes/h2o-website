<template>
    <div class="comp-loading-icon">
        <div class="item" v-for="item in list" :key="item"></div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: Array.from({ length: 12 }).map((_, i) => i)
            }
        }
    }
</script>

<style lang="less" scoped>
    .comp-loading-icon {
        color: official;
        display: inline-block;
        position: relative;
        width: 56px;
        height: 56px;
        .item {
            transform-origin: 28px 28px;
            animation: load_8 1.2s linear infinite;
            &:after {
                content: ' ';
                display: block;
                position: absolute;
                top: 5px;
                left: 26px;
                width: 4px;
                height: 12px;
                border-radius: 6px;
                background: #fff;
            }
            &:nth-child(1) {
                transform: rotate(0deg);
                animation-delay: -1.1s;
            }
            &:nth-child(2) {
                transform: rotate(30deg);
                animation-delay: -1s;
            }
            &:nth-child(3) {
                transform: rotate(60deg);
                animation-delay: -0.9s;
            }
            &:nth-child(4) {
                transform: rotate(90deg);
                animation-delay: -0.8s;
            }
            &:nth-child(5) {
                transform: rotate(120deg);
                animation-delay: -0.7s;
            }
            &:nth-child(6) {
                transform: rotate(150deg);
                animation-delay: -0.6s;
            }
            &:nth-child(7) {
                transform: rotate(180deg);
                animation-delay: -0.5s;
            }
            &:nth-child(8) {
                transform: rotate(210deg);
                animation-delay: -0.4s;
            }
            &:nth-child(9) {
                transform: rotate(240deg);
                animation-delay: -0.3s;
            }
            &:nth-child(10) {
                transform: rotate(270deg);
                animation-delay: -0.2s;
            }
            &:nth-child(11) {
                transform: rotate(300deg);
                animation-delay: -0.1s;
            }
            &:nth-child(12) {
                transform: rotate(330deg);
                animation-delay: 0s;
            }
        }
    }

    @keyframes load_8 {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    @media (max-width: 992px) {
        .comp-loading-icon {
            width: 30px;
            height: 30px;
            .item {
                transform-origin: 15px 15px;
                animation: load_8 1.2s linear infinite;
                &:after {
                    content: ' ';
                    display: block;
                    position: absolute;
                    top: 3px;
                    left: 14px;
                    width: 2px;
                    height: 6px;
                    border-radius: 6px;
                    background: #fff;
                }
            }
        }
    }
</style>

<template>
    <div :style="{ visibility: active }" :ref="ref">
        <div :class="[activeClass]">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            inClass: String,
            outClass: String,
            options: Object
        },
        data() {
            return {
                // screeHeight: 0,
                ref: '',
                show: false
            }
        },
        computed: {
            activeClass() {
                return this.active === 'visible' ? this.inClass : ''
            },
            active() {
                return this.show ? 'visible' : 'hidden'
            }
        },
        created() {
            this.ref =
                (Math.random() * 10000000).toString(16).substr(0, 4) +
                new Date().getTime() +
                Math.random().toString().substr(2, 5)
        },
        mounted() {
            const options = this.options || { threshold: 0.3 }
            this.observer = new IntersectionObserver(([entry]) => {
                if (entry && entry.isIntersecting) {
                    this.show = true
                    this.observer.disconnect()
                }
            }, options)
            this.observer.observe(this.$el)
        },
        unmounted() {
            this.observer.disconnect()
        }
    }
</script>
<style scoped lang="less">
    .animate__animated {
        --animate-duration: 0.8s;
    }
</style>

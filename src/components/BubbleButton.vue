<template>
    <div class="h-button">
        <span
            class="h_button_circle"
            :class="{ 'explode-circle': isEnter, 'desplode-circle': isLeave }"
            id="h_button_circle"
            v-bind:style="styleObject"
        ></span>
        <a
            href="#"
            class="h_button_inner"
            @mouseenter="enter"
            @mouseleave="leave"
        >
            <span class="button_text_container">
                <slot>Simple button</slot>
            </span>
        </a>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                styleObject: {
                    left: 0,
                    top: 0
                },
                isEnter: false,
                isLeave: false
            }
        },
        methods: {
            enter(e) {
                const { offsetX, offsetY } = e
                this.styleObject = {
                    left: offsetX + 'px',
                    top: offsetY + 'px'
                }
                this.isEnter = true
                this.isLeave = false
            },
            leave(e) {
                const { offsetX, offsetY } = e
                this.styleObject = {
                    left: offsetX + 'px',
                    top: offsetY + 'px'
                }
                this.isLeave = true
                this.isEnter = false
            }
        }
    }
</script>

<style scoped lang="less">
    .h-button {
        overflow: hidden;
        position: relative;
        display: inline-block;
        border-radius: 4px;
    }

    .h_button_circle {
        background-color: red;
        border-radius: 1000px;
        position: absolute;
        left: 0;
        top: 0;
        width: 0px;
        height: 0px;
        margin-left: 0px;
        margin-top: 0px;
        pointer-events: none;
        /*animation-timing-function: ease-in-out; */
    }

    .h_button_inner {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px 24px;
        width: 100%;
        height: 100%;
        background: #ffffff;
        color: #111111;
        transition: 400ms;
        text-decoration: none;
        z-index: 100000;
    }

    .button_text_container {
        position: relative;
        z-index: 10000;
    }

    .explode-circle {
        animation: explode 0.5s forwards;
    }

    .desplode-circle {
        animation: desplode 0.5s forwards;
    }

    @keyframes explode {
        0% {
            width: 0px;
            height: 0px;
            margin-left: 0px;
            margin-top: 0px;
            background-color: rgba(42, 53, 80, 0.2);
        }
        100% {
            width: 400px;
            height: 400px;
            margin-left: -200px;
            margin-top: -200px;
            background-color: rgba(20, 180, 87, 0.8);
        }
    }

    @keyframes desplode {
        0% {
            width: 400px;
            height: 400px;
            margin-left: -200px;
            margin-top: -200px;
            background-color: rgba(20, 180, 87, 0.8);
        }
        100% {
            width: 0px;
            height: 0px;
            margin-left: 0px;
            margin-top: 0px;
            background-color: rgba(129, 80, 108, 0.6);
        }
    }
</style>

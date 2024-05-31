<template>
    <div class="contact">
        <div class="container">
            <div class="header">Let’s Get in Touch</div>
            <div class="wrapper">
                <a-form
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol"
                    :model="modelRef"
                >
                    <a-form-item label="Email" v-bind="validateInfos.email">
                        <a-input
                            placeholder="Email address"
                            v-model:value="modelRef.email"
                            autocomplete="email"
                            type="email"
                            name="email"
                            auto-size
                        />
                    </a-form-item>
                    <a-form-item label="Name" v-bind="validateInfos.name">
                        <a-input
                            placeholder="Full name"
                            v-model:value="modelRef.name"
                            autocomplete="name"
                            name="name"
                            auto-size
                        />
                    </a-form-item>
                    <a-form-item label="Message" v-bind="validateInfos.message">
                        <a-textarea
                            placeholder="Write your message...."
                            v-model:value="modelRef.message"
                            :rows="4"
                            :maxlength="2000"
                            show-count
                        />
                        <div class="extra">
                            Message has to be minimum 40 characters.
                        </div>
                    </a-form-item>
                    <a-form-item>
                        <a-button
                            type="h2o"
                            :loading="loading"
                            :disabled="isDisabled"
                            @click="submit"
                        >
                            Get in touch
                            <svg-icon icon-class="arrow-right"></svg-icon>
                        </a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>

<script>
    import { submitContact } from '@/api/statistics'

    export default {
        data() {
            return {
                labelCol: {
                    span: 24
                },
                wrapperCol: {
                    span: 24
                },
                modelRef: {
                    email: '',
                    name: '',
                    message: ''
                },
                validateInfos: {},
                loading: false
            }
        },
        computed: {
            isDisabled() {
                const { email, name, message } = this.modelRef
                return (
                    !email ||
                    !name ||
                    !message ||
                    !this.isEmail(email) ||
                    message.length < 40
                )
            }
        },
        methods: {
            isEmail(email) {
                const regex =
                    /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
                return regex.test(email)
            },
            submit() {
                if (this.isDisabled) {
                    return
                }
                if (this.loading) {
                    return
                }
                this.loading = true
                const { email, name, message } = this.modelRef
                submitContact({
                    email,
                    fullName: name,
                    content: message
                })
                    .then((res) => {
                        if (res.code === 1) {
                            this.$message.success('Thank you for your message!')
                        }
                    })
                    .finally(() => {
                        this.loading = false
                    })
            }
        }
    }
</script>

<style scoped lang="less">
    .contact {
        position: relative;
        margin: 0 auto;
        padding-bottom: 140px;
        .header {
            margin-bottom: 72px;
            text-align: center;
            line-height: 1.2;
            font-weight: 600;
            font-size: 60px;
        }
        .wrapper {
            margin: 0 auto;
            max-width: 700px;
        }
        .ant-form-item {
            :deep(.ant-input) {
                font-size: 20px;
            }
            .extra {
                color: @text-color-secondary;
            }
        }
        .ant-btn {
            display: flex;
            gap: 12px;
            width: 100%;
            height: 70px;
            font-size: 20px;
        }
    }
    @media screen and (max-width: 767px) {
        .contact {
            display: none;
        }
    }
</style>

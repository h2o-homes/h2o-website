<template>
    <div class="home">
        <!--        <announcement></announcement>-->
        <banner></banner>
        <partners v-if="screenLevel > 2" />
        <features></features>
        <usage />
        <contact />
    </div>
</template>

<script>
    import Banner from './sections/banner.vue'
    import Features from './sections/features.vue'
    // import Announcement from './sections/announcement.vue'
    import Usage from './sections/usage'
    import Contact from './sections/contact.vue'
    import Partners from './sections/partners.vue'
    import { mapGetters } from 'vuex'

    export default {
        name: 'Home',
        components: {
            // Announcement,
            Banner,
            Partners,
            Features,
            Usage,
            Contact
        },
        computed: {
            ...mapGetters({
                screenLevel: 'settings/screenLevel'
            })
        }
    }
</script>
<style scoped lang="less"></style>

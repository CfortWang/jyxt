<template>
    <div>{{ info.value }}</div>
</template>
<script>
    export default {
        name: 'topBar',
        props: {
            info: {
                type: Object,
                default: null
            }
        },
        components: {},
        data() {
            return {
                test: ''
            }
        },
        created() {
            console.log('topBar')
        },
        methods: {}
    }
</script>
<style lang="scss" module></style>

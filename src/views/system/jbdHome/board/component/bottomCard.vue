<template>
    <div id="bottom-card">
        test
    </div>
</template>
<script>
    export default {
        name: 'topBar',
        props: {
            info: {
                type: Array,
                default: []
            }
        },
        components: {},
        watch: {
            info(v){
                console.log(v)
                this.update()
            }
        },
        data() {
            return {
                
            }
        },
        created() {
            
        },
        methods: {
            
        }
    }
</script>
<style lang="scss" module>

</style>
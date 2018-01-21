<template>
    <v-snackbar
            :timeout="toast.timeout"
            :top="toast.y === 'top'"
            :bottom="toast.y === 'bottom'"
            :right="toast.x === 'right'"
            :left="toast.x === 'left'"
            :multi-line="toast.mode === 'multi-line'"
            :vertical="toast.mode === 'vertical'"
            :color="toast.color"
            v-model="snackbar"
    >
        {{ toast.text }}
        <v-btn flat color="pink" @click.native="snackbar = false">关闭</v-btn>
    </v-snackbar>
</template>

<script>
    const mapGetters = Vuex.mapGetters;
    export default {
        data() {
            return {
                snackbar: false
            }
        },
        computed  : {
            ...mapGetters({
                toast : 'toast'
            })
        },
        components: {},
        methods   : {},
        mounted() {
            this.snackbar = this.toast.active

        },
        created() {

        },
        watch :{
            toast(now){
                this.snackbar = now.active;
            }
        }
    }
</script>

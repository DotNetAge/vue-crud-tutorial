<template>
    <div class="dialog-wrapper"
         :class="{'open':is_open}">
        <div class="overlay"
             @click="close"></div>
        <div class="dialog">
            <slot name="header"></slot>
            <slot></slot>
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
    import "./dialog.less"
    export default {
        data () {
            return {
                is_open: false
            }
        },
        methods: {
            open() {
                this.is_open = true
                this.$emit('dialogOpen')
            },
            close() {
                this.is_open = false
                this.$emit('dialogClose')
            }
        }
    }
</script>
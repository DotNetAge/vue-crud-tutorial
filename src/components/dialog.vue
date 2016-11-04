<template>
    <div class="uk-modal"
         ref="modal">
        <div class="uk-modal-dialog">
            <slot name="header"></slot>
            <slot></slot>
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                dialog: undefined
            }
        },
        mounted () {
            this.dialog = UIkit.modal(this.$refs.modal)
            var self = this
            this.dialog.on('show.uk.modal', ()=> self.$emit('dialogOpen'))
            this.dialog.on('hide.uk.modal', ()=> self.$emit('dialogClose'))
        },
        methods: {
            open() {
                this.dialog.show()
            },
            close() {
                this.dialog.hide()
            }
        }
    }
</script>
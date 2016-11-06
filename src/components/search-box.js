export default {
    props: ['terms', 'placeholder'],
    render (h){
        return (
            <div class="uk-form">
                <div class="uk-form-icon">
                    <i class="uk-icon-search"></i>
                    <input type="search"
                           class="search-box uk-form-width-large"
                           placeholder="placeholder"
                           key.enter={ this.$emit('search',$event.target.value) }
                           value={ this.terms } />
                </div>
            </div>
        )
    }
}
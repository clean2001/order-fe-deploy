<template>
<h2>store test component2</h2>
<p>count: {{getCount}}</p>
<v-btn color="red" @click="incrementCount">incrementCount</v-btn>


<v-text-field v-model="message"></v-text-field>
<v-btn @click="this.updateMessage">전송</v-btn>


</template>

<script>
import { mapGetters } from 'vuex'
export default{
    data() {
        return {
            count: 0,
            message: null
        }
    },
    computed: {
        ...mapGetters(['getCount'])
    },
    methods: {
        incrementCount() {
            // this.count++;
            this.$store.dispatch('incrementCount');
        },
        updateMessage() {
            this.$store.dispatch('updateGlobalMessage', this.message);
        }
    },

}
</script>
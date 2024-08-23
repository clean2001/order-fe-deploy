<template>
    <v-container>

            <StoreTestComponent2 />
            <StoreTestComponent3 />


            <v-row>
                <v-col>메시지 자리: </v-col>
                <v-col>{{ getRecentMessage }}</v-col>
            </v-row>
    </v-container>
</template>
<script>
import StoreTestComponent2 from '@/components/StoreTestComponent2.vue';
import StoreTestComponent3 from '@/components/StoreTestComponent3.vue';
import { mapGetters } from 'vuex'

export default{
    components: {
        StoreTestComponent2,
        StoreTestComponent3
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters(['getRecentMessage'])
    },
    methods: {

    }
}
</script>
<template>
    <v-container>
        <OrderListComponent
        :isAdmin="true"
        />


    </v-container>
</template>
<script>
import OrderListComponent from '@/components/OrderListComponent.vue';

export default{
    components: {
        OrderListComponent
    },
    data() {
        return {

        }

    }
}
</script>
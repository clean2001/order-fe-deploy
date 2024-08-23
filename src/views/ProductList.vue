<template>
    <!-- 문자열로 넘길 경우에는 변수명=, 그외는 :변수명= -->
    <ProductListComponent
    :isAdmin="false"
    pageTitle="상품 목록" />
</template>

<script>
import ProductListComponent from '@/components/ProductListComponent.vue';

export default {
    components: {
        ProductListComponent
    }
}
</script>
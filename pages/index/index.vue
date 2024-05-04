<template>
    <div class="home">
        <Hero />
        <Operator />
    </div>
</template>

<script>
import Hero from './components/hero.vue';
import Operator from './components/operator.vue';

export default {
    components: { Hero, Operator }
}
</script>

<style scoped>
.home {
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 50px 50px;
}

.home h1 {
    font-weight: 700;
}
</style>
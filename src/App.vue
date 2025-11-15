<script setup lang="ts">
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";

	import { ModalsContainer } from 'vue-final-modal'

    import ModalsGroup from "@/components/Modals/ModalsGroup.vue";
    import { useAuthStore } from "@/stores/Auth";
    import { onMounted } from "vue";

    const authStore = useAuthStore();

    onMounted(() => {
        authStore.setToken("ef5f9d90c7bf4147ab66c46eed650b78"); // Test
    });
</script>

<template>
    <Header />
    <main class="overflow-hidden">
        <section class="container mx-auto pt-10 min-h-[calc(100dvh-152px)]">
            <router-view />
        </section>

        <ModalsContainer />
        <ModalsGroup />
    </main>
    <Footer />
</template>

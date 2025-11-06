<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import NewsListItem from "@/components/NewsListItem.vue";
    import type { Article } from "@/types/News";

    // Props
    const { listData } = defineProps<{
        listData: Article[];
        isLoading: boolean;
    }>();

    const emit = defineEmits<{
        (e: "fetch-new-data"): void;
    }>();

    const observerElement = ref<HTMLElement | null>(null);
    let observer: IntersectionObserver | null = null;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        if (entries[0]?.isIntersecting) {
            emit("fetch-new-data");
        }
    };

    onMounted(() => {
        if (observerElement.value) {
            observer = new IntersectionObserver(handleIntersection, {
                root: null,
                rootMargin: "0px",
                threshold: 0.1,
            });
            observer.observe(observerElement.value);
        }
    });
</script>

<template>
    <div v-if="listData.length > 0">
        <div
            class="mx-auto grid max-w-2xl grid-cols-1 gap-x-5 gap-y-5 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <NewsListItem v-for="(data, i) in listData" :key="i" :item-data="data" />
        </div>
    </div>
    <div v-else>
        <p class="text-2xl text-center py-10">Topics not found</p>
    </div>
    <div ref="observerElement" class="observer-fetch-new"></div>
</template>

<style scoped lang="scss"></style>

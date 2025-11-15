<script setup lang="ts">
    import { onMounted } from "vue";
    import NewsList from "@/components/NewsList.vue";
    import Filter from "@/components/Filter.vue";
    import UILoader from "@/components/UI/UILoader.vue";
    import { useNewsStore } from "@/stores/News";

    const newsStore = useNewsStore();

    const loadMoreHandler = () => {
        newsStore.getList({
            query: newsStore.currentQ,
            page: newsStore.currentPage + 1,
            addMore: true,
        });
    };

    const searchHandler = (query: string) => {
        newsStore.setCurrentQuery(query);

        newsStore.getList({
            query: newsStore.currentQ,
            page: newsStore.currentPage,
        });
    };

    onMounted(() => {
        // Загрузка новостей test
        newsStore.getList({
            query: newsStore.currentQ,
            page: 1,
        });
    });
</script>

<template>
    <div class="bg-white pt-8 sm:pt-10 pb-10">
        <div class="mx-auto max-w-7xl">
            <div class="mx-auto max-w-2xl lg:mx-0">
                <h2
                    class="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                    News
                </h2>
                <p class="mt-2 text-lg/8 text-gray-600">Find news on various topics</p>
            </div>

            <div class="border-t border-gray-200 mt-8 pt-6 sm:mt-10 sm:pt-8">
                <Filter @searchValue="searchHandler" />

                <NewsList
                    :list-data="newsStore.list"
                    :is-loading="newsStore.isLoading"
                    @fetchNewData="loadMoreHandler" />

                <UILoader v-if="newsStore.isLoading" :width="48" :height="48" color="#008236" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>

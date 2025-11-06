<script setup lang="ts">
    import { debounce } from "lodash-es";
    import { ref, watch, onMounted } from "vue";

    const emit = defineEmits<{
        (e: "search-value", value: string): void;
    }>();

    const searchText = ref("");

    // 1. Создаем функцию-обработчик с debounce (например, 500 мс)
    const debouncedSearch = debounce(async (query) => {
        emit("search-value", query);

        // // Эта функция будет вызвана только через 500 мс после последнего ввода
        // if (!newQuery) {
        // 	results.value = [];
        // 	return;
        // }

        // isLoading.value = true;
        // try {
        // 	// Вызываем ваш API-сервис с новым запросом
        // 	// Используем метод из Pinia Store для централизации логики
        // 	const data = await newsStore.fetchNews({ query: newQuery, page: 1 });
        // 	results.value = data.items || data.articles;
        // } catch (error) {
        // 	console.error("Ошибка поиска:", error);
        // 	results.value = [];
        // } finally {
        // 	isLoading.value = false;
        // }
    }, 500);

    watch(
        searchText,
        (newVal) => {
            // Передаем новое значение в debounced-функцию
            debouncedSearch(newVal);
        },
        { immediate: true },
    );

    onMounted(() => {
        return () => {
            debouncedSearch.cancel();
        };
    });
</script>

<template>
    <section class="flex justify-between items-center gap-x-3 mb-6 sm:mb-8 p-4 shadow rounded">
        <div>
            <input
                v-model="searchText"
                type="text"
                name="search"
                autocomplete="given-name"
                placeholder="Search topic"
                class="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 border border-gray-200 placeholder:text-gray-400 focus:border-indigo-600" />
        </div>
        <div class="flex gap-x-3">
            <div>tag1</div>
            <div>tag1</div>
            <div>tag1</div>
        </div>
    </section>
</template>

<style scoped lang="scss"></style>

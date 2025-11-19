<script setup lang="ts">
    import { debounce } from "lodash-es";
    import { ref, computed, watch, onMounted } from "vue";
    import type { SelectValueMultiple } from "@/types/Form";
    import { useNewsStore } from "@/stores/News";
    import UISelect from "@/components/UI/UISelect.vue";
    import UIInput from "@/components/UI/UIInput.vue";

    const newsStore = useNewsStore();

    const emit = defineEmits<{
        (e: "search-value", value: string): void;
    }>();

    const searchText = ref(""),
        sortBy = ref({
            name: "По релевантности",
            value: "relevancy",
        }),
        sortBy_selectedList = ref([
            {
                name: "По релевантности",
                value: "relevancy",
            },
            {
                name: "По популярности",
                value: "popularity",
            },
            {
                name: "По дате публикации",
                value: "publishedAt",
            },
        ]);

    const tags = computed(() => newsStore.tags);

    const debouncedSearch = debounce(async (query: string) => {
        emit("search-value", query);
    }, 500);

    const toggleShowLocalStorageHandler = (val: boolean) => {
        newsStore.toggleShowLocalStorage(!val);
    };

    const changeSortBy = (val: SelectValueMultiple) => {
        const selectedName = val.name ?? sortBy.value.name,
            selectedValue = val.value ?? sortBy.value.value;

        sortBy.value = {
            name: selectedName,
            value: selectedValue,
        };

        newsStore.setCurrentSortBy(selectedValue);

        newsStore.getList({
            query: newsStore.currentQ,
            page: 1,
        });
    };

    const changeQuery = (val: string) => {
        debouncedSearch(val);
    };

    const selectTag = (val: string) => {
        searchText.value = val;

        // sortBy.value =
        newsStore.setCurrentQuery(val);
        newsStore.getList({
            query: val,
            page: 1,
        });
    };

    // watch(
    //     newsStore.currentQ,
    //     (newVal) => {
    // 		console.log("watch 333");
    // 		console.log(newVal);

    //     },
    //     { immediate: true },
    // );

    onMounted(() => {
        searchText.value = newsStore.currentQ || "";

        return () => {
            debouncedSearch.cancel();
        };
    });
</script>

<template>
    <section class="flex justify-between items-center gap-x-3 mb-6 sm:mb-8 p-4 shadow rounded">
        <div>
            <UIInput v-model="searchText" :type="'text'" :callback="changeQuery" />
            <!-- <input
                v-model="searchText"
                type="text"
                name="search"
                autocomplete="given-name"
                placeholder="Search topic"
                class="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 border border-gray-200 placeholder:text-gray-400 focus:border-indigo-600" /> -->
        </div>
        <div class="flex gap-x-3">
            <span
                v-for="(tag, i) in tags"
                :key="i"
                class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 inset-ring inset-ring-gray-500/10 cursor-pointer"
                @click="selectTag(tag)"
                >{{ tag }}</span
            >
        </div>
        <div class="flex gap-x-6 items-center">
            <div class="flex gap-x-3">
                <UISelect
                    v-model="sortBy"
                    :options="sortBy_selectedList || []"
                    :close-on-select="true"
                    :searchable="false"
                    :allow-empty="false"
                    :type="'select'"
                    :label="''"
                    :callback="changeSortBy"
                    class="w-56" />
            </div>
            <div class="flex gap-x-3">
                <div>Show LocalStorage posts</div>
                <div class="flex gap-x-3">
                    <div class="relative inline-block w-11 h-5">
                        <input
                            :checked="newsStore.isShowLocalStorage"
                            id="switch-component"
                            type="checkbox"
                            @change="toggleShowLocalStorageHandler(newsStore.isShowLocalStorage)"
                            class="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300" />
                        <label
                            for="switch-component"
                            class="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer">
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss"></style>

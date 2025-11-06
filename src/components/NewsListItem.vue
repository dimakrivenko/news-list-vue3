<script setup lang="ts">
    // import { computed, onMounted, ref, Ref, watch } from "vue";
    import type { Article } from "@/types/News";
    import { helpers } from "@/utils/helpers";

    // Props
    const { itemData } = defineProps<{
        itemData: Article;
    }>();

    // const emit = defineEmits(["resetSelected"]);

    // // Data
    // const localSingleData: Ref<any> = ref(null),
    //     isLoading: Ref<boolean> = ref(false);

    // // Computed
    // const title = computed(() => {
    //     return "Title test 11";
    // });
</script>

<template>
    <article
        class="flex max-w-xl flex-col items-start justify-between shadow p-5 transition-shadow rounded hover:shadow-2xl cursor-pointer">
        <div class="flex items-center gap-x-4 text-xs">
            <!-- <time datetime="2020-03-16" class="text-gray-500">Mar 16, 2020</time> -->
            <time :datetime="helpers.formatDate(itemData?.publishedAt)" class="text-gray-500"
                >{{ helpers.formatDate(itemData?.publishedAt, "month-text") }}
            </time>
            <div
                v-if="typeof itemData?.source?.name === 'string'"
                class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                {{ itemData?.source?.name }}
            </div>
        </div>
        <div class="w-full mt-2">
            <img class="block w-full h-50 object-cover" :src="itemData.urlToImage ?? ''" alt="" />
        </div>
        <div class="group relative grow">
            <h3
                v-if="typeof itemData?.title === 'string'"
                class="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                <span class="absolute inset-0"></span>
                {{ itemData?.title }}
            </h3>
            <p
                v-if="typeof itemData?.description === 'string'"
                class="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                {{ itemData?.description }}
            </p>
        </div>
        <div class="relative mt-8 flex items-center gap-x-4 justify-self-end">
            <!-- <img
                src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
                class="size-10 rounded-full bg-gray-50" /> -->
            <div class="flex gap-x-1 text-sm/6">
                <p class="text-gray-600">Author</p>
                <span>-</span>
                <p class="font-semibold text-gray-900">
                    <span class="absolute inset-0"></span>
                    {{ itemData?.author }}
                </p>
            </div>
        </div>
    </article>
    <!-- <div class="news-list-item border border-gray-200 rounded p-1">
        <div class="flex items-center gap-x-4">
            <div class="shrink-0">
                <img class="block w-36 h-36 object-cover" :src="itemData.urlToImage ?? ''" alt="" />
            </div>
            <div class="text p-3 pl-0">
                <h4 class="mb-2">{{ itemData?.title }}</h4>
                <div>
                    {{ itemData?.description }}
                </div>
            </div>
        </div>
    </div> -->
</template>

<style scoped lang="scss"></style>

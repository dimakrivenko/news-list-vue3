import { ref } from "vue";
import { defineStore } from "pinia";
import { fetchNews } from "@/services/newsApi";
import type { FormField } from "@/types/Form";
import type { Article } from "@/types/News";
import * as Yup from "yup";

export const useNewsStore = defineStore("news", () => {
    const list = ref<Article[]>([]),
        isLoading = ref(false),
        sortBy = ref("relevancy"),
        tags = ref(["Bitcoin", "Finance", "Politic"]),
        error = ref(null),
        defaultQ = ref("Politic"),
        currentQ = ref("Politic"),
        currentPage = ref(1),
        lastPage = ref(false),
        isShowLocalStorage = ref(false),
        modalCreateNewsFormFields = ref<FormField[]>([]);

    const getList = async ({ query = "all", page = 1, pageSize = 9, addMore = false } = {}) => {
        if (isLoading.value) return;
        isLoading.value = true;
        error.value = null;

        if (page === 1) {
            list.value = [];
        }

        try {
            if (!lastPage.value) {
                currentPage.value = page;

                // Расскоментировать  !!!

                const response = await fetchNews({
                    query: query,
                    page: page,
                    pageSize: pageSize,
                    sortBy: sortBy.value,
                });

                if (Array.isArray(list.value) && typeof response?.articles === "object") {
                    if (addMore) {
                        list.value = [...list.value, ...response?.articles];
                    } else {
                        list.value = response?.articles;
                    }
                }

                if (isShowLocalStorage.value && localStorage.getItem("userPostsList")) {
                    const stored = localStorage.getItem("userPostsList");
                    const localList = stored ? JSON.parse(stored) : [];
                    list.value = [...localList];
                }
            }
        } catch (e: any) {
            error.value = e.message;

            if (e.code === "maximumResultsReached") {
                lastPage.value = true;
            }
        } finally {
            isLoading.value = false;
        }
    };

    const toggleShowLocalStorage = (val: boolean) => {
        isShowLocalStorage.value = val;

        getList({
            query: currentQ.value,
            page: 1,
        });
    };
    const addPostToList = (data: Article) => {
        if (data && typeof data === "object") {
            list.value.unshift(data);

            if (localStorage.getItem("userPostsList")) {
                const stored = localStorage.getItem("userPostsList");
                const localList = stored ? JSON.parse(stored) : [];
                localList.unshift(data);
                localStorage.setItem("userPostsList", JSON.stringify(localList));
            } else {
                localStorage.setItem("userPostsList", JSON.stringify([data]));
            }

            return true;
        }
    };

    const setCurrentQuery = (query: string) => {
        if (typeof query === "string" && query !== "") {
            currentQ.value = query;
        } else {
            currentQ.value = defaultQ.value;
        }

        currentPage.value = 1;
    };
    const setCurrentSortBy = (val: string) => {
        if (typeof val === "string" && val !== "") {
            sortBy.value = val;
        }
    };

    const initCreateNewsFields = () => {
        const fields = [
            {
                key: "title",
                type: "text",
                label: "Название статьи",
                value: "",
                rules: Yup.string().required("Каcтомная ошибка"),
                callback: (val: string) => {
                    const title = modalCreateNewsFormFields.value.find(
                        (item: FormField) => item.key === "title",
                    );
					if (title) {
                    	title.value = val;
					}
                },
            },
            {
                key: "description",
                type: "text",
                label: "Краткое описание статьи",
                value: "",
                rules: Yup.string().required(),
                callback: (val: string) => {
                    const description = modalCreateNewsFormFields.value.find(
                        (item: FormField) => item.key === "description",
                    );
                    if (description) {
                        description.value = val;
                    }
                },
            },
            {
                key: "content",
                type: "textarea",
                label: "Содержание статьи",
                value: "",
                rules: Yup.string()
                    .required("Напиши текст статьи")
                    .min(10, "Слишком коротко! Требуется минимум 10 символов."),
                callback: (val: string) => {
                    const content = modalCreateNewsFormFields.value.find(
                        (item: FormField) => item.key === "content",
                    );
                    if (content) {
                        content.value = val;
                    }
                },
            },
            {
                key: "type",
                type: "select",
                label: "Тип статьи",
                value: null,
                selectedList: [
                    {
                        name: "Обычная",
                        value: "regular",
                    },
                    {
                        name: "Платная",
                        value: "pay",
                    },
                ],
                rules: Yup.object().required("Выберите тип статьи!"),
                // rules: Yup.array().min(1, "Выберите хотя бы один тип статьи!"), // Если multiple: true
                callback: () => {
                //     const type = modalCreateNewsFormFields.value.find(
                //         (item: FormField) => item.key === "type",
                //     );

                //     if (type) {
                //         type.value = val;
                //     }
                },
            },
        ];

        modalCreateNewsFormFields.value = fields;
    };

    return {
        list,
        tags,
        currentPage,
        lastPage,
        defaultQ,
        currentQ,
        isLoading,
        error,
        getList,
        addPostToList,
        setCurrentQuery,
        initCreateNewsFields,
        modalCreateNewsFormFields,
        isShowLocalStorage,
        toggleShowLocalStorage,
        setCurrentSortBy,
    };
});

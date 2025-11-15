import { ref } from "vue";
import { defineStore } from "pinia";
import { fetchNews } from "@/services/newsApi";
import * as Yup from "yup";

export const useNewsStore = defineStore("news", () => {
    const list = ref<any[]>([]),
        isLoading = ref(false),
        error = ref(null),
        defaultQ = ref("bitcoin"),
        currentQ = ref("bitcoin"),
        currentPage = ref(1),
        lastPage = ref(false),
        modalCreateNewsFormFields = <any>ref([]);

    const getList = async ({ query = "all", page = 1, pageSize = 9, addMore = false } = {}) => {
        if (isLoading.value) return;
        isLoading.value = true;
        error.value = null;

        try {
            if (!lastPage.value) {
                currentPage.value = page;

                // Расскоментировать  !!!

                const response = await fetchNews({ query: query, page: page, pageSize: pageSize });

                if (Array.isArray(list.value) && typeof response?.articles === "object") {
                    if (addMore) {
                        list.value = [...list.value, ...response?.articles];
                    } else {
                        list.value = response?.articles;
                    }
                }

				if (localStorage.getItem('userPostsList')) {
					const localList = JSON.parse(localStorage.getItem('userPostsList'))

					console.log(localList);


					list.value = [...localList, ...list.value]
				}


            }
        } catch (e) {
            error.value = e.message;

            if (e.code === "maximumResultsReached") {
                lastPage.value = true;
            }
        } finally {
            isLoading.value = false;
        }
    };

    const addPostToList = (data: any) => {
		console.log("addPostToList 2233333");
		console.log(data);

		if (typeof data === "object") {
			list.value.unshift(data);

			if (localStorage.getItem('userPostsList')) {
				const localList = JSON.parse(localStorage.getItem('userPostsList'))
				localList.unshift(data)
				localStorage.setItem('userPostsList', JSON.stringify(localList))
			} else {
				localStorage.setItem('userPostsList', JSON.stringify([data]));
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
                        (item) => item.key === "title",
                    );
                    title.value = val;
                },
            },
            // {
            //     key: "description",
            //     type: "text",
            //     label: "Краткое описание статьи",
            //     value: "",
            //     rules: Yup.string().required(),
            //     callback: (val: string) => {
            //         const description = modalCreateNewsFormFields.value.find(
            //             (item) => item.key === "description",
            //         );
            //         description.value = val;
            //     },
            // },
            // {
            //     key: "content",
            //     type: "textarea",
            //     label: "Содержание статьи",
            //     value: "",
            //     rules: Yup.string()
            //         .required("Напиши текст статьи")
            //         .min(10, "Слишком коротко! Требуется минимум 10 символов."),
            //     callback: (val: string) => {
            //         const content = modalCreateNewsFormFields.value.find(
            //             (item) => item.key === "content",
            //         );
            //         content.value = val;
            //     },
            // },
            // {
            //     key: "type",
            //     type: "select",
            //     label: "Тип статьи",
            //     value: null,
            //     selectedList: [
            //         {
            //             name: "Обычная",
            //             value: "regular",
            //         },
            //         {
            //             name: "Платная",
            //             value: "pay",
            //         },
            //     ],
            //     rules: Yup.object().required("Выберите тип статьи!"),
            //     // rules: Yup.array().min(1, "Выберите хотя бы один тип статьи!"), // Если multiple: true
            //     callback: (val: object) => {
            //         const type = modalCreateNewsFormFields.value.find(
            //             (item) => item.key === "type",
            //         );
            //         type.value = val;
            //     },
            // },
        ];

        modalCreateNewsFormFields.value = fields;
    };

    return {
        list,
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
    };
});

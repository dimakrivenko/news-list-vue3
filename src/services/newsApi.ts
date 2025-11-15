import apiClient from "@/services/apiClient";

export async function fetchNews({ page = 1, query = "all", pageSize = 9, sortBy = "relevancy" } = {}) {
    const queryParams = {
        q: query,
        page: page,
        pageSize: pageSize,
        sortBy: sortBy, // relevancy, popularity, publishedAt.
    };

    try {
        const response = await apiClient.get(`/everything`, { params: queryParams });

        if (typeof response?.data.articles === "object") {
            if (response.data.status === "ok" && Array.isArray(response.data.articles)) {
                return response.data;
            }

            throw new Error("Неверный формат данных от API.");
        }
    } catch (e: any) {
        console.error("Ошибка в News API Layer:");
        throw e.response?.data;
    }
}

import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
    const token = ref(localStorage.getItem("bearerToken") || null);
    const isAuthenticated = ref(!!token.value);

    function setToken(newToken: string) {
        token.value = newToken;
        isAuthenticated.value = true;
        localStorage.setItem("bearerToken", newToken);
    }

    function clearToken() {
        token.value = null;
        isAuthenticated.value = false;
        localStorage.removeItem("bearerToken");
    }

    return { token, isAuthenticated, setToken, clearToken };
});

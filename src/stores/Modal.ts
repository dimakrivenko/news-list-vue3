import { ref, computed } from "vue";
import { defineStore } from "pinia";

interface ModalStackItem {
    name: string; // Уникальное имя модального окна
    id: number; // Уникальное имя модального окна
    payload: any; // Данные
    props?: {
        modalClass?: string;
        modalStyle?: string;
    };
}

export const useModalStore = defineStore("modal", () => {
    const modalStack = ref<ModalStackItem[]>([]);

    // Проверяет, открыто ли окно по имени
    const isModalOpen = (name: string) => modalStack.value.some((m) => m.name === name);

    // Получает Payload по имени
    const getPayload = (name: string) => modalStack.value.find((m) => m.name === name)?.payload;

    // Получает имя верхнего окна
    const topModalName = computed(() => {
        return modalStack.value.length > 0
            ? modalStack.value[modalStack.value.length - 1].name
            : null;
    });

    function openModal(name: string, payload: any = null, props: any = null) {
        // Проверяем, не открыто ли это окно уже, чтобы избежать дублирования
        if (isModalOpen(name)) return;

        modalStack.value.push({ name, id: Date.now(), payload, props });

        if (modalStack.value.length === 1) {
            document.body.classList.add("overflow-hidden");
        }
    }

    function closeModal(name: string) {
        // Удаляем модальное окно с указанным именем из стека
        modalStack.value = modalStack.value.filter((m) => m.name !== name);

        if (modalStack.value.length === 0) {
            document.body.classList.remove("overflow-hidden");
        }
    }

    // Закрывает верхнее окно (для Esc)
    function closeModalTop() {
        if (modalStack.value.length > 0) {
            modalStack.value.pop();
        }
        if (modalStack.value.length === 0) {
            document.body.classList.remove("overflow-hidden");
        }
    }

    return {
        openModal,
        closeModal,
        closeModalTop,
        isModalOpen,
        getPayload,
        modalStack,
        topModalName,
    };

    // const visibilityMap = ref(new Map<string, boolean>());
    // const payloadMap = ref(new Map<string, any>());

    // function openModal(name: string, payload: any = null) {
    //     payloadMap.value.set(name, payload);
    //     visibilityMap.value.set(name, true);
    //     if (!visibilityMap.value.size) {
    //         document.body.classList.add("overflow-hidden");
    //     }
    // }

    // function closeModal(name: string) {
    //     visibilityMap.value.delete(name);
    //     payloadMap.value.delete(name);

    //     if (visibilityMap.value.size === 0) {
    //         document.body.classList.remove("overflow-hidden");
    //     }
    // }

    // const isModalOpen = (name: string) => visibilityMap.value.get(name) || false;
    // const getPayload = (name: string) => payloadMap.value.get(name);

    // return { openModal, closeModal, isModalOpen, visibilityMap, getPayload };
});

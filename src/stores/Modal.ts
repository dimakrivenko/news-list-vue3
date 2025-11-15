import { ref, computed } from "vue";
import { defineStore } from "pinia";

interface ModalStackItem {
    name: string;
    id: number;
    payload: any;
    props?: {
        modalClass?: string;
        modalStyle?: string;
    };
}

export const useModalStore = defineStore("modal", () => {
    const modalStack = ref<ModalStackItem[]>([]);

    const isModalOpen = (name: string) => modalStack.value.some((m) => m.name === name);

    const getPayload = (name: string) => modalStack.value.find((m) => m.name === name)?.payload;

    const topModalName = computed(() => {
        return modalStack.value.length > 0
            ? modalStack.value[modalStack.value.length - 1].name
            : null;
    });

    function openModal(name: string, payload: any = null, props: any = null) {
        if (isModalOpen(name)) return;

        modalStack.value.push({ name, id: Date.now(), payload, props });

        if (modalStack.value.length === 1) {
            document.body.classList.add("overflow-hidden");
        }
    }

    function closeModal(name: string) {
        modalStack.value = modalStack.value.filter((m) => m.name !== name);

        if (modalStack.value.length === 0) {
            document.body.classList.remove("overflow-hidden");
        }
    }

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
});

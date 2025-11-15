<script setup lang="ts">
    import { computed, ref, onBeforeUnmount } from "vue";
    import { useModalStore } from "@/stores/Modal";
    import ModalBase from "@/components/modals/ModalBase.vue";
    import UILoader from "@/components/UI/UILoader.vue";

    const modalStore = useModalStore();
    const modalName = "modal-post-info";

    interface ModalPostInfoPayload {
        url?: string;
    }

    const isLoading = ref(true);

    const payload = computed<ModalPostInfoPayload | null>(() => {
        return modalStore.getPayload(modalName) as ModalPostInfoPayload | null;
    });

    const url = computed<string>(() => payload.value?.url || "");

    const handleCancel = () => {
        console.log("modal confirm handleCancel test3");

        const currentPayload = payload.value;
        if (currentPayload && currentPayload.callback) {
            currentPayload.callback(false);
        }
        if (modalStore.isModalOpen(modalName)) {
            modalStore.closeModalTop();
        }
        // modalStore.closeModal(modalName);
    };

    const iframeIsLoaded = (e) => {
        console.log("iframeIsLoaded 333");
        console.log(e);
        isLoading.value = false;
    };
    onBeforeUnmount(() => {
        isLoading.value = true;
    });
</script>

<template>
    <ModalBase :name="modalName" :modal-class="'max-w-md flex'" @close="handleCancel">
        <template #default="{}">
            <div class="post-content min-h-40 pt-8 pb-3">
                <UILoader class="absolute top-0 left-0 right-0 bottom-0 m-auto" v-if="isLoading" color="#008236" />
                <iframe
                    :src="url"
                    frameborder="0"
                    class="relative z-10 w-full h-dvh bg-white"
                    :class="{ hidden: isLoading }"
                    @load="iframeIsLoaded"></iframe>
            </div>
        </template>
    </ModalBase>
</template>

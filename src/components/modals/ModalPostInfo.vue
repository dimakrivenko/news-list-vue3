<script setup lang="ts">
    import { computed } from "vue";
    import { useModalStore } from "@/stores/Modal";
    import ModalBase from "@/components/modals/ModalBase.vue";

    const modalStore = useModalStore();
    const modalName = "modal-post-info";

    interface ModalPostInfoPayload {
        url?: string;
    }

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
</script>

<template>
    <ModalBase :name="modalName" panel-class="max-w-md" @close="handleCancel">
        <template #default="{}">
            <div>
                <div class="post-content pt-8 pb-3">
                    <iframe :src="url" frameborder="0" class="w-full min-h-96"></iframe>
                </div>
            </div>
        </template>
    </ModalBase>
</template>

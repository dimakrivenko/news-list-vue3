<script setup lang="ts">
    import { computed } from "vue";
    import { DialogTitle } from "@headlessui/vue";
    import { useModalStore } from "@/stores/Modal";
    // import BaseModal from "@/components/modals/BaseModal.vue";
    import ModalBase from "@/components/modals/ModalBase.vue";
    import UIButton from "@/components/UI/UIButton.vue";

    const modalStore = useModalStore();
    const modalName = "modal-confirm-delete";

    interface ModalConfirmPayload {
        title?: string;
        message?: string;
        btnSuccess?: {
            name: string;
            variant: string;
        };
        btnCancel?: {
            name: string;
            variant: string;
        };
        callback: (confirmed: boolean) => void;
    }

    const payload = computed<ModalConfirmPayload | null>(() => {
        return modalStore.getPayload(modalName) as ModalConfirmPayload | null;
    });

    const title = computed<string>(() => payload.value?.title || "Подтвердите действие"),
        message = computed<string>(() => payload.value?.message || ""),
        btnSuccessText = computed<string>(() => payload.value?.btnSuccess?.name || "Подтвердить"),
        btnCancelText = computed<string>(() => payload.value?.btnCancel?.name || "Отмена"),
        btnSuccessVariant = computed<string>(() => payload.value?.btnSuccess?.variant || "primary"),
        btnCancelVariant = computed<string>(() => payload.value?.btnCancel?.variant || "secondary");

    const handleConfirm = () => {
        const currentPayload = payload.value;
        if (currentPayload && currentPayload.callback) {
            currentPayload.callback(true);
        }

        // if (modalStore.isModalOpen(modalName)) {
        //     modalStore.closeModalTop();
        // }
        // modalStore.closeModal(modalName);
    };
    const handleCancel = () => {
        const currentPayload = payload.value;
        if (currentPayload && currentPayload.callback) {
            currentPayload.callback(false);
        }
        if (modalStore.isModalOpen(modalName)) {
            modalStore.closeModalTop();
        }
    };
</script>

<template>
    <ModalBase :name="modalName" panel-class="max-w-md" @close="handleCancel">
        <template #default="{}">
            <div class="mt-3 text-center sm:mt-0 sm:text-left">
                <h3 class="text-lg font-semibold text-gray-900">{{
                    title
                }}</h3>
                <div v-if="message && message !== ''" class="mt-2">
                    <p class="text-md text-gray-500">
                        {{ message }}
                    </p>
                </div>
            </div>

            <div class="flex gap-x-4 justify-end pt-5">
                <UIButton :variant="btnCancelVariant" @click="handleCancel">{{
                    btnCancelText
                }}</UIButton>
                <UIButton :variant="btnSuccessVariant" @click="handleConfirm">{{
                    btnSuccessText
                }}</UIButton>
            </div>
        </template>
    </ModalBase>
</template>

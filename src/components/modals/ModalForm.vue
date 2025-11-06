<script setup lang="ts">
    import { computed } from "vue";
    import { DialogTitle } from "@headlessui/vue";

    import type { FormField } from "@/types/Form";
    import { useModalStore } from "@/stores/Modal";
    import BaseModal from "@/components/modals/BaseModal.vue";
    import FormBase from "@/components/FormBase.vue";

    const modalStore = useModalStore();
    const modalName = "modal-form";

    interface ModalFormPayload {
        title?: string;
        fields?: FormField[];
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

    const payload = computed<ModalFormPayload | null>(() => {
        return modalStore.getPayload(modalName) as ModalFormPayload | null;
    });

    const title = computed<string>(() => payload.value?.title || "Подтвердите действие"),
        formFields = computed<FormField[]>(() => payload.value?.fields || []),
        btnSuccess = computed(() => {
            return {
                name: payload.value?.btnSuccess?.name || "Отправить",
                variant: payload.value?.btnSuccess?.variant || "primary",
            };
        }),
        btnCancel = computed(() => {
            return {
                name: payload.value?.btnCancel?.name || null,
                variant: payload.value?.btnCancel?.variant || "link",
            };
        });

    const handleSubmit = (values) => {
        console.log("handleSubmit 2222");

        if (payload.value && payload.value.callback && Object.keys(values).length > 0) {
            payload.value.callback(values);
        }
    };

    const handleCancel = (e) => {
        console.log("modal form handleCancel");
        console.log(e);

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
    <BaseModal :name="modalName" panel-class="max-w-md" @close="handleCancel">
        <template #default="{}">
            <div>
                <div class="mb-3 text-center sm:text-left">
                    <DialogTitle as="h3" class="text-xl font-semibold text-gray-900">{{
                        title
                    }}</DialogTitle>
                </div>

                <FormBase
                    :fields="formFields"
                    :btn-success="btnSuccess"
                    :btn-cancel="btnCancel"
                    @submitForm="handleSubmit"
                    @cancelForm="handleCancel"></FormBase>
            </div>
        </template>
    </BaseModal>
</template>

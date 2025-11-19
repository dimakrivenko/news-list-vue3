<script setup lang="ts">
    import { computed } from "vue";
    import type { FormField, ButtonVariantElement } from "@/types/Form";
    import { useModalStore } from "@/stores/Modal";
    import ModalBase from "@/components/modals/ModalBase.vue";
    import FormBase from "@/components/FormBase.vue";

    const modalStore = useModalStore();
    const modalName = "modal-form";

    interface ModalFormPayload {
        title?: string;
        fields?: FormField[];
        btnSuccess?: ButtonVariantElement;
        btnCancel?: ButtonVariantElement;
        callback: (confirmed: boolean) => void;
    }

    const payload = computed<ModalFormPayload | null>(() => {
        return modalStore.getPayload(modalName) as ModalFormPayload | null;
    });

    const title = computed<string>(() => payload.value?.title || "Подтвердите действие"),
        formFields = computed<FormField[]>(() => payload.value?.fields || []),
        btnSuccess = computed<ButtonVariantElement>(() => {
            return {
                name: payload.value?.btnSuccess?.name || "Отправить",
                variant: payload.value?.btnSuccess?.variant || "primary",
            };
        }),
        btnCancel = computed<ButtonVariantElement>(() => {
            return {
                name: payload.value?.btnCancel?.name || undefined,
                variant: payload.value?.btnCancel?.variant || "link",
            };
        });


    const handleSubmit = (values: any) => {
        console.log("values q32132");
        console.log(values);

        if (payload.value && payload.value.callback && Object.keys(values).length > 0) {
            payload.value.callback(values);
        }
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
            <div>
                <div class="mb-3 text-center sm:text-left">
                    <h3 class="text-xl font-semibold text-gray-900">{{ title }}</h3>
                </div>

                <FormBase
                    :fields="formFields"
                    :btn-success="btnSuccess"
                    :btn-cancel="btnCancel"
                    @submitForm="handleSubmit"
                    @cancelForm="handleCancel"></FormBase>
            </div>
        </template>
    </ModalBase>
</template>

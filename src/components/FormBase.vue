<script setup lang="ts">
    import { computed, watch } from "vue";
    import { useForm } from "vee-validate";
    import * as Yup from "yup";

    import type { FormField, ButtonVariantElement } from "@/types/Form";
    import type { ButtonVariant } from "@/types/Button";
    import UIButton from "@/components/UI/UIButton.vue";
    import UIFormFieldList from "@/components/UI/UIFormFieldList.vue";

    // Props
    const { fields, btnSuccess, btnCancel } = defineProps<{
        fields: FormField[];
        btnSuccess?: ButtonVariantElement | null;
        btnCancel?: ButtonVariantElement | null;
    }>();

    const emit = defineEmits<{
        (e: "submitForm", payload: any): void;
        (e: "cancelForm", payload: any): void;
    }>();

    const btnSuccessText = computed<string>(() => btnSuccess?.name || "Отправить"),
        btnSuccessVariant = computed<ButtonVariant>(
            () => (btnSuccess?.variant || "primary") as ButtonVariant,
        ),
        btnCancelText = computed<string | null>(() => btnCancel?.name || null),
        btnCancelVariant = computed<ButtonVariant>(
            () => (btnCancel?.variant || "link") as ButtonVariant,
        );
    // btnCancelVariant = computed<string>(() => btnCancel?.variant || "link");

    // Cхема валидации
    const validationSchema = computed(() => {
        try {
            const shape: Record<string, Yup.AnySchema> = {};

            fields.forEach((field) => {
                if (field.rules && field.key) {
                    shape[field.key] = field.rules;
                }
            });

            return Yup.object().shape(shape);
        } catch (e) {
            console.error("Ошибка при создании Yup схемы:", e);
            return Yup.object().shape({});
        }
    });

    const { handleSubmit, errors, resetForm } = useForm({
        validationSchema: validationSchema,
    });
    const onSubmit = handleSubmit((values) => {
        emit("submitForm", values);
    });

    const handleCancel = (e: any) => {
        emit("cancelForm", e);

        fields.forEach((field) => {
            if (field.type === "select") {
                if (field.multiple) {
                    field.value = [];
                } else {
                    field.value = null;
                }
            } else {
                field.value = "";
            }
        });

        resetForm();
    };

    watch(
        () => fields,
        (newFields) => {
            if (newFields && newFields.length > 0) {
                const initialValues: Record<string, any> = {};

                newFields.forEach((field) => {
                    if (field.key) {
                        if (
                            field.type === "select" &&
                            field.multiple &&
                            field.selected !== undefined
                        ) {
                            initialValues[field.key] = field.value;
                        } else if (field.value !== undefined) {
                            initialValues[field.key] = field.value;
                        } else {
                            initialValues[field.key] = "";
                        }
                    }
                });

                resetForm({ values: initialValues });
            }
        },
        { immediate: true, deep: true },
    );
</script>

<template>
    <div class="form-base">
        <form @submit.prevent="onSubmit">
            <UIFormFieldList v-if="fields.length > 0" :fields="fields" :errors="errors" />

            <div class="flex gap-x-4 justify-end pt-5">
                <UIButton
                    v-if="btnCancelText && btnCancelVariant"
                    :variant="btnCancelVariant"
                    @click="handleCancel"
                    >{{ btnCancelText }}</UIButton
                >
                <UIButton
                    v-if="btnSuccessText && btnSuccessVariant"
                    :variant="btnSuccessVariant"
                    @click="onSubmit"
                    >{{ btnSuccessText }}</UIButton
                >
            </div>
        </form>
    </div>
</template>

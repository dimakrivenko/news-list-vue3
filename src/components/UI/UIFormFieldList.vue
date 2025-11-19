<script setup lang="ts">
    import { Field } from "vee-validate";
    import type { FormField } from "@/types/Form";
    import UIInput from "@/components/UI/UIInput.vue";
    import UITextarea from "@/components/UI/UITextarea.vue";
    import UISelect from "@/components/UI/UISelect.vue";

    const { fields } = defineProps<{
        fields: FormField[];
        errors: Record<string, string | undefined>;
    }>();
</script>

<template>
    <div class="ui-form-field-list">
        <div v-for="(field, i) in fields" :key="i" class="ui-form-field-list-item mb-4">
            <Field :name="field.key || ''" :type="field.type" v-slot="{ field: veeField }">
                <div v-if="field.type === 'text'">
                    <UIInput
                        :field-key="field.key"
                        v-model="field.value"
                        :type="field.type"
                        :label="field.label || ''"
                        :callback="field.callback"
                        :error="field.key ? errors[field.key] : undefined" />
                </div>
                <div v-if="field.type === 'textarea'">
                    <UITextarea
                        :field-key="field.key"
                        v-model="field.value"
                        :type="field.type"
                        :label="field.label || ''"
                        :callback="field.callback"
                        :error="field.key ? errors[field.key] : undefined" />
                </div>
                <div v-if="field.type === 'select'">
                    <UISelect
                        :field-key="field.key"
                        v-model="field.value"
                        :options="field.selectedList || []"
                        :multiple="field.multiple"
                        :taggable="field.taggable"
                        :close-on-select="field.closeOnSelect"
                        :searchable="field.searchable"
                        :allow-empty="field.allowEmpty"
                        :type="field.type"
                        :label="field.label || ''"
                        :callback="field.callback"
                        v-bind="veeField"
                        :error="field.key ? errors[field.key] : undefined" />
                </div>
            </Field>
            <!-- <span v-if="errors[field.key]" class="text-sm text-red-500 mt-1 block">
                {{ errors[field.key] }}
            </span> -->
        </div>
    </div>
</template>

<style scoped lang="scss"></style>

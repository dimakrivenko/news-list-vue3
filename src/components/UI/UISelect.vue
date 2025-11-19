<script setup lang="ts">
    import { ref, defineProps, defineEmits, useAttrs, watch } from "vue";
	import type { SelectValueMultiple } from "@/types/Form";
    import Multiselect from "vue-multiselect";
    import "vue-multiselect/dist/vue-multiselect.css";

    const attrs = useAttrs();

    const emit = defineEmits(["update:modelValue"]);

    const {
        fieldKey,
        label,
        modelValue,
        multiple = false,
        taggable = false,
        placeholder = "Выбрать",
        closeOnSelect = true,
        searchable = false,
        allowEmpty = true,
		options,
        callback,
    } = defineProps<{
        fieldKey?: string;
        type?: string;
        label?: string;
        modelValue?: SelectValueMultiple | SelectValueMultiple[] | null;
        options?: SelectValueMultiple[] | null;
        placeholder?: string;
        multiple?: boolean;
        taggable?: boolean;
        closeOnSelect?: boolean;
        searchable?: boolean;
        allowEmpty?: boolean;
        error?: string | undefined;
        callback?: (payload: any) => void;
    }>();

    const selectedValue = ref(modelValue);

    watch(selectedValue, (newVal) => {
        emit("update:modelValue", newVal);

        if (callback) {
            callback(newVal);
        }
    });

    // const updateSelected = (newValue: any) => {
		//
        // emit("update:modelValue", newValue);

        // if (callback) {
        //     callback(newValue);
        // }
    // };
</script>

<template>
    <div class="ui-select">
        <label :for="fieldKey" class="ui-input-label block text-gray-500 text-sm mb-1">
            {{ label }}
        </label>

        <Multiselect
            v-bind="attrs"
            v-model="selectedValue"
            :options="options || []"
            :multiple="multiple"
            :taggable="taggable"
            :placeholder="placeholder"
            :close-on-select="closeOnSelect"
            :searchable="searchable"
            :allow-empty="allowEmpty"
            :preselect-first="false"
            label="name"
            track-by="value">
        </Multiselect>

        <p v-if="error" class="ui-input-error text-xs text-red-500 mt-1 block">
            {{ error }}
        </p>
    </div>
</template>

<style scoped lang="scss"></style>

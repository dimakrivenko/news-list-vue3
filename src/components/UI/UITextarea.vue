<script setup lang="ts">
    import { defineProps, defineEmits, useAttrs } from "vue";

    const attrs = useAttrs();

    const emit = defineEmits(["update:modelValue"]);

    const {
        fieldKey,
        type,
        label,
        modelValue,
        rows = 4,
        callback,
    } = defineProps<{
        fieldKey: string;
        type: string;
        label: string;
        modelValue: string | number;
        rows?: number;
        error?: string | undefined;
        callback: (payload: any) => void;
    }>();

    const handleInput = (event: any) => {
        const value = event.target.value;
        emit("update:modelValue", value);
        callback(value);
    };
</script>

<template>
    <div class="ui-input">
        <label :for="fieldKey" class="ui-input-label block text-gray-500 text-sm mb-1">
            {{ label }}
        </label>

        <textarea
            :id="fieldKey"
            :type="type"
            :value="modelValue"
            :placeholder="label"
            @input="handleInput"
            v-bind="attrs"
            :rows="rows"
            class="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 border border-gray-200 placeholder:text-gray-400 focus:border-indigo-600 outline-0 transition ease-in-out duration-200"
            :class="{
                'ui-input-value': true,
                'is-invalid': !!error,
            }"></textarea>
        <p v-if="error" class="ui-input-error text-xs text-red-500 mt-1 block">
            {{ error }}
        </p>
    </div>
</template>

<style scoped lang="scss"></style>

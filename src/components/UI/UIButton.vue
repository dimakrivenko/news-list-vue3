<script setup lang="ts">
    //	Example usage
    //
    //	<UIButton variant="secondary" size="sm" :disabled="true">Удалить</BaseButton>
    //
    //---------------

    import { computed } from "vue";
    import { RouterLink } from "vue-router";
    import UILoader from "@/components/UI/UILoader.vue";
	import type { ButtonVariant, ButtonSize, ButtonProps } from "@/types/Button";

    // type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "link";
    // type ButtonSize = "sm" | "md" | "lg";


    const props = withDefaults(defineProps<ButtonProps>(), {
        variant: "primary",
        size: "md",
        disabled: false,
        loading: false,
        type: "button",
        to: undefined,
        href: undefined,
    });

    const isLinkExternal = computed(() => !!props.href && !props.disabled && !props.loading);
    const isRouterLink = computed(() => !!props.to && !props.disabled && !props.loading);

    const tag = computed(() => {
        if (isRouterLink.value) return RouterLink;
        if (isLinkExternal.value) return "a";
        return "button";
    });

    const baseClasses =
        "inline-flex items-center font-medium rounded-lg px-5 py-2 transition duration-200 ease-in-out cursor-pointer cursor-pointer";

    const variantClasses = computed<string>(() => {
        switch (props.variant) {
            case "secondary":
                return "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 active:bg-gray-200";
            case "danger":
                return "text-white bg-red-600 hover:bg-red-700 active:bg-red-600";
            case "link":
                return "text-green-700 bg-transparent p-0 hover:underline active:bg-gray-100 no-underline";
            case "ghost":
                return "text-gray-900 bg-transparent hover:bg-gray-100 active:bg-gray-200";
            case "primary":
            default:
                return "text-white bg-green-700 hover:bg-green-800 active:bg-green-700";
        }
    });

    const sizeClasses = computed<string>(() => {
        switch (props.size) {
            case "sm":
                return "text-xs px-3 py-1.5";
            case "lg":
                return "text-base px-5 py-3";
            case "md":
            default:
                return "text-sm px-5 py-2";
        }
    });

    const disabledClasses = computed(() => {
        return props.disabled || props.loading
            ? "opacity-50 cursor-not-allowed pointer-events-none shadow-none"
            : "hover:shadow-md";
    });

    const buttonClasses = computed(() => {
        return [baseClasses, variantClasses.value, sizeClasses.value, disabledClasses.value].join(
            " ",
        );
    });

    const emit = defineEmits<{
        (e: "click", event: MouseEvent): void;
    }>();

    const handleClick = (event: MouseEvent) => {
        if (tag.value === "button") {
            emit("click", event);
        }
    };
</script>

<template>
    <component
        :is="tag"
        :type="tag === 'button' ? props.type : undefined"
        :disabled="tag === 'button' ? props.disabled || props.loading : undefined"
        :href="isLinkExternal ? props.href : undefined"
        :to="isRouterLink ? props.to : undefined"
        :class="buttonClasses"
        style="text-decoration: none"
        @click="handleClick">
        <span v-if="loading" class="inline-flex items-center me-2">
            <UILoader :width="18" :height="18" :color="'#fff'" />
        </span>

        <slot>
            {{ props.loading ? "Loading..." : "" }}
        </slot>
    </component>
</template>

<style scoped lang="scss"></style>

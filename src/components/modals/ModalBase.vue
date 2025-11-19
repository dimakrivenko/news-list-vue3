<template>
    <VueFinalModal
        :model-value="modalStore.isModalOpen(props.name)"
        :key="props.name"
        :class="[
            'fixed inset-0 overflow-y-auto flex items-start justify-center min-h-screen pl-4 pr-4 pt-10 pb-10',
            props.modalClass,
        ]"
        :content-class="[
            'vfm-modal-content relative max-w-4xl transform overflow-hidden rounded-lg bg-white px-8 py-6 text-left align-middle shadow-2xl dark:bg-gray-800',
			props.modalContentClass,
        ]"
        :content-style="props.modalStyle ? [props.modalStyle] : []"
        :overlay-class="['!fixed']"
        overlay-transition="vfm-fade"
        content-transition="vfm-scale-fade"
        @before-close="closeHandler()"
        @update:model-value="handleVfmUpdate"
        :lock-scroll="true"
        :focus-retain="true"
        v-bind="$attrs">
        <slot :payload="payload" :close="closeHandler" />

        <button
            @click="closeHandler()"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer"
            aria-label="Close">
            <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                class="fill-current transition ease-in-out duration-200"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                    fill="currentColor" />
            </svg>
        </button>
    </VueFinalModal>
</template>

<script setup lang="ts">
    import { VueFinalModal } from "vue-final-modal";
    import { computed } from "vue";
    import { useModalStore } from "@/stores/Modal";

    interface BaseModalProps {
        name: string;
        modalClass?: string;
        modalContentClass?: string;
        modalStyle?: string;
        overlayTransition?: string;
        contentTransition?: string;
    }

    const props = defineProps<BaseModalProps>();
    const modalStore = useModalStore();

    const emit = defineEmits<{
        (e: "close"): void;
    }>();

    const payload = computed(() => modalStore.getPayload(props.name));

    const closeHandler = () => {
        emit("close");
    };

    // Экшн для слота (позволяет закрыть модал изнутри)
    // const closeModalAction = () => {
        // console.log(`closeModalAction for ${props.name}`);
        // modalStore.closeModal(props.name); // Вызываем закрытие по имени
    // };

    const handleVfmUpdate = (value: boolean) => {
        if (!value && modalStore.isModalOpen(props.name)) {
            closeHandler();
        }
    };
</script>

<style lang="scss">
    .vfm-fade-enter-active,
    .vfm-fade-leave-active {
        transition: 0.3s ease-out;
    }
    .vfm-fade-enter-from,
    .vfm-fade-leave-to {
        opacity: 0;
    }

    .vfm-scale-fade-enter-active,
    .vfm-scale-fade-leave-active {
        transition: 0.3s ease-out;
    }
    .vfm-scale-fade-enter-from,
    .vfm-scale-fade-leave-to {
        opacity: 0;
        transform: scale(0.95);
    }
    .vfm--fixed {
        &:before {
            content: "";
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(40, 40, 40, 0.5);
            backdrop-filter: blur(3px);
            // opacity: 0;
            transition: 0.15s ease-out;
        }
        .vfm__overlay {
            display: none !important;
        }
        &.is-overlay {
            &:before {
                opacity: 1;
            }
        }
    }
    .vfm-modal-content {
        position: relative;
    }
</style>

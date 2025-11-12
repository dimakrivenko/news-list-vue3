<script setup lang="ts">
    import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from "@headlessui/vue";
    import { ref, computed, onMounted, watch } from "vue";
    import { useModalStore } from "@/stores/Modal";
    import ModalConfirmDelete from "@/components/modals/ModalConfirmDelete.vue";

    interface BaseModalProps {
        name: string;
        modalClass?: string;
        modalStyle?: string;
    }

    const BASE_Z_INDEX = 1000;
    const Z_INDEX_STEP = 10;

    const props = defineProps<BaseModalProps>();

    const modalStore = useModalStore();

    const emit = defineEmits<{
        (e: "close"): void;
    }>();

    // Получаем Payload для текущего модального окна
    const payload = computed(() => modalStore.getPayload(props.name));

    const isTopModal = computed(() => {
        return modalStore.topModalName === props.name;
    });

    const closeHandler = (event?: Event) => {
        console.log("closeHandler base 222");
        console.log(event);

        if (event) {
            event.stopPropagation();
            console.log(`Клик по кнопке ${props.name}. Всплытие остановлено.`);
        }

        // const topModalEl = document.querySelector(
        //     `.headlessui-dialog[data-key="${modalStore.topModalName}"]`,
        // );

        console.log(modalStore.topModalName);
        console.log(props.name);
        console.log(isTopModal.value);

        // emit("close");

        // // Возможно это закоментировать
        if (isTopModal.value) {
            emit("close");
            modalStore.closeModalTop();
            //     // modalStore.closeModal(props.name); // Возможно вернуть !!!
        }
    };

    const closeModalAction = () => {
        console.log("closeModalAction 444");

        modalStore.closeModal(props.name);
    };

    const currentModalIndex = computed(() => {
        return modalStore.modalStack.findIndex((m) => m.name === props.name);
    });

    const dialogZIndex = computed(() => {
        if (currentModalIndex.value === -1) return null;

        return BASE_Z_INDEX + currentModalIndex.value * Z_INDEX_STEP;
    });

    const contentZIndex = computed(() => {
        if (dialogZIndex.value === null) return null;
        return dialogZIndex.value + 1;
    });

    watch(
        () => props.name,
        (newName, oldName) => {
            console.log(`BaseModal props.name changed: ${oldName} -> ${newName}`);
        },
        { immediate: true },
    );
</script>

<template>
    <TransitionRoot as="template" :show="modalStore.isModalOpen(props.name)">
        <Dialog
            :open="modalStore.isModalOpen(props.name)"
            :key="props.name"
            :data-key="props.name"
            @close="closeHandler()"
            :class="['relative', 'headlessui-dialog']"
            :style="{ zIndex: dialogZIndex }">
            <TransitionChild
                enter="ease-out duration-300"
                enter-from="opacity-0"
                enter-to=""
                leave="ease-in duration-200"
                leave-from=""
                leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-700/75 transition-opacity"></div>
                <!-- <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" /> -->
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4">
                    <TransitionChild
                        as="template"
                        enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to=" translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leave-from=" translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            :class="[
                                'relative max-w-4xl transform overflow-hidden rounded-lg bg-white px-8 py-6 text-left align-middle shadow-2xl transition-all dark:bg-gray-800',
                                props.modalClass,
                            ]"
                            :style="[{ zIndex: contentZIndex }, props.modalStyle]">
                            <slot :payload="payload" :close="closeModalAction" />

                            <button
                                @click="closeHandler($event)"
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
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

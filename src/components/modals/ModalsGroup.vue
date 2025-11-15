<script setup lang="ts">
    import { computed, defineAsyncComponent } from "vue";
    import { useModalStore } from "@/stores/Modal";

    // import ModalForm from "@/components/modals/ModalForm.vue";
    // import ModalConfirmDelete from "@/components/modals/ModalConfirmDelete.vue";

    const modalStore = useModalStore();

    const ModalMap: Record<string, any> = {
        "modal-form": defineAsyncComponent(() => import("@/components/modals/ModalForm.vue")),
        "modal-confirm-delete": defineAsyncComponent(
            () => import("@/components/modals/ModalConfirmDelete.vue"),
        ),
        "modal-post-info": defineAsyncComponent(
            () => import("@/components/modals/ModalPostInfo.vue"),
        ),
    };

    const modalStack = computed(() => modalStore.modalStack);
</script>

<template>
    <div>
        <template v-for="modal in modalStack" :key="modal.id">
            <component
                :is="ModalMap[modal.name]"
                :name="modal.name"
                :payload="modal.payload"
                v-bind="modal.props" />
        </template>
    </div>
</template>

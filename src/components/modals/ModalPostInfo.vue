<script setup lang="ts">
    import { computed } from "vue";
    import { useModalStore } from "@/stores/Modal";
    import BaseModal from "@/components/modals/BaseModal.vue";

    const modalStore = useModalStore();
    const modalName = "modal-post-info";

    interface ModalPostInfoPayload {
        url?: string;
    }

    const payload = computed<ModalPostInfoPayload | null>(() => {
        return modalStore.getPayload(modalName) as ModalPostInfoPayload | null;
    });

    const url = computed<string>(() => payload.value?.url || "");
</script>

<template>
    <BaseModal :name="modalName" panel-class="max-w-md" @close="handleCancel">
        <template #default="{}">
            <div>
                <div class="post-content pt-8 pb-3">
                    <iframe :src="url" frameborder="0" class="w-full min-h-96"></iframe>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script setup lang="ts">
    import { onMounted } from "vue";
    import UIButton from "@/components/UI/UIButton.vue";
    import FormBase from "@/components/FormBase.vue";

    import { useModalStore } from "@/stores/Modal";
    import { useNewsStore } from "@/stores/News";

    const modalStore = useModalStore(),
        newsStore = useNewsStore();

    const handleFormSubmit = () => {
        console.log("handleSubmit 22");
        // console.log(values);
    };
    const handleFormCancel = () => {
        console.log("handleCancel 22");
        // console.log(e);
    };

    const openModalConfirm = () => {
        // Модальное окно подтверждения
        modalStore.openModal(
            "modal-confirm-delete",
            {
                title: "Подтвердить создание поста?",
                message: `Новость будет опубликована немедленно!`,
                btnCancel: {
                    name: "Отмена",
                },
                btnSuccess: {
                    name: "Разместить",
                },
                callback: (confirmed: boolean) => {
                    if (confirmed) {
                        // Выполняется только после нажатия кнопки "Удалить" в модальном окне
                        console.log(`✅ Пользователь подтвердил создание поста!!`);
                        // modalStore.closeModal("modal-confirm-delete");

                        modalStore.openModal("modal-form", {
                            id: 9999,
                            title: "Добавить статью",
                            fields: [],
                            btnCancel: {
                                name: "Отмена",
                            },
                            // callback: (confirmed: any) => {},
                        });
                    } else {
                        console.log(`❌ Создание поста отменено пользователем.`);
                    }
                },
            },
            {
                modalClass: "min-w-md",
            },
        );
    };

    onMounted(() => {
        newsStore.initCreateNewsFields();
    });
</script>

<template>
    <div class="containeer">
        <div class="mx-auto mb-8">
            <h2 class="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                UI Kit
            </h2>
        </div>

        <div class="flex items-center gap-2 mx-auto max-w-7xl">
            <UIButton @click="openModalConfirm">Модальное окно confirm</UIButton>
            <UIButton variant="primary" size="lg" type="submit">Большая кнопка</UIButton>
            <UIButton variant="secondary" size="md">Вторичная</UIButton>
            <UIButton variant="danger" size="sm">Удалить</UIButton>
            <UIButton variant="primary" :disabled="true">Отключена</UIButton>
            <UIButton variant="primary" :loading="true">Отправка</UIButton>
            <UIButton href="/profile" variant="link">Профиль (ссылка)</UIButton>
            <UIButton to="/" variant="link">Профиль 2222</UIButton>
        </div>

        <br />
        <br />
        <br />

        <div class="mx-auto mb-8">
            <h2 class="text-2xl font-semibold text-pretty text-gray-900 mb-5">Форма</h2>
            <div class="max-w-md">
                <FormBase
                    v-if="newsStore.modalCreateNewsFormFields"
                    :fields="newsStore.modalCreateNewsFormFields"
                    :btn-cancel="{
                        name: 'Отмена',
                    }"
                    @submitForm="handleFormSubmit"
                    @cancelForm="handleFormCancel"></FormBase>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>

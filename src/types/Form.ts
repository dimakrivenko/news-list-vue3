export interface SelectValueMultiple {
    name: string;
    value: string;
}
export interface ButtonVariantElement {
    name?: string;
    variant?: string;
}

export interface FormFieldText {
    // Дискриминатор
    type: "text" | "textarea";

    // Специфический value
    value?: string | number | null | undefined;

    // Общие поля
    key: string;
    label?: string;
    rules?: any;
    callback?: (payload: any) => void;
}

export interface FormFieldSelect {
    // Дискриминатор
    type: "select";

    // Специфический value (может быть одним элементом или массивом, если multiple: true)
    value?: SelectValueMultiple | SelectValueMultiple[] | null | undefined;
    selectedList?: SelectValueMultiple[];
	selected?: SelectValueMultiple | null,
    // Назовем список опций более явно
    options?: SelectValueMultiple[];

    multiple?: boolean;
    taggable?: boolean;
    closeOnSelect?: boolean;
    searchable?: boolean;
    allowEmpty?: boolean;

    // Общие поля
    key: string;
    label?: string;
    rules?: any;
    callback?: (payload: any) => void;
}

export type FormField = FormFieldText | FormFieldSelect;

// export interface FormField {
//     key?: string;
//     type?: string;
//     label?: string;
//     value?: string | null | undefined | number | SelectValueMultiple[];
//     selected?: object;
//     selectedList?: object;
//     rules?: any; // Yup валидация
//     multiple?: boolean;
//     taggable?: boolean;
//     closeOnSelect?: boolean;
//     searchable?: boolean;
//     allowEmpty?: boolean;
//     callback: (payload: any) => void;
// }

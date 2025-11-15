export interface SelectValueMultiple {
    name: string;
    value: string;
}

export interface FormField {
    key: string;
    type: string;
    label?: string;
    value?: string | number | null | SelectValueMultiple[];
    selected?: object;
    selectedList?: object;
    rules: any; // Yup валидация
    multiple?: boolean;
    taggable?: boolean;
    closeOnSelect?: boolean;
    searchable?: boolean;
    allowEmpty?: boolean;
    callback: (payload: any) => void;
}

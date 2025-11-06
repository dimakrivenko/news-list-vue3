export const helpers = {
    formatDate(dateString: string, type: string = "DD-MM-YYYY"): string {
        if (!dateString) return "";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "Invalid Date";
        }

        const ruMonths = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
            // "янв",
            // "фев",
            // "мар",
            // "апр",
            // "май",
            // "июн",
            // "июл",
            // "авг",
            // "сен",
            // "окт",
            // "ноя",
            // "дек",
        ];

        const day = date.getDate().toString().padStart(2, "0"); // Добавляем нули (01, 02...)
        const monthIndex = date.getMonth();
        const fullYear = date.getFullYear();

        switch (type.toLowerCase()) {
            case "dd-mm-yyyy":
                // Формат 01-11-2025
                const monthNum = (monthIndex + 1).toString().padStart(2, "0");
                return `${day}-${monthNum}-${fullYear}`;

            case "month-text":
            case "dd month yyyy":
                // Формат 01 ноя 2025
                const monthText = ruMonths[monthIndex];
                return `${day} ${monthText} ${fullYear}`;

            case "yyyy":
                // Формат 2025
                return fullYear.toString();

            default:
                return `${day}-${(monthIndex + 1).toString().padStart(2, "0")}-${fullYear}`;
        }
    },
};

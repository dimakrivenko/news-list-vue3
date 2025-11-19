export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "link";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
	variant?: ButtonVariant;
	size?: ButtonSize;
	disabled?: boolean;
	loading?: boolean;
	type?: "button" | "submit" | "reset";
	to?: string | object;
	href?: string;
}

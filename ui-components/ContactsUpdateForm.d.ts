import * as React from 'react';
import { GridProps, SelectFieldProps, TextFieldProps } from '@aws-amplify/ui-react';
import { Contacts } from './graphql/types';
export declare type EscapeHatchProps = {
	[elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
	[key: string]: string;
};
export declare type Variant = {
	variantValues: VariantValues;
	overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
	hasError: boolean;
	errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ContactsUpdateFormInputValues = {
	name?: string;
	phone?: string;
	email?: string;
	type?: string;
	ssn?: number;
	ein?: number;
	dba?: string;
	notes?: string;
};
export declare type ContactsUpdateFormValidationValues = {
	name?: ValidationFunction<string>;
	phone?: ValidationFunction<string>;
	email?: ValidationFunction<string>;
	type?: ValidationFunction<string>;
	ssn?: ValidationFunction<number>;
	ein?: ValidationFunction<number>;
	dba?: ValidationFunction<string>;
	notes?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ContactsUpdateFormOverridesProps = {
	ContactsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
	name?: PrimitiveOverrideProps<TextFieldProps>;
	phone?: PrimitiveOverrideProps<TextFieldProps>;
	email?: PrimitiveOverrideProps<TextFieldProps>;
	type?: PrimitiveOverrideProps<SelectFieldProps>;
	ssn?: PrimitiveOverrideProps<TextFieldProps>;
	ein?: PrimitiveOverrideProps<TextFieldProps>;
	dba?: PrimitiveOverrideProps<TextFieldProps>;
	notes?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ContactsUpdateFormProps = React.PropsWithChildren<
	{
		overrides?: ContactsUpdateFormOverridesProps | undefined | null;
	} & {
		id?: string;
		contacts?: Contacts;
		onSubmit?: (fields: ContactsUpdateFormInputValues) => ContactsUpdateFormInputValues;
		onSuccess?: (fields: ContactsUpdateFormInputValues) => void;
		onError?: (fields: ContactsUpdateFormInputValues, errorMessage: string) => void;
		onChange?: (fields: ContactsUpdateFormInputValues) => ContactsUpdateFormInputValues;
		onValidate?: ContactsUpdateFormValidationValues;
	} & React.CSSProperties
>;
export default function ContactsUpdateForm(props: ContactsUpdateFormProps): React.ReactElement;

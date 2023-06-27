import React, { FC, useEffect, useState } from 'react';

import {useNavigate} from 'react-router-dom';

import './Form.css';
import { Button } from '../Button/Button';

interface optionField {
	value: string;
	label: string;
}

export interface FormField {
	name: string;
	type: string;
	label: string;
	placeholder?: string;
	value?: string;
	options?: optionField[];
	selected?: string;
}

interface FormProps {
	title?: string;
	fields: FormField[];
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	button: JSX.Element | JSX.Element[] | string;
	editable?: boolean;
	errors?: { [key: string]: string };
}

export const Form: FC<FormProps> = ({
	title,
	fields,
	onSubmit,
	button,
	editable,
	errors,
}) => {
	const [selectedOption, setSelectedOption] = useState(false);
	const [formEdit, setFormEdit] = useState<{ name: string; value: string }[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		if (editable && fields) {
			const values = fields.map(({ name, value }) => ({
				name,
				value: value ?? '',
			}));
			setFormEdit(values);
			setSelectedOption(values.some((field) => field.value !== ''));
		}
	}, [editable, fields]);

	function handleChange(name: string, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		const updatedFormEdit = formEdit.map((f) => {
			if (f.name === name) {
				return { ...f, value: e.target.value };
			}
			return f;
		});
		setFormEdit(updatedFormEdit);
	}

	return (
		<>
			<form onSubmit={onSubmit}>
				{title && <h1>{title}</h1>}
				{fields?.map(
					({ name, type, label, placeholder, value, options }) => {
						switch (type) {
							case 'hidden': {
								return (
									<input
										type={type}
										name={name}
										id={name}
										value={value}
										key={name}
									/>
								);
							}
							case 'text':
							case 'password': 
							case 'number':{
								return (
									<div className={`inputControl`} key={name}>
										<input
											type={type}
											name={name}
											id={name}
											value={formEdit.find((f) => f.name === name)?.value}
											onChange={(e) => handleChange(name, e)}
											placeholder={placeholder ? placeholder : label}
											autoComplete='false'
										/>
										{errors && errors[name] && (
											<span className={`error`}>{errors[name]}</span>
										)}
										<label htmlFor={name}>{label}</label>
									</div>
								);
							}
							case 'select': {
								return (
									<div
										className={`selectControl${selectedOption ? ' active' : ''}`}
										key={name}
									>
										<select
											name={name}
											id={name}
											value={selectedOption ? formEdit.find((f) => f.name === name)?.value : ''}
											onChange={(e) => {
												const hasSelectedOption = e.target.value !== '';
												setSelectedOption(hasSelectedOption);
												handleChange(name, e);
											}}
										>
											<option value=''></option>
											{options?.map(({ value, label }) => (
												<option key={value} value={value}>
													{label}
												</option>
											))}
										</select>
										<label htmlFor={name}>{label}</label>
									</div>
								);
							}
							case 'date': {
								return (
									<div className={`inputControl`} key={name}>
										<input
											type={type}
											name={name}
											id={name}
											value={formEdit.find((f) => f.name === name)?.value}
											onChange={(e) => handleChange(name, e)}
											placeholder={placeholder ? placeholder : label}
											autoComplete='false'
										/>
										{errors && errors[name] && (
											<span className={`error`}>{errors[name]}</span>
										)}
										<label htmlFor={name}>{label}</label>
									</div>
								)
							}
							default: {
								return (
									<div>
										Tipo {type} desconocido en el input {name}
									</div>
								);
							}
						}
					}
				)}
				{button}
				<Button text={'Cancelar'} onClick={()=> navigate(-1)} fill={false}/>
			</form>
		</>
	);
};


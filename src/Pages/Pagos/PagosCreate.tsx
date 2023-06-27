import { Form, FormField } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { useFetch } from '../../Hooks/useFetch';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const PagosCreate = () => {
	const navigate = useNavigate();
	const [controlErrors, setControlErrors] = useState({});
	const { error, setBodyRequest } = useFetch({
		url: 'https://coff-v-art-api.onrender.com/api/pay',
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	});

	function handleRegisterPay(e: any) {
		e.preventDefault();
		const numeroContrato = e.target.numeroContrato.value;
		const montoPagado = e.target.montoPagado.value;
		// const fechaPago = e.target.fechaPago.value ? e.target.fechaPago.value : new Date();
		if (numeroContrato === '') {
			setControlErrors({
				...controlErrors,
				numeroContrato: 'El numero de contrato es requerido',
			});
			return;
		} else if (montoPagado === '') {
			setControlErrors({
				...controlErrors,
				montoPagado: 'El monto a pagar es requerido',
			});
			return;
		}
		const pay = {
			numeroContrato,
			montoPagado,
			// fechaPago: fechaPago ? fechaPago : null,
		};
		setBodyRequest(pay);

		console.log(error);
		setTimeout(() => {
			navigate('/admin/pagos');
		}, 500);
		console.log(error);
	}
	const pagosFields: FormField[] = [
		{
			name: 'numeroContrato',
			type: 'number',
			label: 'numero de Contrato',
		},
		{
			name: 'montoPagado',
			type: 'number',
			label: 'Monto a Pagar',
		},
		// {
		// 	name: 'fechaPago',
		// 	type: 'date',
		// 	label: 'Fecha de pago',
		// },
	];

	return (
		<>
			<Form
				fields={pagosFields}
				title='Crear Pago'
				onSubmit={handleRegisterPay}
				button={<Button text={'Registrar Pago'} onClick={() => null} />}
				errors={controlErrors}
			/>
		</>
	);
};

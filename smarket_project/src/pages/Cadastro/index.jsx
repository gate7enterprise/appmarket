import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import * as yup from 'yup'
import Axios from 'axios'

import '../../styles/cadastro.sass'

function Cadastro() {

	const [isAdmin, setIsAdmin] = useState(false)

  const handleClickRegister = (values) => {
		if (values.admin) {
			setIsAdmin(true);
		} else if (!values.admin) {
			setIsAdmin(false);
		}
		console.log('Teste not admin:', isAdmin);

		Axios.post('http://localhost:3001/register', {
			email: values.email,
			password: values.password,
			admin: values.admin,
		}).then((response) => {
			if (response.data.msg == 'Usuário já cadastrado') {
				alert(response.data.msg);
			} else if (response.data.msg == 'Cadastrado com sucesso') {
				alert(response.data.msg)
				const form = document.querySelectorAll('.form-field')
				form.forEach(el => {
					el.value = ''
				})
			}
		});
	}
  const validationOnRegister = yup.object().shape({
		email: yup
			.string()
			.email('Digite um email válido')
			.required('Este campo é obrigatório'),
		emailconfirm: yup
			.string()
			.oneOf([yup.ref('email'), null], 'Os e-mails não coicidem'),
		password: yup
			.string()
			.min(8, 'Mínimo de 8 dígitos')
			.required('Este campo é obrigatório'),
		confirmpassword: yup
			.string()
			.oneOf([yup.ref('password'), null], 'As senhas não coicidem.'),
		admin: yup
			.boolean()
	});

  return (
		<div className='cad-container'>
			<h2>Cadastro de novo usuário</h2>
			<Formik
				initialValues={{
					admin: false,
				}}
				onSubmit={handleClickRegister}
				validationSchema={validationOnRegister}
			>
				<Form className='login-form'>
					<div className='login-form-group'>
						<Field 
							name='email' 
							className='form-field' 
							placeholder='Email' 
						/>
						<ErrorMessage
							component='span'
							name='email'
							className='form-error'
						/>
					</div>
					<div className='login-form-group'>
						<Field
							name='emailconfirm'
							className='form-field'
							placeholder='Confirme seu Email'
						/>
						<ErrorMessage
							component='span'
							name='emailconfirm'
							className='form-error'
						/>
					</div>

					<div className='login-form-group'>
						<Field
							name='password'
							className='form-field'
							placeholder='Senha'
							type='password'
						/>
						<ErrorMessage
							component='span'
							name='password'
							className='form-error'
						/>
					</div>
					<div className='login-form-group'>
						<Field
							name='confirmpassword'
							className='form-field'
							placeholder='Confirme sua Senha'
							type='password'
						/>
						<ErrorMessage
							component='span'
							name='confirmpassword'
							className='form-error'
						/>
					</div>
					<div className='login-form-group'>
						<div className='check'>
							<label>Admin</label>
							<Field className='admin' name='admin' type='checkbox' />
						</div>
						<button className='btn' type='submit'>
							Cadastrar
						</button>
					</div>
				</Form>
			</Formik>
		</div>
	);
}

export default Cadastro
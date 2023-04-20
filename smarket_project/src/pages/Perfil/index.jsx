
	import { Formik, Form, Field, ErrorMessage } from 'formik';
	import React, { useState, useEffect } from 'react';
	import { format } from 'date-fns';

	import Axios from 'axios';
	import '../../styles/login.sass';

	export default function Perfil() {

		const [nasc, setNasc] = useState('')
		const [userData, setUserData] = useState({})
		const [nome, setNome] = useState('')
		const [endereco, setEndereco] = useState({})
		const [male, setMale] = useState(false)
		const [female, setFemale] = useState(false)

		const handleClickSalvar = (values) => {
			
			const endereco = new Object
			endereco.logradouro = values.logradouro
			endereco.numero = values.numero
			endereco.bairro = values.bairro
			endereco.estado = values.estado
			endereco.uf = values.uf
			endereco.cep = values.cep
			
			const endToJson = JSON.stringify(endereco)
			
			Axios.post('http://localhost:3001/profile', {
				nome: values.nome,
				nascimento: values.nascimento,
				sexo: values.sexo,
				endereco: endToJson
			}).then(res => {
				console.log(res);
				alert("Atualização do Perfil foi Salva")
			})
		}
		
		const carregaProfile = async () => {
			const response = await Axios.get('http://localhost:3001/profile');
			setUserData(response.data);
		};
		
		useEffect(() => {
			carregaProfile();
		}, []);

		useEffect(() => {
			if (userData[0]) {
				setNome(userData[0].nome);
				userData[0].sexo === 'M' ? setMale(true) : setFemale(true);
				setEndereco(JSON.parse(userData[0]?.endereco));
				const formattedDate = format(
					new Date(userData[0].nascimento),
					'yyyy-MM-dd'
				);
				setNasc(formattedDate)
				console.log(formattedDate)
			}
		}, [userData]);

		return (
			<div className='super-container'>
				<h2>Perfil</h2>
				<Formik onSubmit={handleClickSalvar}>
					<Form className='profile-form'>
						<div className='profile-form-group'>
							<Field
								name='nome'
								className='form-field'
								placeholder='Nome Completo'
								value={nome}
							/>
							<ErrorMessage
								component='span'
								name='nome'
								className='form-error'
							/>
						</div>

						<div className='profile-form-group'>
							<Field
								name='nascimento'
								className='form-field'
								// placeholder='nascimento'	
								type='date'
								autoComplete='nascimento'
								value={nasc}
							/>
							<ErrorMessage
								component='span'
								name='nascimento'
								className='form-error'
							/>
						</div>

						<div className='profile-form-group'>
							<label>Endereço:</label>
							<div className='end-firstline'>
								<Field
									name='logradouro'
									className='form-field log'
									placeholder='Logradouro'
									type='text'
									value={endereco.logradouro}
								/>
								<ErrorMessage
									component='span'
									name='logradouro'
									className='form-error'
								/>
								<Field
									name='numero'
									className='form-field'
									placeholder='numero'
									type='number'
									value={endereco.numero}
								/>
								<ErrorMessage
									component='span'
									name='numero'
									className='form-error'
								/>
							</div>
							<Field
								name='bairro'
								className='form-field'
								placeholder='Bairro'
								type='text'
								value={endereco.bairro}
							/>
							<ErrorMessage
								component='span'
								name='bairro'
								className='form-error'
							/>
							<div className='end-others'>
								<Field
									name='estado'
									className='form-field log'
									placeholder='Estado'
									type='text'
									value={endereco.estado}
								/>
								<ErrorMessage
									component='span'
									name='estado'
									className='form-error'
								/>
								<Field
									name='uf'
									className='form-field'
									placeholder='UF'
									type='text'
									value={endereco.uf}
								/>
								<ErrorMessage
									component='span'
									name='uf'
									className='form-error'
								/>
								<Field
									name='cep'
									className='form-field'
									placeholder='cep'
									type='text'
									value={endereco.cep}
								/>
								<ErrorMessage
									component='span'
									name='cep'
									className='form-error'
								/>
							</div>
						</div>

						<div className='checkbox-form-group'>
							<label>Masculino</label>
							<Field
								name='sexo'
								className='form-field'
								value='M'
								type='radio'
								checked={male}
								onChange={(e) => male(e.target.checked)}
							/>

							<label>Feminino</label>
							<Field
								name='sexo'
								className='form-field'
								value='F'
								type='radio'
								checked={female}
								onChange={(e) => female(e.target.checked)}
							/>

							<ErrorMessage
								component='span'
								name='sexo'
								className='form-error'
							/>
						</div>
						<div className='profile-form-group'>
							<button className='btn' type='submit'>
								Salvar
							</button>
						</div>
					</Form>
				</Formik>
			</div>
		);
	}

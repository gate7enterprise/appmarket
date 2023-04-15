import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState, useEffect } from 'react';

import Axios from 'axios';
import '../../styles/login.sass';

export default function Perfil() {

  const [userData, setUserData] = useState({})
  const [nome, setNome] = useState('')
  const [endereco, setEndereco] = useState({})
	const [male, setMale] = useState(false)

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
		console.log('RESPONSE DATA:', userData);
		userData[0].sexo == 'M' ? setMale(true) : setFemale(true)

		setEndereco(JSON.parse(userData[0]?.endereco));
	};
	console.log("sexo:: ", male)
	
  useEffect(() => {
		carregaProfile();

	}, []);

	return (
		<div className='super-container'>
			<h2>Perfil</h2>
			<Formik
				onSubmit={handleClickSalvar}
			>
				<Form className='profile-form'>
					<div className='profile-form-group'>
						<Field
							name='nome'
							className='form-field'
							placeholder='Nome Completo'
							autoComplete='nome'
							// value={userData[0].nome}
						/>
						<ErrorMessage component='span' name='nome' className='form-error' />
					</div>

					<div className='profile-form-group'>
						<Field
							name='nascimento'
							className='form-field'
							placeholder='nascimento'
							type='date'
							autoComplete='nascimento'
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
							/>
							<ErrorMessage component='span' name='uf' className='form-error' />
							<Field
								name='cep'
								className='form-field'
								placeholder='cep'
								type='text'
								
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
						<Field name='sexo' className='form-field' value='M' type='radio' />
				
						<label>Feminino</label>
						<Field name='sexo' className='form-field' value='F' type='radio' />
				
						<ErrorMessage component='span' name='sexo' className='form-error' />
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

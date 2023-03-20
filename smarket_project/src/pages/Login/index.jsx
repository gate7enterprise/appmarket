import { Formik, Form, Field, ErrorMessage } from "formik"
import { useNavigate } from "react-router-dom"
import * as yup from 'yup'
import Axios from 'axios'

import Logo from '../../assets/logo.png'
import '../../styles/login.sass'

function Login() {
  
  const navigate = useNavigate()

  const handleClickSubmit = (values) => {
    Axios.post('http://localhost:3001/login', {
      email: values.email,
      password: values.password,
    }).then((response) => {
			if (response.data.msg == 'Usuário não cadastrado') {
				alert(response.data.msg)
			} else if (response.data.msg == 'senha incorreta') {
				alert(response.data.msg)
			} else if (response.data.msg) {
        const nav = document.querySelector('.nav')
        nav.style.display = 'block'
        navigate('/home')
			}
    })
  }
  const validationOnLogin = yup.object().shape({
		email: yup
			.string()
			.email('Digite um email válido')
			.required('Este campo é obrigatório'),
		password: yup
			.string()
			.min(8, 'Mínimo de 8 dígitos')
			.required('Este campo é obrigatório'),
	})

  return (
		<div className='super-container'>
			<div className='right-field'>
				<img src={Logo} alt='logo' />
			</div>
			<Formik
				initialValues={{}}
				onSubmit={handleClickSubmit}
				validationSchema={validationOnLogin}
			>
				<Form className='login-form'>
					<div className='login-form-group'>
						<Field name='email' className='form-field' placeholder='Email' />
						<ErrorMessage
							component='span'
							name='email'
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
						<button className='btn' type='submit'>
							Logar
						</button>
					</div>
				</Form>
			</Formik>
		</div>
	)
}

export default Login
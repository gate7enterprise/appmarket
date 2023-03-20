import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Home from './pages/Home'
import Menu from './components/Menu'
import Perfil from './pages/Perfil'
import Produtos from './pages/Produtos'
import Vendas from './pages/Vendas'

import './styles/App.sass'

function App() {

  return (
		<div className='App'>
			<BrowserRouter>
				<div className='brouter'>
					<Menu />
					<Routes>
						<Route path='/' element={<Login />} />
						<Route path='/home' element={<Home />} />
						<Route path='/cadastro' element={<Cadastro />} />
						<Route path='/profile' element={<Perfil />} />
						<Route path='/products' element={<Produtos />} />
						<Route path='/vendas' element={<Vendas />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	)
}

export default App
  
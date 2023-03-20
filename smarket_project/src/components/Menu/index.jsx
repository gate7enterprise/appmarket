import '../../styles/menu.sass' 
import  { Link } from 'react-router-dom'
  
export default function Menu() {



  return (
    <nav className="nav">
      <ul>
        <li><Link className="link" to="/home">Home</Link></li>
        <li><Link className="link" to="/profile">Perfil</Link></li>
        <li><Link className="link" to="/products">Produtos</Link></li>
        <li><Link className="link" to="/cadastro">Cadastro</Link></li>
        <li><Link className="link" to="/vendas">Vendas</Link></li>
        <li><a className="link" href="/">sair</a></li>
      </ul>
    </nav>
  )
}
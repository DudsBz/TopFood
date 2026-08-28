
import { useState } from 'react'

// useNavigate: hook que nos dá a função de navegar para outras páginas via código
import { useNavigate, Link } from 'react-router-dom'

function Login() {
  // useState cria um par [valor, função_para_mudar_o_valor]
  // Aqui criamos dois estados: email e senha
  // Sintaxe: const [variavel, setVariavel] = useState(valorInicial)
  const [email, setEmail] = useState('')    // começa vazio
  const [senha, setSenha] = useState('')    // começa vazio
  const [erro, setErro] = useState('')      // mensagem de erro

  // useNavigate retorna uma função que podemos chamar para redirecionar
  const navigate = useNavigate()

  const processarLogin = (e) => {
    // e.preventDefault() impede o comportamento padrão do formulário,
    // que é recarregar a página
    e.preventDefault()
    // Validação simples (em um sistema real, verificaria no banco de dados)
    if (email == '' || senha == ''){
        setErro('Preencha todos os campos')
        return // para a execução
    }
    // Se passou na validação, redireciona para a Home
    // navigate('/home) muda a URL para /home e renderiza o componente Home
    navigate('/home')
  }

  return (
    <div className="autenticacao-login">
        <div className="autenticacao-card">
            <div className="autenticacao-header">
                <span className='autenticacao-logo'></span>
                <h1>PicaFood</h1>
                <p>Seu delivery favorito!</p>
            </div>
        <form onSubmit={processarLogin} className='autenticacao-form'>
            <div className='form-grupo'>
                <label htmlFor="email">Email</label>
                <input 
                id='email' 
                type="email" 
                placeholder='seu@email.com' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className = "formulario-input" />
            </div>
            <div className="formulario-grupo">
                <label htmlFor="senha">Senha</label>
                <input 
                  id="senha"
                  type="password"
                  placeholder="••••••••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="formulario-input"
                />
            </div>
            {erro && <p className="mensagem-erro">{erro}</p>}
            <button type="submit" className="botao-entrar">
                Entrar
            </button>
        </form>
        <p className="autenticacao-footer">Não tem conta? <Link to="/cadastro">Cadastre-se</Link></p>    
        </div>
    </div>
  )
}

export default Login
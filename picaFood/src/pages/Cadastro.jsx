
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function Cadastro() {
    const [form, setForm] = useState(
        {
            nome: '',
            email: '',
            telefone: '',
            senha: '',
            confirmarSenha: '',
        }
    )

    const [erro, setErro] = useState('')
    const [sucesso, setSucesso] = useState('')
    const navigate = useNavigate()

    const processarMudanca = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const processarCadastro = (e) => {
        e.preventDefault()

        if (!form.nome || !form.email || !form.telefone || !form.senha || !form.confirmarSenha) {
            setErro('Preencha todos os campos')
            return
        }
        if (form.senha !== form.confirmarSenha) {
            setErro('As senhas digitadas são diferentes')
            return
        }
        if (form.senha.lenght < 6) {
            setErro('A senha deve conter pelo menos 6 caracteres')
            return
        }

        console.log("Usuário cadastrado:", form)
        setSucesso(true)
        setErro('')

        setTimeout(() => {
            navigate('/home')
        }, 2000)
    }


    return (
        <div className="autenticacao-container">
            <div className="autenticacao-card">
                <div className="autenticacao-header">
                    <span className="autenticacao-logo">🍔</span>
                    <h1>Criar Conta</h1>
                    <p>Rápido, fácil e delicioso!</p>
                </div>

                {/* Renderização condicional: se sucesso for true, mostra mensagem */}
                {sucesso ? (
                    <div className="mensagem-sucesso">
                        ✅ Cadastro realizado com sucesso! Redirecionando...
                    </div>
                ) : (
                    <form onSubmit={processarCadastro} className="autenticacao-form">
                        <div className="formulario-group">
                            <label htmlFor="nome">Nome completo *</label>
                            {/*
                        name="nome": identifica este input na função handleChange
                        Todos os inputs usam o mesmo handleChange!
                    */}
                            <input
                                id="nome"
                                name="nome"
                                type="text"
                                placeholder="João Silva"
                                value={form.nome}
                                onChange={handleChange}
                                className="formulario-input"
                            />
                        </div>

                        <div className="formulario-group">
                            <label htmlFor="email-cadastro">E-mail *</label>
                            <input
                                id="email-cadastro"
                                name="email"
                                type="email"
                                placeholder="seu@email.com"
                                value={form.email}
                                onChange={handleChange}
                                className="formulario-input"
                            />
                        </div>

                        <div className="formulario-group">
                            <label htmlFor="telefone">Telefone</label>
                            <input
                                id="telefone"
                                name="telefone"
                                type="tel"
                                placeholder="(11) 99999-9999"
                                value={form.telefone}
                                onChange={handleChange}
                                className="formulario-input"
                            />
                        </div>

                        <div className="formulario-group">
                            <label htmlFor="senha-cadastro">Senha *</label>
                            <input
                                id="senha-cadastro"
                                name="senha"
                                type="password"
                                placeholder="Mínimo 6 caracteres"
                                value={form.senha}
                                onChange={handleChange}
                                className="formulario-input"
                            />
                        </div>

                        <div className="formulario-group">
                            <label htmlFor="confirmarSenha">Confirmar senha *</label>
                            <input
                                id="confirmarSenha"
                                name="confirmarSenha"
                                type="password"
                                placeholder="Repita a senha"
                                value={form.confirmarSenha}
                                onChange={handleChange}
                                className="formulario-input"
                            />
                        </div>

                        {erro && <p className="mensagem-erro">{erro}</p>}

                        <button type="submit" className="botao-principal">
                            Criar Conta
                        </button>
                    </form>
                )}

                <p className="autenticacao-footer">
                    Já tem conta? <Link to="/">Fazer login</Link>
                </p>
            </div>
        </div>
    )
}

export default Cadastro
# 🍔 GUIA DE DESENVOLVIMENTO — PicaFood
### Seu app de delivery estilo iFood feito em React JS

> **Guia escrito para um dev em formação.** Cada passo explica O QUÊ fazer, COMO fazer, POR QUÊ funciona e o que cada linha de código faz.

---

## 📋 VISÃO GERAL DO PROJETO

O **PicaFood** é um sistema web de delivery que terá:

| Página | O que faz |
|---|---|
| **Login / Cadastro** | O usuário cria conta ou entra no sistema |
| **Home (Cardápio)** | Lista de restaurantes e pratos disponíveis |
| **Carrinho** | Resumo dos itens escolhidos |
| **Pedidos** | Histórico e cadastro de pedidos (com useState ✅) |

### 🛠️ Tecnologias usadas
- **React 19** — biblioteca para construir interfaces
- **Vite** — ferramenta que serve e compila o projeto rapidinho
- **React Router DOM** — biblioteca para navegar entre páginas SEM recarregar o browser
- **CSS puro** — estilização manual, simples e poderosa

### 📁 Como ficará a estrutura de pastas ao final

```
picaFood/
└── src/
    ├── main.jsx              ← Ponto de entrada da aplicação
    ├── App.jsx               ← Configura as ROTAS (React Router)
    ├── index.css             ← Estilos globais (fontes, reset, variáveis)
    ├── App.css               ← Pode ficar vazio ou ser deletado
    │
    ├── pages/                ← PÁGINAS (uma por rota)
    │   ├── Login.jsx
    │   ├── Cadastro.jsx
    │   ├── Home.jsx
    │   ├── Carrinho.jsx
    │   └── Pedidos.jsx
    │
    └── components/           ← COMPONENTES reutilizáveis
        ├── Navbar.jsx
        ├── CardPrato.jsx
        └── ItemCarrinho.jsx
```

> **Conceito importante — Página vs Componente:**
> - **Página** = tela inteira acessada por uma URL (ex: `/login`, `/home`)
> - **Componente** = bloco reutilizável que aparece dentro de páginas (ex: botão, card de produto)

---

## PASSO 1 — Instalar o React Router DOM

### 🔵 O que fazer
Instalar a biblioteca de roteamento no projeto.

### 🔵 Como fazer
Abra o terminal **dentro da pasta `picaFood`** e execute:

```bash
npm install react-router-dom
```

### 🔵 Por que isso funciona?
O `npm install` baixa o pacote `react-router-dom` e o adiciona à pasta `node_modules/`. Ele também registra a dependência no `package.json` para que qualquer outro dev que clonar o projeto saiba o que instalar.

**O que é o React Router?**
Por padrão, um site React é uma única página (chamado de SPA — *Single Page Application*). O React Router é uma biblioteca que **simula a navegação entre páginas** sem recarregar o browser. Ele intercepta a URL e renderiza o componente correto.

### ✅ Como verificar se funcionou
Após instalar, abra `package.json`. Você verá algo assim:

```json
"dependencies": {
  "react": "^19.2.8",
  "react-dom": "^19.2.8",
  "react-router-dom": "^7.x.x"  ← deve aparecer aqui!
}
```

---

## PASSO 2 — Criar as Pastas e os Arquivos Vazios

### 🔵 O que fazer
Criar a estrutura de pastas `pages/` e `components/` dentro de `src/`.

### 🔵 Como fazer
No terminal (ainda dentro de `picaFood`):

```bash
# Criar as pastas
mkdir src/pages
mkdir src/components

# Criar os arquivos das páginas (vazios por enquanto)
echo. > src/pages/Login.jsx
echo. > src/pages/Cadastro.jsx
echo. > src/pages/Home.jsx
echo. > src/pages/Carrinho.jsx
echo. > src/pages/Pedidos.jsx

# Criar os componentes
echo. > src/components/Navbar.jsx
echo. > src/components/CardPrato.jsx
echo. > src/components/ItemCarrinho.jsx
```

### 🔵 Por que isso funciona?
Organizar o projeto em pastas separadas é uma **convenção do ecossistema React**. Isso facilita manutenção: você sabe exatamente onde procurar cada coisa. Não é obrigatório, mas é uma boa prática profissional.

---

## PASSO 3 — Configurar o App.jsx com as Rotas

### 🔵 O que fazer
Substituir o conteúdo padrão do `App.jsx` pela configuração de rotas do React Router.

### 🔵 Como fazer
Substitua **todo o conteúdo** de `src/App.jsx` pelo código abaixo:

```jsx
// src/App.jsx

// Importamos os componentes do React Router DOM
// BrowserRouter: "embrulha" toda a app e ativa o sistema de rotas
// Routes: container que agrupa todas as rotas
// Route: define UMA rota específica (URL -> Componente)
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Importamos as páginas que criaremos
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Home from './pages/Home'
import Carrinho from './pages/Carrinho'
import Pedidos from './pages/Pedidos'

// Importamos o componente de navegação
import Navbar from './components/Navbar'

// Importamos o CSS global
import './index.css'

function App() {
  return (
    // BrowserRouter é o "gerente" de rotas. Deve envolver tudo.
    <BrowserRouter>
      {/* Navbar aparece em TODAS as páginas (fora de <Routes>) */}
      <Navbar />

      {/* Routes decide QUAL página mostrar baseado na URL atual */}
      <Routes>
        {/* Quando a URL for "/", mostra Login */}
        <Route path="/" element={<Login />} />

        {/* Quando a URL for "/cadastro", mostra Cadastro */}
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Quando a URL for "/home", mostra Home */}
        <Route path="/home" element={<Home />} />

        {/* Quando a URL for "/carrinho", mostra Carrinho */}
        <Route path="/carrinho" element={<Carrinho />} />

        {/* Quando a URL for "/pedidos", mostra Pedidos */}
        <Route path="/pedidos" element={<Pedidos />} />
      </Routes>
    </BrowserRouter>
  )
}

// Exportamos para que o main.jsx possa usar este componente
export default App
```

### 🔵 O que cada parte faz

| Elemento | Função |
|---|---|
| `BrowserRouter` | Ativa o sistema de rotas. Usa a API de History do browser para mudar a URL sem recarregar. |
| `Routes` | Container que analisa a URL atual e renderiza apenas a `Route` correspondente. |
| `Route path="/" element={<Login />}` | "Se a URL for exatamente `/`, mostre o componente `<Login />`" |
| `<Navbar />` fora de `<Routes>` | A Navbar ficará visível em TODAS as páginas, pois não está dentro do bloco que troca. |

### 🔵 Conhecimento Periférico — JSX
Você deve ter notado que o código parece HTML mas está dentro de um arquivo `.jsx`. Isso se chama **JSX (JavaScript XML)**. É uma sintaxe especial do React que permite escrever "HTML" dentro do JavaScript. O Vite transforma esse JSX em código JavaScript puro antes de servir para o browser.

**Diferenças JSX vs HTML:**
- `class` → `className` (pois `class` é palavra reservada em JS)
- Comentários: `{/* assim */}` em vez de `<!-- assim -->`
- Todo elemento deve ser fechado: `<img />` não pode ser `<img>`

---

## PASSO 4 — Criar o Componente Navbar

### 🔵 O que fazer
Criar a barra de navegação superior que aparecerá em todas as páginas.

### 🔵 Como fazer
Substitua o conteúdo de `src/components/Navbar.jsx`:

```jsx
// src/components/Navbar.jsx

// Link é o componente do React Router para criar links de navegação
// Diferença de <a href>: o Link não recarrega a página, só troca o componente
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    // <nav> é uma tag HTML semântica para barras de navegação
    <nav className="navbar">
      {/* Logo e nome do app */}
      <div className="navbar-logo">
        <span className="logo-icon">🍔</span>
        <span className="logo-text">PicaFood</span>
      </div>

      {/* Links de navegação */}
      <div className="navbar-links">
        {/* Link to="/home" é equivalente a <a href="/home"> mas SEM reload */}
        <Link to="/home" className="nav-link">Cardápio</Link>
        <Link to="/pedidos" className="nav-link">Meus Pedidos</Link>
        <Link to="/carrinho" className="nav-link nav-link-cart">
          🛒 Carrinho
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
```

### 🔵 Por que usar `<Link>` ao invés de `<a href>`?
O `<a href>` causa um **reload completo da página** (o browser busca a página no servidor do zero). O `<Link>` do React Router apenas **troca o componente renderizado** sem recarregar, tornando a navegação instantânea. Isso é a essência de um SPA.

---

## PASSO 5 — Criar a Página de Login

### 🔵 O que fazer
Criar o formulário de login com controle de estado via `useState`.

### 🔵 Como fazer
Substitua o conteúdo de `src/pages/Login.jsx`:

```jsx
// src/pages/Login.jsx

// useState: hook que cria uma variável REATIVA
// Quando ela muda, o React re-renderiza o componente automaticamente
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

  // Função chamada quando o formulário é enviado
  const handleLogin = (e) => {
    // e.preventDefault() impede o comportamento padrão do form (reload da página)
    e.preventDefault()

    // Validação simples (em um sistema real, verificaria no banco de dados)
    if (email === '' || senha === '') {
      setErro('Por favor, preencha todos os campos.')
      return // Para a execução aqui
    }

    // Se passou na validação, redireciona para a Home
    // navigate('/home') muda a URL para /home e renderiza o componente Home
    navigate('/home')
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Cabeçalho */}
        <div className="auth-header">
          <span className="auth-logo">🍔</span>
          <h1>PicaFood</h1>
          <p>Seu delivery favorito</p>
        </div>

        {/* Formulário de login */}
        {/* onSubmit: quando o form é submetido (botão clicado ou Enter), chama handleLogin */}
        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            {/*
              value={email}: o input SEMPRE mostra o valor do estado
              onChange: toda vez que o usuário digita, atualiza o estado
              e.target.value: o texto atual dentro do input
              Isso se chama "Controlled Component" — o React controla o input
            */}
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="form-input"
            />
          </div>

          {/* Mostra o erro SOMENTE se a variável 'erro' não estiver vazia */}
          {/* Isso é renderização condicional: {condicao && <componente />} */}
          {erro && <p className="error-msg">{erro}</p>}

          <button type="submit" className="btn-primary">
            Entrar
          </button>
        </form>

        {/* Link para a página de cadastro */}
        <p className="auth-footer">
          Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
```

### 🔵 O Conceito Mais Importante — Controlled Component
Um **Controlled Component** é um input cujo valor é controlado pelo React:

```
Usuário digita → onChange dispara → setEmail(novo valor) → React re-renderiza → input mostra o valor do estado
```

Isso é diferente do HTML puro, onde o input guarda seu próprio valor. No React, o **estado é a fonte da verdade**.

---

## PASSO 6 — Criar a Página de Cadastro

### 🔵 O que fazer
Criar o formulário de cadastro de novos usuários (o requisito obrigatório do trabalho: `useState` para cadastro).

### 🔵 Como fazer
Substitua o conteúdo de `src/pages/Cadastro.jsx`:

```jsx
// src/pages/Cadastro.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Cadastro() {
  // Estado do formulário — um objeto com todos os campos
  // Usar um objeto é mais organizado quando há muitos campos
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    confirmarSenha: '',
  })

  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState(false)
  const navigate = useNavigate()

  // Função genérica para atualizar qualquer campo do objeto form
  // e.target.name: pega o atributo "name" do input que disparou o evento
  // e.target.value: pega o valor digitado
  // ...form: "spread operator" — copia todos os campos atuais do form
  // [e.target.name]: propriedade computada — usa o valor da variável como chave
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleCadastro = (e) => {
    e.preventDefault()

    // Validações
    if (!form.nome || !form.email || !form.senha) {
      setErro('Preencha todos os campos obrigatórios.')
      return
    }

    if (form.senha !== form.confirmarSenha) {
      setErro('As senhas não coincidem.')
      return
    }

    if (form.senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    // Em um sistema real, aqui faríamos uma requisição ao backend para salvar no banco
    // Por enquanto, vamos simular o sucesso
    console.log('Usuário cadastrado:', form) // Aparece no console do browser (F12)
    setSucesso(true)
    setErro('')

    // Após 2 segundos, redireciona para o login
    setTimeout(() => {
      navigate('/')
    }, 2000)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-logo">🍔</span>
          <h1>Criar Conta</h1>
          <p>Rápido, fácil e delicioso!</p>
        </div>

        {/* Renderização condicional: se sucesso for true, mostra mensagem */}
        {sucesso ? (
          <div className="success-msg">
            ✅ Cadastro realizado com sucesso! Redirecionando...
          </div>
        ) : (
          <form onSubmit={handleCadastro} className="auth-form">
            <div className="form-group">
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
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email-cadastro">E-mail *</label>
              <input
                id="email-cadastro"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={form.email}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefone">Telefone</label>
              <input
                id="telefone"
                name="telefone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={form.telefone}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="senha-cadastro">Senha *</label>
              <input
                id="senha-cadastro"
                name="senha"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={form.senha}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmarSenha">Confirmar senha *</label>
              <input
                id="confirmarSenha"
                name="confirmarSenha"
                type="password"
                placeholder="Repita a senha"
                value={form.confirmarSenha}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            {erro && <p className="error-msg">{erro}</p>}

            <button type="submit" className="btn-primary">
              Criar Conta
            </button>
          </form>
        )}

        <p className="auth-footer">
          Já tem conta? <Link to="/">Fazer login</Link>
        </p>
      </div>
    </div>
  )
}

export default Cadastro
```

---

## PASSO 7 — Criar a Página Home (Cardápio)

### 🔵 O que fazer
Criar a tela principal que lista os restaurantes e pratos disponíveis.

### 🔵 Como fazer
Substitua o conteúdo de `src/pages/Home.jsx`:

```jsx
// src/pages/Home.jsx
import { useState } from 'react'
import CardPrato from '../components/CardPrato'

// Dados simulados dos pratos (em um sistema real, viria de uma API/banco de dados)
// Isso é um array de objetos JavaScript
const PRATOS = [
  {
    id: 1,
    nome: 'X-Burgão',
    descricao: 'Hamburguer artesanal 200g, queijo cheddar, bacon crocante',
    preco: 32.90,
    emoji: '🍔',
    categoria: 'Hamburguer',
  },
  {
    id: 2,
    nome: 'Pizza Margherita',
    descricao: 'Molho de tomate, mussarela fresca, manjericão',
    preco: 45.00,
    emoji: '🍕',
    categoria: 'Pizza',
  },
  {
    id: 3,
    nome: 'Açaí 500ml',
    descricao: 'Açaí puro com granola, banana e leite condensado',
    preco: 22.00,
    emoji: '🫐',
    categoria: 'Sobremesa',
  },
  {
    id: 4,
    nome: 'Frango Grelhado',
    descricao: 'Peito de frango grelhado com salada e arroz integral',
    preco: 28.50,
    emoji: '🍗',
    categoria: 'Saudável',
  },
  {
    id: 5,
    nome: 'Sushi Combo 20 peças',
    descricao: 'Salmão, atum, camarão e vegetarianos',
    preco: 68.00,
    emoji: '🍱',
    categoria: 'Japonês',
  },
  {
    id: 6,
    nome: 'Tacos Mexicanos',
    descricao: '3 tacos com carne moída, guacamole e pico de gallo',
    preco: 35.00,
    emoji: '🌮',
    categoria: 'Mexicano',
  },
]

// Lista de categorias para filtro
const CATEGORIAS = ['Todos', 'Hamburguer', 'Pizza', 'Sobremesa', 'Saudável', 'Japonês', 'Mexicano']

function Home() {
  // Estado para controlar qual categoria está selecionada no filtro
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos')

  // Estado para a busca por texto
  const [busca, setBusca] = useState('')

  // Estado do carrinho — array de objetos {prato, quantidade}
  const [carrinho, setCarrinho] = useState([])

  // Função para adicionar um prato ao carrinho
  const adicionarAoCarrinho = (prato) => {
    // Verifica se o prato já está no carrinho
    const jaExiste = carrinho.find(item => item.prato.id === prato.id)

    if (jaExiste) {
      // Se já existe, aumenta a quantidade
      // .map() percorre o array e retorna um NOVO array (não muda o original)
      setCarrinho(carrinho.map(item =>
        item.prato.id === prato.id
          ? { ...item, quantidade: item.quantidade + 1 } // atualiza este item
          : item                                          // mantém os outros
      ))
    } else {
      // Se não existe, adiciona com quantidade 1
      // [...carrinho, novoItem] cria um NOVO array com o item adicionado
      setCarrinho([...carrinho, { prato, quantidade: 1 }])
    }
  }

  // Filtragem dos pratos com base na categoria e na busca
  // .filter() retorna um novo array apenas com os itens que passam na condição
  const pratosFiltrados = PRATOS.filter(prato => {
    const passaCategoria = categoriaAtiva === 'Todos' || prato.categoria === categoriaAtiva
    const passaBusca = prato.nome.toLowerCase().includes(busca.toLowerCase())
    return passaCategoria && passaBusca
  })

  // Quantidade total de itens no carrinho (para mostrar na badge)
  const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0)

  return (
    <div className="home-container">
      {/* Cabeçalho da Home */}
      <div className="home-header">
        <h1>O que você quer comer hoje? 😋</h1>

        {/* Campo de busca */}
        <input
          type="text"
          placeholder="🔍 Buscar pratos..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Filtros por categoria */}
      <div className="categorias">
        {/* .map() percorre o array de categorias e renderiza um botão para cada uma */}
        {CATEGORIAS.map(cat => (
          <button
            key={cat}           // key é obrigatório quando usamos .map() no React
            className={`categoria-btn ${categoriaAtiva === cat ? 'ativa' : ''}`}
            onClick={() => setCategoriaAtiva(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Badge do carrinho */}
      {totalItens > 0 && (
        <div className="carrinho-badge">
          🛒 {totalItens} {totalItens === 1 ? 'item' : 'itens'} no carrinho
        </div>
      )}

      {/* Grid de pratos */}
      <div className="pratos-grid">
        {pratosFiltrados.length === 0 ? (
          <p className="nenhum-resultado">Nenhum prato encontrado 😕</p>
        ) : (
          pratosFiltrados.map(prato => (
            // CardPrato é um componente filho que recebe dados via "props"
            <CardPrato
              key={prato.id}
              prato={prato}
              onAdicionar={adicionarAoCarrinho}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Home
```

---

## PASSO 8 — Criar o Componente CardPrato

### 🔵 O que fazer
Criar o card visual de cada prato (componente reutilizável).

### 🔵 Como fazer
Substitua o conteúdo de `src/components/CardPrato.jsx`:

```jsx
// src/components/CardPrato.jsx

// Props: dados passados pelo componente PAI para o componente FILHO
// É como os "parâmetros" de uma função — o pai configura o filho
function CardPrato({ prato, onAdicionar }) {
  // Desestruturamos o objeto 'prato' para facilitar o acesso
  // Em vez de prato.nome, prato.preco, etc.
  const { nome, descricao, preco, emoji, categoria } = prato

  return (
    <div className="card-prato">
      {/* Emoji grande do prato */}
      <div className="card-emoji">{emoji}</div>

      {/* Badge da categoria */}
      <span className="card-categoria">{categoria}</span>

      {/* Informações do prato */}
      <h3 className="card-nome">{nome}</h3>
      <p className="card-descricao">{descricao}</p>

      {/* Rodapé: preço e botão */}
      <div className="card-footer">
        {/* toLocaleString formata o número como moeda brasileira */}
        <span className="card-preco">
          R$ {preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </span>

        {/*
          onAdicionar é uma FUNÇÃO passada pelo pai (Home)
          Quando clicamos, chamamos essa função passando o objeto 'prato'
          Isso é "comunicação filho → pai via callbacks"
        */}
        <button
          className="btn-adicionar"
          onClick={() => onAdicionar(prato)}
        >
          + Adicionar
        </button>
      </div>
    </div>
  )
}

export default CardPrato
```

### 🔵 O Conceito de Props (Propriedades)
Props são a forma como componentes React se comunicam. O **fluxo de dados no React é unidirecional** (de pai para filho):

```
Home (pai)
  ├── passa prato={...} e onAdicionar={função}
  └── CardPrato (filho)
        ├── recebe prato e onAdicionar via props
        └── usa esses dados para renderizar
```

Quando o filho quer "falar com o pai" (ex: "clicaram em mim!"), ele **chama uma função que o pai passou** via props (o `onAdicionar`).

---

## PASSO 9 — Criar a Página de Pedidos

### 🔵 O que fazer
Criar a página que cumpre o requisito principal do trabalho: **cadastro com useState**.

### 🔵 Como fazer
Substitua o conteúdo de `src/pages/Pedidos.jsx`:

```jsx
// src/pages/Pedidos.jsx
import { useState } from 'react'

function Pedidos() {
  // Estado do formulário de novo pedido
  const [novoItem, setNovoItem] = useState('')
  const [quantidade, setQuantidade] = useState(1)
  const [observacao, setObservacao] = useState('')

  // Estado da lista de pedidos (array que começa vazio)
  const [pedidos, setPedidos] = useState([])

  // Função para adicionar um pedido à lista
  const adicionarPedido = (e) => {
    e.preventDefault()

    if (!novoItem.trim()) return // Não adiciona se estiver vazio

    // Cria um novo objeto pedido
    const pedido = {
      id: Date.now(),       // Date.now() retorna um número único baseado no tempo
      item: novoItem,
      quantidade: quantidade,
      observacao: observacao,
      status: 'Em preparo',
      horario: new Date().toLocaleTimeString('pt-BR'), // ex: "14:32:05"
    }

    // Adiciona ao array de pedidos
    // Spread (...) cria um NOVO array com todos os pedidos antigos + o novo
    setPedidos([...pedidos, pedido])

    // Limpa o formulário após adicionar
    setNovoItem('')
    setQuantidade(1)
    setObservacao('')
  }

  // Função para remover um pedido da lista
  const removerPedido = (id) => {
    // .filter() retorna um novo array SEM o item que tem o id igual ao passado
    setPedidos(pedidos.filter(p => p.id !== id))
  }

  return (
    <div className="pedidos-container">
      <h1>📋 Meus Pedidos</h1>

      {/* Formulário de cadastro de pedido */}
      <div className="pedido-form-card">
        <h2>Novo Pedido</h2>
        <form onSubmit={adicionarPedido} className="pedido-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="item">Item do pedido *</label>
              <input
                id="item"
                type="text"
                placeholder="Ex: X-Burgão"
                value={novoItem}
                onChange={(e) => setNovoItem(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group form-group-small">
              <label htmlFor="quantidade">Qtd</label>
              <input
                id="quantidade"
                type="number"
                min="1"
                max="99"
                value={quantidade}
                onChange={(e) => setQuantidade(Number(e.target.value))}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="observacao">Observação</label>
            <textarea
              id="observacao"
              placeholder="Ex: Sem cebola, capricha no molho..."
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              className="form-input form-textarea"
              rows="2"
            />
          </div>

          <button type="submit" className="btn-primary">
            ➕ Adicionar Pedido
          </button>
        </form>
      </div>

      {/* Lista de pedidos */}
      <div className="pedidos-lista">
        {pedidos.length === 0 ? (
          <div className="pedidos-vazio">
            <span>🍽️</span>
            <p>Nenhum pedido ainda. Adicione um acima!</p>
          </div>
        ) : (
          pedidos.map(pedido => (
            <div key={pedido.id} className="pedido-card">
              <div className="pedido-info">
                <h3>{pedido.quantidade}x {pedido.item}</h3>
                {pedido.observacao && (
                  <p className="pedido-obs">📝 {pedido.observacao}</p>
                )}
                <span className="pedido-horario">🕐 {pedido.horario}</span>
              </div>

              <div className="pedido-acoes">
                <span className="pedido-status">{pedido.status}</span>
                <button
                  className="btn-remover"
                  onClick={() => removerPedido(pedido.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Pedidos
```

---

## PASSO 10 — Criar a Página do Carrinho

### 🔵 O que fazer
Criar a página de carrinho com controle de quantidade dos itens.

### 🔵 Como fazer
Substitua o conteúdo de `src/pages/Carrinho.jsx`:

```jsx
// src/pages/Carrinho.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Carrinho() {
  // Em um sistema real, o carrinho viria de um estado global (Context API ou Redux)
  // Por enquanto, vamos simular com dados locais
  const [itens, setItens] = useState([
    { id: 1, nome: 'X-Burgão', preco: 32.90, quantidade: 1, emoji: '🍔' },
    { id: 2, nome: 'Açaí 500ml', preco: 22.00, quantidade: 2, emoji: '🫐' },
  ])

  // delta = +1 para aumentar, -1 para diminuir
  const alterarQuantidade = (id, delta) => {
    setItens(itens
      .map(item => item.id === id
        ? { ...item, quantidade: item.quantidade + delta }
        : item
      )
      .filter(item => item.quantidade > 0) // Remove automaticamente se chegar a 0
    )
  }

  // reduce() percorre o array acumulando um valor (o total)
  const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0)

  return (
    <div className="carrinho-container">
      <h1>🛒 Carrinho</h1>

      {itens.length === 0 ? (
        <div className="carrinho-vazio">
          <span>🛒</span>
          <p>Seu carrinho está vazio</p>
          <Link to="/home" className="btn-primary">Ver Cardápio</Link>
        </div>
      ) : (
        <>
          <div className="carrinho-itens">
            {itens.map(item => (
              <div key={item.id} className="carrinho-item">
                <span className="item-emoji">{item.emoji}</span>
                <div className="item-info">
                  <h3>{item.nome}</h3>
                  <p>R$ {(item.preco * item.quantidade).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="item-quantidade">
                  <button onClick={() => alterarQuantidade(item.id, -1)}>-</button>
                  <span>{item.quantidade}</span>
                  <button onClick={() => alterarQuantidade(item.id, +1)}>+</button>
                </div>
              </div>
            ))}
          </div>

          <div className="carrinho-total">
            <span>Total:</span>
            <strong>R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
          </div>

          <button className="btn-primary btn-finalizar">
            Finalizar Pedido 🚀
          </button>
        </>
      )}
    </div>
  )
}

export default Carrinho
```

---

## PASSO 11 — Estilizar com CSS

### 🔵 O que fazer
Substituir o conteúdo de `src/index.css` com os estilos globais de toda a aplicação.

### 🔵 Como fazer
Substitua **todo o conteúdo** de `src/index.css` pelo código abaixo:

```css
/* src/index.css */

/* ============================
   VARIÁVEIS GLOBAIS (Design Tokens)
   ============================ */
:root {
  --cor-primaria: #e63946;       /* Vermelho vibrante do PicaFood */
  --cor-primaria-hover: #c1121f; /* Tom mais escuro para hover */
  --cor-fundo: #f8f9fa;          /* Cinza claro de fundo */
  --cor-card: #ffffff;           /* Branco para cards */
  --cor-texto: #212529;          /* Quase preto para texto */
  --cor-texto-suave: #6c757d;    /* Cinza para textos secundários */
  --cor-borda: #dee2e6;          /* Cinza claro para bordas */
  --cor-sucesso: #2d6a4f;        /* Verde para mensagens de sucesso */
  --sombra: 0 2px 12px rgba(0,0,0,0.08); /* Sombra padrão dos cards */
  --raio: 12px;                  /* Border-radius padrão */
  --fonte: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* ============================
   RESET E BASE
   ============================ */
/* Reset: remove margens e paddings padrão do browser */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box; /* Inclui padding e border no cálculo do tamanho */
}

body {
  font-family: var(--fonte);
  background-color: var(--cor-fundo);
  color: var(--cor-texto);
  min-height: 100vh; /* Garante que ocupa ao menos 100% da altura da tela */
}

/* ============================
   NAVBAR
   ============================ */
.navbar {
  background-color: var(--cor-primaria);
  padding: 0 2rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Logo à esquerda, links à direita */
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  position: sticky; /* Gruda no topo ao rolar a página */
  top: 0;
  z-index: 100;     /* Fica na frente de outros elementos */
}

.navbar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
  font-size: 1.8rem;
}

.logo-text {
  font-size: 1.4rem;
  font-weight: 700;
  color: white;
  letter-spacing: -0.5px;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  color: rgba(255,255,255,0.9);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.2s; /* Animação suave na mudança de cor */
}

.nav-link:hover {
  color: white;
}

.nav-link-cart {
  background-color: rgba(255,255,255,0.2);
  padding: 8px 16px;
  border-radius: 20px;
}

.nav-link-cart:hover {
  background-color: rgba(255,255,255,0.3);
}

/* ============================
   PÁGINAS DE AUTENTICAÇÃO (Login / Cadastro)
   ============================ */
.auth-container {
  min-height: calc(100vh - 64px); /* Tela inteira menos a navbar */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #fff5f5 0%, #ffe5e5 100%);
}

.auth-card {
  background: var(--cor-card);
  border-radius: var(--raio);
  box-shadow: var(--sombra);
  padding: 2.5rem;
  width: 100%;
  max-width: 420px; /* Largura máxima do card de login */
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-logo {
  font-size: 3rem;
  display: block;
  margin-bottom: 0.5rem;
}

.auth-header h1 {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--cor-primaria);
}

.auth-header p {
  color: var(--cor-texto-suave);
  margin-top: 0.25rem;
}

/* ============================
   FORMULÁRIOS
   ============================ */
.auth-form {
  display: flex;
  flex-direction: column; /* Empilha os campos verticalmente */
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--cor-texto);
}

.form-input {
  padding: 12px 16px;
  border: 2px solid var(--cor-borda);
  border-radius: 8px;
  font-size: 1rem;
  font-family: var(--fonte);
  transition: border-color 0.2s;
  width: 100%;
}

/* Destaca o input quando o usuário clica nele */
.form-input:focus {
  outline: none; /* Remove o outline padrão feio do browser */
  border-color: var(--cor-primaria);
}

.form-textarea {
  resize: vertical; /* Permite redimensionar só na vertical */
  min-height: 80px;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-group-small {
  flex: 0 0 100px; /* Largura fixa de 100px para o campo de quantidade */
}

/* ============================
   BOTÕES
   ============================ */
.btn-primary {
  background-color: var(--cor-primaria);
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer; /* Muda o cursor para "mão" ao passar */
  transition: background-color 0.2s, transform 0.1s;
  width: 100%;
}

.btn-primary:hover {
  background-color: var(--cor-primaria-hover);
}

/* Efeito de "pressionar" ao clicar */
.btn-primary:active {
  transform: scale(0.98);
}

/* ============================
   MENSAGENS
   ============================ */
.error-msg {
  background-color: #fee2e2;
  color: #991b1b;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 0.875rem;
  border-left: 4px solid var(--cor-primaria);
}

.success-msg {
  background-color: #d1fae5;
  color: var(--cor-sucesso);
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
}

.auth-footer {
  text-align: center;
  margin-top: 1.5rem;
  color: var(--cor-texto-suave);
  font-size: 0.9rem;
}

.auth-footer a {
  color: var(--cor-primaria);
  font-weight: 600;
  text-decoration: none;
}

/* ============================
   HOME — CARDÁPIO
   ============================ */
.home-container {
  max-width: 1200px;
  margin: 0 auto; /* Centraliza na página */
  padding: 2rem;
}

.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.home-header h1 {
  font-size: 1.8rem;
  font-weight: 700;
}

.search-input {
  padding: 12px 16px;
  border: 2px solid var(--cor-borda);
  border-radius: 25px; /* Arredondado como barra de busca */
  font-size: 1rem;
  width: 280px;
  transition: border-color 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: var(--cor-primaria);
}

/* Botões de categoria/filtro */
.categorias {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.categoria-btn {
  padding: 8px 20px;
  border: 2px solid var(--cor-borda);
  border-radius: 20px;
  background: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
}

.categoria-btn:hover {
  border-color: var(--cor-primaria);
  color: var(--cor-primaria);
}

/* Classe adicionada ao botão da categoria ativa */
.categoria-btn.ativa {
  background-color: var(--cor-primaria);
  border-color: var(--cor-primaria);
  color: white;
}

.carrinho-badge {
  background-color: var(--cor-primaria);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-weight: 600;
}

/* Grid responsivo: 3 colunas no desktop, 1 no mobile */
.pratos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.nenhum-resultado {
  color: var(--cor-texto-suave);
  text-align: center;
  padding: 3rem;
  grid-column: 1 / -1; /* Ocupa todas as colunas do grid */
}

/* ============================
   CARD DE PRATO
   ============================ */
.card-prato {
  background: var(--cor-card);
  border-radius: var(--raio);
  box-shadow: var(--sombra);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

/* Efeito de "levantar" ao passar o mouse */
.card-prato:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.card-emoji {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 0.5rem;
}

.card-categoria {
  display: inline-block;
  background-color: #fff0f0;
  color: var(--cor-primaria);
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  align-self: flex-start; /* Não estica para a largura total */
}

.card-nome {
  font-size: 1.1rem;
  font-weight: 700;
}

.card-descricao {
  color: var(--cor-texto-suave);
  font-size: 0.875rem;
  line-height: 1.5;
  flex: 1; /* Empurra o rodapé para baixo */
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--cor-borda);
}

.card-preco {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--cor-primaria);
}

.btn-adicionar {
  background-color: var(--cor-primaria);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.875rem;
  transition: background-color 0.2s, transform 0.1s;
}

.btn-adicionar:hover {
  background-color: var(--cor-primaria-hover);
}

.btn-adicionar:active {
  transform: scale(0.95);
}

/* ============================
   PÁGINA DE PEDIDOS
   ============================ */
.pedidos-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.pedidos-container h1 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.pedido-form-card {
  background: var(--cor-card);
  border-radius: var(--raio);
  box-shadow: var(--sombra);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.pedido-form-card h2 {
  margin-bottom: 1rem;
  color: var(--cor-primaria);
}

.pedido-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pedidos-lista {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pedidos-vazio {
  text-align: center;
  padding: 3rem;
  color: var(--cor-texto-suave);
}

.pedidos-vazio span {
  font-size: 3rem;
  display: block;
  margin-bottom: 0.5rem;
}

.pedido-card {
  background: var(--cor-card);
  border-radius: var(--raio);
  box-shadow: var(--sombra);
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.pedido-info h3 {
  font-size: 1rem;
  font-weight: 700;
}

.pedido-obs {
  color: var(--cor-texto-suave);
  font-size: 0.875rem;
  margin-top: 4px;
}

.pedido-horario {
  font-size: 0.75rem;
  color: var(--cor-texto-suave);
}

.pedido-acoes {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.pedido-status {
  background-color: #fff3cd;
  color: #856404;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

.btn-remover {
  background: none;
  border: 1px solid var(--cor-borda);
  border-radius: 8px;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.btn-remover:hover {
  background-color: #fee2e2;
  border-color: var(--cor-primaria);
}

/* ============================
   PÁGINA DO CARRINHO
   ============================ */
.carrinho-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
}

.carrinho-container h1 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.carrinho-vazio {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--cor-texto-suave);
}

.carrinho-vazio span {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
}

.carrinho-vazio p {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.carrinho-vazio .btn-primary {
  display: inline-block;
  width: auto;
  text-decoration: none;
  padding: 12px 32px;
}

.carrinho-itens {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.carrinho-item {
  background: var(--cor-card);
  border-radius: var(--raio);
  box-shadow: var(--sombra);
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.item-emoji {
  font-size: 2rem;
}

.item-info {
  flex: 1; /* Ocupa o espaço disponível */
}

.item-info h3 {
  font-weight: 700;
  font-size: 1rem;
}

.item-info p {
  color: var(--cor-primaria);
  font-weight: 600;
  margin-top: 4px;
}

.item-quantidade {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.item-quantidade button {
  width: 32px;
  height: 32px;
  border-radius: 50%; /* Círculo perfeito */
  border: 2px solid var(--cor-borda);
  background: white;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 700;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-quantidade button:hover {
  border-color: var(--cor-primaria);
  background-color: var(--cor-primaria);
  color: white;
}

.item-quantidade span {
  font-weight: 700;
  font-size: 1.1rem;
  min-width: 20px;
  text-align: center;
}

.carrinho-total {
  background: var(--cor-card);
  border-radius: var(--raio);
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  box-shadow: var(--sombra);
}

.carrinho-total strong {
  color: var(--cor-primaria);
  font-size: 1.5rem;
}

.btn-finalizar {
  font-size: 1.1rem;
  padding: 16px;
}

/* ============================
   RESPONSIVIDADE (Mobile)
   ============================ */
/* @media = "regra que se aplica apenas quando a tela tem no máximo X pixels" */
@media (max-width: 600px) {
  .navbar {
    padding: 0 1rem;
  }

  .logo-text {
    font-size: 1.2rem;
  }

  .navbar-links {
    gap: 0.75rem;
  }

  .nav-link {
    font-size: 0.8rem;
  }

  .home-header {
    flex-direction: column;
  }

  .search-input {
    width: 100%;
  }

  .form-row {
    flex-direction: column;
  }

  .form-group-small {
    flex: 1;
  }
}
```

---

## PASSO 12 — Rodar o Projeto

### 🔵 O que fazer
Iniciar o servidor de desenvolvimento e ver o resultado no browser.

### 🔵 Como fazer
```bash
npm run dev
```

Acesse **http://localhost:5173** no browser.

### 🔵 O que esperar
1. Você verá a tela de **Login** (rota `/`)
2. Clique em "Cadastre-se" → vai para `/cadastro`
3. Preencha e cadastre → redireciona ao login após 2 segundos
4. Faça login → vai para `/home` com o cardápio completo
5. Use os filtros de categoria e a busca
6. Adicione pratos ao carrinho
7. Veja o badge de carrinho atualizar
8. Navegue para `/pedidos` e cadastre pedidos manuais
9. Navegue para `/carrinho` e ajuste quantidades

---

## 📚 GLOSSÁRIO DE CONCEITOS

| Termo | Significado |
|---|---|
| **Componente** | Função JS que retorna JSX. Bloco de construção do React. |
| **Hook** | Função especial do React que começa com `use`. Ex: `useState`, `useNavigate`. |
| **Estado (State)** | Variável reativa. Quando muda, o React re-renderiza o componente. |
| **Props** | Dados passados de componente pai para filho. |
| **JSX** | Sintaxe que parece HTML mas é JavaScript. Convertida pelo compilador. |
| **SPA** | Single Page Application — uma única página HTML que simula múltiplas páginas. |
| **Rota** | Associação entre uma URL (`/home`) e um componente (`<Home />`). |
| **Re-render** | Quando o React atualiza o componente na tela após mudança de estado. |
| **Controlled Component** | Input cujo valor é controlado pelo estado React, não pelo DOM. |
| **Spread Operator (...)** | Copia todos os itens de um array/objeto para outro. |
| **Arrow Function (=>)** | Forma moderna e curta de escrever funções em JavaScript. |
| **Renderização Condicional** | Mostrar ou esconder elementos com base em uma condição. Ex: `{erro && <p>}` |
| **Callback** | Função passada como argumento para ser chamada em outro momento. |
| **CSS Grid** | Sistema de layout 2D para criar grades responsivas. |
| **CSS Flexbox** | Sistema de layout 1D para alinhar itens em linha ou coluna. |
| **CSS :root** | Elemento raiz do HTML. Usado para declarar variáveis CSS globais. |
| **Media Query** | Regra CSS que aplica estilos apenas em certos tamanhos de tela. |

---

## ✅ CHECKLIST DO TRABALHO

- [ ] **Passo 1**: Instalar `react-router-dom` → `npm install react-router-dom`
- [ ] **Passo 2**: Criar pastas `pages/` e `components/`
- [ ] **Passo 3**: Configurar rotas no `App.jsx`
- [ ] **Passo 4**: Criar `Navbar.jsx` com `<Link>`
- [ ] **Passo 5**: Criar `Login.jsx` com `useState`
- [ ] **Passo 6**: Criar `Cadastro.jsx` com `useState` ← **Requisito obrigatório** ✅
- [ ] **Passo 7**: Criar `Home.jsx` com filtros e `useState`
- [ ] **Passo 8**: Criar `CardPrato.jsx` com props
- [ ] **Passo 9**: Criar `Pedidos.jsx` com cadastro via `useState` ← **Requisito obrigatório** ✅
- [ ] **Passo 10**: Criar `Carrinho.jsx`
- [ ] **Passo 11**: Estilizar com CSS em `index.css`
- [ ] **Passo 12**: Rodar com `npm run dev` e testar tudo

---

*Guia criado para o projeto PicaFood — Trabalho de React JS*
*Orientado para devs em formação — leia cada comentário no código!*

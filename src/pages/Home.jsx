
import { useState } from 'react'
import CardPrato from '../components/CardPrato'

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

const CATEGORIAS = ['Todos', 'Hamburguer', 'Pizza', 'Sobremesa', 'Saudável', 'Japonês', 'Mexicano']

function Home(){
    const [categoriaAtiva, setCategoriaAtiva] = useState('Todos')
    const [busca, setBusca] = useState('')
    const [carrinho, setCarrinho] = useState([])

    const adicionarAoCarrinho = (prato) => {

        const jaExiste = carrinho.find(item => item.prato.id === prato.id)
        if(jaExiste){
            // Se já existe, aumenta a quantidade
            // .map() percorre o array e retorna um NOVO array (não muda o original)
            setCarrinho(carrinho.map( item =>
                item.prato.id === prato.id
                ? { ...item, quantidade: item.quantidade + 1}// atualiza este item
                : item // mantém os outros
            ))

        } else {
            setCarrinho([...carrinho, { prato, quantidade: 1}])
        }
    }
    const pratosFiltrados = PRATOS.filter(prato => {
        const passaCategoria = categoriaAtiva === 'Todos' || prato.categoria === categoriaAtiva
        const passaBusca = prato.nome.toLowerCase().includes(busca.toLocaleLowerCase())
        return passaCategoria && passaBusca
    })

    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0)
    return(
        <div className='container-home'>
            <div className='home-header'>
                <h1>O que você quer comer hoje? 😋</h1>
                <input 
                    type='text'
                    placeholder='🔍 Buscar pratos...'
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className='input-busca'
                />
            </div>
            <div className='categorias'>
                {CATEGORIAS.map(cat => (
                    <button
                       key={cat}
                       className={`categoria-btn ${categoria === cat ? 'ativa' : ''}`}
                       onClick={() => setCategoriaAtiva(cat)}
                           
                    >{cat}</button>
                ))}
            </div>
            {totalItens > 0 && (
                <div className='carrinho-emblema'>
                    🛒 {totalItens} {totalItens === 1 ? 'item' : 'itens'} 
                    no carrinho
                </div>
            )}
            <div className='grade-pratos'>
                {pratosFiltrados.length === 0 ? (
                    <p className='nenhum-resultado'>Nenhum prato encontrado!</p>
                ) : (
                    pratosFiltrados.map(prato => (
                        <CardPrato 
                            key = {prato.id}
                            prato = {prato}
                            onAdicionar = {adicionarAoCarrinho}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default Home
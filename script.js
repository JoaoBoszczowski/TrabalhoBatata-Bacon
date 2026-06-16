const produtos = [
    { 
        id:1,
        nome:"Strogonoff de Frango com Catupiry e Bacon",
        imagem: "https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/2428160/d01189efChatGPT_Image_5_05_2026__12_52_48.png",
        descricao:"Batata grande e amanteigada, recheada com strogonoff de frango, Catupiry cremoso e bacon crocante. Acompanha batata palha separada.",
        preço:45.90,
    },
    {
        id:2,
        nome:"Vegetariana - Brócolis, alho frito, milho e requeijão",
        imagem: "https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/2428161/69fc711eChatGPT_Image_14_05_2026__21_08_36.png",
        descricao:"Batata grande e amanteigada, recheada com brócolis ao alho, milho e Catupiry cremoso. Acompanha batata palha separada.",
        preço:45.90,
    },
    {
        id:3,
        nome: "Frango com Catupiry e Bacon",
        imagem: "https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/2428164/d6509636ba39555a-3453-4a5a-931a-e544f4407c3e.png",
        descricao:"Batata grande e amanteigada, recheada com frango desfiado, Catupiry cremoso e bacon crocante. Acompanha batata palha separada",
        preço:44.90,
    },
    {
        id:4,
        nome:"Catupiry com Bacon",
        imagem: "https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/2428168/46441a75ChatGPT_Image_5_05_2026__13_53_08.png",
        descricao:"Batata grande e amanteigada, recheada com Catupiry cremoso e bacon crocante. Acompanha batata palha separada.",
        preço:46.90,
    },
    { 
        id:5,
        nome:"Calabresa com Brócolis, Catupiry e Bacon",
        imagem: "https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/2428172/thumb_0d882b24ChatGPT_Image_5_05_2026__13_06_42.png",
        descricao:"Batata grande e amanteigada, recheada com calabresa defumada, brócolis, alho frito, Catupiry cremoso e bacon crocante. Acompanha batata palha separada",
        preço:45.90,
    },
    {
        id:6,
        nome:"Presunto e Mussarela com Catupiry e Bacon",
        imagem: "https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/2428173/00da6cadChatGPT_Image_5_05_2026__14_05_28.png",
        descricao:"Batata grande e amanteigada, recheada com presunto ralado, mussarela, Catupiry cremoso e bacon crocante. Acompanha batata palha separada.",
        preço: 44.90,
    },
    {
        id:7,
        nome:"Milho com Catupiry e Bacon",
        imagem: "https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/2428175/84b4baffChatGPT_Image_5_05_2026__13_51_23.png",
        descricao:"Batata grande e amanteigada, recheada com milho, bacon e Catupiry cremoso. Acompanha batata palha separada.",
        preço: 44.90,
    },
    {
        id:8,
        nome:"Filé Mignon com Brócolis e Catupiry Bacon",
        imagem: "https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/2502082/c4fce007ChatGPT_Image_14_05_2026__21_14_05.png",
        descricao:"Batata grande e amanteigada, recheada com filé mignon, brócolis ao alho, Catupiry cremoso e bacon crocante. Acompanha batata palha separada.",
        preço: 56.90,
    },
]

let carrinho = []

function mostrarprodutos () {
    const lista = document.getElementById("02")
    lista.innerHTML = ""

    produtos.forEach(produto => {
        const div = document.createElement("div")
        div.className = "product"

        div.innerHTML = `
        <div class="card">
            <h3>${produto.nome}</h3>
            <img class="img" src="${produto.imagem}">
            <p>
                ${produto.descricao} <br>
                R$${produto.preço}
            </p>
            <button onclick="adicionaraocarrinho(${produto.id})">Adicionar</button>
        </div>
        `

        lista.appendChild(div)
    })
}

mostrarprodutos()

function adicionaraocarrinho(id) {
    const produto = produtos.find(
        prod => prod.id == id
    )
    const existe = carrinho.find(
        prod => prod.id == id
    )
    if (existe) {
        existe.quantidade++
    }
    else {
        carrinho.push({
          id: produto.id,
          nome: produto.nome,
          preço: produto.preço,
          quantidade: 1
        })
    }
    mostrarcarrinho()
}

function mostrarcarrinho() {
    const listaCarrinho = document.getElementById("lista-carrinho")
    const total = document.getElementById("total")
    let somatotal = 0
    listaCarrinho.innerHTML = ""

    carrinho.forEach(produto => {
        somatotal += produto.preço * produto.quantidade

        const div = document.createElement("div")
        div.className = "cart-item"
        div.innerHTML = `
            <span>${produto.nome}(x${produto.quantidade}) - R$ ${produto.preço * produto.quantidade} </span>
            <div>
                <button onclick="mudarQuantidade(${produto.id},1)">+</button>
                <button onclick="mudarQuantidade(${produto.id},-1)">-</button>
                <button onclick="removerDoCarrinho(${produto.id})">Limpar</button>
            </div>
            
        `
        listaCarrinho.appendChild(div)
    })

    total.textContent = "Total: R$ " + somatotal
}

function mudarQuantidade(id, valor) {
    carrinho = carrinho.map(produto => {
        if (produto.id == id) {
            return {
                id: produto.id,
                nome: produto.nome,
                preço: produto.preço,
                quantidade: produto.quantidade + valor
            }
        }
        return produto
    }).filter(produto => produto.quantidade > 0)
    mostrarcarrinho()
}

function removerDoCarrinho(id) {
    carrinho = carrinho.filter(produto => produto.id != id);
    mostrarcarrinho();
}
const btnlimparcarrinho = document.getElementById("limpar")
const btncomprar = document.getElementById("comprar")
function limparCarrinho(){
    
    if (carrinho.length > 0){
        carrinho = [];
        mostrarcarrinho();

    }
}

btnlimparcarrinho.addEventListener("click", limparCarrinho);

function comprar() {
    const textoComprar =
     document.getElementById("texto-comprar");

     if (carrinho.length >= 1) {
        carrinho = [];
        mostrarcarrinho();

        textoComprar.textContent = "Compra realizada!";
        textoComprar.style.color = "green";
        textoComprar.style.fontWeight = "bold";

     }
     else {
        textoComprar.textContent = "Sem itens para comprar";
        textoComprar.style.color = "red";
        textoComprar.style.fontWeight = "bold";


     }
}

btncomprar.addEventListener("click", comprar);

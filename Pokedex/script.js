const capa = document.getElementById('capa');
const video = document.getElementById('gif-animacao');
const imagemFinal = document.getElementById('imagem-final');
const pokedex = document.getElementById('pokedex');

const velocidadeDesejada = 1.5;

capa.addEventListener('click', () => {
    tocarSomBotoes("NovaPasta/Sons/botoes/pokedex.mp3");

    video.playbackRate = velocidadeDesejada;

    video.classList.remove('hidden');
    capa.classList.add('hidden');

    video.play();

});

video.onended = () => {

    video.classList.add('hidden');
    imagemFinal.classList.remove('hidden');
    pokedex.classList.remove('hidden');

};




const botaoPassar = document.querySelector('.passar');
const botaoVoltar = document.querySelector('.voltar');
const botaoEvolucao = document.querySelector('.evolucaoPassar');

let pokemonAtual = 0;
let evolucaoAtual = 0;
const listaPokemon = document.querySelectorAll('.pokemon:not(.evolucao)');
const listaEvolucao = document.querySelectorAll('.evolucao');

// Mapeamento das evoluções (você precisa criar esses IDs no HTML)
const mapaEvolucoes = {
    'pikachu': ['pikachu', 'raichu'],
    'raichu': ['pikachu', 'raichu'],
    'buizel': ['buizel', 'floatzel'],
    'floatzel': ['buizel', 'floatzel'],
    'riolu': ['riolu', 'lucario', 'megaLucario'],
    'lucario': ['riolu', 'lucario', 'megaLucario'],
    'megaLucario': ['riolu', 'lucario', 'megaLucario'],
    'charmander': ['charmander', 'charmeleon', 'charizard', 'megaCharizardX', 'megaCharizardY'],
    'charmeleon': ['charmander', 'charmeleon', 'charizard', 'megaCharizardX', 'megaCharizardY'],
    'charizard': ['charmander', 'charmeleon', 'charizard', 'megaCharizardX', 'megaCharizardY'],
    'megaCharizardX': ['charmander', 'charmeleon', 'charizard', 'megaCharizardX', 'megaCharizardY'],
    'megaCharizardY': ['charmander', 'charmeleon', 'charizard', 'megaCharizardX', 'megaCharizardY'],
    'chespin': ['chespin', 'quilladin', 'chesnaught'],
    'quilladin': ['chespin', 'quilladin', 'chesnaught'],
    'chesnaught': ['chespin', 'quilladin', 'chesnaught'],
    'fennekin': ['fennekin', 'braixen', 'delphox'],
    'braixen': ['fennekin', 'braixen', 'delphox'],
    'delphox': ['fennekin', 'braixen', 'delphox'],
    'froakie': ['froakie', 'frogadier', 'greninja'],
    'frogadier': ['froakie', 'frogadier', 'greninja'],
    'greninja': ['froakie', 'frogadier', 'greninja'],

    // Adicione mais conforme necessário
};

const pesquisa = document.querySelector('#barraPesquisa');
const botaoPesquisar = document.querySelector('#botaoPesquisar');

const pokemonsBase = [
    'pikachu',
    'buizel',
    'riolu',
    'charmander',
    'chespin',
    'fennekin',
    'froakie'
];

// Array COMPLETO com todos os Pokémon (para referência)
const todosPokemons = [
    'pikachu', 'raichu',
    'buizel', 'floatzel',
    'riolu', 'lucario', 'megaLucario',
    'charmander', 'charmeleon', 'charizard', 'megaCharizardX', 'megaCharizardY',
    'chespin', 'quilladin', 'chesnaught',
    'fennekin', 'braixen', 'delphox',
    'froakie', 'frogadier', 'greninja'
];

pesquisa.addEventListener('input', () => {
    
})
function pesquisarPokemon() {
    let valor = pesquisa.value.toLowerCase().trim();

    if (!valor) return;

    const apelidos = {
        "mega charizard x": "megaCharizardX",
        "mega charizard y": "megaCharizardY",
        "mega lucario": "megaLucario"
    };

    if (apelidos[valor]) {
        valor = apelidos[valor];
    }

    const pokemon = document.getElementById(valor);

    if (pokemon) {
        const aberto = document.querySelector('.pokemon.aberto');
        if (aberto) {
            aberto.classList.remove('aberto');
        }

        pokemon.classList.add('aberto');

        // IMPORTANTE: Se o Pokémon pesquisado for uma evolução,
        // encontrar a qual base ele pertence
        let baseEncontrada = false;
        
        // Tenta encontrar o Pokémon nos bases
        const indiceBase = pokemonsBase.indexOf(valor);
        
        if (indiceBase !== -1) {
            pokemonAtual = indiceBase;
            baseEncontrada = true;
        } else {
            // Se não for um base, procura em qual cadeia ele está
            for (let i = 0; i < pokemonsBase.length; i++) {
                const base = pokemonsBase[i];
                const cadeia = mapaEvolucoes[base];
                
                if (cadeia && cadeia.includes(valor)) {
                    pokemonAtual = i;
                    baseEncontrada = true;
                    break;
                }
            }
        }
        
        if (baseEncontrada) {
            // Encontrar a posição da evolução atual na cadeia
            const cadeiaAtual = mapaEvolucoes[pokemonsBase[pokemonAtual]];
            evolucaoAtual = cadeiaAtual.indexOf(valor);
        } else {
            evolucaoAtual = 0;
        }
        
    } else {
    setTimeout(() => {

        tocarSomBotoes("NovaPasta/Sons/botoes/alert.mp3");

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Pokémon não encontrado!',
            confirmButtonText: 'OK',
            confirmButtonColor: '#BDCAD1',
            heightAuto: false, // ADICIONE ISSO: impede o Swal de mexer na altura do body
            backdrop: `rgba(0,0,0,0.4)` // Garante que o fundo escureça sem mover o layout
        });

    }, 50)
}
}
// clicar na lupa
botaoPesquisar.addEventListener("click", () => {
    tocarSomTeclado("NovaPasta/Sons/botoes/lupa.wav");
    pesquisarPokemon();
});

// apertar ENTER
pesquisa.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        pesquisarPokemon();
    }
});


// Quando muda de Pokémon com os botões passar/voltar
function mudarPokemonPrincipal(novoIndice) {
    const imagemAberta = document.querySelector('.pokemon.aberto');
    if (imagemAberta) {
        imagemAberta.classList.remove('aberto');
    }

    pokemonAtual = novoIndice;
    const proximoPokemon = listaPokemon[pokemonAtual];
    proximoPokemon.classList.add('aberto');

    // Resetar o índice de evolução para o primeiro da cadeia
    evolucaoAtual = 0;
}

function tocarSomBotoes(caminho){
    const som = new Audio(caminho);
    som.volume = 0.4;
    som.play();
}

botaoPassar.addEventListener('click', () => {
    const novoIndice = (pokemonAtual + 1) % listaPokemon.length;
    mudarPokemonPrincipal(novoIndice);
    tocarSomBotoes("NovaPasta/Sons/botoes/passar.mp3");
});

botaoVoltar.addEventListener('click', () => {
    const novoIndice = (pokemonAtual - 1 + listaPokemon.length) % listaPokemon.length;
    mudarPokemonPrincipal(novoIndice);
    tocarSomBotoes("NovaPasta/Sons/botoes/voltar.mp3");
});

// Botão de evolução
botaoEvolucao.addEventListener('click', () => {
    const pokemonAberto = document.querySelector('.pokemon.aberto');
    const idPokemon = pokemonAberto.id;

    const cadeiaEvolucoes = mapaEvolucoes[idPokemon];

    if (cadeiaEvolucoes && cadeiaEvolucoes.length > 1) {

        evolucaoAtual = (evolucaoAtual + 1) % cadeiaEvolucoes.length;

        const proximaEvolucaoId = cadeiaEvolucoes[evolucaoAtual];

        const elementoEvolucao = document.getElementById(proximaEvolucaoId);

        if (elementoEvolucao) {

            tocarSomBotoes("NovaPasta/Sons/botoes/evolucao.mp3");

            pokemonAberto.classList.remove('aberto');
            elementoEvolucao.classList.add('aberto');

            // 🔥 ATUALIZA O INDICE DO CICLO
            indiceAtual = ordemPokemons.indexOf(proximaEvolucaoId); 
 
        } 
    }
});

const compartilhar = document.querySelector('.compartilhar');

compartilhar.addEventListener('click', (event) => {

    event.preventDefault(); // impede o link de abrir imediatamente

    tocarSomBotoes("NovaPasta/Sons/botoes/compartilhar.mp3");

    setTimeout(() => {
        window.open(compartilhar.href, "_blank");
    }, 155); // espera 300ms para o som tocar
});


const som = document.querySelector('.somPokemon');

const forum = document.querySelector('.forum');

forum.addEventListener('click', (event) => {
    const pokemonAberto = document.querySelector('.pokemon.aberto');

    if (!pokemonAberto) return;

    let nome = pokemonAberto.id;

    if (nome === "megaCharizardX" || nome === "megaCharizardY") {
        nome = "charizard";
    }

    if (nome === "megaLucario") {
        nome = "lucario";
    }

    forum.href = `https://www.pokemon.com/br/pokedex/${nome}`;


    event.preventDefault(); // impede o link de abrir imediatamente

    tocarSomBotoes("NovaPasta/Sons/botoes/info.mp3");

    setTimeout(() => {
        window.open(forum.href, "_blank");
    }, 155); 
})


function tocarSom() {

    const pokemonAberto = document.querySelector('.pokemon.aberto');

    if (!pokemonAberto) return;

    switch (pokemonAberto.id) {

        case 'pikachu':
            som.src = "NovaPasta/Sons/pikachu/pikachu.mp3";
            break;

        case 'raichu':
            som.src = "NovaPasta/Sons/pikachu/raichu.mp3";
            break;

        case 'buizel':
            som.src = "NovaPasta/Sons/buizel/buizel.mp3";
            break;

        case 'floatzel':
            som.src = "NovaPasta/Sons/buizel/floatzel.mp3";
            break;

        case 'riolu':
            som.src = "NovaPasta/Sons/lucario/riolu.mp3";
            break;

        case 'lucario':
            som.src = "NovaPasta/Sons/lucario/lucario.mp3";
            break;

        case 'megaLucario':
            som.src = "NovaPasta/Sons/lucario/megaLucario.mp3";
            break;

        case 'charmander':
            som.src = "NovaPasta/Sons/charmander/charmander.mp3";
            break;

        case 'charmeleon':
            som.src = "NovaPasta/Sons/charmander/charmeleon.mp3";
            break;

        case 'charizard':
            som.src = "NovaPasta/Sons/charmander/charizard.mp3";
            break;

        case 'megaCharizardX':
            som.src = "NovaPasta/Sons/charmander/megaCharizardX.mp3";
            break;

        case 'megaCharizardY':
            som.src = "NovaPasta/Sons/charmander/megaCharizardY.mp3";
            break;

        case 'chespin':
            som.src = "NovaPasta/Sons/chespin/chespin.mp3";
            break;

        case 'quilladin':
            som.src = "NovaPasta/Sons/chespin/quilladin.mp3";
            break;

        case 'chesnaught':
            som.src = "NovaPasta/Sons/chespin/chesnaught.mp3";
            break;

        case 'fennekin':
            som.src = "NovaPasta/Sons/fennekin/fennekin.mp3";
            break;

        case 'braixen':
            som.src = "NovaPasta/Sons/fennekin/braixen.mp3";
            break;

        case 'delphox':
            som.src = "NovaPasta/Sons/fennekin/delphox.mp3";
            break;

        case 'froakie':
            som.src = "NovaPasta/Sons/greninja/froakie.mp3";
            break;

        case 'frogadier':
            som.src = "NovaPasta/Sons/greninja/frogadier.mp3";
            break;

        case 'greninja':
            som.src = "NovaPasta/Sons/greninja/greninja.mp3";
            break;

        default:
            return; // não toca nada
    }

    som.currentTime = 0;
    som.play();
}

const volumeTeclado = 0.25;

function tocarSomTeclado(caminho){
    const som = new Audio(caminho);
    som.volume = volumeTeclado;
    som.play();
}

pesquisa.addEventListener("keydown", (event) => {

    if(event.key === "Backspace"){
        tocarSomTeclado("NovaPasta/Sons/teclado/backspace.mp3");
    }
    else if(event.key === " "){
        tocarSomTeclado("NovaPasta/Sons/teclado/space.mp3");
    }
    else if(event.key === "Enter"){
        tocarSomTeclado("NovaPasta/Sons/teclado/enter.mp3");
    }
    else{
        tocarSomTeclado("NovaPasta/Sons/teclado/teclas.mp3");
    }

});





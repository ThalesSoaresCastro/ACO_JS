//Thales de Castro Soares 86958

const Grafo = require('./graph.js');
const aco = require('./aco.js');
const readline = require('readline')

let g = new Grafo();

let list_vertices = ['A','B', 'C', 'D', 'E'];

let num_formiga;
let origem;
let destino;
let coeficiente_evaporacao;

let aux_vet = []

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });


const create_graph = () =>{
    
    //let list_vertices = ['A','B', 'C', 'D', 'E'];

    
    list_vertices.forEach(e =>{
        g.adicionaVertice(e)
    })

    // adding edges 
    g.adicionaAresta('A', 'B', 2);
    g.adicionaAresta('A', 'C', 10);
    g.adicionaAresta('A', 'D', 8);
    g.adicionaAresta('A', 'E', 3);


    g.adicionaAresta('B', 'A', 1);
    g.adicionaAresta('B', 'C', 2);
    g.adicionaAresta('B', 'D', 5);
    g.adicionaAresta('B', 'E', 7);


    g.adicionaAresta('C', 'B', 1);
    g.adicionaAresta('C', 'A', 9);
    g.adicionaAresta('C', 'D', 3);
    g.adicionaAresta('C', 'E', 6);


    g.adicionaAresta('D', 'B', 4);
    g.adicionaAresta('D', 'C', 3);
    g.adicionaAresta('D', 'A', 10);
    g.adicionaAresta('D', 'E', 2);


    g.adicionaAresta('E', 'B', 7);
    g.adicionaAresta('E', 'C', 5);
    g.adicionaAresta('E', 'D', 1);
    g.adicionaAresta('E', 'A', 2);
}
//plotando uma lista de formigas e a distância percorrida...
const plota_dist_formiga =(formigas,dist)=>{
    for(let i = 0; i < formigas.length; i++){
        console.log('Formiga: ', formigas[i],' --- Distância Total Percorrida: ', dist[i],'.');
    }
}
/**
 *Imprime o custo da aresta e o feromônio atual para os vértices 
 *da lista com a menor distância. 
*/
const imprime_feromonio_custo = (lista_menor) =>{
    let aux = [];
    for(let i = 0; i < lista_menor.length-1; i++){
        aux.push({
                   "Vértices: ":`${lista_menor[i]} -> ${lista_menor[i+1]}`, 
                   "Feromônio Atual: ":g.retornaDados(lista_menor[i],lista_menor[i+1], 'feromonio'), 
                   "Custo Aresta Atual: ":g.retornaDados(lista_menor[i],lista_menor[i+1], 'peso')
        });
    }
    console.log(aux);
}

const main = () =>{

    /*Criação do grafo*/
    create_graph();
    
    // let num_formiga = 5;
    // let origem = 'A';
    // let destino = 'D';
    // let coeficiente_evaporacao = 0.5;
    
    let list_formiga =[];
    for(let i = 0; i < num_formiga; i++)
        list_formiga.push((i+1).toString());


    let list_caminho_formiga = [];
    let rota = [];

    for(let j = 0; j < num_formiga; j++){
        let lista_caminhos = [];
        aco.caminhoPercorrido(g, origem, destino, lista_caminhos);
        aco.removeCiclo(lista_caminhos);
        list_caminho_formiga.push(lista_caminhos);
    }

    let distancia_total = aco.atualizaTxFeromonio(g, list_caminho_formiga, coeficiente_evaporacao, list_vertices);
    plota_dist_formiga(list_formiga, distancia_total);

    //Guarda toda a rota percorrida por todas as formigas.
    for(let j = 0; j < num_formiga; j++){
        for(let k = 0; k < (list_caminho_formiga[j].length)-1; k++){
            rota.push(list_caminho_formiga[j][k], list_caminho_formiga[j][k+1]);
        }
    }

    Array.min = (arr) =>{
        return Math.min.apply(Math, arr);
    } 

    let menor = Array.min(distancia_total);
    let index_menor = distancia_total.indexOf(menor);

    /* 
    *  Faz a impressão da menor formiga que percorreu a menor rota...
    *  Em caso de distâncias percorridas iguais por formigas,
    *  é escolhida a primeira formiga que tem a menor roda na lista
    *  de distâncias percorridas.
    */
    console.log('\n\nFormiga com menor rota: ',index_menor+1,'\nRota Percorrida: ', list_caminho_formiga[index_menor]);

    //Impressão dos custos e feromônio...
    imprime_feromonio_custo(list_caminho_formiga[index_menor]);
}




console.log("Lista de vértices:\n 1 - A | 2 - B | 3 - C | 4 - D | 5 - E");

/*Chamada da função main para inicializar o programa...*/
rl.question('Escolha os vértices de 1 até 5 e o de origem deve ser diferente do de destino.\nTodas as escolhas devem ser maior que Zero.\nInsira o número de formigas, Vértice Origem, Vértice Destino, Coeficiente de evaporação: ',(res)=>{
    
    aux_vet = res.split(' ');
    if( parseInt(aux_vet[0]) > 0 && parseInt(aux_vet[1]) > 0 && parseInt(aux_vet[2]) > 0 && parseInt(aux_vet[1]) != parseInt(aux_vet[2]) && parseFloat(aux_vet[3]) > 0 ){
        
        num_formiga = parseInt(aux_vet[0]);
        origem = list_vertices[parseInt(aux_vet[1]) - 1];
        destino = list_vertices[parseInt(aux_vet[2]) - 1];
        coeficiente_evaporacao = parseFloat(aux_vet[3]);

        console.log('\nOrigem: ', origem, 'Destino: ', destino,'\n');

        main();
    }
    else{
        console.log("\nVerifique se os dados escolhidos estão de acordo com o pedido...\n");
    }

    rl.close();

});




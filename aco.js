//const calculaDistanciaInversa = (graph, origem)=>{
exports.calculaDistanciaInversa = (graph,origem)=>{  

    let dist_inversa = {}
    let viz_graphs = graph.retornaVizinhos(origem)
    

    viz_graphs.forEach(e =>{
        //console.log(e.vertice)
        dist_inversa[(origem, e.vertice)] = 1/graph. retornaDados(origem, e.vertice, 'peso')
    })
    //console.log('dis_inversa: ', dist_inversa)

    return dist_inversa
}


exports.probAresta = (graph, origem)=>{
    let prob_aresta = {}

    let inv_dist = this.calculaDistanciaInversa(graph, origem)
    let vizinhanca = graph.retornaVizinhos(origem)

    let somatorio = 0

    vizinhanca.forEach(e =>{
        //console.log('\ninv_dist: ', inv_dist[e.vertice],' feromonio: ',graph.retornaDados(origem,e.vertice, 'feromonio'))
        somatorio+= inv_dist[e.vertice]*graph.retornaDados(origem,e.vertice, 'feromonio')
    })
    //console.log('somatorio: ', somatorio)

    vizinhanca.forEach(e=>{
        prob_aresta[(origem, e.vertice)] = (inv_dist[e.vertice]*graph.retornaDados(origem,e.vertice, 'feromonio'))/somatorio
    })
    //console.log('prob_aresta: ', prob_aresta)
    return prob_aresta
}


exports.prox_vertice = (graph, origem)=>{


    //funções auxiliares para pegar um valor aleatório de acordo com
    //a sua probabilidade
    const randomChoice = (p)=>{
        let rnd = p.reduce( (a, b) => a + b ) * Math.random();
        return p.findIndex( a => (rnd -= a) < 0 );
    }
    const randomChoices = (p, count)=>{
        return Array.from(Array(count), randomChoice.bind(null, p));
    }
    

    let prob_aresta_aux = this.probAresta(graph, origem)
    let vizinhanca = graph.retornaVizinhos(origem)

    let prob_list = []
    let check_dest = []

    vizinhanca.forEach(e =>{
        prob_list.push(prob_aresta_aux[ (origem, e.vertice) ])
    })

    //passar o conjunto e a probabilidade de cada elemento ser sorteado...
    //pega um valor aleatório dentro de um conjunto de números iguais ao
    //tamanho da quantidade de vizinhos do vertice origem...
    let aux = randomChoices(prob_list, vizinhanca.length)
    

    //retorna o indice dos vizinhos percorridos...
    console.log(vizinhanca[aux[0]])
    // aux.forEach(e =>{
    //     console.log(vizinhanca[e])
    // })
}



exports.caminhoPercorrido  = (graph, origem, destino, list_caminho)=>{

    list_caminho.push(origem)
    if(origem != destino){
        let prox = this.prox_vertice(graph, origem)
        this.caminhoPercorrido(graph,prox.vertice, destino, list_caminho)
    }

}


exports.removeCiclo = (list_caminho)=>{

    let aux = 0

    
}
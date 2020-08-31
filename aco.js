//Thales de Castro Soares 86958

exports.calculaDistanciaInversa = (graph,origem)=>{  
    let dist_inversa = {};
    let viz_graphs = graph.retornaVizinhos(origem);
    
    viz_graphs.forEach(e =>{
        dist_inversa[(origem, e.vertice)] = 1/graph. retornaDados(origem, e.vertice, 'peso');
    })
    return dist_inversa;
}


exports.probAresta = (graph, origem)=>{
    let prob_aresta = {};
    let inv_dist = this.calculaDistanciaInversa(graph, origem);
    let vizinhanca = graph.retornaVizinhos(origem);
    let somatorio = 0;

    vizinhanca.forEach(e =>{
        somatorio+= inv_dist[e.vertice]*graph.retornaDados(origem,e.vertice, 'feromonio');
    })
    vizinhanca.forEach(e=>{
        prob_aresta[(origem, e.vertice)] = (inv_dist[e.vertice]*graph.retornaDados(origem,e.vertice, 'feromonio'))/somatorio;
    })
    return prob_aresta;
}


exports.prox_vertice = (graph, origem)=>{
    /*
    *funções auxiliares para pegar um valor aleatório de acordo com
    *a sua probabilidade
    */
    const randomChoice = (p)=>{
        let rnd = p.reduce( (a, b) => a + b ) * Math.random();
        return p.findIndex( a => (rnd -= a) < 0 );
    }
    const randomChoices = (p, count)=>{
        return Array.from(Array(count), randomChoice.bind(null, p));
    }
    
    let prob_aresta_aux = this.probAresta(graph, origem);
    let vizinhanca = graph.retornaVizinhos(origem);
    let prob_list = [];

    vizinhanca.forEach(e =>{
        prob_list.push(prob_aresta_aux[ (origem, e.vertice) ]);
    })
    /*
    *passar o conjunto e a probabilidade de cada elemento ser sorteado...
    *pega um valor aleatório dentro de um conjunto de números iguais ao
    *tamanho da quantidade de vizinhos do vertice origem...
    */
    let aux = randomChoices(prob_list, vizinhanca.length);
    //retorna o indice dos vizinhos percorridos...
    return vizinhanca[aux[0]];
}

exports.caminhoPercorrido  = (graph, origem, destino, list_caminho)=>{
    list_caminho.push(origem);
    if(origem != destino){
        let prox = this.prox_vertice(graph, origem);
        this.caminhoPercorrido(graph,prox.vertice, destino, list_caminho);
    }
}

exports.removeCiclo = (list_caminho)=>{
    let aux = 0;
    for (let i = 0; i < list_caminho.length;i++){
        for (let j=i+1; j < list_caminho.length;j++){
            if(list_caminho[i]  == list_caminho[j]) aux = j;
        }
        if(aux != 0){
            //Deleta posições do i até o aux
            list_caminho.splice(i, aux-1);
            aux=0;
        }
    }
}

const compareObjects = (obj1, obj2) =>{
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

const comparaElementos = (lista_comp, obj) =>{
    if(lista_comp.length == 0){
        return false;
    }
    else {
        for(let i=0; i < lista_comp.length; i++){
            if(compareObjects(lista_comp[i], obj) ==  true)
                return true;
        }
        return false;
    }
}

exports.atualizaEvaporacao = (graph, list_vertice, coe_evap)=>{

    let lista_visitados = [];

    list_vertice.map(k =>{
        lista_vizinhos = graph.retornaVizinhos(k);
        //console.log('lista_visitados: ', lista_visitados)
        lista_vizinhos.forEach(e =>{
            /*
            *Verificar se o elemento atual da lista de vizinhos
            *já está contido na lista de visitados...
            *se não estiver entra no if...
            */
            if(!comparaElementos(lista_visitados, e)){
                tx_evaporacao = (1 - coe_evap) * graph.retornaDados(k,e.vertice, 'feromonio');
                graph.atualizaFeromonioAresta(k, e.vertice, tx_evaporacao);
                graph.atualizaFeromonioAresta(e.vertice, k, tx_evaporacao);            
            }
        })
        lista_visitados.push(k);
    })
}

exports.atualizaTxFeromonio = (graph, list_caminho, coe_evap, list_vertice)=>{
    this.atualizaEvaporacao(graph, list_vertice, coe_evap);
    //Distancia total percorrida pela formiga..
    let dist_total = [];
    for(let i = 0; i < list_caminho.length; i++){
        let caminhoFormiga = list_caminho[i];
        somatorio=0;
        for(let j = 0; j < caminhoFormiga.length-1; j++){
            somatorio += graph.retornaDados(caminhoFormiga[j], caminhoFormiga[j+1],'peso');
        }
        dist_total.push(somatorio);
    }
    //Atualiza o feromonio da rota deixado por cada formiga que passou sobre ela...
    for(let i = 0; i < list_caminho.length; i++){
        caminhoFormiga = list_caminho[i];
        for(let j = 0; j < caminhoFormiga.length-1; j++){
            somatorio=100/dist_total[i]+graph.retornaDados(caminhoFormiga[j], caminhoFormiga[j+1], 'feromonio');
            graph.atualizaFeromonioAresta(caminhoFormiga[j], caminhoFormiga[j+1], somatorio)
            graph.atualizaFeromonioAresta(caminhoFormiga[j+1], caminhoFormiga[j], somatorio)
        }
    }
    return dist_total;
}


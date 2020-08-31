//Thales de Castro Soares 86958

module.exports = class Grafo{
    constructor(){
        this.vertice = [];
        this.AdjList={};
    }

    adicionaVertice(vertice){
        /*
        *Inicialização de uma lista de adjacência
        *como um vetor vazio.
        */
        this.vertice.push(vertice);
        this.AdjList[vertice] = [];
    }

    /**
     *Vertices v,w e peso da aresta 
     *v origem | w destino | p = peso | f = feromonio 
    */
    adicionaAresta(v, w, p, f = 0.1){
        this.AdjList[v].push({vertice: w, peso: p, feromonio: f});
        this.AdjList[w].push({vertice: v, peso: p, feromonio: f});
    }
    imprimirGrafo(){
        let ids = Object.keys(this.AdjList);
        for(let i of ids){
            let n_values = this.AdjList[i];
            let aux=[];
            for(let j of n_values){
                aux.push(`Aresta(Peso): ${j['peso']} Feromonio: ${j['feromonio']} Vertice(Destino): ${j['vertice']}`);
            }
            console.log('Origem: ',i,' =>',aux);
            aux = [];
        }
    }

    /*
    *Vertice origem:v || Vertice destino:w 
    *prop == 'peso' => retorna peso
    *prop == 'feromonio' => retorna feromonio 
    */
    retornaDados(v, w, prop){
        let peso;
        this.AdjList[v].map(p =>{
            if(p['vertice'] == w) 
                peso = p[prop];
        })
        return peso;
    }

    //retorna os vertices vizinhos do vértice v
    retornaVizinhos(v){
        return this.AdjList[v];
    }
    
    //Vertice origem:v || Vertice destino:w || Feromonio: f
    atualizaFeromonioAresta(v, w, f){
        this.AdjList[v].map(p=>{
            if(p.vertice === w){
                p.feromonio = f;
            }
        })
    }

}
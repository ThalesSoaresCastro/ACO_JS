//export class Grafo{
module.exports = class Grafo{
    // constructor(vertice){
    //     this.vertice = vertice
    //     this.AdjList = new Map()
    // }
    constructor(){
        this.vertice = []
        this.AdjList={}
    }

    adicionaVertice(vertice){
        //inicialização de uma lista de adjacência
        //como um vetor vazio
        this.vertice.push(vertice)
        this.AdjList[vertice] = []
        //this.AdjList.set(vertice, [])
    }

    //Vertices v,w e peso da aresta
    //v origem | w destino | p = peso | f = feromonio
    adicionaAresta(v, w, p, f = 0.1){
        //this.AdjList.get(v).push({vertice: w, peso: p})
        //this.AdjList.get(w).push({vertice: v, peso: p})
    
        this.AdjList[v].push({vertice: w, peso: p, feromonio: f})
        this.AdjList[w].push({vertice: v, peso: p, feromonio: f})
    }
    imprimirGrafo(){
        let ids = Object.keys(this.AdjList)
        for(let i of ids){
            //console.log("Chave: ",i," \nValor:\n", this.AdjList[i])
            let n_values = this.AdjList[i]
            let aux=[] 
            for(let j of n_values){
                //console.log('J: ', j)
                //console.log('v: ', j['vertice'], 'Val: ', j['peso'])
                aux.push(`Aresta(Peso): ${j['peso']} Feromonio: ${j['feromonio']} Vertice(Destino): ${j['vertice']}`)
            }
            console.log('Origem: ',i,' =>',aux)
            aux = []
        }
    }

    //Vertice origem:v || Vertice destino:w
    //prop == 'peso' => retorna peso
    //prop == 'feromonio' => retorna feromonio
    retornaDados(v, w, prop){
        let peso
        this.AdjList[v].map(p =>{
            if(p['vertice'] == w) 
                peso = p[prop]  
        })
        return peso
    }

    //retorna os vertices vizinhos do vértice v
    retornaVizinhos(v){
        return this.AdjList[v]
    }
    

    //Vertice origem:v || Vertice destino:w || Feromonio: f
    atualizaFeromonio(v, w, f){
        // let ids = Object.keys(this.AdjList)

        // for(let i of ids){
        //     //console.log('i:', i, 'v:',v,'Value: ',this.AdjList[i])
        //     let aux = this.AdjList[i]

        //     //cconsole.log('AUX: ', aux)

        //     for(let j of aux){
        //         if(i == v && j['vertice'] == w){
        //            //console.log('i:', i, 'v:',v,'Value: ',this.AdjList[i][j])
        //             //console.log(j)
        //             j['feromonio'] = f
        //         }
        //     }
        // }

        this.AdjList[v].map(p=>{
            if(p.vertice === w){
                p.feromonio = f
            }
        })
    }

}

//cexport
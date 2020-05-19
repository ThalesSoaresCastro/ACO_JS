const Grafo = require('./graph.js')

const aco = require('./aco.js')

let g = new Grafo()

let v = ['A','B', 'C', 'D', 'E', 'F']

v.forEach(e =>{
    g.adicionaVertice(e)
})


// adding edges 
g.adicionaAresta('A', 'B', 3)
g.adicionaAresta('A', 'D', 4)
g.adicionaAresta('A', 'E', 1)
g.adicionaAresta('B', 'C', 6)
g.adicionaAresta('D', 'E', 5)
g.adicionaAresta('E', 'F', 2)
g.adicionaAresta('E', 'C', 7)
g.adicionaAresta('C', 'F', 8)



//g.imprimirGrafo()
g.atualizaFeromonio('A','D',2)


//console.log('Peso: ',g.retornaDados('A','B', 'peso'))
//console.log('Feromonio: ',g.retornaDados('A','B', 'feromonio'))


//console.log('Vizinhos de A: ',g.retornaVizinhos('A'))

//pega os vizinhos do vértice B...
//aco.calculaDistanciaInversa(g,'B')

//aco.probAresta(g, 'B')


aco.prox_vertice(g,'B')
//g.imprimirGrafo()

//g.imp('A','D', 2)

//g.imprimirGrafo()
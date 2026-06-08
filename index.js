class Graph {
  constructor(isDirected = false) {
    this.adjacencyList = {};
    this.isDirected = isDirected;
  }

  // Ajouter un sommet
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  // Ajouter une arête
  addEdge(vertex1, vertex2) {
    this.addVertex(vertex1);
    this.addVertex(vertex2);

    this.adjacencyList[vertex1].push(vertex2);

    if (!this.isDirected) {
      this.adjacencyList[vertex2].push(vertex1);
    }
  }

  // Supprimer une arête
  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1] =
      this.adjacencyList[vertex1].filter(
        (vertex) => vertex !== vertex2
      );

    if (!this.isDirected) {
      this.adjacencyList[vertex2] =
        this.adjacencyList[vertex2].filter(
          (vertex) => vertex !== vertex1
        );
    }
  }

  // Vérifier si une arête existe
  hasEdge(vertex1, vertex2) {
    return this.adjacencyList[vertex1]?.includes(vertex2);
  }

  // Afficher le graphe
  printGraph() {
    for (let vertex in this.adjacencyList) {
      console.log(
        `${vertex} -> ${this.adjacencyList[vertex].join(", ")}`
      );
    }
  }

  // DFS (Depth-First Search)
  dfs(startVertex) {
    const visited = new Set();

    const traverse = (vertex) => {
      if (!vertex) return;

      visited.add(vertex);
      console.log(vertex);

      for (let neighbor of this.adjacencyList[vertex]) {
        if (!visited.has(neighbor)) {
          traverse(neighbor);
        }
      }
    };

    traverse(startVertex);
  }

  // BFS (Breadth-First Search)
  bfs(startVertex) {
    const visited = new Set();
    const queue = [];

    visited.add(startVertex);
    queue.push(startVertex);

    while (queue.length > 0) {
      const currentVertex = queue.shift();

      console.log(currentVertex);

      for (let neighbor of this.adjacencyList[currentVertex]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
  }
}

// ======================
// TESTS
// ======================

const graph = new Graph(false); // Graphe non orienté

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "D");

console.log("Graph:");
graph.printGraph();

console.log("\nHas Edge A-B:", graph.hasEdge("A", "B"));
console.log("Has Edge A-D:", graph.hasEdge("A", "D"));

console.log("\nDFS Traversal:");
graph.dfs("A");

console.log("\nBFS Traversal:");
graph.bfs("A");

console.log("\nRemoving Edge A-B...");
graph.removeEdge("A", "B");

console.log("\nGraph after removing edge:");
graph.printGraph();
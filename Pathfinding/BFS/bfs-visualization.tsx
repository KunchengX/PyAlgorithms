import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const graph = {
  A: { x: 100, y: 100, neighbors: ['B', 'E'] },
  B: { x: 200, y: 50, neighbors: ['A', 'C'] },
  C: { x: 300, y: 100, neighbors: ['B', 'D'] },
  D: { x: 300, y: 200, neighbors: ['C', 'E', 'F'] },
  E: { x: 200, y: 200, neighbors: ['A', 'D'] },
  F: { x: 400, y: 200, neighbors: ['D'] }
};

const BFSVisualization = () => {
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [step, setStep] = useState(0);

  const bfsSteps = [
    { visited: ['A'], path: ['A'] },
    { visited: ['A', 'B'], path: ['A', 'B'] },
    { visited: ['A', 'B', 'E'], path: ['A', 'B'] },
    { visited: ['A', 'B', 'E', 'C'], path: ['A', 'B', 'C'] },
  ];

  useEffect(() => {
    if (step < bfsSteps.length) {
      setVisitedNodes(bfsSteps[step].visited);
      setCurrentPath(bfsSteps[step].path);
    }
  }, [step]);

  const handleNextStep = () => {
    if (step < bfsSteps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleReset = () => {
    setStep(0);
  };

  const renderEdge = (start, end) => {
    const startNode = graph[start];
    const endNode = graph[end];
    return (
      <line
        key={`${start}-${end}`}
        x1={startNode.x}
        y1={startNode.y}
        x2={endNode.x}
        y2={endNode.y}
        stroke="#999"
        strokeWidth="2"
      />
    );
  };

  const renderNode = (node, index) => {
    const isVisited = visitedNodes.includes(node);
    const isInPath = currentPath.includes(node);
    return (
      <g key={node}>
        <circle
          cx={graph[node].x}
          cy={graph[node].y}
          r="20"
          fill={isInPath ? "#4CAF50" : isVisited ? "#2196F3" : "#FFF"}
          stroke="#333"
          strokeWidth="2"
        />
        <text
          x={graph[node].x}
          y={graph[node].y}
          textAnchor="middle"
          dy=".3em"
          fill={isInPath || isVisited ? "#FFF" : "#333"}
        >
          {node}
        </text>
      </g>
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>BFS Shortest Path Visualization</CardHeader>
      <CardContent>
        <svg width="500" height="300">
          {Object.keys(graph).map(node => 
            graph[node].neighbors.map(neighbor => renderEdge(node, neighbor))
          )}
          {Object.keys(graph).map(renderNode)}
        </svg>
        <div className="mt-4 flex justify-between">
          <Button onClick={handleNextStep} disabled={step >= bfsSteps.length - 1}>
            Next Step
          </Button>
          <Button onClick={handleReset}>Reset</Button>
        </div>
        <div className="mt-4">
          <p>Current Path: {currentPath.join(' -> ')}</p>
          <p>Visited Nodes: {visitedNodes.join(', ')}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BFSVisualization;

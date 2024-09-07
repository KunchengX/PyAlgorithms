from collections import deque

def bfs_shortest_path(graph, start, end):
    # Queue to store the vertices to visit
    queue = deque([[start]])
    # Set to keep track of visited vertices
    visited = set([start])
    
    while queue:
        # Get the first path in the queue
        path = queue.popleft()
        # Get the last vertex from the path
        vertex = path[-1]
        
        # If we've reached the end, return the path
        if vertex == end:
            return path
        
        # Check all adjacent vertices
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                # Create a new path and add it to the queue
                new_path = list(path)
                new_path.append(neighbor)
                queue.append(new_path)
                # Mark the neighbor as visited
                visited.add(neighbor)
    
    # If we get here, there's no path
    return None

# Define the graph using an adjacency list
graph = {
    'A': ['B', 'E'],
    'B': ['A', 'C'],
    'C': ['B', 'D'],
    'D': ['C', 'E', 'F'],
    'E': ['A', 'D'],
    'F': ['D']
}

# Find the shortest path from A to C
start = 'A'
end = 'C'
shortest_path = bfs_shortest_path(graph, start, end)

if shortest_path:
    print(f"The shortest path from {start} to {end} is: {' -> '.join(shortest_path)}")
else:
    print(f"There is no path from {start} to {end}")

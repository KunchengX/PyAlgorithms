class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        island_num = 0
        height = len(grid)
        width = len(grid[0])
        for i in range(0, height):
            for j in range(0, width):
                if grid[i][j] == '1':
                    island_num += 1
                    self.infect(i, j, grid)
        return island_num 
        pass
    
    def infect(self, i: int, j: int, grid: List[List[str]]):
        height = len(grid)
        width = len(grid[0])
        if i < 0 or i >= height or j < 0 or j >= width or grid[i][j] != '1':
            return
        grid[i][j] = 2
        self.infect(i-1, j, grid)
        self.infect(i+1, j, grid)
        self.infect(i, j-1, grid)
        self.infect(i, j+1, grid)

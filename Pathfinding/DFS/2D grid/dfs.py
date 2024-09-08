class Solution:
    def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
        height = len(grid)
        width = len(grid[0])
        ans = 0

        for i in range(height):
            for j in range(width):
                if grid[i][j] == 1:
                    area = self.dfs(grid, i, j)
                    ans = max(ans, area)
        return ans

    def dfs(self, grid: List[List[int]], i, j):
        height = len(grid)
        width = len(grid[0])
        if i < 0 or i >= height or j < 0 or j >= width:
            return 0
        if grid[i][j] == 0:
            return 0
        if grid[i][j] != 1:
            return 0
        grid[i][j] = 2
        area = 1
        area += self.dfs(grid, i - 1, j)
        area += self.dfs(grid, i + 1, j)
        area += self.dfs(grid, i, j - 1)
        area += self.dfs(grid, i, j + 1)
        return area

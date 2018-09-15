/*
 * @Author: RannarYang 
 * @Description: 
 * @Date: 2018-09-15 19:53:35 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-15 20:21:52
 */

class AGridView extends egret.Shape {
    private _cellSize: number = 20;
    private _gridData: AGridData;
    constructor(gridData: AGridData){
        super();
        this._gridData = gridData;
        this.drawGrid();
        this.findPath();
    }
    public drawGrid(): void {
        // 清除上一次的绘制
        this.graphics.clear();
        let gridData = this._gridData;
        let cellSize = this._cellSize;
        let node: ANode;
        for(let i: number = 0; i < gridData.numCols; i++) {
            for(let j: number = 0; j < gridData.numRows; j++) {
                node = gridData.getNode(i, j);
                this.graphics.beginFill(this.getColor(node));
                this.graphics.moveTo(i * cellSize, j * cellSize);
                this.graphics.lineTo(i * cellSize + cellSize, j * cellSize);
                this.graphics.lineTo(i * cellSize + cellSize, j * cellSize + cellSize);
                this.graphics.drawRect(i * cellSize, j * cellSize, cellSize, cellSize);
                this.graphics.endFill();
            }
        }
        for(let i: number = 0; i < gridData.numCols; i++) {
            for(let j: number = 0; j < gridData.numRows; j++) {
                this.graphics.lineStyle(1, 0);
                this.graphics.beginFill(0, 0);
                this.graphics.drawRect(i * cellSize, j * cellSize, cellSize, cellSize);
                this.graphics.endFill();
            }
        }
    }
    private findPath(): void {
        var astar: AStar = new AStar();
        if(astar.findPath(this._gridData)) {
            this.showPath(astar.path)
        }
    }
    private showPath(path: ANode[]): void {
        let node: ANode;
        let cellSize = this._cellSize;
        let cellSizeHalf = cellSize * 0.5;
        for(let i = 0; i < path.length; i++) {
            node = path[i];
            this.graphics.lineStyle(0);
            this.graphics.beginFill(0);
            this.graphics.drawCircle(node.col * cellSize + cellSizeHalf, node.row * cellSize + cellSizeHalf, cellSize / 3 );
            this.graphics.endFill();
        }
    }
    public getColor(node: ANode): number {
        if(!node.walkable) return 0;
        if(node == this._gridData.startNode) {
            console.log("startNode: ", node)
            return 0x00ff00;
        };
        if(node == this._gridData.endNode) {
            console.log("endNode: ", node)
            return 0xff00ff;
        }
        return 0xffffff
    }
}
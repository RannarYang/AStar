/*
 * @Author: RannarYang 
 * @Description: 
 * @Date: 2018-09-15 19:53:35 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-15 20:21:52
 */

class AGridView extends egret.Sprite {
    private _cellSize: number = 20;
    private _gridData: AGridData;
    constructor(stage: egret.Stage, gridData: AGridData){
        super();
        this._gridData = gridData;
        this.drawGrid();
        this.findPath();
        this.width = 1136;
        this.height = 640;
        stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGridClick, this);
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
    private onGridClick(e: egret.TouchEvent): void {
        console.log("onGridClick: ", e)
        let xpos = Math.floor(e.localX / this._cellSize);
        let ypos = Math.floor(e.localY / this._cellSize);
        this._gridData.setWalkable(xpos, ypos, !this._gridData.getNode(xpos, ypos).walkable)
        this.drawGrid();
        this.findPath();
    }
    private findPath(): void {
        var astar: AStar = new AStar();
        if(astar.findPath(this._gridData)) {
            this.showVisited(astar.getVisited());
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
    private showVisited(path: ANode[]): void {
        let node: ANode;
        let cellSize = this._cellSize;
        let cellSizeHalf = cellSize * 0.5;
        for(let i = 0; i < path.length; i++) {
            node = path[i];
            this.graphics.beginFill(0xcccccc);
            this.graphics.moveTo(node.col * cellSize, node.row * cellSize);
            this.graphics.lineTo(node.col * cellSize + cellSize, node.row * cellSize);
            this.graphics.lineTo(node.col * cellSize + cellSize, node.row * cellSize + cellSize);
            this.graphics.drawRect(node.col * cellSize, node.row * cellSize, cellSize, cellSize);
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
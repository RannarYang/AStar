
class AGridData {
    
    private _startNode: ANode;
    public get startNode(): ANode {
        return this._startNode;
    }

    private _endNode: ANode;
    public get endNode(): ANode {
        return this._endNode;
    }

    
    private _nodes: ANode[][];
    
    private _numCols: number;
    public get numCols(): number {
        return this._numCols;
    }

    private _numRows: number;
    public get numRows(): number {
        return this._numRows;
    }
    
    
    constructor(numCols: number, numRows: number) {
        this._numCols = numCols;
        this._numRows = numRows;
        
        this._nodes = [];
        for(var i: number = 0; i < numCols; i++) {
            this._nodes[i] = [];
            for(var j: number = 0; j < this._numRows; j++) {
                this._nodes[i][j] = new ANode(i,j);
            }
        }
        
    }
    
    public getNode (col: number, row: number): ANode {
        return this._nodes[col][row] as ANode;
    }
    
    public setStartNode(col: number, row: number):void {
        this._startNode = this._nodes[col][row] as ANode;
    }

    public setEndNode(col: number, row: number):void {
        this._endNode = this._nodes[col][row] as ANode;
    }
    
    
    public setWalkable(x: number, y: number, flag: boolean):void {
        var node: ANode = this._nodes[x][y] as ANode;
        node.walkable = flag;
    }
    
    
    
}
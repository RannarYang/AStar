class AStar {
	private _open: ANode[];
	private _close: ANode[];
	private _gridData: AGridData;
	private _startNode: ANode;
	private _endNode: ANode;
	/**估价函数 */
	private _heuristic: Function;
	private _straightCost: number = 1;
	private _diagCost: number = Math.SQRT2;
	private _path: any[];
	public get path() {
		return this._path;
	}
	public constructor() {
		
	}
	public findPath(gridData: AGridData): boolean {
		this._gridData = gridData;
		this._open = [];
		this._close = [];
		this._startNode = gridData.startNode;
		this._endNode = gridData.endNode;
		return this.search();
	}

	public search(): boolean{
		let gridData: AGridData = this._gridData;
		let straightCost = this._straightCost;
		let diagCost = this._diagCost;
		let open = this._open;
		let close = this._close;

		this._startNode.g = 0;
		this._startNode.h = this.gouGu(this._startNode);
		this._startNode.f = this._startNode.g + this._startNode.h;

		let startCol: number, endCol: number, startRow: number, endRow: number;
		let testNode: ANode, g: number, h: number, f: number;

		let node: ANode = this._startNode;
		while(node != this._endNode) {
			startCol = Math.max(0, node.col - 1);
			endCol = Math.min(gridData.numCols - 1, node.col + 1);
			startRow = Math.max(0, node.row - 1);
			endRow = Math.min(gridData.numRows - 1, node.row + 1);
			for(let i: number = startCol; i <= endCol; i++) {
				for(let j: number = startRow; j <= endRow; j++) {
					testNode = gridData.getNode(i, j);
					// if(testNode == node || !testNode.walkable || this.isOpen(testNode) || this.isClose(testNode)) {
					if(testNode == node || !testNode.walkable || this.isClose(testNode)) {
						continue;
					}
					let cost: number = straightCost;
					if(testNode.col != node.col && testNode.row != node.row) {
						cost = diagCost;
					}

					g = node.g + cost;
					h = this.gouGu(testNode);
					f = g + h;

					if(this.isOpen(testNode)) {
						if(testNode.g > g) {
							testNode.f = f;
							testNode.g = g;
							testNode.h = h;
							testNode.parent = node;
						}
					} else {
						testNode.f = f;
						testNode.g = g;
						testNode.h = h;
						testNode.parent = node;
						open.push(testNode);
					}
				}
			}
			close.push(node);
			if(open.length == 0) {
				console.warn("i can not find path");
				return false;
			}
			open.sort((node1: ANode, node2: ANode)=>{
				return node2.f > node1.f ? 1 : -1;
			});
			console.log(open);
			
			node = open.pop();
		}
		// 构建路径
		this.buildPath();
		return true;
	}
	private buildPath(): void {
		this._path = [];
		let node: ANode = this._endNode;
		this._path.push(node);
		while(node != this._startNode) {
			node = node.parent;
			this._path.unshift(node);
		}
	}
	private isOpen(node: ANode): boolean {
		let open = this._open;
		for(let i: number = 0, len = open.length; i < len; i++) {
			if(open[i] == node) {
				return true;
			}
		}
		return false;
	}
	private isClose(node: ANode): boolean {
		let close = this._close;
		for(let i: number = 0, len = close.length; i < len; i++) {
			if(close[i] == node) {
				return true;
			}
		}
		return false;
	}

	public getVisited(): ANode[] {
		return this._close.concat(this._open);
	}

	private gouGu(node: ANode): number {
		let dcol: number = node.col - this._endNode.col;
		let drow: number = node.row - this._endNode.row;
		return Math.sqrt(dcol * dcol + drow * drow)
	}
}
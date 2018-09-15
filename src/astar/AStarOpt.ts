/*
 * @Description: A*算法优化
 * @Author: RannarYang 
 * @Date: 2018-09-16 00:12:33 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-16 00:36:34
 */
class AStarOpt {
	private _open: ANode[];
	private _close: ANode[];
	private _gridData: AGridData;
	private _startNode: ANode;
	private _endNode: ANode;
	/**估价函数 */
	private _heuristic: Function = this.manhatan;
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
		this._startNode.h = this._heuristic(this._startNode);
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
					h = this._heuristic(testNode);
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
						node.status = NodeStatus.OPEN;
						open.push(testNode);
					}
				}
			}
			close.push(node);
			node.status = NodeStatus.CLOSE;
			if(open.length == 0) {
				console.warn("i can not find path");
				return false;
			}
			open.sort((node1: ANode, node2: ANode)=>{
				return node2.f > node1.f ? 1 : -1;
			});
			node = open.pop();
			node.status = NodeStatus.NORMAL;
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
		return node.status === NodeStatus.OPEN;
	}
	private isClose(node: ANode): boolean {
		return node.status === NodeStatus.CLOSE;
	}

	public getVisited(): ANode[] {
		return this._close.concat(this._open);
	}


	/**估价函数 */
	/**估价函数--勾股定理 */
	private gouGu(node: ANode): number {
		let dcol: number = node.col - this._endNode.col;
		let drow: number = node.row - this._endNode.row;
		return Math.sqrt(dcol * dcol + drow * drow)
	}
	/**估价函数--曼哈顿 */
	private manhatan(node: ANode): number {
		return Math.abs(node.col - this._endNode.col) * this._straightCost + Math.abs(node.row - this._endNode.row) * this._straightCost;
	}
	/**估价函数--对角线启发式函数 */
	private diagonal(node: ANode): number {
		let dcol: number = Math.abs(node.col - this._endNode.col);
		let drow: number = Math.abs(node.row - this._endNode.row);
		let diag: number = Math.min(dcol, drow);
		return diag * this._diagCost + this._straightCost * (dcol + drow - 2 * diag)
	}
}
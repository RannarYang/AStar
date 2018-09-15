/*
 * @Description: 二叉堆
 * @Author: RannarYang 
 * @Date: 2018-09-16 00:53:37 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-16 01:05:18
 */

class BinaryHeaps implements IList {
	protected index: number = -1;
	protected arr: ANode[];
	
	constructor() {
		this.arr = [];
	}

	public push(node: ANode):void {
		this.arr[++this.index] = node;
		this.reBuildHeap(this.index);
	}

	protected reBuildHeap(cIndex: number):void {
		if (cIndex <= 0)
			return;
		let cur: ANode = this.arr[cIndex];
		let pIndex: number = this.getParentNodeIndex(cIndex);
		let p: ANode = this.arr[pIndex];
		if (1 == ANode.compare(cur, p)) {
			this.arr[cIndex] = p;
			this.arr[pIndex] = cur;
		}
		this.reBuildHeap(pIndex);
	}

	public pop(): ANode {
		if (this.index < 0)
			return null;
		if (this.index == 0) {
			this.index--;
			return this.arr[0];
		}
		let rs: ANode = this.arr[0];
		this.arr[0] = this.arr[this.index];
		this.arr[this.index]=null;
		this.index--;
		this.reOrder(0);
		return rs;
	}

	protected reOrder(cIndex: number):void {
		let leftIndex: number = this.getLeftNodeIndex(cIndex);
		let rightIndex: number = this.getRightNodeIndex(cIndex);
		if (leftIndex > this.index && rightIndex > this.index) {
			return;
		}

		let cur: ANode = this.arr[cIndex];
		let leftNode: ANode = this.arr[leftIndex];
		let rightNode: ANode = this.arr[rightIndex];

		if (!leftNode)
		{
			if (-1 == ANode.compare(cur, rightNode))
			{
				this.arr[cIndex] = rightNode;
				this.arr[rightIndex] = cur;
				this.reOrder(rightIndex);
			}
			return;
		}

		if (!rightNode)
		{
			if (-1 == ANode.compare(cur, leftNode))
			{
				this.arr[cIndex] = leftNode;
				this.arr[leftIndex] = cur;
				this.reOrder(leftIndex);
			}
			return;
		}


		if (1 == ANode.compare(rightNode, leftNode)) {
			if (-1 == ANode.compare(cur, rightNode)) {
				this.arr[cIndex]=rightNode;
				this.arr[rightIndex]=cur;
				this.reOrder(rightIndex);
			}
			else if (-1 == ANode.compare(cur, leftNode)) {
				this.arr[cIndex]=leftNode;
				this.arr[leftIndex]=cur;
				this.reOrder(leftIndex);
			}
		} else {
			if (-1 == ANode.compare(cur, leftNode)) {
				this.arr[cIndex]=leftNode;
				this.arr[leftIndex]=cur;
				this.reOrder(leftIndex);
			}
			else if (-1 == ANode.compare(cur, rightNode)) {
				this.arr[cIndex]=rightNode;
				this.arr[rightIndex]=cur;
				this.reOrder(rightIndex);
			}
		}
	}

	/**
	 * the node value will only because smaller accordign to the A* Pathfing theory
	 * @param node
	 * 
	 */
	public valueChanged(node: ANode):void {
		let cIndex: number = this.arr.indexOf(node);
		this.reBuildHeap(cIndex);
	}
	
	private upOrder(cIndex: number):void{
		// TODO Auto Generated method stub
		
	}
	
	////////////////////////////////////////////////////////

	public getVector(): ANode[] {
		return this.arr;
	}

	public reset():void {
		for (var i: number = 0; i <= this.index; i++) {
			this.arr[i] = null;
		}
		this.index = -1;
	}

	public getLength(): number{
		return this.index + 1;
	}

	////////////////////////////////////////////////////

	/**
	 *
	 * @param i the index of the node. never use 0.
	 * @return
	 *
	 */
	protected getParentNodeIndex(i: number): number{
		if (i == 0)
			throw new Error(" 0 is not allowed");
		if ((i & 1) == 1) {
			//奇数, 则i为左子树
			//return (i + 1) / 2 - 1;
			return (i + 1 >> 1) - 1;
		} else {
			//偶数, 则i为右子树
			//return i / 2 - 1;
			return (i >> 1) - 1;
		}
	}

	protected getLeftNodeIndex(index: number): number {
		//return 2 * index + 1;
		return (index << 1) + 1;
	}

	protected getRightNodeIndex(index: number): number {
		//return 2 * (index+1);
		return (index + 1) << 1;
	}

	public toString(): string {
		var s: string="[BinaryHeaps] ";
		for (var i: number = 0; i <= this.index; i++)
		{
			s+=this.arr[i].f + ",";
		}
		return s;
	}

}


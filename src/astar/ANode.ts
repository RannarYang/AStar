/*
 * @Author: RannarYang 
 * @Date: 2018-09-15 19:38:42 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-16 00:33:05
 */

class ANode{
    public col: number;
    public row: number;

    public f: number;
    public g: number;
    public h: number;

    public parent: ANode;

    public walkable: boolean = true;

    public status: NodeStatus = NodeStatus.NORMAL;

    constructor(col: number, row: number) {
        this.col = col;
        this.row = row;
    }
    public reset() {
        this.f = 0;
        this.g = 0;
        this.h = 0;

        this.parent = undefined;
        this.status = NodeStatus.NORMAL;
    }

    
}

enum NodeStatus {
    NORMAL = 0,
    OPEN = 1,
    CLOSE = 2
}
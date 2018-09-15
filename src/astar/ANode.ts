/*
 * @Author: RannarYang 
 * @Date: 2018-09-15 19:38:42 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-15 19:58:36
 */

class ANode{
    public col: number;
    public row: number;

    public f: number;
    public g: number;
    public h: number;

    public parent: ANode;

    public walkable: boolean = true;

    constructor(col: number, row: number) {
        this.col = col;
        this.row = row;
    }

    
}
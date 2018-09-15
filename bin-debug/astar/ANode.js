/*
 * @Author: RannarYang
 * @Date: 2018-09-15 19:38:42
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-15 19:58:36
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ANode = (function () {
    function ANode(col, row) {
        this.walkable = true;
        this.col = col;
        this.row = row;
    }
    return ANode;
}());
__reflect(ANode.prototype, "ANode");
//# sourceMappingURL=ANode.js.map
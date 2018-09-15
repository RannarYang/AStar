/*
 * @Author: RannarYang
 * @Date: 2018-09-15 19:38:42
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-16 00:33:05
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ANode = (function () {
    function ANode(col, row) {
        this.walkable = true;
        this.status = NodeStatus.NORMAL;
        this.col = col;
        this.row = row;
    }
    ANode.prototype.reset = function () {
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.parent = undefined;
        this.status = NodeStatus.NORMAL;
    };
    return ANode;
}());
__reflect(ANode.prototype, "ANode");
var NodeStatus;
(function (NodeStatus) {
    NodeStatus[NodeStatus["NORMAL"] = 0] = "NORMAL";
    NodeStatus[NodeStatus["OPEN"] = 1] = "OPEN";
    NodeStatus[NodeStatus["CLOSE"] = 2] = "CLOSE";
})(NodeStatus || (NodeStatus = {}));
//# sourceMappingURL=ANode.js.map
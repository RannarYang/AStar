/*
 * @Author: RannarYang
 * @Description:
 * @Date: 2018-09-15 19:53:35
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-15 20:21:52
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var AGridView = (function (_super) {
    __extends(AGridView, _super);
    function AGridView(gridData) {
        var _this = _super.call(this) || this;
        _this._cellSize = 20;
        _this._gridData = gridData;
        _this.drawGrid();
        _this.findPath();
        return _this;
    }
    AGridView.prototype.drawGrid = function () {
        // 清除上一次的绘制
        this.graphics.clear();
        var gridData = this._gridData;
        var cellSize = this._cellSize;
        var node;
        for (var i = 0; i < gridData.numCols; i++) {
            for (var j = 0; j < gridData.numRows; j++) {
                node = gridData.getNode(i, j);
                this.graphics.beginFill(this.getColor(node));
                this.graphics.moveTo(i * cellSize, j * cellSize);
                this.graphics.lineTo(i * cellSize + cellSize, j * cellSize);
                this.graphics.lineTo(i * cellSize + cellSize, j * cellSize + cellSize);
                this.graphics.drawRect(i * cellSize, j * cellSize, cellSize, cellSize);
                this.graphics.endFill();
            }
        }
        for (var i = 0; i < gridData.numCols; i++) {
            for (var j = 0; j < gridData.numRows; j++) {
                this.graphics.lineStyle(1, 0);
                this.graphics.beginFill(0, 0);
                this.graphics.drawRect(i * cellSize, j * cellSize, cellSize, cellSize);
                this.graphics.endFill();
            }
        }
    };
    AGridView.prototype.findPath = function () {
        var astar = new AStar();
        if (astar.findPath(this._gridData)) {
            this.showPath(astar.path);
        }
    };
    AGridView.prototype.showPath = function (path) {
        var node;
        var cellSize = this._cellSize;
        var cellSizeHalf = cellSize * 0.5;
        for (var i = 0; i < path.length; i++) {
            node = path[i];
            this.graphics.lineStyle(0);
            this.graphics.beginFill(0);
            this.graphics.drawCircle(node.col * cellSize + cellSizeHalf, node.row * cellSize + cellSizeHalf, cellSize / 3);
            this.graphics.endFill();
        }
    };
    AGridView.prototype.getColor = function (node) {
        if (!node.walkable)
            return 0;
        if (node == this._gridData.startNode) {
            console.log("startNode: ", node);
            return 0x00ff00;
        }
        ;
        if (node == this._gridData.endNode) {
            console.log("endNode: ", node);
            return 0xff00ff;
        }
        return 0xffffff;
    };
    return AGridView;
}(egret.Shape));
__reflect(AGridView.prototype, "AGridView");
//# sourceMappingURL=AGridView.js.map
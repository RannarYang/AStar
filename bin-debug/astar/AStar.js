var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AStar = (function () {
    function AStar() {
        /**估价函数 */
        this._heuristic = this.manhatan;
        this._straightCost = 1;
        this._diagCost = Math.SQRT2;
    }
    Object.defineProperty(AStar.prototype, "path", {
        get: function () {
            return this._path;
        },
        enumerable: true,
        configurable: true
    });
    AStar.prototype.findPath = function (gridData) {
        this._gridData = gridData;
        this._open = [];
        this._close = [];
        this._startNode = gridData.startNode;
        this._endNode = gridData.endNode;
        return this.search();
    };
    AStar.prototype.search = function () {
        var gridData = this._gridData;
        var straightCost = this._straightCost;
        var diagCost = this._diagCost;
        var open = this._open;
        var close = this._close;
        this._startNode.g = 0;
        this._startNode.h = this._heuristic(this._startNode);
        this._startNode.f = this._startNode.g + this._startNode.h;
        var startCol, endCol, startRow, endRow;
        var testNode, g, h, f;
        var node = this._startNode;
        while (node != this._endNode) {
            startCol = Math.max(0, node.col - 1);
            endCol = Math.min(gridData.numCols - 1, node.col + 1);
            startRow = Math.max(0, node.row - 1);
            endRow = Math.min(gridData.numRows - 1, node.row + 1);
            for (var i = startCol; i <= endCol; i++) {
                for (var j = startRow; j <= endRow; j++) {
                    testNode = gridData.getNode(i, j);
                    // if(testNode == node || !testNode.walkable || this.isOpen(testNode) || this.isClose(testNode)) {
                    if (testNode == node || !testNode.walkable || this.isClose(testNode)) {
                        continue;
                    }
                    var cost = straightCost;
                    if (testNode.col != node.col && testNode.row != node.row) {
                        cost = diagCost;
                    }
                    g = node.g + cost;
                    h = this._heuristic(testNode);
                    f = g + h;
                    if (this.isOpen(testNode)) {
                        if (testNode.g > g) {
                            testNode.f = f;
                            testNode.g = g;
                            testNode.h = h;
                            testNode.parent = node;
                        }
                    }
                    else {
                        testNode.f = f;
                        testNode.g = g;
                        testNode.h = h;
                        testNode.parent = node;
                        open.push(testNode);
                    }
                }
            }
            close.push(node);
            if (open.length == 0) {
                console.warn("i can not find path");
                return false;
            }
            open.sort(function (node1, node2) {
                return node2.f > node1.f ? 1 : -1;
            });
            node = open.pop();
        }
        // 构建路径
        this.buildPath();
        return true;
    };
    AStar.prototype.buildPath = function () {
        this._path = [];
        var node = this._endNode;
        this._path.push(node);
        while (node != this._startNode) {
            node = node.parent;
            this._path.unshift(node);
        }
    };
    AStar.prototype.isOpen = function (node) {
        var open = this._open;
        for (var i = 0, len = open.length; i < len; i++) {
            if (open[i] == node) {
                return true;
            }
        }
        return false;
    };
    AStar.prototype.isClose = function (node) {
        var close = this._close;
        for (var i = 0, len = close.length; i < len; i++) {
            if (close[i] == node) {
                return true;
            }
        }
        return false;
    };
    AStar.prototype.getVisited = function () {
        return this._close.concat(this._open);
    };
    /**估价函数 */
    /**估价函数--勾股定理 */
    AStar.prototype.gouGu = function (node) {
        var dcol = node.col - this._endNode.col;
        var drow = node.row - this._endNode.row;
        return Math.sqrt(dcol * dcol + drow * drow);
    };
    /**估价函数--曼哈顿 */
    AStar.prototype.manhatan = function (node) {
        return Math.abs(node.col - this._endNode.col) * this._straightCost + Math.abs(node.row - this._endNode.row) * this._straightCost;
    };
    /**估价函数--对角线启发式函数 */
    AStar.prototype.diagonal = function (node) {
        var dcol = Math.abs(node.col - this._endNode.col);
        var drow = Math.abs(node.row - this._endNode.row);
        var diag = Math.min(dcol, drow);
        return diag * this._diagCost + this._straightCost * (dcol + drow - 2 * diag);
    };
    return AStar;
}());
__reflect(AStar.prototype, "AStar");
//# sourceMappingURL=AStar.js.map
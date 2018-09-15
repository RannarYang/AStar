var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AGridData = (function () {
    function AGridData(numCols, numRows) {
        this._numCols = numCols;
        this._numRows = numRows;
        this._nodes = [];
        for (var i = 0; i < numCols; i++) {
            this._nodes[i] = [];
            for (var j = 0; j < this._numRows; j++) {
                this._nodes[i][j] = new ANode(i, j);
            }
        }
    }
    Object.defineProperty(AGridData.prototype, "startNode", {
        get: function () {
            return this._startNode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AGridData.prototype, "endNode", {
        get: function () {
            return this._endNode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AGridData.prototype, "numCols", {
        get: function () {
            return this._numCols;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AGridData.prototype, "numRows", {
        get: function () {
            return this._numRows;
        },
        enumerable: true,
        configurable: true
    });
    AGridData.prototype.getNode = function (col, row) {
        return this._nodes[col][row];
    };
    AGridData.prototype.setStartNode = function (col, row) {
        this._startNode = this._nodes[col][row];
    };
    AGridData.prototype.setEndNode = function (col, row) {
        this._endNode = this._nodes[col][row];
    };
    AGridData.prototype.setWalkable = function (x, y, flag) {
        var node = this._nodes[x][y];
        node.walkable = flag;
    };
    AGridData.prototype.resetNode = function () {
        for (var i = 0, len = this._nodes.length; i < len; i++) {
            for (var j = 0, jlen = this._nodes[i].length; j < jlen; j++) {
                this._nodes[i][j].reset();
            }
        }
    };
    return AGridData;
}());
__reflect(AGridData.prototype, "AGridData");
//# sourceMappingURL=AGridData.js.map
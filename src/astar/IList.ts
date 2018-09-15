
interface IList {
	push(node: ANode):void;
	pop(): ANode;
	getLength(): number;
	getVector(): ANode[];
	reset():void;
	valueChanged(node: ANode):void;
}

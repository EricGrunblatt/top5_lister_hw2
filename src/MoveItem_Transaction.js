import jsTPS_Transaction from "./jsTPS_Transaction.js"
/**
 * MoveItem_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 */
export default class MoveItem_Transaction extends jsTPS_Transaction {
    constructor(initApp, initOldItemIndex, initNewItemIndex) {
        super();
        this.app = initApp;
        this.oldItemIndex = initOldItemIndex;
        this.newItemIndex = initNewItemIndex;
    }

    doTransaction() {
        this.app.moveItem(this.oldItemIndex, this.newItemIndex);
    }
    
    undoTransaction() {
        this.app.moveItem(this.newItemIndex, this.oldItemIndex);
    }
}
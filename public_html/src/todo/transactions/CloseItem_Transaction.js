'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class CloseItem_Transaction extends jsTPS_Transaction {
    constructor(initModel, list, index) {
        super();
        this.model = initModel;
        this.list = list;
        this.index = index;
    }

    doTransaction() {
        this.itemRemoved = this.list.items[this.index];
        this.list.items.splice(this.index, 1);
        this.model.loadList(this.list.id);
    }

    undoTransaction() {
        // for (let i = this.list.length; i >= this.index; i--) {
        //     list.items[i+1] = list.items[i];
        // }
        // this.list.items[this.index] = this.itemRemoved;
        this.list.items.splice(this.index, 0, this.itemRemoved);
        this.model.loadList(this.list.id);
    }
}
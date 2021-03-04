'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"
import ToDoView from "../ToDoView.js";

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class MoveDownItem_Transaction extends jsTPS_Transaction {
    constructor(model, list, index) {
        super();
        this.model = model;
        this.list = list;
        this.i = index;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        let temp = this.list.items[this.i+1];
        this.list.items[this.i+1] = this.list.items[this.i];
        this.list.items[this.i] = temp;
        this.model.loadList(this.list.id);
    }

    undoTransaction() {
        let temp = this.list.items[this.i];
        this.list.items[this.i] = this.list.items[this.i+1];
        this.list.items[this.i+1] = temp;
        this.model.loadList(this.list.id);
    }
}
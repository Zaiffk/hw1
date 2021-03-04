'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class EditText_Transaction extends jsTPS_Transaction {
    constructor(initModel, list, item, text) {
        super();
        this.model = initModel;
        this.item = item;
        this.list = list;
        this.text = text;
    }

    doTransaction() {
        this.originalText = this.item.description;
        this.item.setDescription(this.text);
        this.model.loadList(this.list.id);
    }

    undoTransaction() {
        this.item.setDescription(this.originalText);
        this.model.loadList(this.list.id);
    }
}
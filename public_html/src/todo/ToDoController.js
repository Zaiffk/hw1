'use strict'

import ToDoView from "./ToDoView.js";

/**
 * ToDoController
 * 
 * This class serves as the event traffic manager, routing all
 * event handling responses.
 */
export default class ToDoController {    
    constructor() {}

    setModel(initModel) {
        this.model = initModel;
        let appModel = this.model;

        // SETUP ALL THE EVENT HANDLERS SINCE THEY USE THE MODEL
        document.getElementById("add-list-button").onmousedown = function() {
            if (appModel.currentList == null) {
                appModel.addNewList();
            }
        }
        document.getElementById("undo-button").onmousedown = function() {
            if (appModel.currentList != null) {
                appModel.undo();
                ToDoView.viewList(appModel.currentList, appModel);
            }
        }
        document.getElementById("redo-button").onmousedown = function() {
            if (appModel.currentList != null) {
                appModel.redo();
                ToDoView.viewList(appModel.currentList, appModel);
            }
        }
        document.getElementById("delete-list-button").onmousedown = function() {
            if (appModel.currentList != null) {
                document.getElementById("confirmation-modal").style.display = "block";
                //appModel.removeCurrentList();
            }
        }
        document.getElementById("add-item-button").onmousedown = function() {
            if (appModel.currentList != null) {
                appModel.addNewItemTransaction();
            }
        } 
        document.getElementById("close-list-button").onmousedown = function() {
            appModel.currentList = null;
            ToDoView.viewList(appModel.currentList, appModel);
        } 
        document.getElementById("confirm-delete").onmousedown = function() {
            appModel.removeCurrentList();
            document.getElementById("confirmation-modal").style.display = "none";
            ToDoView.viewList(appModel.currentList, appModel);
        }
        document.getElementById("cancel-delete").onmousedown = function() {
            document.getElementById("confirmation-modal").style.display = "none";
        }
        for (let i = 0; i < document.getElementsByClassName("button").length; i++) {
            document.getElementsByClassName("button")[i].onmouseover = function() {
                document.getElementsByClassName("button")[i].style.cursor = "pointer";
            }
        }
    }
    
    // PROVIDES THE RESPONSE TO WHEN A USER CLICKS ON A LIST TO LOAD
    handleLoadList(listId) {
        // UNLOAD THE CURRENT LIST AND INSTEAD LOAD THE CURRENT LIST
        this.model.tps.clearAllTransactions();
        this.model.loadList(listId);
    }
}
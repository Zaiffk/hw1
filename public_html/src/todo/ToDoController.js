'use strict'

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
            appModel.addNewList();
        }
        document.getElementById("undo-button").onmousedown = function() {
            appModel.undo();
        }
        document.getElementById("redo-button").onmousedown = function() {
            appModel.redo();
        }
        document.getElementById("delete-list-button").onmousedown = function() {
            document.getElementById("confirmation-modal").style.display = "block";
            //appModel.removeCurrentList();
        }
        document.getElementById("add-item-button").onmousedown = function() {
            appModel.addNewItemTransaction();
        } 
        document.getElementById("confirm-delete").onmousedown = function() {
            appModel.removeCurrentList();
            document.getElementById("confirmation-modal").style.display = "none";
        }
        document.getElementById("cancel-delete").onmousedown = function() {
            document.getElementById("confirmation-modal").style.display = "none";
        }
        document.getElementsByClassName("button")[0].onmouseover = function() {
            document.getElementsByClassName("button")[0].style.cursor = "pointer";
        }
        document.getElementsByClassName("button")[1].onmouseover = function() {
            document.getElementsByClassName("button")[1].style.cursor = "pointer";
        }


    }
    
    // PROVIDES THE RESPONSE TO WHEN A USER CLICKS ON A LIST TO LOAD
    handleLoadList(listId) {
        // UNLOAD THE CURRENT LIST AND INSTEAD LOAD THE CURRENT LIST
        this.model.loadList(listId);
    }
}
'use strict'

import MoveDownItem_Transaction from "./transactions/MoveDownItem_Transaction.js";
import MoveUpItem_Transaction from "./transactions/MoveUpItem_Transaction.js";
import CloseItem_Transaction from "./transactions/CloseItem_Transaction.js";
import EditText_Transaction from "./transactions/EditText_Transaction.js";
import EditDate_Transaction from "./transactions/EditDate_Transaction.js";
import EditStatus_Transaction from "./transactions/EditStatus_Transaction.js";

/**
 * ToDoView
 * 
 * This class generates all HTML content for the UI.
 */
export default class ToDoView {
    constructor() {}

    // ADDS A LIST TO SELECT FROM IN THE LEFT SIDEBAR
    appendNewListToView(newList) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");

        // MAKE AND ADD THE NODE
        let newListId = "todo-list-" + newList.id;
        let listElement = document.createElement("div");
        listElement.setAttribute("id", newListId);
        listElement.setAttribute("class", "todo_button");
        listElement.appendChild(document.createTextNode(newList.name));
        listsElement.appendChild(listElement);

        // SETUP THE HANDLER FOR WHEN SOMEONE MOUSE CLICKS ON OUR LIST
        let thisController = this.controller;
        listElement.onmousedown = function() {
            thisController.handleLoadList(newList.id);
        }
    }

    // REMOVES ALL THE LISTS FROM THE LEFT SIDEBAR
    static clearItemsList() {
        let itemsListDiv = document.getElementById("todo-list-items-div");
        // BUT FIRST WE MUST CLEAR THE WORKSPACE OF ALL CARDS BUT THE FIRST, WHICH IS THE ITEMS TABLE HEADER
        let parent = itemsListDiv;
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    // REFRESHES ALL THE LISTS IN THE LEFT SIDEBAR
    refreshLists(lists) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");
        listsElement.innerHTML = "";

        for (let i = 0; i < lists.length; i++) {
            let list = lists[i];
            this.appendNewListToView(list);
        }
    }

    // THE VIEW NEEDS THE CONTROLLER TO PROVIDE PROPER RESPONSES
    setController(initController) {
        this.controller = initController;
    }

    // LOADS THE list ARGUMENT'S ITEMS INTO THE VIEW
    static viewList(list, model) {
        // WE'LL BE ADDING THE LIST ITEMS TO OUR WORKSPACE
        let itemsListDiv = document.getElementById("todo-list-items-div");

        // GET RID OF ALL THE ITEMS
        ToDoView.clearItemsList();

        for (let i = 0; i < list.items.length; i++) {
            // NOW BUILD ALL THE LIST ITEMS
            let listItem = list.items[i];
            let listItemElement = "<div id='todo-list-item-" + listItem.id + "' class='list-item-card'>"
                                + "<div class='task-col' contenteditable = 'true'>" + listItem.description + "</div>"
                                + "<div class='due-date-col'>" + listItem.dueDate + "</div>"
                                + "<div class='status-col'>" + listItem.status + "</div>"
                                + "<div class='list-controls-col'>"
                                + " <div class='list-item-control-up material-icons'>keyboard_arrow_up</div>"
                                + " <div class='list-item-control-down material-icons'>keyboard_arrow_down</div>"
                                + " <div class='list-item-control-close material-icons'>close</div>"
                                + " <div class='list-item-control'></div>"
                                + " <div class='list-item-control'></div>"
                                + "</div>";
            itemsListDiv.innerHTML += listItemElement;
            for (let i = 1; i < document.getElementsByClassName("task-col").length; i++) {
                let appModel = model;
                document.getElementsByClassName("task-col")[i].onmouseleave = function() {
                    //list.items[i - 1].setDescription(document.getElementsByClassName("task-col")[i].innerHTML);
                    if (list.items[i-1].description != document.getElementsByClassName("task-col")[i].innerHTML) {
                        let transaction = new EditText_Transaction(appModel, list, list.items[i-1], document.getElementsByClassName("task-col")[i].innerHTML);
                        appModel.addNewTransaction(transaction);
                        ToDoView.viewList(list, model);
                    }
                }
            }
            for (let i = 1; i < document.getElementsByClassName("due-date-col").length; i++) {
                let appModel = model;
                document.getElementsByClassName("due-date-col")[i].onmousedown = function() {
                    if (!list.items[i-1].getDueDate().includes("<form>")) {
                        list.items[i-1].setDueDate("<form><input id = 'date"+i+"' value = " + list.items[i-1].getDueDate() +" type='date'></form>");
                        //document.getElementsByClassName("due-date-col")[i].innerHTML = list.items[i-1].dueDate;
                        ToDoView.viewList(list, appModel);
                    }
                }
            }
            for (let i = 1; i < document.getElementsByClassName("due-date-col").length; i++) {
                let appModel = model;
                document.getElementsByClassName("due-date-col")[i].onchange = function() {
                    document.getElementsByClassName("due-date-col")[i].innerHTML = document.getElementById("date"+i).value;
                    list.items[i - 1].dueDate = document.getElementsByClassName("due-date-col")[i].innerHTML;
                    let transaction = new EditDate_Transaction(appModel, list, list.items[i-1],document.getElementsByClassName("due-date-col")[i].innerHTML) ;
                    appModel.addNewTransaction(transaction);
                    ToDoView.viewList(list, appModel);
                }
            }
            for (let i = 1; i < document.getElementsByClassName("status-col").length; i++) {
                let appModel = model;
                document.getElementsByClassName("status-col")[i].onmousedown = function() {
                    if (!list.items[i-1].getStatus().includes("<form>")) {
                        if (list.items[i-1].getStatus() == "complete") {
                            list.items[i-1].setStatus("<form><select id = 'status"+i+"'> <option value='complete'>complete</option><option value='incomplete'>incomplete</option></select></form>");
                        }else{
                            list.items[i-1].setStatus("<form><select id = 'status"+i+"'> <option value='incomplete'>incomplete</option><option value='complete'>complete</option></select></form>");
                        }
                        //document.getElementsByClassName("status-col")[i].innerHTML = list.items[i-1].status;
                        ToDoView.viewList(list, appModel);
                    }
                }
            }
            for (let i = 1; i < document.getElementsByClassName("status-col").length; i++) {
                let appModel = model;
                document.getElementsByClassName("status-col")[i].onchange = function() {
                    document.getElementsByClassName("status-col")[i].innerHTML = document.getElementById("status"+i).value;
                    list.items[i - 1].status = document.getElementsByClassName("status-col")[i].innerHTML;
                    let transaction = new EditStatus_Transaction(appModel, list, list.items[i-1],document.getElementsByClassName("status-col")[i].innerHTML) ;
                    appModel.addNewTransaction(transaction);
                    ToDoView.viewList(list, appModel);
                }
            }
            for (let i = 1; i < document.getElementsByClassName("list-item-control-up").length; i++) {
                let appModel = model;
                document.getElementsByClassName("list-item-control-up")[i].onmousedown = function() {
                    // let temp = list.items[i-1];
                    // list.items[i-1] = list.items[i];
                    // list.items[i] = temp;
                    let transaction = new MoveUpItem_Transaction(appModel, list, i);
                    appModel.addNewTransaction(transaction);
                    ToDoView.viewList(list, model);
                }
            }
            for (let i = 0; i < document.getElementsByClassName("list-item-control-down").length - 1; i++) {
                let appModel = model;
                document.getElementsByClassName("list-item-control-down")[i].onmousedown = function() {
                    // let temp = list.items[i+1];
                    // list.items[i+1] = list.items[i];
                    // list.items[i] = temp;
                    let transaction = new MoveDownItem_Transaction(appModel, list, i);
                    appModel.addNewTransaction(transaction);
                    ToDoView.viewList(list, appModel);
                }
            }
            for (let i = 0; i < document.getElementsByClassName("list-item-control-close").length; i++) {
                let appModel = model
                document.getElementsByClassName("list-item-control-close")[i].onmousedown = function() {
                    //list.items.splice(i, 1);
                    let transaction = new CloseItem_Transaction(appModel, list, i);
                    appModel.addNewTransaction(transaction);
                    ToDoView.viewList(list, appModel);
                }
            }
            for (let i = 1; i < document.getElementsByClassName("list-item-control-up").length; i++) {
                document.getElementsByClassName("list-item-control-up")[i].onmouseover = function() {
                    document.getElementsByClassName("list-item-control-up")[i].style.cursor = "pointer";
                }
            }
            for (let i = 0; i < document.getElementsByClassName("list-item-control-down").length - 1; i++) {
                document.getElementsByClassName("list-item-control-down")[i].onmouseover = function() {
                    document.getElementsByClassName("list-item-control-down")[i].style.cursor = "pointer";
                }
            }
            for (let i = 0; i < document.getElementsByClassName("list-item-control-close").length; i++) {
                document.getElementsByClassName("list-item-control-close")[i].onmouseover = function() {
                    document.getElementsByClassName("list-item-control-close")[i].style.cursor = "pointer";
                }
            }
        }
    }
}
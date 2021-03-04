'use strict'

/**
 * ToDoListItem.js
 * 
 * This class represents an item for our list.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class ToDoListItem {
    /**
     * The constructor creates a default, empty item.
     */
    constructor(initId) {
        this.id = initId;
        this.description = "Unknown";
        this.dueDate = new Date().toUTCString();
        this.dateBackup = this.dueDate;
        this.status = "incomplete";
        this.statusBackup = this.status;
    }

    // GETTER/SETTER METHODS

    getId() {
        return this.id;
    }

    getDescription() {
        return this.description;
    }

    setDescription(initDescription) {
        this.description = initDescription;
    }

    getDueDate() {
        return this.dueDate;
    }

    setDueDate(initDueDate) {
        if (this.dueDate.includes("<form>")) {
            this.dueDate = initDueDate;
        }else{
            this.dateBackup = this.dueDate;
            this.dueDate = initDueDate;
        }
    }

    getStatus() {
        return this.status;
    }

    setStatus(initStatus) {
        if (this.status.includes("<select>")) {
            this.status = initStatus;
        }else{
            this.statusBackup = this.status;
            this.status = initStatus;
        }
    }
}
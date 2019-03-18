/*global app, $on */
    
    'use strict';

    /**
     * Sets up a brand new Todo list.
     * @constructor
     * @param {string} name The name of your new to do list.
     */
    function Todo(name) {
        this.storage = new app.Store(name);
        this.model = new app.Model(this.storage);
        this.template = new app.Template();
        this.view = new app.View(this.template);
        this.controller = new app.Controller(this.model, this.view);


        var localStoragetab = JSON.parse(localStorage[this.storage._dbName]).todos;
    }

    var todo = new Todo('todos-vanillajs');

    function setView() {
        todo.controller.setView(document.location.hash);
    }
    $on(window, 'load', setView);
    $on(window, 'hashchange', setView);

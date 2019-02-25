/*global app, $on */
(function () {
    'use strict';

    /**
     * Sets up a brand new Todo list.
     *
     * @param {string} name The name of your new to do list.
     */
    function Todo(name) {
        this.storage = new app.Store(name);
        this.model = new app.Model(this.storage);
        this.template = new app.Template();
        this.view = new app.View(this.template);
        this.controller = new app.Controller(this.model, this.view);



        console.log("%c ■ -> DOM", "color: #9b2afc")

        console.log("%c ■ -> CONTROLLER", "color: #fc8b2a")

        console.log("%c ⸻⸻⸻⸻", "font-weight : bold")


        var localStoragetab = JSON.parse(localStorage[this.storage._dbName]).todos;
        console.log("LocalStorage : ");
        for (let i = 0; i < localStoragetab.length; i++) {
            if (localStoragetab[i].completed === false) {
                console.log('%c --- ' + localStoragetab[i].title, 'color:red')
            } else {
                console.log('%c -- ' + localStoragetab[i].title, 'color:green')
            }

        }

        console.log("%c ⸻⸻⸻⸻", "font-weight : bold")
    }

    var todo = new Todo('todos-vanillajs');

    function setView() {
        todo.controller.setView(document.location.hash);
    }
    $on(window, 'load', setView);
    $on(window, 'hashchange', setView);
})();

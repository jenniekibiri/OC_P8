# Projet 8 : Reprenez et améliorez un projet existant

![Todo](https://user.oc-static.com/upload/2017/10/19/15083988221397_Screen%20Shot%202017-10-17%20at%2010.52.21%20AM.png)

Ce projet consiste à améliorer un projet de todoList en VanillaJS

L'amélioration de ce projet se décompose en 4 étapes : 

* La recherche de deux bugs
* La réalisation de tests Jasmine
* L'optimisation des performance 
* La réalisation d'une documentation 

## 1. Correction des bugs 

### Faute de frappe 
Dans le controller.js il est écrit `Controller.prototype.adddItem` au lieu de `Controller.prototype.addItem`

### Génération de l'ID
Dans store.js :
Lors de la création d'un nouvel élément, on lui génère un ID aléatoire du style '0123456789' .Mais le problème vient du fait qu'il y a quand même une infime chance de tomber deux fois sur le même ID pour deux éléments différents.

Il fallait donc trouver un façon de générer cet ID pour être sur d'avoir toujours quelque chose de différent. 
J'ai donc utilisé la fonction `Date.now()` de JavaScript qui d'après le site MDN : 
>La méthode Date.now() renvoie le nombre de millisecondes écoulées depuis le 1er Janvier 1970 00:00:00 UTC.

```javascript
Store.prototype.save = function (updateData, callback, id) {
        var data = JSON.parse(localStorage[this._dbName]);
        var todos = data.todos;

        callback = callback || function () {};

        if (!id) {
            var newId = "";
            var charset = "0123456789";
            console.log("Génération de l'ID");
            for (var i = 0; i < 6; i++) {

                newId += charset.charAt(Math.floor(Math.random() * charset.length));

            }
            // Generate an ID

        }
        // If an ID was actually given, find the item and update each property
        if (id) {
            console.log("Recherche si " + id + " existe déjà, si oui, mise à jour de celui-ci");
            for (var i = 0; i < todos.length; i++) {
                if (todos[i].id === id) {
                    console.log(id + " existe déjà dans le localStorage")
                    for (var key in updateData) {
                        console.log("Mise à jour de " + id + " dans le localStorage")
                        todos[i][key] = updateData[key];
                    }
                    break;
                }
            }
            localStorage[this._dbName] = JSON.stringify(data);
            callback.call(this, todos);
        } else {
            // Assign an ID
            updateData.id = parseInt(newId);
            todos.push(updateData);
            localStorage[this._dbName] = JSON.stringify(data);
            callback.call(this, [updateData]);
        }
    };
```
  
## 2. Où sont les tests ?!

Pour réaliser les tests, on utilise le Framework Jasmine.
Pour pouvoir installer celui-ci il a donc fallu installer NPM et Node.js

Dans le dossier test vous trouverez le fichier **SpecRunner.html** qui va vous permettre de lancer les tests. Vous trouverez aussi le fichier **ControllerSpec.js** qui lui vous servira à visualiser comment les tests sont construis mais aussi à modifier ceux-ci 

>### Liste des tests effectués 
>* #61 : Test si le model et le view sont bien affichés
```javascript
it('should show entries on start-up', function () {
        var todo = [{
                id: 0,
                title: 'TodoNumber1',
                completed: false
        },
            {
                id: 1,
                title: 'TodoNumber2',
                completed: false
                    }];

        setUpModel([todo]);

        subject.setView(''); //controler.js

        expect(view.render).toHaveBeenCalledWith('showEntries', [todo]);

    });
```
>* #107 : Test du rendu de view lors de l'affichage des todos avec le filtre "active"
```javascript
it('should show active entries', function () {
            var todo = [{
                    id: 0,
                    title: 'TodoNumber1',
                    completed: true
            },
                {
                    id: 1,
                    title: 'TodoNumber2',
                    completed: false
                        }];

            setUpModel([todo]);

            subject.setView('#/active'); //controler.js

            //detection si au moins une todo est affichée
            expect(view.render).toHaveBeenCalledWith('showEntries', [todo]);

            //detection si il y a que des todos 'completed : false' qui sont affichées
            expect(model.read).toHaveBeenCalledWith({
                completed: false
            }, jasmine.any(Function));

            expect(model.read).not.toHaveBeenCalledWith({
                completed: true
            }, jasmine.any(Function));
        });
```
              
  >* #138 : Test du rendu de view lors de l'affichage des todos avec le filtre "completed"
  ```javascript
it('should show completed entries', function () {
            var todo = [{
                    id: 0,
                    title: 'TodoNumber1',
                    completed: true
            },
                {
                    id: 1,
                    title: 'TodoNumber2',
                    completed: false
                        }];

            setUpModel([todo]);

            subject.setView('#/completed'); //controler.js

            console.log(model.read)

            //detection si au moins une todo est affichée

            expect(view.render).toHaveBeenCalledWith('showEntries', [todo]);

            //detection si il y a que des todos 'completed : true' qui sont affichées

            expect(model.read).toHaveBeenCalledWith({
                completed: true
            }, jasmine.any(Function));

            expect(model.read).not.toHaveBeenCalledWith({
                completed: false
            }, jasmine.any(Function));
        });
        
```          

   >* #225 : Test si "All" est encadré lorsque l'on a le filtre par défaut
```javascript   
it('should highlight "All" filter by default', function () {
    var todo = [{
            id: 0,
            title: 'TodoNumber1',
            completed: true
    },
        {
            id: 1,
            title: 'TodoNumber2',
            completed: false
                }];

    setUpModel(todo);

    subject.setView(''); //controler.js

    //detection si le filtre a bien été passé avec 0 paramètre 

    expect(view.render).toHaveBeenCalledWith('setFilter', '');
});
```

>* #250 : Test si "Active" est encadré lorsque l'on a le filtre "Active"
```javascript
it('should highlight "Active" filter when switching to active view', function () {
        var todo = [{
                id: 0,
                title: 'TodoNumber1',
                completed: true
        },
            {
                id: 1,
                title: 'TodoNumber2',
                completed: false
                    }];

        setUpModel(todo);

        subject.setView('#/active'); //controler.js

        //detection si le filtre a bien été passé avec le paramètre 'active'

        expect(view.render).toHaveBeenCalledWith('setFilter', 'active');

        //detection si il y a que des todos 'completed : false' qui sont affichées

        expect(model.read).toHaveBeenCalledWith({
            completed: false
        }, jasmine.any(Function));

        expect(model.read).not.toHaveBeenCalledWith({
            completed: true
        }, jasmine.any(Function));
    });
```     

>* #284 : Test de l'update du model quand toutes les todos sont passées à "toggle"

```javascript
    it('should toggle all todos to completed', function () {
        var todo = [{
                    id: 0,
                    title: 'TodoNumber1',
                    completed: false
            },
                {
                    id: 1,
                    title: 'TodoNumber2',
                    completed: false
                        }];

            setUpModel(todo);

            subject.setView('');

            //Appel de la fonction 'toggleAll' avec le parametre 'completed : true'

            view.trigger('toggleAll', {
                completed: true
            });

            //detection si les modifications ont bien été faites

            //Model.prototype.update = function (id, data, callback)

            expect(model.update).toHaveBeenCalledWith(0, {
                completed: true
            }, jasmine.any(Function));

            expect(model.update).toHaveBeenCalledWith(1, {
                completed: true
            }, jasmine.any(Function));


        });
```
>* #322 : Test de la mise à jour de "View"

```javascript
it('should update the view', function () {
            var todo = [{
                    id: 0,
                    title: 'TodoNumber1',
                    completed: false
            },
                {
                    id: 1,
                    title: 'TodoNumber2',
                    completed: false
                        }];

            setUpModel(todo);

            subject.setView(''); //controler.js

            //Appel de la fonction 'toggleAll' avec le parametre 'completed : true'

            view.trigger('toggleAll', {
                completed: true
            });

            //detection si les elements sont bien affichés 'completed : true'

            //self._elementComplete(parameter.id, parameter.completed)

            expect(view.render).toHaveBeenCalledWith('elementComplete', {
                id: 0,
                completed: true
            });

            expect(view.render).toHaveBeenCalledWith('elementComplete', {
                id: 1,
                completed: true
            });
        });
```

>* #363 : Test si "model" créé bien une nouvelle todo

```javascript
it('should add a new todo to the model', function () {
            var todo = [{
                id: 0,
                title: 'TodoNumber1',
                completed: false
            }];

            setUpModel(todo);

            subject.setView(''); //controler.js

            //Appel de la fonction 'newTodo' avec le parametre 'addNewTodo'

            view.trigger('newTodo', 'addNewTodo');

            //detection si l'element 'addNewTodo' a bien créé

            expect(model.create).toHaveBeenCalledWith('addNewTodo', jasmine.any(Function));

        });
```

>* #422 : Test sur le model lors de la suppression d'une todo
```javascript
it('should remove an entry from the model', function () {
            var todo = [{
                    id: 0,
                    title: 'TodoNumber1',
                    completed: true
            },
                {
                    id: 1,
                    title: 'TodoNumber2',
                    completed: false
                        }];

            setUpModel(todo);

            subject.setView(''); //controler.js

            //Appel de la fonction 'itemRemove' avec le parametre 'id : 0'

            view.trigger('itemRemove', {
                id: 0
            });

            //detection si l'element '0' a bien été supprimé

            //Model.prototype.remove = function (id, callback)

            expect(model.remove).toHaveBeenCalledWith(0, jasmine.any(Function));

            expect(model.remove).not.toHaveBeenCalledWith(1, jasmine.any(Function));

        });
```

## 3. Optimisez la performance

* Création d'un audit de performance pour le site [todolistme](https://github.com/thomasv04/OC_P8/blob/master/documentation/audit.md)

## 4. Améliorez le projet
* Création d'une  [documentation utilisateur](https://github.com/thomasv04/OC_P8/blob/master/documentation/doc_util.md)

* Création d'une  [documentation technique](http://thomas-vigneron.fr/todo/jsdoc/index.html)


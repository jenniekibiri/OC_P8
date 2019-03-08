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

      Store.prototype.save = function (updateData, callback, id) {
              var data = JSON.parse(localStorage[this._dbName]);
              var todos = data.todos;

              callback = callback || function () {};

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
                  updateData.id = Date.now();
                  console.log("L'ID généré est " + updateData.id)

                  todos.push(updateData);
                  localStorage[this._dbName] = JSON.stringify(data);
                  callback.call(this, [updateData]);
              }
          };

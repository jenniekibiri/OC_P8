# Audit de performance du site [todolistme](http://todolistme.net/)

### 1. Langage utilisés par ce site : 

Grâce à l'utilisation de l'extension Wappalyzer sur Chrome, nous pouvons voir que le site utilise Jquery et Jquery UI qui sont deux librairies très gourmande.

### 2. Fonctionnement du site : 

Le site todolistme propose comme nous un site donnant la possibilité de créer une todo-list avec quelques fonctionnalités en plus : 

* La possibilité d'imprimer sa todo-list
* La création de "Lists" (des sortes de classeurs à todo-list)
* Un drag & drop de todo pour la repeter ulterieurement 

### 3. Utilisation du mopde développeur de Chrome :

#### Section "Audits" :

###### Performance :

![Audit1](https://raw.githubusercontent.com/thomasv04/OC_P8/master/documentation/img/a1.png)

Le test de performance obtient un 54% de test validé, ce qui prouve que le site est assez long à charger

###### Accessibilité :

![Audit2](https://raw.githubusercontent.com/thomasv04/OC_P8/master/documentation/img/a2.png)

Seulement 47 %, les tests nous revèlent quelques pistes d'avancement : 
* Augmenter les contrastes entre le background et le contenu
* Utiliser les attributs "alt" unique pour chaque image
* ...

###### Bonnes pratiques :

![Audit3](https://raw.githubusercontent.com/thomasv04/OC_P8/master/documentation/img/a3.png)

On obtient là un beau 71 % mais quand même des améliorations à faire : 

* Utiliser l'HTTPS
* Verifier les versions de Jquery 
* ...

###### Compatibilité pour mobile :

![Audit4](https://raw.githubusercontent.com/thomasv04/OC_P8/master/documentation/img/a4.png)

78 % de reussite mais : 
* Pas de `<meta name="viewport">` dans le code 

#### Section "Network" :

![Network1](https://raw.githubusercontent.com/thomasv04/OC_P8/master/documentation/img/n1.png)

Le site prend exactement 4.67 secondes à charger completement et demande 2.9 MB en ressources 

#### Section "Performance" :

![Performance1](https://raw.githubusercontent.com/thomasv04/OC_P8/master/documentation/img/p1.png)

Grâce à l'outil de performance nous pouvons voir ce qui à été chargé et à quel moment.

Nous pouvons surtout voir que au bout de 2 secondes rien n'est encore chargé

Et surtout qu'il faudra attendre la 10ème secondes du test pour voir enfin les todos

#### Outil "Coverage" :

![Coverage1](https://raw.githubusercontent.com/thomasv04/OC_P8/master/documentation/img/c1.png)

Grâce à l'outil "coverage" nous pouvons savoir combien de pourcentage d'un fichier n'est pas utilisé.

Donc comme on peut voir sur la photo, 86% de Jquery UI n'est pas utilisé, ce qui est énorme.

Et pour Jquery c'est 60%.

Ainsi que leur service de pub qui n'est utilisé qu'à 32%

### 4. "Scaling" : 

Voici les quelques fonctionnalités qui pourraient être ajoutées à notre site : 

* Les "lists" (classeurs)
* Le fait de pouvoir reporter une todo 
* Le téléchargement de la todo-list

### Comparaison : 

![Application](https://raw.githubusercontent.com/thomasv04/OC_P8/master/documentation/img/my.png)

|            | Performance | Accessibility | Best Practices | SEO |
|------------|-------------|---------------|----------------|-----|
| Notre site | 99%         | 69%           | 86%            | 67% |
| Concurrent | 54%         | 47%           | 71%            | 78% |

On peut voir que l'on est au dessus partout sauf pour le SOE ce qui est un très bon résultat 





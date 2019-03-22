var newDesign = document.createElement('div');
var newDesignText = document.createTextNode('New Design');
newDesign.classList.add('newDesign');
newDesign.appendChild(newDesignText);

document.body.appendChild(newDesign);

var newDesignSelect = document.querySelector('.newDesign')
newDesignSelect.style.textAlign = 'center';
newDesignSelect.style.fontWeight = 'bold';
newDesignSelect.style.cursor = 'pointer';

newDesignSelect.onclick = (e => {
    var target = e.currentTarget;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'newDesign/new-design.css';
    document.getElementsByTagName('head')[0].appendChild(link);
    target.remove();

    var nightModeDiv = document.createElement('div');
    nightModeDiv.classList.add('nightMode');
    document.body.appendChild(nightModeDiv);

    document.querySelector('.nightMode').onclick = (e => {
        var linkNight = document.createElement('link');
        linkNight.rel = 'stylesheet';
        linkNight.type = 'text/css';
        linkNight.href = 'newDesign/nightMode.css';
        linkNight.classList.add('night');

        if (e.currentTarget.classList.contains('active')) {
            document.querySelector('.night').remove();
            e.currentTarget.classList.remove('active');
        } else {
            document.getElementsByTagName('head')[0].appendChild(linkNight);
            e.currentTarget.classList.add('active');
        }


    });


});
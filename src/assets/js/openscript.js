function openNav() {
    document.getElementById("mySidenav").style.width = "270px";
    document.getElementById("main").style.marginRight = "180px";
    // document.body.style.backgroundColor = "rgba(0,0,0,0.8)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
    document.getElementById("main").style.backgroundColor = "white";
}

function selectnext(containerid) {
    if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select();
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().addRange(range);
    }
}

// disable back button

function preventBack() { window.history.forward(); }

function noBack() {
    setTimeout("preventBack()", 0);
    window.onunload = function() { null };
}


// side scroll in plans and services

function newslidefunction() {
    const slider = document.querySelector('.items');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
    });
}

function callaos() {
    AOS.init();
    window.addEventListener('load', AOS.refresh);
}



const sections = document.querySelectorAll("section");

let nav = document.querySelector("nav");

const hauteurNav=nav.offsetHeight;

document.querySelector("main").style.paddingTop=hauteurNav+"px";


//effet au scroll sur le nav bar
window.addEventListener("scroll",function(){

    if(window.scrollY>=hauteurNav){
        nav.classList.add("effet_scroll");
    }
    
    else{
        nav.classList.remove("effet_scroll");
    }
    
});

//faire en sorte que les debuts de sections affichées restent visibles lorsqu'on clique vers une section i.e rajouter la hauteur du nav qui cache les debuts de sections
sections.forEach(section => {
    section.style.scrollMarginTop=hauteurNav+"px";
});


//effet fondu sur les sections competences et projets
const observer1 = new IntersectionObserver(function(entries) {// entries c'est le tableau qui regroupe Les sections observée. entry Correspond à chaque élément de ce tableau 
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            // l'élément est visible à l'écran
            entry.target.classList.add("visible");// ajoute la classe "visible" à entry.target
        }
    });
});

// dis à l'observer quels éléments surveiller
observer1.observe(document.querySelector("#about"));
observer1.observe(document.querySelector("#skills"));

document.querySelectorAll("#projects article").forEach(function(article, index) {
    // index vaut 0 pour le 1er article, 1 pour le 2e, 2 pour le 3e
    article.style.transitionDelay = (index * 0.15) + "s";
    observer1.observe(article);
});


//POUR Rajouter un État actif au titre de section dans le Navbar


const liens = document.querySelectorAll("nav a");

const observer2 = new IntersectionObserver((entries) => {  //(entries)=>{} équivaut à function(entries){}
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            liens.forEach(lien => {
                lien.classList.remove("active");
            });

            const id = entry.target.id;
            document.querySelector(`nav a[href="#${id}"]`).classList.add("active");
        }
    });
}, {
    threshold: 0.5
});

sections.forEach(section => observer2.observe(section));


//Gestion du menu hamburger
let bouton_menu=document.querySelector('button[class="icone-menu"]');
bouton_menu.addEventListener("click", function(){
    document.querySelector("nav ul").classList.toggle("menu-ouvert");
    bouton_menu.classList.toggle("icone-croix");

});


    // fermer le menu si un lien est cliqué
    let menu=document.querySelector("nav ul");
    document.querySelectorAll("nav ul a").forEach(lien => {
        lien.addEventListener("click", function(){
            if (menu.classList.contains("menu-ouvert")) {
                menu.classList.remove("menu-ouvert");
                bouton_menu.classList.remove("icone-croix");
            }
        });
    });


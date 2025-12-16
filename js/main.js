function loadComponent(id, path) {
    fetch(path)
        .then(res => res.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        });
}

loadComponent("navbar", "components/navbar/navbar.html");
loadComponent("hero", "components/hero/hero.html");
loadComponent("tecno", "components/tecno/tecno.html");
loadComponent("projet", "components/projet/projet.html");
loadComponent("footer", "components/footer/footer.html");

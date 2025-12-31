function loadComponent(id, path, callback) {
    fetch(path)
        .then(res => res.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback(); // ⚡ exécute le JS après injection
        });
}

loadComponent("navbar", "components/navbar/navbar.html", window.initNavbar);
loadComponent("hero", "components/hero/hero.html");
loadComponent("services", "components/services/services.html");
loadComponent("tecno", "components/tecno/tecno.html");
loadComponent("projet", "components/projet/projet.html");
loadComponent("footer", "components/footer/footer.html");

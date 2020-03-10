import * as g from './gallery.js';
import * as p from './photoloader.js';

window.addEventListener("load", () => {
    p.start("https://webetu.iutnc.univ-lorraine.fr");
    g.init();
    $("#load_gallery").on("click",g.loadData);
});
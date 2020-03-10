import * as photo from './photoloader.js';

let urls, id;

export let init = function () {
    urls = [];
    id = [];
}

export let loadData = function () {
    photo.loadImages("/www/canals5/photobox/photos/").then(
        ({data}) => {
            let photos = data.photos;
            $("#photobox-gallery").empty();
            for(let p of photos){
                $(`<div class="vignette">
                <img class="responsive" data-img=` + photo.server_url+p.photo.original.href +
                `data-uri=` + photo.server_url+p.links.href +
                `src=` + photo.serveur_url+p.photo.thumbnail.href + `>
                <div>` + p.photo.titre + `</div>
                </div>`).appendTo($("#photobox-gallery"));
            }

        }
    )
}
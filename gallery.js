import * as photo from './photoloader.js';
import * as lbox from './lightbox.js';

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
                <img class="responsive" data-img="` + photo.server_url+p.photo.original.href + "\"\n" +
                `data-uri="` + photo.server_url+p.links.self.href + "\"\n" +
                `src="` + photo.server_url+p.photo.thumbnail.href + "\"" + `>
                <div>` + p.photo.titre + `</div>
                </div>`).appendTo($("#photobox-gallery"));
            }
            $(".vignette").on("click",lbox.lightbox);

        }
    )
}
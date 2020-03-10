import * as photo from './photoloader.js';
import * as lbox from './lightbox.js';

let urls, id, prev, next;

export let init = function () {
    urls = [];
    id = [];
}

export let loadData = function () {
    photo.loadImages("/www/canals5/photobox/photos/").then(
        ({data}) => {
            affImg(data);
        }
    )
}

let affImg = function(data){
    let photos = data.photos;
    $("#photobox-gallery").empty();
    for(let p of photos) {
        $(`<div class="vignette">
                <img class="responsive" data-img="` + photo.server_url + p.photo.original.href + "\"\n" +
            `data-uri="` + photo.server_url + p.links.self.href + "\"\n" +
            `src="` + photo.server_url + p.photo.thumbnail.href + "\"" + `>
                </div>`).appendTo($("#photobox-gallery"));
    }
    $(".vignette").on("click",lbox.lightbox);
    prev = data.links.prev.href;
    next = data.links.next.href;
}

export let loadPrev = function () {
    photo.loadImages(prev).then(
        ({data}) => {
            affImg(data);
        }
    )
}

export let loadNext = function () {
    photo.loadImages(next).then(
        ({data}) => {
            affImg(data);
        }
    )
}

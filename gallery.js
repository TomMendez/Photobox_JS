import * as photo from './photoloader.js';
import * as lbox from './lightbox.js';

export let urls, id, prev, next, first, last;

export let init = function () {
    urls = [];
    id = [];
}

export let loadData = function () {
    photo.loadImages("/www/canals5/photobox/photos/").then(
        ({data}) => {
            affImg(data);
            first = data.links.first.href;
            last =  data.links.last.href;
        }
    )
}

export let affImg = function(data){
    let photos = data.photos;
    $("#photobox-gallery").empty();
    for(let p of photos) {
        id.push(p.photo.id);
        urls.push(p.links.self.href);
        $(`<div class="vignette">
                <img class="responsive" data-img="` + photo.server_url + p.photo.original.href + "\"\n" +
            `data-uri="` + photo.server_url + p.links.self.href + "\"\n" +
            `src="` + photo.server_url + p.photo.thumbnail.href + "\"" + `>
                </div>`).appendTo($("#photobox-gallery"));
    }

    $(".vignette").on("click",(e)=>lbox.lightbox(e.target.getAttribute("data-uri")));
    $(".responsive").on("mouseover", (e)=>e.target.classList.toggle("grandeVignette"));
    $(".responsive").on("mouseout", (e)=>e.target.classList.toggle("grandeVignette"));
    prev = data.links.prev.href;
    next = data.links.next.href;
}

export let loadPrev = function () {
    urls = [];
    id = [];
    let prom;
    if((photo.page_uri)==first){
        prom=photo.loadImages(last);
    }else{
        prom=photo.loadImages(prev);
    }
    prom.then(
        ({data}) => {
            affImg(data);
        }
    )
}

export let loadNext = function () {
    urls = [];
    id = [];
    let prom;
    if((photo.page_uri)==last){
        prom=photo.loadImages(first);
    }else{
        prom=photo.loadImages(next);
    }
    prom.then(
        ({data}) => {
            affImg(data);
        }
    )
}

export let loadNextLightbox = function () {
    urls = [];
    id = [];
    let prom;
    if((photo.page_uri)==last){
        prom=photo.loadImages(first);
    }else{
        prom=photo.loadImages(next);
    }
   prom.then(
        ({data}) => {
            affImg(data);
            lbox.lightbox(photo.server_url+urls[0]);
        }
    )
}

export let loadPrevLightbox = function () {
    urls = [];
    id = [];
    let prom;
    if((photo.page_uri)==first){
        prom=photo.loadImages(last);
    }else{
        prom=photo.loadImages(prev);
    }
    prom.then(
        ({data}) => {
            affImg(data);
            lbox.lightbox(photo.server_url+urls[urls.length-1]);
        }
    )
}

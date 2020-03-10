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
                <img class="responsive" data-img="` + photo.server_url+p.photo.original.href + "\"\n" +
                `data-uri="` + photo.server_url+p.links.self.href + "\"\n" +
                `src="` + photo.server_url+p.photo.thumbnail.href + "\"" + `>
                <div>` + p.photo.titre + `</div>
                </div>`).appendTo($("#photobox-gallery"));
            }
            $(".vignette").on("click",lightbox);

        }
    )
}

export let lightbox = function(e) {
    let uri = e.target.getAttribute("data-uri");
    let promesse = axios.get(uri,{
        withCredentials: true,
        responseType: "json"
    }).catch(() => "erreur lors du chargement de l'image");

    promesse.then(
        (img) => {
            console.log(img); //DEBUG
            $('<div class="lightbox_container" id="lightbox_container">\n' +
                '        <div id="lightbox">\n' +
                '            <div id="lightbox-head">\n' +
                '                <p id="lightbox_close">-X-</p>\n' +
                '                <h1 id="lightbox_title">' + img.data.photo.titre + '</h1>\n' +
                '            </div>\n' +
                '\n' +
                '            <div id="lightbox-img">\n' +
                '                <img id="lightbox_full_img" src="' + photo.server_url+img.data.photo.url.href + '">\n' +
                '            </div>\n' +
                '        </div>\n' +
                '\n' +
                '    </div>').appendTo($(".photobox-gallery"));
        }
    );

}
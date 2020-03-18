import * as photo from "./photoloader.js";
import * as gal from "./gallery.js";

let index;

export let lightbox = function(uri) {
    let promesse = axios.get(uri,{
        withCredentials: true,
        responseType: "json"
    }).catch(() => "erreur lors du chargement de l'image");

    promesse.then(
        (img) => {

            $("#light").empty();
            $("#light").append(

                $('<div class="lightbox_container" id="lightbox_container">\n' +
                    '        <div id="lightbox">\n' +
                    '            <div id="lightbox-head">\n' +
                    '                <p class="prevLightbox"> <<< </p>\n' +
                    '                <p class="titrePhoto">'+img.data.photo.titre+'</p>\n' +
                    '                <p id="lightbox_close"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">\n' +
                    '                <p class="nextLightbox"> >>> </p>\n' +
                    '</p>\n '+ '<i class="fa fa-remove" style="font-size:36px"></i>' +
                    '            </div>\n' +
                    '\n' +
                    '            <div id="lightbox-img">\n' +
                    '                <img id="lightbox_full_img" src="' + photo.server_url+img.data.photo.url.href + '">\n' +
                    '            </div>\n' +
                    '            <p class="description">' + img.data.photo.descr + ' (' + img.data.photo.width + '*' + img.data.photo.height + ')</p>' +
                    '        </div>\n' +
                    '\n' +
                    '<div class="com_container" id="com_container"></div>\n' +
                    '    </div>')
                );
            let prom2 = axios.get(photo.server_url+img.data.links.comments.href,{
                withCredentials: true,
                responseType: "json"
            }).catch(() => "erreur lors du chargement de l'image");
            prom2.then(
                (comments) => {

                    comments.data.comments.forEach(
                        (com) => {
                            $("#com_container").append(
                                $('<div class="com">'+com.pseudo + ' \n' +
                                    com.titre + ' \n' +
                                    com.content + ' \n' +
                                    com.date + ' \n' +
                                    '</div>')
                            )}
                )}
            );

            index = gal.id.indexOf(img.data.photo.id);
            $("#lightbox_container").css("display","table-cell");
            $(".fa-remove").on("click",(e)=>{$("#lightbox_container").remove()});
            $(".prevLightbox").on("click",prev);
            $(".nextLightbox").on("click",next);
        }
    );


}

let prev = function(){
    if(index<=0){
        gal.loadPrevLightbox();
    }else{
        lightbox(photo.server_url+gal.urls[index-1]);
    }
}

let next = function(){
    if(index>=gal.id.length-1){
        gal.loadNextLightbox();
    }else{
        lightbox(photo.server_url+gal.urls[index+1]);
    }
}
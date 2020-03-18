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

            console.log(img);

            $("#light").empty();
            $("#light").append(

                $('<div class="lightbox_container" id="lightbox_container">\n' +
                    '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">' +
                    '        <div id="lightbox">\n' +
                    '            <div id="lightbox-head">\n' +
                    '                <p></p>' +
                    '                <p class="titrePhoto" style="font-size: 20px; font-style: italic">'+img.data.photo.titre+'</p>' +
                    '                <i class="fa fa-remove" style="font-size:36px"></i>' +
                    '            </div>\n' +
                    '\n' +
                    '           <div class="mainImg">'+
                    '               <p class="description">' + img.data.photo.descr + ' <i style="font-style: italic; font-size: 10px"> ' + img.data.photo.width + '*' + img.data.photo.height + '</i></p>' +
                    '               <div class="grille">' +
                    '                <div id="lightbox-img">\n' +
                    '                <p class="prevLightbox fa fa-backward" style="font-size: 36px"></p>\n' +
                    '                <img id="lightbox_full_img" src="' + photo.server_url+img.data.photo.url.href + '">\n' +
                    '                <p class="nextLightbox fa fa-forward" style="font-size: 36px"></p>\n'+
                    '            </div>\n' +
                    '\n' +
                    '<div class="com_container" id="com_container"><p style="font-size: 20px; text-align: center; font-family: Impact">Commentaires :</p></div>\n' +
                    '    </div>' +
                    '</div></div>')
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
                                $('<div class="com">'+ '<p><mark>' + '#'+ com.pseudo + ' </mark></p> \n' +
                                    '<p>' + com.titre + ' : ' +' \n' +
                                    '" ' +com.content + ' "'+' \n' + ' - ' +
                                    '<i style="font-style: italic; font-size: 10px">' + com.date + '</i>'+' \n' + '</p>' +
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
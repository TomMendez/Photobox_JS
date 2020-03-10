import * as photo from "./photoloader.js";

export let lightbox = function(e) {
    let uri = e.target.getAttribute("data-uri");
    let promesse = axios.get(uri,{
        withCredentials: true,
        responseType: "json"
    }).catch(() => "erreur lors du chargement de l'image");

    promesse.then(
        (img) => {
            $("#light").append(

                $('<div class="lightbox_container" id="lightbox_container">\n' +
                    '        <div id="lightbox">\n' +
                    '            <div id="lightbox-head">\n' +
                    '                <p id="lightbox_close"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">' +
                    '</p>\n '+ '<i class="fa fa-remove" style="font-size:36px"></i>' +
                    '            </div>\n' +
                    '\n' +
                    '            <div id="lightbox-img">\n' +
                    '                <img id="lightbox_full_img" src="' + photo.server_url+img.data.photo.url.href + '">\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '\n' +
                    '    </div>')
                );
        }
    );
    $("#lightbox_container").css("display","table-cell");
    $(".fa-remove").on("click",(e)=>{$("#lightbox_container").remove()});

}
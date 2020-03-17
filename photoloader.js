export let server_url;
export let page_uri;

export let start = function(url){
    server_url=url;
};

export let loadImages = function(uri){
    page_uri=uri;
    return axios.get(server_url+uri,{
        withCredentials: true,
        responseType: "json"
    }).catch(() => "erreur lors du chargement des images");
}


let cookies_f = document.cookie;
let cookieslist_f = cookies_f.split(';');
//Cookie仕分け
cookieslist_f.forEach(function(car){
    let content = car.split('=');
    content[0] = content[0].trim();
    if(content[0] == 'ngslspent1'){
        document.cookie = 'spent_c1=' + content[1] + '; max-age=31536000';
        document.cookie = content[0] + '=; max-age=0';
    } else if (content[0] == 'ngslspent2'){
        document.cookie = 'spent_c2=' + content[1] + '; max-age=31536000';
        document.cookie = content[0] + '=; max-age=0';
    } else if (content[0] == 'ngslcount1'){
        document.cookie = 'count_c1=' + content[1] + '; max-age=31536000';
        document.cookie = content[0] + '=; max-age=0';
    } else if (content[0] == 'ngslcount2'){
        document.cookie = 'count_c2=' + content[1] + '; max-age=31536000';
        document.cookie = content[0] + '=; max-age=0';
    } else if (content[0] == 'ngsldef'){
        document.cookie = 'rest_c=' + content[1] + '; max-age=31536000';
        document.cookie = content[0] + '=; max-age=0';
    };
});


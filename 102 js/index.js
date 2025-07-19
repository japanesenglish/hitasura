let ok = 0;
let cookies = document.cookie;
console.log(cookies);
let cookieslist = cookies.split(';');
//Cookie仕分け
cookieslist.forEach(function(car){
    let content = car.split('=');
    content[0] = content[0].trim();
    if(content[0] == 'ok'){
        ok = content[1];
    };
});

if(ok == 0){
    document.getElementById('cc').style.display = 'block';
};
document.getElementById('ccok').addEventListener('click',function(){
    document.getElementById('cc').style.display = 'none';
    document.cookie = 'ok=1';
});
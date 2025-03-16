let alloption = document.querySelectorAll('option');
let speedlist = document.querySelectorAll('#speed>option');
let swilist = document.querySelectorAll('#swi>option');
let nextlist = document.querySelectorAll('#next>option');
let ranklist = document.querySelectorAll('#rank>option');
let speed = '';
let swi = '';
let next = '';
let rank = '';
let cookies = document.cookie;
let cookieslist = cookies.split(';');
let contents = [];
//Cookie仕分け
cookieslist.forEach(function(car){
    let content = car.split('=');
    content[0] = content[0].trim();
    if(content[0] == 'speed'){
        speed = content[1];
    } else if (content[0] == 'swi'){
        swi = content[1];
    } else if (content[0] == 'next'){
        next = content[1];
    } else if (content[0] == 'rank'){
        rank = content[1];
    };
    contents.push(content[0]);
});
//optionの選択状態の変更
if(speed !== ''){
    alloption.forEach(function(car){
        car.removeAttribute('selected');
    });
    speedlist[speed].setAttribute('selected','');
};
if(swi !== ''){
    swilist[swi].setAttribute('selected','');
    gray()
};
if(next !== ''){
    nextlist[next].setAttribute('selected','');
};
if(rank !== ''){
    ranklist[rank].setAttribute('selected','');
};
console.log(cookies,contents)

//復習なしで灰色
document.getElementById('swi').addEventListener('change',function(){
    gray();
});
function gray(){
    let elements1 = document.querySelectorAll('.huku>div:nth-last-of-type(1)');
    let elements2 = document.querySelectorAll('.huku')
    if(document.getElementById('swi').value !== '0'){
        elements1.forEach(function(car){
            let element = car;
            element.style.display = 'block';
        });
        elements2.forEach(function(car){
            let element = car;
            element.style.color = 'gray';
        });
    } else {
        elements1.forEach(function(car){
            let element = car;
            element.style.display = '';
        });
        elements2.forEach(function(car){
            let element = car;
            element.style.color = '';
        });
    };
}

//保存ボタン
document.getElementById('save').addEventListener('click',function(){
    var select = document.getElementById('speed').value;
    document.cookie = 'speed=' + select;' max-age=31536000';
    var select = document.getElementById('swi').value;
    document.cookie = 'swi=' + select;' max-age=31536000';
    var select = document.getElementById('next').value;
    document.cookie = 'next=' + select;' max-age=31536000';
    var select = document.getElementById('rank').value;
    document.cookie = 'rank=' + select;' max-age=31536000';
    let noti =document.getElementById('savenoti');
    noti.style.top = '10px';
    setTimeout(() => {
        noti.style.top = '-100px';
        setTimeout(() => {
            noti.style.top = '';
        }, 500);
    }, 2000);
});
//リセットボタン
document.getElementById('reset').addEventListener('click',function(){
    document.getElementById('grayback').style.display = 'block';
});
document.getElementById('no').addEventListener('click',function(){
    document.getElementById('grayback').style.display = '';
});
document.getElementById('yes').addEventListener('click',function(){
    document.getElementById('grayback').style.display = '';
    contents.forEach(function(car){
        console.log(car)
        document.cookie = car + '=; max-age=0';
    });
    let noti =document.getElementById('resetnoti');
    noti.style.top = '10px';
    setTimeout(() => {
        noti.style.top = '-100px';
        setTimeout(() => {
            noti.style.top = '';
        }, 500);
    }, 2000);
});

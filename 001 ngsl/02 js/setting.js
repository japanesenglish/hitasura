let alloption = document.querySelectorAll('option');
let speedlist = document.querySelectorAll('#speed>option');
let swilist = document.querySelectorAll('#swi>option');
let nextlist = document.querySelectorAll('.next>option');
let forblist = document.querySelectorAll('#forb>option');
let banlist = document.querySelectorAll('#ban>option');
let speed = '';
let swi = '';
let next = '';
let forb = '';
let ban = '';
let cookies = document.cookie;
console.log(cookies);
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
    } else if (content[0] == 'forb'){
        forb = content[1];
    } else if (content[0] == 'ban'){
        ban = content[1];
    };
    contents.push(content[0]);
});
//optionの選択状態の変更
if(speed !== ''){
    alloption.forEach(function(car){
        car.removeAttribute('selected');
    });
    speedlist[speed - 1].setAttribute('selected','');
};
if(swi !== ''){
    swilist[swi].setAttribute('selected','');
    gray()
};
if(next !== ''){
    next = next.split('a');
    next.shift();
    let i = -1;
    next.forEach(function(car){
        nextlist[Number(car) + i].setAttribute('selected','');
        i = i + 99;
    });
};
if(forb !== ''){
    forblist[forb].setAttribute('selected','');
};
if(ban !== ''){
    banlist[ban].setAttribute('selected','');
};

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
    let days = document.querySelectorAll('.next');
    var select = '';
    let bar = 0;
    let can = '';
    days.forEach(function(car){
        select = select + 'a' + car.value;
        if(bar > Number(car.value)){
            can = 'not';
        };
        bar = Number(car.value);
    });
    if(can == ''){
        document.cookie = 'next=' + select + '; max-age=31536000';
        var select = document.getElementById('speed').value;
        document.cookie = 'speed=' + select + '; max-age=31536000';
        var select = document.getElementById('swi').value;
        document.cookie = 'swi=' + select + '; max-age=31536000';
        var select = document.getElementById('forb').value;
        document.cookie = 'forb=' + select + '; max-age=31536000';
        var select = document.getElementById('ban').value;
        document.cookie = 'ban=' + select + '; max-age=31536000';
        let noti =document.getElementById('savenoti');
        noti.style.top = '10px';
        setTimeout(() => {
            noti.style.top = '-100px';
            setTimeout(() => {
                noti.style.top = '';
            }, 500);
        }, 2000);
    } else {
        document.getElementById('grayback').style.display = 'block';
        document.getElementById('err').style.display = 'block';
    };
});
document.getElementById('ok').addEventListener('click',function(){
    document.getElementById('grayback').style.display = '';
    document.getElementById('err').style.display = '';
})
//リセットボタン
document.getElementById('reset').addEventListener('click',function(){
    document.getElementById('grayback').style.display = 'block';
    document.getElementById('resetconfirm').style.display = 'block';
});
document.getElementById('no').addEventListener('click',function(){
    document.getElementById('grayback').style.display = '';
    document.getElementById('resetconfirm').style.display = '';
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

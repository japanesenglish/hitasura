let ens = [];
let jps = [];
let spent = [];
let spentv = [];
let rest = [];
let day = '';
let ngslspent1 = '';
let ngslspent2 = '';
let speed = '';
let swi = '';
let next = '';
let rank = '';
let defs = [1,3,7,14,30,60];
let ngsldef = '';
let cookies = document.cookie;
console.log(cookies)
let cookieslist = cookies.split(';');
//Cookie仕分け
cookieslist.forEach(function(car){
    let content = car.split('=');
    content[0] = content[0].trim();
    if(content[0] == 'day'){
        day = content[1];
    } else if (content[0] == 'ngslspent1'){
        ngslspent1 = content[1];
    } else if (content[0] == 'ngslspent2'){
        ngslspent2 = content[1];
    } else if (content[0] == 'speed'){
        speed = content[1];
    } else if (content[0] == 'next'){
        next = content[1];
    } else if (content[0] == 'ngsldef'){
        ngsldef = content[1];
    };
});

//Cookieの初回設定
if(speed == ''){
    speed = '4';
};
if(swi == ''){
    swi = '0';
};
if(next == ''){
    next = '0';
};
if(rank == ''){
    rank = '0';
};
//前回訪問からの経過日 実験中！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
let today = new Date;
let sub = '';
if(day !== ''){
    day = day.split('a');
    sub = (new Date(today.getFullYear(),today.getMonth(),today.getDate()) - new Date(day[0],day[1],day[2])) / 86400000;
} else {
    sub = 0;
};
sub = 60;
//Cookieを経過日に適応
spent = document.querySelectorAll('.word>div:nth-of-type(3)');
if(ngslspent1 !== '' && ngslspent2 !== ''){
    ngslspent1 = [...ngslspent1];
    ngslspent2 = [...ngslspent2];
    let i = 0;
    ngslspent1.forEach(function(car){
        if(ngslspent2[i] !== '-'){
            let past = (Number(car) * 10) + Number(ngslspent2[i]) + Number(sub);
            if(past > 99){
                past = '99';
            }
            spentv.push(past);
        } else {
            spentv.push(ngslspent2[i]);
        };
        spent[i].innerHTML = spentv[i]
        i = i + 1;
    });
} else {
    spent.forEach(function(){
        spentv.push('-')
    })
};
document.cookie = 'day=' + today.getFullYear() + 'a' + today.getMonth() + 'a' + today.getDate();' max-age=31536000';
//Cookieを　次回出題まで　に適応
rest = document.querySelectorAll('.word>div:nth-of-type(4)');
if(next == 0){
    if(ngsldef !== ''){
        ngsldef = [...ngsldef];
        let i = 0;
        rest.forEach(function(car){
            let element = car;
            if(ngsldef[i] == '-'){
                element.innerHTML = ngsldef[i];
            } else {
                element.innerHTML = defs[ngsldef[i]];
            };
            i = i + 1;
        });
    } else {
        rest.forEach(function(car){
            let element = car;
            element.innerHTML = '-';
        });
    };
} else {
    rest.forEach(function(car){
        let element = car;
        element.innerHTML = next;
    });
};

//出題
ens = document.querySelectorAll('.word>div:nth-of-type(1)');
jps = document.querySelectorAll('.word>div:nth-of-type(2)');
let poolall = [];
let poolfir = [];
let poolre = [];
let a = 0;
let possies = [0,0,0,0,0,0];
spent.forEach(function(car){
    if(car.innerHTML == '-'){
        poolall.push(a);
        poolfir.push(a);
    } else if (Number(car.innerHTML) >= Number(rest[a].innerHTML)){
        poolall.push(a);
        poolre.push(a);
        let i = 0;
        possies.forEach(function(){
            if(defs.indexOf(Number(rest[a].innerHTML)) == i){
                possies[i] = possies[i] + 1;
            };
            i = i + 1;
        });
    };
    a = a + 1;
    let i = 2;
    possies.forEach(function(car){
        let where = 'td:nth-of-type(' + i + ')';
        document.querySelector(where).innerHTML = car;
        i = i + 1;
    });
});
console.log(possies)
let rand = '';
let randnum = '';
let setid = '';
let countfir = poolfir.length;
document.querySelector('td:nth-of-type(1)').innerHTML = countfir;
let countre = '';
let countall = '';
function set(){
    countall = poolall.length;
    countfir = poolfir.length;
    countre = poolre.length;
    if(rank == 0){
        if(countre > 0){
            rand = Math.floor(Math.random() * countre)
            randnum = poolre[rand];
        } else if(countfir > 0){
            rand = Math.floor(Math.random() * countfir)
            randnum = poolfir[rand];
        };
    } else if (rank == 1){
        if(countfir > 0){
            rand = Math.floor(Math.random() * countfir)
            randnum = poolfir[rand];
        } else if(countre > 0){
            rand = Math.floor(Math.random() * countre)
            randnum = poolre[rand];
        };
    } else if (rank == 2){
        rand = Math.floor(Math.random() * countall)
        randnum = poolall[rand];
    }
    document.getElementById('en').innerHTML = ens[randnum].innerHTML;
    document.getElementById('jp').innerHTML = jps[randnum].innerHTML;
    document.getElementById('bar').style.transition = 'all linear ' + speed + 's';
    document.getElementById('bar').style.left = '-100%';
    document.getElementById('jp').style.transition = 'all 0s ' + speed + 's';
    document.getElementById('jp').style.visibility = 'visible';
    document.getElementById('jp').style.opacity = '1';
    setid = setTimeout(() => {
        document.getElementById('jp').style.transition = ''; 
        document.getElementById('bar').style.transition = ''; 
    }, speed * 1000);
};
function del(){
    if(rank == 0){
        if(countre > 0){
            poolre.splice(rand,1);
        } else if(countfir > 0){
            poolfir.splice(rand,1);
        };
    } else if (rank == 1){
        if(countfir > 0){
            poolfir.splice(rand,1);
        } else if(countre > 0){
            poolre.splice(rand,1);
        };
    } else if (rank == 2){
        poolall.splice(rand,1);
    };
};
//スタート
document.getElementById('start').addEventListener('click',function(){
    document.getElementById('explain').style.display = 'none';
    setTimeout(() => {
        document.getElementById('countdown').innerHTML = '2';
        setTimeout(() => {
            document.getElementById('countdown').innerHTML = '1';
            setTimeout(() => {
                document.getElementById('countdown').style.display = 'none';
                set();
            }, 1000);
        }, 1000);
    }, 1000);
});
//思い出せた
var onoff = 'off';
document.getElementById('yes').addEventListener('click',function(){
    if(document.getElementById('jp').style.transition !== '' && onoff == 'off'){
        clearTimeout(setid);
        document.getElementById('jp').style.transition = ''; 
        document.getElementById('bar').style.transition = ''; 
    } else if(onoff == 'off'){
        save();
        document.getElementById('enbox').style.left = '100%';
        document.getElementById('bar').style.transition = ''; 
        document.getElementById('bar').style.left = ''; 
        document.getElementById('jp').style.visibility = '';
        document.getElementById('jp').style.opacity = '';
        onoff = 'on';
        setTimeout(() => {
            document.getElementById('enbox').style.transition = 'all 0s';
            document.getElementById('enbox').style.left = '';
            document.getElementById('enbox').style.top = '-100px';
            if(next == '0'){
                let where = 'td:nth-of-type(' + (Number(defs.indexOf(Number(rest[randnum].innerHTML))) + 2) + ')';
                if(rest[randnum].innerHTML == '-'){
                    rest[randnum].innerHTML = 1;
                } else if (Number(rest[randnum].innerHTML) <= Number(defs[4])){
                    rest[randnum].innerHTML = defs[defs.indexOf(Number(rest[randnum].innerHTML)) + 1];
                };
                document.querySelector(where).innerHTML = document.querySelector(where).innerHTML - 1;
            };
            del();
            set();
            document.querySelector('td:nth-of-type(1)').innerHTML = countfir;
            spent[randnum].innerHTML = '0';
        }, 250);
        setTimeout(() => {
            document.getElementById('enbox').style.transition = '';
            document.getElementById('enbox').style.top = '';
        }, 350);
        setTimeout(() => {
            onoff = 'off';
        }, 600);
    };
});

//思い出せなかった
document.getElementById('no').addEventListener('click',function(){
    if(document.getElementById('jp').style.transition !== '' && onoff == 'off'){
        clearTimeout(setid);
        document.getElementById('jp').style.transition = ''; 
        document.getElementById('bar').style.transition = ''; 
    } else if(onoff == 'off'){
        save();
        document.getElementById('enbox').style.left = '-100%';
        document.getElementById('bar').style.transition = ''; 
        document.getElementById('bar').style.left = ''; 
        document.getElementById('jp').style.visibility = '';
        document.getElementById('jp').style.opacity = '';
        onoff = 'on';
        setTimeout(() => {
            document.getElementById('enbox').style.transition = 'all 0s';
            document.getElementById('enbox').style.left = '';
            document.getElementById('enbox').style.top = '-100px';
            if(next == '0'){
                let where = 'td:nth-of-type(' + (Number(defs.indexOf(Number(rest[randnum].innerHTML))) + 2) + ')';
                if(rest[randnum].innerHTML == '-'){
                    rest[randnum].innerHTML = 1;
                } else if (Number(rest[randnum].innerHTML) <= Number(defs[4])){
                    rest[randnum].innerHTML = defs[defs.indexOf(Number(rest[randnum].innerHTML)) - 1];
                };
                document.querySelector(where).innerHTML = document.querySelector(where).innerHTML - 1;
            };
            del();
            set();
            document.querySelector('td:nth-of-type(1)').innerHTML = countfir;
            spent[randnum].innerHTML = '0';
        }, 250);
        setTimeout(() => {
            document.getElementById('enbox').style.transition = '';
            document.getElementById('enbox').style.top = '';
        }, 350);
        setTimeout(() => {
            onoff = 'off';
        }, 600);
    };
});

//Cookie保存
function save(){
    ngslspent1 = '';
    ngslspent2 = '';
    spent.forEach(function(car){
        let dar = car.innerHTML;
        if(dar >= 10 && dar !== '-'){
            dar = [...dar];
            ngslspent1 = ngslspent1 + dar[0];
            ngslspent2 = ngslspent2 + dar[1];
        } else {
            ngslspent1 = ngslspent1 + '0';
            ngslspent2 = ngslspent2 + dar;
        };
    });
    ngsldef = '';
    rest.forEach(function(car){
        if(car.innerHTML == '-'){
            ngsldef = ngsldef + '-';
        } else if (car.innerHTML == 1){
            ngsldef = ngsldef + '0';
        } else if (car.innerHTML == 3){
            ngsldef = ngsldef + '1';
        } else if (car.innerHTML == 7){
            ngsldef = ngsldef + '2';
        } else if (car.innerHTML == 14){
            ngsldef = ngsldef + '3';
        } else if (car.innerHTML == 30){
            ngsldef = ngsldef + '4';
        } else if (car.innerHTML == 60){
            ngsldef = ngsldef + '5';
        };
    });

    document.cookie = 'ngslspent1=' + ngslspent1;' max-age=31536000';
    document.cookie = 'ngslspent2=' + ngslspent2;' max-age=31536000';
    document.cookie = 'ngsldef=' + ngsldef;' max-age=31536000';
}

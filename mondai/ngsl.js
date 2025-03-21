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
let rank = '';
let ban = '';
let next = [1,3,7,14,30,60];
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
    } else if (content[0] == 'swi'){
        swi = content[1];
    } else if (content[0] == 'next'){
        next = content[1];
    } else if (content[0] == 'ngsldef'){
        ngsldef = content[1];
    } else if (content[0] == 'rank'){
        rank = content[1];
    } else if (content[0] == 'ban'){
        ban = content[1];
    };
});

//Cookieの初回設定
if(speed == ''){
    speed = '4';
};
if(swi == ''){
    swi = '0';
};
//前回訪問からの経過日 実験中！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
let today = new Date;
let sub = '';
if(day !== ''){
    day = day.split('a');
    sub = (new Date(today.getFullYear(),(Number(today.getMonth()) + 1),today.getDate()) - new Date(day[0],day[1],day[2])) / 86400000;
} else {
    sub = 0;
};
sub = 99;
//spent適応
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
document.cookie = 'day=' + today.getFullYear() + 'a' + (Number(today.getMonth()) + 1) + 'a' + today.getDate();' max-age=31536000';
//next適応
if(typeof next == 'string'){
    next = next.split('a');
    next.shift();
    for(let i = 0; i <= 5; i++){
        next[i] = Number(next[i]);
    };
};
//rest適応
rest = document.querySelectorAll('.word>div:nth-of-type(4)');
if(ngsldef !== ''){
    ngsldef = [...ngsldef];
    let i = 0;
    rest.forEach(function(car){
        let element = car;
        if(ngsldef[i] == '-'){
            element.innerHTML = ngsldef[i];
        } else {
            element.innerHTML = next[ngsldef[i]];
        };
        i = i + 1;
    });
}
//chose適応
if(rank !== ''){
    if(rank <= 6){
        let where = '#upper>td:nth-of-type(' + (Number(rank) + 1) + ')';
        document.querySelector(where).style.background = 'gray';
    } else {
        let where = '#lower>td:nth-of-type(' + (Number(rank) - 5) + ')';
        document.querySelector(where).style.background = 'gray';
    };
}
//出題
ens = document.querySelectorAll('.word>div:nth-of-type(1)');
jps = document.querySelectorAll('.word>div:nth-of-type(2)');
let possies = [[0,[]],[0,[]],[0,[]],[0,[]],[0,[]],[0,[]],[0,[]],[0,[]],[0,[]],[0,[]],[0,[]],[0,[]],[0,[]]];
let a = 0;
spent.forEach(function(car){
    if(car.innerHTML == '-'){
        possies[0][0] = possies[0][0] + 1;
        possies[0][1].push(a);
    } else if (Number(car.innerHTML) >= Number(rest[a].innerHTML)){
        let i = Number(next.indexOf(Number(rest[a].innerHTML))) + 1;
        possies[i][0] = possies[i][0] + 1;
        possies[i][1].push(a);
    } else {
        let i = Number(next.indexOf(Number(rest[a].innerHTML))) + 7;
        possies[i][0] = possies[i][0] + 1;
        possies[i][1].push(a);
    };
    a = a + 1;
    let i = 1;
    possies.forEach(function(car){
        if(i <= 7){
            let where = '#upper>td:nth-of-type(' + i + ')';
            document.querySelector(where).innerHTML = car[0];
        } else {
            let where = '#lower>td:nth-of-type(' + (i - 6) + ')';
            document.querySelector(where).innerHTML = car[0];
        };
        i = i + 1;
    });
});
let rand = '';
let randnum = '';
let setid = '';
let key = '';
function set(){
    if(rank == ''){
        key = 0;
        for(let i = 1; i <= 6; i++){
            if(possies[i][0] > 0){
                rand = Math.floor(Math.random() * possies[i][0])
                randnum = possies[i][1][rand];
                key = i;
                i = 99;
            };
        };
        if(key == 0){
            if(possies[0][0] > 0){
                rand = Math.floor(Math.random() * possies[0][0])
                randnum = possies[0][1][rand];
            } else {
                key = '';
            };
        };
    } else {
        key = 0;
        if(possies[rank][0] > 0){
            rand = Math.floor(Math.random() * possies[rank][0])
            randnum = possies[rank][1][rand];
        } else {
            key = '';
        }
    };
    if(key !== ''){
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
    } else {
        document.getElementById('en').innerHTML = 'finish';
        document.getElementById('jp').innerHTML = '';
    };
};
function del(){
    if(rank == ''){
        possies[key][0] = possies[key][0] - 1;
        possies[key][1].splice(rand,1);
    } else {
        possies[rank][0] = possies[rank][0] - 1;
        possies[rank][1].splice(rand,1);
    };
};
//choose
let arr = Array.from(document.querySelectorAll('td'))
arr.splice(7,1);
arr.forEach(function(car){
    car.addEventListener('click',function(){
        arr.forEach(function(dar){
            let element = dar;
            element.style.background = '';
        });
        let element = car;
        if(rank != arr.indexOf(car) || rank == ''){
            element.style.background = 'gray';
            document.cookie = 'rank=' + arr.indexOf(car);' max-age=31536000';
        } else {
            element.style.background = '';
            document.cookie = 'rank=';' max-age=0';
        }
        window.location.reload();
    });
});
//list絞り込み
let parents = document.querySelectorAll('.word');
if(rank !== ''){
    parents.forEach(function(car){
        car.style.display = 'none';
    });
    possies[rank][1].forEach(function(car){
        parents[car].style.display = '';
    });
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
    if(key !== ''){
        if(document.getElementById('jp').style.transition !== '' && onoff == 'off'){
            clearTimeout(setid);
            document.getElementById('jp').style.transition = ''; 
            document.getElementById('bar').style.transition = ''; 
        } else if(onoff == 'off'){
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
                if(rank <= 6 || rank == ''){
                    if(rank == ''){
                        arr[key].innerHTML = arr[key].innerHTML - 1;
                        let lowkey = key + 7;
                        if(lowkey == 13){
                            lowkey = 12;
                        };
                        if(ban == 0 && key == 0){
                            lowkey = 12;
                        };
                        arr[lowkey].innerHTML = Number(arr[lowkey].innerHTML) + 1;
                    } else {
                        arr[rank].innerHTML = arr[rank].innerHTML - 1;
                        let lowrank = Number(rank) + 7;
                        if(lowrank == 13){
                            lowrank = 12;
                        };
                        if(ban == 0 && rank == 0){
                            lowrank = 12;
                        };
                        arr[lowrank].innerHTML = Number(arr[lowrank].innerHTML) + 1;
                        parents[randnum].style.display = 'none';
                    };
                    if(rest[randnum].innerHTML == '-'){
                        rest[randnum].innerHTML = 1;
                    }else if (Number(rest[randnum].innerHTML) <= Number(next[4])){
                        rest[randnum].innerHTML = next[next.indexOf(Number(rest[randnum].innerHTML)) + 1];
                    };
                    spent[randnum].innerHTML = '0';
                    del();
                }
                set();
                save();
            }, 250);
            setTimeout(() => {
                document.getElementById('enbox').style.transition = '';
                document.getElementById('enbox').style.top = '';
            }, 350);
            setTimeout(() => {
                onoff = 'off';
            }, 600);
        };
    }
});
//思い出せなかった
document.getElementById('no').addEventListener('click',function(){
    if(key !== ''){
        if(document.getElementById('jp').style.transition !== '' && onoff == 'off'){
            clearTimeout(setid);
            document.getElementById('jp').style.transition = ''; 
            document.getElementById('bar').style.transition = ''; 
        } else if(onoff == 'off'){
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
                if(rank <= 6 || rank == ''){
                    if(rank == ''){
                        arr[key].innerHTML = arr[key].innerHTML - 1;
                        let lowkey = key + 6;
                        if(lowkey == 6){
                            lowkey = 7;
                        };
                        arr[lowkey].innerHTML = Number(arr[lowkey].innerHTML) + 1;
                    } else {
                        arr[rank].innerHTML = arr[rank].innerHTML - 1;
                        let lowrank = Number(rank) + 6;
                        if(lowrank == 6){
                            lowrank = 7;
                        };
                        arr[lowrank].innerHTML = Number(arr[lowrank].innerHTML) + 1;
                        parents[randnum].style.display = 'none';
                    };
                    if(rest[randnum].innerHTML == '-'){
                        rest[randnum].innerHTML = 1;
                    };
                    spent[randnum].innerHTML = '0';
                    del();
                };
                set();
                save();
            }, 250);
            setTimeout(() => {
                document.getElementById('enbox').style.transition = '';
                document.getElementById('enbox').style.top = '';
            }, 350);
            setTimeout(() => {
                onoff = 'off';
            }, 600);
        };
    }
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
        } else if (car.innerHTML == next[0]){
            ngsldef = ngsldef + '0';
        } else if (car.innerHTML == next[1]){
            ngsldef = ngsldef + '1';
        } else if (car.innerHTML == next[2]){
            ngsldef = ngsldef + '2';
        } else if (car.innerHTML == next[3]){
            ngsldef = ngsldef + '3';
        } else if (car.innerHTML == next[4]){
            ngsldef = ngsldef + '4';
        } else if (car.innerHTML == next[5]){
            ngsldef = ngsldef + '5';
        };
    });

    document.cookie = 'ngslspent1=' + ngslspent1;' max-age=31536000';
    document.cookie = 'ngslspent2=' + ngslspent2;' max-age=31536000';
    document.cookie = 'ngsldef=' + ngsldef;' max-age=31536000';
}

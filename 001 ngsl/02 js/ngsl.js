let ens = [];
let jps = [];
let spent = [];
let spentv = [];
let rest = [];
let day = '';
let ngslspent1 = '';
let ngslspent2 = '';
let speed = 4;
let swi = 0;
let rank = '';
let forb = 1;
let ban = 0;
let next = [1,3,7,14,30,60];
let ngsldef = '';
let a = 0;
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
    } else if (content[0] == 'forb'){
        forb = content[1];
    } else if (content[0] == 'ban'){
        ban = content[1];
    };
    if(content[0] !== ''){
        document.cookie = content[0] + '=' + content[1];' max-age=31536000';
    }
});


//前回訪問からの経過日
let today = new Date;
let sub = '';
if(day !== ''){
    day = day.split('a');
    sub = (new Date(today.getFullYear(),(Number(today.getMonth()) + 1),today.getDate()) - new Date(day[0],day[1],day[2])) / 86400000;
} else {
    sub = 0;
};
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
if(rank !== ''){
    if(rank == 0){
        document.getElementById('rank').innerHTML = '未出題'
    } else if (rank <= 6){
        document.getElementById('rank').innerHTML = '復習(' + next[Number(rank) - 1] + '日経過)' 
    } else {
        document.getElementById('rank').innerHTML = '待機中(' + next[Number(rank) - 7] + '日)'
    }
}
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
};
//chose適応
if(rank !== ''){
    if(rank <= 6){
        let where = '#upper>td:nth-of-type(' + (Number(rank) + 1) + ')';
        document.querySelector(where).style.background = 'gray';
    } else {
        let where = '#lower>td:nth-of-type(' + (Number(rank) - 5) + ')';
        document.querySelector(where).style.background = 'gray';
    };
};
a = 0;
document.querySelectorAll('.nows').forEach(function(car){
    car.innerHTML = next[a] + 'd';
    a = a + 1;
})
//復習なし
if(swi == 1){
    document.getElementById('possi').style.display = 'none';
    rank = '';
};

//出題
ens = document.querySelectorAll('.word>div:nth-of-type(1)');
jps = document.querySelectorAll('.word>div:nth-of-type(2)');
let possies = [[0,[]],[0,[]],[0,[]],[0,[]],[0,[]],[0,[]],[0,[]],[0,[]],[0,[]],[0,[]],[0,[]],[0,[]],[0,[]]];
a = 0;
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
let key = 0;
let mp3file = '';
let voice = '';
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
        if(Number(randnum) < 1000){
            mp3file = 'voice ~1000/' + document.getElementById('en').innerHTML + '.mp3';
        } else if (Number(randnum) < 2000){
            mp3file = 'voice ~2000/' + document.getElementById('en').innerHTML + '.mp3';
        } else if (Number(randnum) < 3000){
            mp3file = 'voice ~3000/' + document.getElementById('en').innerHTML + '.mp3';
        };
        voice = new Audio(mp3file);
        setTimeout(() => {
            voice.play();
        }, 300);
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
function list(){
    document.getElementById('en').innerHTML = ens[possies[rank][1][key]].innerHTML;
    document.getElementById('jp').innerHTML = jps[possies[rank][1][key]].innerHTML;
    document.getElementById('bar').style.transition = 'all linear ' + speed + 's';
    document.getElementById('bar').style.left = '-100%';
    document.getElementById('jp').style.transition = 'all 0s ' + speed + 's';
    document.getElementById('jp').style.visibility = 'visible';
    document.getElementById('jp').style.opacity = '1';
    setid = setTimeout(() => {
        document.getElementById('jp').style.transition = ''; 
        document.getElementById('bar').style.transition = ''; 
    }, speed * 1000);
    if(Number(randnum) < 1000){
        mp3file = 'voice ~1000/' + document.getElementById('en').innerHTML + '.mp3';
    } else if (Number(randnum) < 2000){
        mp3file = 'voice ~2000/' + document.getElementById('en').innerHTML + '.mp3';
    } else if (Number(randnum) < 3000){
        mp3file = 'voice ~3000/' + document.getElementById('en').innerHTML + '.mp3';
    };
    voice = new Audio(mp3file);
    setTimeout(() => {
        voice.play();
    }, 300);
};
function listall(){
    rand = Math.floor(Math.random() * ens.length);
    document.getElementById('en').innerHTML = ens[rand].innerHTML;
    document.getElementById('jp').innerHTML = jps[rand].innerHTML;
    document.getElementById('bar').style.transition = 'all linear ' + speed + 's';
    document.getElementById('bar').style.left = '-100%';
    document.getElementById('jp').style.transition = 'all 0s ' + speed + 's';
    document.getElementById('jp').style.visibility = 'visible';
    document.getElementById('jp').style.opacity = '1';
    setid = setTimeout(() => {
        document.getElementById('jp').style.transition = ''; 
        document.getElementById('bar').style.transition = ''; 
    }, speed * 1000);
    if(Number(rand) < 1000){
        mp3file = 'voice ~1000/' + document.getElementById('en').innerHTML + '.mp3';
    } else if (Number(rand) < 2000){
        mp3file = 'voice ~2000/' + document.getElementById('en').innerHTML + '.mp3';
    } else if (Number(rand) < 3000){
        mp3file = 'voice ~3000/' + document.getElementById('en').innerHTML + '.mp3';
    };
    voice = new Audio(mp3file);
    setTimeout(() => {
        voice.play();
    }, 300);
}

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
//ボタン変更
if(rank >= 7){
    document.getElementById('yes').innerHTML = '次の単語';
    document.getElementById('no').innerHTML = '前の単語';
};
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
    document.getElementById('front').style.display = 'none';
    setTimeout(() => {
        document.getElementById('countdown').innerHTML = '2';
        setTimeout(() => {
            document.getElementById('countdown').innerHTML = '1';
            setTimeout(() => {
                document.getElementById('countdown').style.display = 'none';
                if(swi == 1){
                    listall();
                } else if (rank >= 7){
                    list();
                } else {
                    set();
                };
            }, 1000);
        }, 1000);
    }, 1000);
});
//音声再生
document.getElementById('playaudio').addEventListener('click',function(){
    voice.play();
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
            if(rank >= 7){
                document.getElementById('enbox').style.top = '240px';
            } else {
                document.getElementById('enbox').style.left = '100%';
            };
            document.getElementById('bar').style.transition = ''; 
            document.getElementById('bar').style.left = ''; 
            document.getElementById('jp').style.visibility = '';
            document.getElementById('jp').style.opacity = '';
            onoff = 'on';
            setTimeout(() => {
                document.getElementById('enbox').style.transition = 'all 0s';
                if(rank >= 7){
                    document.getElementById('enbox').style.top = '';
                } else {
                    document.getElementById('enbox').style.left = '';
                };
                document.getElementById('enbox').style.top = '-100px';
                if(swi == 0){
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
                            if(ban == 0){
                                rest[randnum].innerHTML = next[5];
                            } else {
                                rest[randnum].innerHTML = next[0];
                            }
                        }else if (Number(rest[randnum].innerHTML) <= Number(next[4])){
                            rest[randnum].innerHTML = next[next.indexOf(Number(rest[randnum].innerHTML)) + 1];
                        };
                        spent[randnum].innerHTML = '0';
                        del();
                        set();
                        save();
                    } else {
                        key = key + 1;
                        if(key == possies[rank][0]){
                            key = 0;
                        };
                        list();
                    };
                } else {
                    listall();
                }
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
            if(rank >= 7){
                document.getElementById('enbox').style.top = '-100px';
            } else {
                document.getElementById('enbox').style.left = '-100%';
            };
            document.getElementById('bar').style.transition = ''; 
            document.getElementById('bar').style.left = ''; 
            document.getElementById('jp').style.visibility = '';
            document.getElementById('jp').style.opacity = '';
            onoff = 'on';
            setTimeout(() => {
                document.getElementById('enbox').style.transition = 'all 0s';
                if(rank >= 7){
                    document.getElementById('enbox').style.top = '';
                } else {
                    document.getElementById('enbox').style.left = '';
                };
                if(rank >= 7){
                    document.getElementById('enbox').style.top = '240px';
                } else {
                    document.getElementById('enbox').style.top = '-100px';
                };
                if(swi == 0){
                    if(rank <= 6 || rank == ''){
                        if(rank == ''){
                            arr[key].innerHTML = arr[key].innerHTML - 1;
                            let lowkey = key + 6;
                            if(forb == 0){
                                lowkey = lowkey - 1;
                            } else if (forb == 2){
                                lowkey = lowkey + 1;
                            }
                            if(lowkey == 6){
                                lowkey = 7;
                            } else if (lowkey == 13){
                                lowkey = 12;
                            };
                            arr[lowkey].innerHTML = Number(arr[lowkey].innerHTML) + 1;
                        } else {
                            arr[rank].innerHTML = arr[rank].innerHTML - 1;
                            let lowrank = Number(rank) + 6;
                            if(forb == 0){
                                lowrank = lowrank - 1;
                            } else if (forb == 2){
                                lowrank = lowrank + 1;
                            }
                            if(lowrank == 6){
                                lowrank = 7;
                            } else if (lowrank == 13){
                                lowrank = 12;
                            };
                            arr[lowrank].innerHTML = Number(arr[lowrank].innerHTML) + 1;
                            parents[randnum].style.display = 'none';
                        };
                        if(rest[randnum].innerHTML == '-'){
                            rest[randnum].innerHTML = next[0];
                        };
                        spent[randnum].innerHTML = '0';
                        del();
                        set();
                        save();
                    } else {
                        key = key - 1;
                        if(key == -1){
                            key = possies[rank][0] - 1;
                        };
                        list();
                    };
                } else {
                    listall();
                }
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

//使い方
let o = 0;
document.getElementById('howto').addEventListener('click',function(){
    document.getElementById('close').style.display = 'block';
    document.getElementById('expic').style.display = 'block';
    document.getElementById('paper').style.display = 'block';
    document.getElementById('cover').style.display = 'block';
    document.getElementById('grayback').style.height = document.documentElement.scrollHeight + 'px';
    setTimeout(() => {
        o = 1;
    }, 300);
});
document.querySelector('#close>span').addEventListener('click',function(){
    document.getElementById('grayback').style.height = '';
    document.getElementById('cover').style.display = '';
    document.getElementById('paper').style.display = '';
    document.getElementById('expic').style.display = '';
    document.getElementById('close').style.display = '';
    o = 0;
});
//open
document.getElementById('cover').addEventListener('click',function(){
    if(o == 1){
        document.getElementById('paper').style.right = '0px';
        document.getElementById('cover').style.display = 'none';
    };
});
document.querySelector('body').addEventListener('click',function(event){
    if(event.target.getAttribute('id') !== 'cover' && event.target.getAttribute('id') !== 'paper'){
        document.getElementById('paper').style.right = '';
        setTimeout(() => {
            if(o == 1){
                document.getElementById('cover').style.display = 'block';
            };
        }, 300);
    };
});
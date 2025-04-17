let ens = [];
let jps = [];
let spent = [];
let spentv = [];
let count = [];
let countv = [];
let rest = [];
let day = '';
let spent_c1 = '';
let spent_c2 = '';
let count_c1 = '';
let count_c2 = '';
let speed = 4;
let swi = 0;
let rank = '';
let forb = 1;
let ban = 0;
let next = [1,3,7,14,30,60];
let rest_c = '';
let a = 0;
let cookies = document.cookie;
console.log(cookies);
let cookieslist = cookies.split(';');
//Cookie仕分け
let extend = '';
cookieslist.forEach(function(car){
    extend = '';
    let content = car.split('=');
    content[0] = content[0].trim();
    if(content[0] == 'day'){
        day = content[1];
        extend = 'on';
    } else if (content[0] == 'spent_c1'){
        spent_c1 = content[1];
        extend = 'on';
    } else if (content[0] == 'spent_c2'){
        spent_c2 = content[1];
        extend = 'on';
    } else if (content[0] == 'count_c1'){
        count_c1 = content[1];
        extend = 'on';
    } else if (content[0] == 'count_c2'){
        count_c2 = content[1];
        extend = 'on';
    } else if (content[0] == 'speed'){
        speed = content[1];
        extend = 'on';
    } else if (content[0] == 'swi'){
        swi = content[1];
        extend = 'on';
    } else if (content[0] == 'next'){
        next = content[1];
        extend = 'on';
    } else if (content[0] == 'rest_c'){
        rest_c = content[1];
        extend = 'on';
    } else if (content[0] == 'rank'){
        rank = content[1];
        extend = 'on';
    } else if (content[0] == 'forb'){
        forb = content[1];
        extend = 'on';
    } else if (content[0] == 'ban'){
        ban = content[1];
        extend = 'on';
    };
    if(content[0] !== ''){
        if(extend = 'on'){
            document.cookie = content[0] + '=' + content[1] + '; max-age=31536000';
        } else {
            document.cookie = content[0] + '=; max-age=0';
        };
    };
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
if(spent_c1 !== '' && spent_c2 !== ''){
    spent_c1 = [...spent_c1];
    spent_c2 = [...spent_c2];
    let i = 0;
    spent_c1.forEach(function(car){
        if(spent_c2[i] !== '-'){
            let past = (Number(car) * 10) + Number(spent_c2[i]) + Number(sub);
            if(past > 99){
                past = '99';
            };
            spentv.push(past);
        } else {
            spentv.push(spent_c2[i]);
        };
        spent[i].innerHTML = spentv[i];
        i = i + 1;
    });
};
document.cookie = 'day=' + today.getFullYear() + 'a' + (Number(today.getMonth()) + 1) + 'a' + today.getDate() + '; max-age=31536000';
//next,rest適応
if(typeof next == 'string'){
    next = next.split('a');
    next.shift();
    for(let i = 0; i <= 5; i++){
        next[i] = Number(next[i]);
    };
};
if(rank !== ''){
    if(rank == 0){
        document.getElementById('rank').innerHTML = '未出題';
    } else if (rank <= 6){
        document.getElementById('rank').innerHTML = '復習(' + next[Number(rank) - 1] + '日前)';
    } else {
        document.getElementById('rank').innerHTML = '待機中(' + next[Number(rank) - 7] + '日後)';
    }
}
rest = document.querySelectorAll('.word>div:nth-of-type(4)');
if(rest_c !== ''){
    rest_c = [...rest_c];
    let i = 0;
    rest.forEach(function(car){
        let element = car;
        if(rest_c[i] == '-'){
            element.innerHTML = rest_c[i];
        } else {
            element.innerHTML = next[rest_c[i]];
        };
        i = i + 1;
    });
};
//count適応
count = document.querySelectorAll('.word>div:nth-of-type(5)');
if(count_c1 !== '' && count_c2 !== ''){
    count_c1 = [...count_c1];
    count_c2 = [...count_c2];
    let i = 0;
    count_c1.forEach(function(car){
        let past = (Number(car) * 10) + Number(count_c2[i]);
        countv.push(past);
        count[i].innerHTML = countv[i]
        i = i + 1;
    });
};
//いったんセーブ(spentの経過をCookieに記録するため)
save();
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
        if(spent[randnum].innerHTML == '-'){
            document.getElementById('dis_spent').innerHTML = '初出題';
            document.getElementById('dis_count').innerHTML = '';
        } else if (spent[randnum].innerHTML == '0'){
            document.getElementById('dis_spent').innerHTML = '前回：今日';
            document.getElementById('dis_count').innerHTML = '累計：' + count[randnum].innerHTML + '回';
        } else {
            document.getElementById('dis_spent').innerHTML = '前回：' + spent[randnum].innerHTML + '日前';
            document.getElementById('dis_count').innerHTML = '累計：' + count[randnum].innerHTML + '回';
        };
        document.getElementById('bar').style.transition = 'all linear ' + speed + 's';
        document.getElementById('bar').style.left = '-100%';
        document.getElementById('jp').style.transition = 'all 0s ' + speed + 's';
        document.getElementById('jp').style.visibility = 'visible';
        document.getElementById('jp').style.opacity = '1';
        setid = setTimeout(() => {
            document.getElementById('jpbox').style.background = 'transparent'; 
            document.getElementById('jp').style.transition = ''; 
            document.getElementById('bar').style.transition = ''; 
        }, speed * 1000);
        if(Number(randnum) < 1000){
            mp3file = '../audio/' + document.getElementById('id').innerHTML + ' voice ~1000/' + document.getElementById('en').innerHTML + '.mp3';
        } else if (Number(randnum) < 2000){
            mp3file = '../audio/' + document.getElementById('id').innerHTML + ' voice ~2000/' + document.getElementById('en').innerHTML + '.mp3';
        } else if (Number(randnum) < 3000){
            mp3file = '../audio/' + document.getElementById('id').innerHTML + ' voice ~3000/' + document.getElementById('en').innerHTML + '.mp3';
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
function check(){
    document.getElementById('en').innerHTML = ens[possies[rank][1][key]].innerHTML;
    document.getElementById('jp').innerHTML = jps[possies[rank][1][key]].innerHTML;
    if (spent[possies[rank][1][key]].innerHTML == '0'){
        document.getElementById('dis_spent').innerHTML = '前回：今日';
        document.getElementById('dis_count').innerHTML = '累計：' + count[possies[rank][1][key]].innerHTML + '回';
    } else {
        document.getElementById('dis_spent').innerHTML = '前回：' + spent[possies[rank][1][key]].innerHTML + '日前';
        document.getElementById('dis_count').innerHTML = '累計：' + count[possies[rank][1][key]].innerHTML + '回';
    };
    document.getElementById('bar').style.transition = 'all linear ' + speed + 's';
    document.getElementById('bar').style.left = '-100%';
    document.getElementById('jp').style.transition = 'all 0s ' + speed + 's';
    document.getElementById('jp').style.visibility = 'visible';
    document.getElementById('jp').style.opacity = '1';
    setid = setTimeout(() => {
        document.getElementById('jpbox').style.background = 'transparent'; 
        document.getElementById('jp').style.transition = ''; 
        document.getElementById('bar').style.transition = ''; 
    }, speed * 1000);
    if(Number(possies[rank][1][key]) < 1000){
        mp3file = '../audio/' + document.getElementById('id').innerHTML + ' voice ~1000/' + document.getElementById('en').innerHTML + '.mp3';
    } else if (Number(possies[rank][1][key]) < 2000){
        mp3file = '../audio/' + document.getElementById('id').innerHTML + ' voice ~2000/' + document.getElementById('en').innerHTML + '.mp3';
    } else if (Number(possies[rank][1][key]) < 3000){
        mp3file = '../audio/' + document.getElementById('id').innerHTML + ' voice ~3000/' + document.getElementById('en').innerHTML + '.mp3';
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
        document.getElementById('jpbox').style.background = 'transparent'; 
        document.getElementById('jp').style.transition = ''; 
        document.getElementById('bar').style.transition = ''; 
    }, speed * 1000);
    if(Number(rand) < 1000){
        mp3file = '../audio/' + document.getElementById('id').innerHTML + ' voice ~1000/' + document.getElementById('en').innerHTML + '.mp3';
    } else if (Number(rand) < 2000){
        mp3file = '../audio/' + document.getElementById('id').innerHTML + ' voice ~2000/' + document.getElementById('en').innerHTML + '.mp3';
    } else if (Number(rand) < 3000){
        mp3file = '../audio/' + document.getElementById('id').innerHTML + ' voice ~3000/' + document.getElementById('en').innerHTML + '.mp3';
    };
    voice = new Audio(mp3file);
    setTimeout(() => {
        voice.play();
    }, 300);
}
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
            document.cookie = 'rank=' + arr.indexOf(car) + '; max-age=31536000';
        } else {
            element.style.background = '';
            document.cookie = 'rank=' + '; max-age=0';
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
                    check();
                } else {
                    set();
                };
            }, 900);
        }, 900);
    }, 900);
});
//音声再生
document.getElementById('playaudio').addEventListener('click',function(){
    voice.play();
});
//思い出せた
document.getElementById('yes').addEventListener('click',function(){
    if(key !== '' && rest_time == 'off' && document.getElementById('bar').style.transition == ''){
        if(rank >= 7){
            document.getElementById('enbox').style.top = '240px';
        } else {
            document.getElementById('enbox').style.left = '100%';
        };
        document.getElementById('bar').style.transition = ''; 
        document.getElementById('bar').style.left = ''; 
        document.getElementById('jpbox').style.background = '';
        document.getElementById('jp').style.visibility = '';
        document.getElementById('jp').style.opacity = '';
        rest_time = 'on';
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
                    if(Number(count[randnum].innerHTML) < 99){
                        count[randnum].innerHTML = Number(count[randnum].innerHTML) + 1;
                    };
                    del();
                    set();
                    save();
                } else {
                    key = key + 1;
                    if(key == possies[rank][0]){
                        key = 0;
                    };
                    check();
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
            rest_time = 'off';
        }, 600);
    }
});
//思い出せなかった
document.getElementById('no').addEventListener('click',function(){
    if(key !== '' && rest_time == 'off' && document.getElementById('bar').style.transition == ''){
        if(rank >= 7){
            document.getElementById('enbox').style.top = '-100px';
        } else {
            document.getElementById('enbox').style.left = '-100%';
        };
        document.getElementById('bar').style.transition = ''; 
        document.getElementById('bar').style.left = ''; 
        document.getElementById('jpbox').style.background = '';
        document.getElementById('jp').style.visibility = '';
        document.getElementById('jp').style.opacity = '';
        rest_time = 'on';
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
                    if(Number(count[randnum].innerHTML) < 99){
                        count[randnum].innerHTML = Number(count[randnum].innerHTML) + 1;
                    };
                    del();
                    set();
                    save();
                } else {
                    key = key - 1;
                    if(key == -1){
                        key = possies[rank][0] - 1;
                    };
                    check();
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
            rest_time = 'off';
        }, 600);  
    };
});
//skip
var rest_time = 'off';
document.getElementById('jpbox').addEventListener('click',function(){
    if(rest_time == 'off'){
        clearTimeout(setid);
        document.getElementById('jpbox').style.background = 'transparent'; 
        document.getElementById('jp').style.transition = ''; 
        document.getElementById('bar').style.transition = '';
    };
});
document.getElementById('yes').addEventListener('click',function(){
    if(rest_time == 'off'){
        clearTimeout(setid);
        document.getElementById('jpbox').style.background = 'transparent'; 
        document.getElementById('jp').style.transition = ''; 
        document.getElementById('bar').style.transition = '';
    };
});
document.getElementById('no').addEventListener('click',function(){
    if(rest_time == 'off'){
        clearTimeout(setid);
        document.getElementById('jpbox').style.background = 'transparent'; 
        document.getElementById('jp').style.transition = ''; 
        document.getElementById('bar').style.transition = '';
    };
});

//Cookie保存
function save(){
    spent_c1 = '';
    spent_c2 = '';
    spent.forEach(function(car){
        let dar = car.innerHTML;
        if(Number(dar) >= 10 && dar !== '-'){
            dar = [...dar];
            spent_c1 = spent_c1 + dar[0];
            spent_c2 = spent_c2 + dar[1];
        } else {
            spent_c1 = spent_c1 + '0';
            spent_c2 = spent_c2 + dar;
        };
    });
    count_c1 = '';
    count_c2 = '';
    count.forEach(function(car){
        let dar = car.innerHTML;
        if(Number(dar) >= 10){
            dar = [...dar];
            count_c1 = count_c1 + dar[0];
            count_c2 = count_c2 + dar[1];
        } else {
            count_c1 = count_c1 + '0';
            count_c2 = count_c2 + dar;
        };
    })
    rest_c = '';
    rest.forEach(function(car){
        if(car.innerHTML == '-'){
            rest_c = rest_c + '-';
        } else if (car.innerHTML == next[0]){
            rest_c = rest_c + '0';
        } else if (car.innerHTML == next[1]){
            rest_c = rest_c + '1';
        } else if (car.innerHTML == next[2]){
            rest_c = rest_c + '2';
        } else if (car.innerHTML == next[3]){
            rest_c = rest_c + '3';
        } else if (car.innerHTML == next[4]){
            rest_c = rest_c + '4';
        } else if (car.innerHTML == next[5]){
            rest_c = rest_c + '5';
        };
    });

    document.cookie = 'spent_c1=' + spent_c1 + '; max-age=31536000';
    document.cookie = 'spent_c2=' + spent_c2 + '; max-age=31536000';
    document.cookie = 'count_c1=' + count_c1 + '; max-age=31536000';
    document.cookie = 'count_c2=' + count_c2 + '; max-age=31536000';
    document.cookie = 'rest_c=' + rest_c + '; max-age=31536000';
}

//使い方
let o = 0;
document.getElementById('howto').addEventListener('click',function(){
    document.getElementById('close').style.display = 'block';
    document.getElementById('explain').style.display = 'block';
    document.getElementById('grayback').style.height = document.documentElement.scrollHeight + 'px';
});
document.querySelector('#close>span').addEventListener('click',function(){
    document.getElementById('grayback').style.height = '';
    document.getElementById('explain').style.display = '';
    document.getElementById('close').style.display = '';
});


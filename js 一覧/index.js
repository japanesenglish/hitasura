let ac1_1 = document.querySelector('#ac1>.c1');
let ac1_2 = document.querySelector('#ac1>.c2');
ac1_1.addEventListener('click',function(){
    if(!ac1_1.classList.contains('c3')){
        ac1_2.style.height = 100 + 'px';
        ac1_1.classList.toggle('c3');
    } else {
        ac1_2.style.height = '';
        ac1_1.classList.toggle('c3');
    };
});

let ac2_1 = document.querySelector('#ac2>.c1');
ac2_1.addEventListener('click',function(){
    if(!ac2_1.classList.contains('c2')){
        ac2_1.style.height = 100 + 'px';
        ac2_1.classList.toggle('c2');
    } else {
        ac2_1.style.height = '';
        ac2_1.classList.toggle('c2');
    };
});

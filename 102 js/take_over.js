//inport
let reader = new FileReader();
document.getElementById('import').addEventListener('change',function(event){
    let file = event.target.files[0];
    let mimeType = file.type;
    if (mimeType === 'text/plain') {
        reader.readAsText(file);
        reader.onload = function() {
            let cookies_in = reader.result;
            let cookieslist = cookies_in.split(';');
            if(cookieslist[0] == document.getElementById('kind').innerHTML){
                cookieslist.shift();
                cookieslist.forEach(function(car){
                    let content = car.split('=');
                    content[0] = content[0].trim();
                    document.cookie = content[0] + '=' + content[1] + '; max-age=31536000';
                    document.getElementById('result').innerHTML = '引継ぎ完了';
                })
            } else {
                document.getElementById('result').innerHTML = 'error：ファイルが適切ではありません。<br>ファイル内のテキストが' + document.getElementById('kind').innerHTML + ';から始まるものが対象です。';
            }
        };
    } else {
        document.getElementById('result').innerHTML = 'error：ファイルが適切ではありません。<br>txtファイルのみが対象です。';
    }
})

//export
const cookies = document.cookie;
const cookies_text = document.getElementById('kind').innerHTML + ';' + cookies;
document.getElementById('export').addEventListener('click',function(){
    const blob = new Blob([cookies_text],{type:"text/plain"});

    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);

    link.download = 'ひたすら英単語-引継ぎ（' + document.getElementById('kind').innerHTML + '）.txt';

    link.click();
});

document.getElementById('textdata').innerHTML = cookies_text;
const btn = document.getElementById('btn');

// コピー処理（btnがクリックされたらtxtをコピーする）
document.getElementById('copy').addEventListener('click', () => {
    if (!navigator.clipboard) {
        alert("error：このブラウザは対応していません<br>お手数ですが、手動でコピーをお願いします。");
        return;
    };
    navigator.clipboard.writeText(document.getElementById('textdata').textContent).then(
        () => {
        alert('コピー完了');
        },
        () => {
        alert('error：コピー失敗<br>お手数ですが、手動でコピーをお願いします。');
        });
});

document.getElementById('download').onclick = function(ev) {
    if (document.getElementById('avatar_img').src.indexOf('007VUoSNly8h6oz2e4hwtj30b40b4t8m')>-1) 
        return alert('请先点击”上传头像”再进行下载');

    var canvas = document.getElementById('cvs');
    var image = canvas.toDataURL("image/png")

    var save_link = document.createElement('a');
    save_link.href = image;
    save_link.download ='avatar.png';
                        
    var clickevent = document.createEvent('MouseEvents');
    clickevent.initEvent('click', true, false);
    save_link.dispatchEvent(clickevent);
}

document.getElementById('next').onclick = function(ev) {
    var current = parseInt(document.getElementById('avatar_template').alt);
    ob = {
        0:"https://pic1.imgdb.cn/item/6336fa0a16f2c2beb1d000ac.png",
        1:"https://pic1.imgdb.cn/item/6336fa0d16f2c2beb1d00432.png"
    }
    current = (current + 1) % 2;
    document.getElementById('avatar_template').src = ob[current];
    document.getElementById('avatar_template').alt = current;
    loadImage();
}

function loadImage() {
    if(document.getElementById('upload').files.length == 0) return
    var imgUrl = window.URL.createObjectURL(document.getElementById('upload').files[0]);
    document.getElementById('avatar_img').src = imgUrl;
    drawToCanvas(imgUrl, document.getElementById('avatar_template').src);
}

function drawToCanvas(img1, img2){
    var cvs = document.getElementById('cvs');
    var size = 300;
    cvs.width = size;
    cvs.height = size;
    var ctx = cvs.getContext('2d');
    var image1 = new Image;
    image1.src = img1;
    image1.setAttribute("crossOrigin",'Anonymous')
    image1.onload = function() {
        var width = image1.width < image1.height ? size : size * (image1.width / image1.height);
        var height = image1.width > image1.height ? size : size * (image1.height / image1.width);
        var x = image1.width < image1.height ? 0 : (size * (image1.width / image1.height) - size) / 2;
        var y = image1.width > image1.height ? 0 : (size * (image1.height / image1.width) - size) / 2;

        document.getElementById('avatar_img').style.width = width + 'px';
        document.getElementById('avatar_img').style.height = height + 'px';
        document.getElementById('avatar_img').style.marginLeft = -x + 'px';
        document.getElementById('avatar_img').style.marginTop = -y + 'px';

        ctx.drawImage(image1, -x, -y, width, height);
        var image2 = new Image;
        image2.src = img2;
        image2.setAttribute("crossOrigin",'Anonymous')
        image2.onload = function() {
            ctx.drawImage(image2, 0, 0, size, size);
        }
    
    }
}
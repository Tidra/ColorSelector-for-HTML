function createBox() {
    var htmlText = '<div class="color-box"><div style="position: relative;margin-right: 20px;"><canvas class="colorbck" id="colorbck" width="255" height="255"></canvas><div class="it" id="it"></div></div><div style="position: relative;margin-right: 20px;"><canvas class="colorbar" id="colorbar" width="10" height="255"></canvas><div class="choose-it" id="choose-it"><div></div></div></div><div style="line-height: 30px;"><b>当前选择颜色：</b><div id="show"></div><div id="showColor"></div></div></div>';
    
    document.write(htmlText);

    $('.color-box').css({
        'display': 'flex',
        'width': '465px',
        'background-color': 'rgb(209, 209, 209)',
        'color': 'rgb(53, 53, 53)',
        'padding': '10px',
        'border-radius': '10px',
    })

    $('.it').css({
        'position': 'absolute',
        'top': '-2px',
        'left': '-2px',
        'width': '4px',
        'height': '4px',
        'border': '1px solid rgba(95, 91, 91, 0.8)',
        'border-radius': '100%'
    })

    $('.choose-it').css({
        'font-size': '10px',
        'color': 'rgba(148, 148, 148, 0.89)',
        'position': 'absolute',
        'top': '0px',
        'left': '-1px'
    })

    $('.choose-it div').css({
        'width': '10px',
        'height': '1px',
        'border': '1px solid rgba(128, 128, 128, 0.89)',
        'border-radius': '100%',
    })

    $('.choose-it').append("<style>#choose-it::before{position: absolute;content: '▶';right: 10px;top: -7px;}</style>").append("<style>#choose-it::after{position: absolute;content: '◀';left: 10px;top: -7px;}</style >");

    $('#show').css({
        'width': '50px',
        'height': '24px',
        'margin': '15px 0',
    })

    $('#showColor').css({
        'background-color': '#ececec',
        'width': '135px',
        'padding': '10px',
        'border-radius': '10px',
    })
}

function boxActive() {
    // 调色板绘制
    var cbck = document.getElementById('colorbck').getContext("2d");
    var my_gra = cbck.createLinearGradient(1, 0, 254, 0);
    my_gra.addColorStop(0, "#ff0000");
    my_gra.addColorStop(1 / 6, "#ffff00");
    my_gra.addColorStop(2 / 6, "#00ff00");
    my_gra.addColorStop(3 / 6, "#00ffff");
    my_gra.addColorStop(4 / 6, "#0000ff");
    my_gra.addColorStop(5 / 6, "#ff00ff");
    my_gra.addColorStop(1, "#ff0000");
    cbck.fillStyle = my_gra;
    cbck.fillRect(0, 0, 255, 255);
    var my_gradient = cbck.createLinearGradient(0, 1, 0, 254);
    my_gradient.addColorStop(0, "rgba(0,0,0,0)");
    my_gradient.addColorStop(1, "rgba(0,0,0,1)");
    cbck.fillStyle = my_gradient;
    cbck.fillRect(0, 0, 255, 255);

    // 调色条绘制
    var cbar = document.getElementById('colorbar').getContext("2d");
    var my_g1 = cbar.createLinearGradient(0, 1, 0, 254);
    my_g1.addColorStop(0, "rgba(255,255,255,0)");
    my_g1.addColorStop(1, "rgba(255,255,255,1)");
    cbar.fillStyle = my_g1;
    cbar.fillRect(0, 0, 10, 255);
    var my_g = cbar.createLinearGradient(0, 1, 0, 254);
    my_g.addColorStop(0, "rgba(255,0,0,1)");
    my_g.addColorStop(1, "rgba(255,0,0,0)");
    cbar.fillStyle = my_g;
    cbar.fillRect(0, 0, 10, 255);

    // 颜色变化
    function clickIt(X = 0, Y = 0, who = 'bck') {
        if (X < 0) {
            X = 0;
        } else if (X > 254) {
            X = 254;
        }
        if (Y < 0) {
            Y = 0;
        } else if (Y > 254) {
            Y = 254;
        }
        var imgData = [];
        var bar = $('#choose-it');
        if (who == 'bck') {
            imgData = cbck.getImageData(X, Y, 1, 1).data;
            cbar.clearRect(0, 0, 10, 255);
            cbar.fillStyle = my_g1;
            cbar.fillRect(0, 0, 10, 255);
            my_g = cbar.createLinearGradient(0, 1, 0, 254);
            my_g.addColorStop(0, "rgba(" + imgData[0] + "," + imgData[1] + "," + imgData[2] + ",1)");
            my_g.addColorStop(1, "rgba(" + imgData[0] + "," + imgData[1] + "," + imgData[2] + ",0)");
            cbar.fillStyle = my_g;
            cbar.fillRect(0, 0, 10, 255);

            X = X - 2;
            Y = Y - 2;
            $('#it').css({
                'top': Y,
                'left': X
            });
        } else {
            bar.css('top', Y);
        }
        Y = bar.css('top').replace("px", "");
        imgData = cbar.getImageData(0, Y, 1, 1).data;
        var color = 'rgb(' + imgData[0] + ',' + imgData[1] + ',' + imgData[2] + ')';
        var hex = rgb2hex(color);
        $('#show').css({
            'background-color': color
        })
        $('#showColor').html(color + '<br>' + hex);

    }

    // 调色板点击事件
    $('#colorbck').click(function (e) {
        e.preventDefault();
        var X = e.offsetX;
        var Y = e.offsetY;
        clickIt(X, Y);
    });

    // 调色板拖拽事件
    $('#it').mousedown(function (e) {
        var bar = $('#colorbck').offset();
        $(document).mousemove(function (e) {
            var X = e.pageX - bar.left;
            var Y = e.pageY - bar.top;
            clickIt(X, Y);
        }).mouseup(function () {
            $(document).off('mousemove');
        });
    }).click(function (e) {
        var bar = $('#colorbck').offset();
        e.preventDefault();
        var X = e.pageX - bar.left;
        var Y = e.pageY - bar.top;
        clickIt(X, Y);
    });

    // 调色条点击事件
    $('#colorbar').click(function (e) {
        e.preventDefault();
        var Y = e.offsetY;
        clickIt(X = 5, Y, 'bar');
    });

    // 调色条拖拽事件
    $('#choose-it').mousedown(function (e) {
        var bar = $('#colorbar').offset();
        $(document).mousemove(function (e) {
            var Y = e.pageY - bar.top;
            clickIt(X = 5, Y, 'bar');
        }).mouseup(function () {
            $(document).off('mousemove');
        });
    }).click(function (e) {
        var bar = $('#colorbar').offset();
        e.preventDefault();
        var Y = e.pageY - bar.top;
        clickIt(X = 5, Y, 'bar');
    });
}

// 绘制调色选择器
createBox();
// 对事件做绑定
boxActive();

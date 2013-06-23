/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function left() {
    var svg = $('#svgbasics').svg('get');
    zoomx = zoomx + step / ratioZoom;
    svg.configure({viewBox: zoomx + ' ' + zoomy + ' ' + zoomw + ' ' + zoomh})
    updateViewCookie()
}
function right() {
    var svg = $('#svgbasics').svg('get');
    zoomx = zoomx - step / ratioZoom;
    svg.configure({viewBox: zoomx + ' ' + zoomy + ' ' + zoomw + ' ' + zoomh})
    updateViewCookie()
}
function down() {
    var svg = $('#svgbasics').svg('get');
    zoomy = zoomy - step / ratioZoom;
    svg.configure({viewBox: zoomx + ' ' + zoomy + ' ' + zoomw + ' ' + zoomh})
    updateViewCookie();
}

function up() {
    var svg = $('#svgbasics').svg('get');
    zoomy = zoomy + step / ratioZoom;
    svg.configure({viewBox: zoomx + ' ' + zoomy + ' ' + zoomw + ' ' + zoomh})
    updateViewCookie();
}

function zoommoins() {
    var svg = $('#svgbasics').svg('get');
    ratioZoom = ratioZoom / 2;
    zoomw = zoomw * 2;
    zoomh = zoomh * 2;
    var toto = document.getElementById("wheelvalue");
    toto.value = ratioZoom;
    svg.configure({viewBox: zoomx + ' ' + zoomy + ' ' + zoomw + ' ' + zoomh})
    updateViewCookie();
}

function zoomplus() {
    var svg = $('#svgbasics').svg('get');
    ratioZoom = ratioZoom * 2;
    zoomw = zoomw / 2;
    zoomh = zoomh / 2;
    svg.configure({viewBox: zoomx + ' ' + zoomy + ' ' + zoomw + ' ' + zoomh})
    updateViewCookie();
}

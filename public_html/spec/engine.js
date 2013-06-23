/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function drawcaps() {
    myGraph.updateViewBox();
    var displayList = [];

    $('#svgbasics').svg('get').clear();
    if (activeView === "CARTON")
        myGraph.drawPalette30();
    var arrow = [];
    var rowLength = 0;
    if (arrec === null)
        return;
    rowLength = arrec.length;
    if (rowLength > 0) {
        var k = 0;
        var j = 0;
        while (j < rowLength) {
            arrow = arrec[j];
            if (arrow[INDEX_HEADER] != -1) {
                if (arrow[WARE_HEADER] != null) {
                    displayList[k] = j;
                    k++;
                }
            }
            j++;
        }
        for (var j = 0; j <= 100; j++) {
            for (var l = 0; l < k; l++) {//on demarre à 1 car 0 c'est le header'
                arrow = arrec[displayList[l]];
                if (arrow[ORDER_HEADER] === j) {
                    if (activeView === "ROOM") {
                        filter = "room";
                    }
                    if (activeView === "CARTON")
                        filter = selectedPalette;

                    if ((arrow[VIEW_HEADER] === filter) && (arrow[LIEU_HEADER] === locationVal)) {
                        if((arrow[FORME_HEADER] === "rectangle"))
                            insertRect(arrow);
                        if((arrow[FORME_HEADER] === "ellipse"))
                            insertCirc(arrow);
                        if((arrow[FORME_HEADER] === "ligne"))
                            insertLine(arrow);
                    }
                }
            }
        }

        for (var j = 0; j < rowLength; j++) {
            arrow = arrec[j];
        }
    } else {
        //alert("tbl is null");
    }
}

function insertRect(arrow) {
    var index = arrow[INDEX_HEADER];
    var id = arrow[ID_HEADER];//posx
    var x = arrow[X_HEADER];//posx
    var y = arrow[Y_HEADER];//posy
    var height = arrow[HEIGHT_HEADER];//posy
    var width = arrow[WIDTH_HEADER];//posy
    var transx = arrow[TRANSX_HEADER];//transx
    var transy = arrow[TRANSY_HEADER];//transy
    var rotate = arrow[ROTATE_HEADER];
    var texte = arrow[TEXTE_HEADER];//texte
    var arg1 = arrow[ARG1_HEADER];
    var arg2 = arrow[ARG2_HEADER];
    var fillColor = arrow[FILLCOLOR_HEADER];//color
    var strokeColor = "gray";//arrow[STROKECOLOR_HEADER];//stroke color
    var quantite = arrow[QUANTITE_HEADER];//quantity

    var group = drawRect(arrow);
    if (activeView === "ROOM") {
        arrow[QUANTITE_HEADER] = searchInArray(VIEW_HEADER, id, arrec);
        drawText(group, id, strokeColor, texte, 0, x - (-5), y - (-height), rotate);
        drawText(group, id, strokeColor, arrow[QUANTITE_HEADER].toString(), 1, x - (-5), y - (-height), rotate);


    }
    if (activeView === "CARTON") {
        drawText(group, id, strokeColor, arg1 + "-" + arg2, 0, x - (-5), y - (-height), rotate);
        drawText(group, id, strokeColor, quantite.toString(), 1, x - (-5), y - (-height), rotate);
    }
}
function insertCirc(arrow) {
    var index = arrow[INDEX_HEADER];
    var id = arrow[ID_HEADER];//posx
    var x = arrow[X_HEADER];//posx
    var y = arrow[Y_HEADER];//posy
    var height = arrow[HEIGHT_HEADER];//posy
    var width = arrow[WIDTH_HEADER];//posy
    var transx = arrow[TRANSX_HEADER];//transx
    var transy = arrow[TRANSY_HEADER];//transy
    var rotate = arrow[ROTATE_HEADER];
    var texte = arrow[TEXTE_HEADER];//texte
    var arg1 = arrow[ARG1_HEADER];
    var arg2 = arrow[ARG2_HEADER];
    var fillColor = arrow[FILLCOLOR_HEADER];//color
    var strokeColor = "gray";//arrow[STROKECOLOR_HEADER];//stroke color
    var quantite = arrow[QUANTITE_HEADER];//quantity

    var group = drawCirc(arrow);
    if (activeView === "ROOM") {
        arrow[QUANTITE_HEADER] = searchInArray(VIEW_HEADER, id, arrec);
        drawText(group, id, strokeColor, texte, 0, x - (-5), y - (-height), rotate);
        drawText(group, id, strokeColor, arrow[QUANTITE_HEADER].toString(), 1, x - (-5), y - (-height), rotate);


    }
    if (activeView === "CARTON") {
        drawText(group, id, strokeColor, arg1 + "-" + arg2, 0, x - (-5), y - (-height), rotate);
        drawText(group, id, strokeColor, quantite.toString(), 1, x - (-5), y - (-height), rotate);
    }
}
function insertLine(arrow) {
    var index = arrow[INDEX_HEADER];
    var id = arrow[ID_HEADER];//posx
    var x = arrow[X_HEADER];//posx
    var y = arrow[Y_HEADER];//posy
    var height = arrow[HEIGHT_HEADER];//posy
    var width = arrow[WIDTH_HEADER];//posy
    var transx = arrow[TRANSX_HEADER];//transx
    var transy = arrow[TRANSY_HEADER];//transy
    var rotate = arrow[ROTATE_HEADER];
    var texte = arrow[TEXTE_HEADER];//texte
    var arg1 = arrow[ARG1_HEADER];
    var arg2 = arrow[ARG2_HEADER];
    var fillColor = arrow[FILLCOLOR_HEADER];//color
    var strokeColor = "gray";//arrow[STROKECOLOR_HEADER];//stroke color
    var quantite = arrow[QUANTITE_HEADER];//quantity

    var group = drawLine(arrow);
    if (activeView === "ROOM") {
        arrow[QUANTITE_HEADER] = searchInArray(VIEW_HEADER, id, arrec);
        drawText(group, id, strokeColor, texte, 0, x - (-5), y - (-height), rotate);
        drawText(group, id, strokeColor, arrow[QUANTITE_HEADER].toString(), 1, x - (-5), y - (-height), rotate);


    }
    if (activeView === "CARTON") {
        drawText(group, id, strokeColor, arg1 + "-" + arg2, 0, x - (-5), y - (-height), rotate);
        drawText(group, id, strokeColor, quantite.toString(), 1, x - (-5), y - (-height), rotate);
    }
}


function drawRect(arrow){
    
    var rectId= arrow[ID_HEADER];
    var x = arrow[X_HEADER];
    var y = arrow[Y_HEADER];
    var w = arrow[WIDTH_HEADER];
    var h = arrow[HEIGHT_HEADER];
    var transx = arrow[TRANSX_HEADER];
    var transy = arrow[TRANSY_HEADER];
    var rotate = arrow[ROTATE_HEADER];
    var quantite = arrow[QUANTITE_HEADER];
    var view = arrow[VIEW_HEADER];
    var strokeColor = arrow[STROKECOLOR_HEADER];
    var fillColor = arrow[FILLCOLOR_HEADER];
    var police="Verdana";
    
    var taille = 2;
    var opacite = 1;
    var epaisseurTrait = 4;
    
    
    var svg = $('#svgbasics').svg('get');
    var group = svg.group(null,rectId,{
        transform:"translate("+transx+","+transy+") rotate("+rotate+")"
    });

    svg.rect(group, x, y, w, h, 1, 1, {
        id:rectId+"sub",
        fill: fillColor, 
        stroke: strokeColor, 
        strokeWidth: epaisseurTrait,
        transform:"translate(0,0)"
    }); 
    
    if (! ( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) )) {        
        $('#'+rectId).bind('click', svgClicked);
        $('#'+rectId).bind('mouseover', svgOver);
        $('#'+rectId).bind('mouseout', svgOut); 
    }
    return group;
}
function drawCirc(arrow){
    
    var rectId= arrow[ID_HEADER];
    var x = arrow[X_HEADER];
    var y = arrow[Y_HEADER];
    var w = arrow[WIDTH_HEADER];
    var h = arrow[HEIGHT_HEADER];
    var transx = arrow[TRANSX_HEADER];
    var transy = arrow[TRANSY_HEADER];
    var rotate = arrow[ROTATE_HEADER];
    var quantite = arrow[QUANTITE_HEADER];
    var view = arrow[VIEW_HEADER];
    var strokeColor = arrow[STROKECOLOR_HEADER];
    var fillColor = arrow[FILLCOLOR_HEADER];
    var police="Verdana";
    
    var taille = 2;
    var opacite = 1;
    var epaisseurTrait = 4;
    
    
    var svg = $('#svgbasics').svg('get');
    var group = svg.group(null,rectId,{
        transform:"translate("+transx+","+transy+") rotate("+rotate+")"
    });
    
    svg.ellipse(group,x,y, w, h, {
        id:rectId+"sub",
        fill: fillColor, 
        stroke: strokeColor, 
        strokeWidth: epaisseurTrait,
        transform:"translate(0,0)"
    }); 
    
    if (! ( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) )) {        
        $('#'+rectId).bind('click', svgClicked);
        $('#'+rectId).bind('mouseover', svgOver);
        $('#'+rectId).bind('mouseout', svgOut); 
    }
    return group;
}
function drawLine(arrow){
    
    var rectId= arrow[ID_HEADER];
    var x = arrow[X_HEADER];
    var y = arrow[Y_HEADER];
    var w = arrow[WIDTH_HEADER];
    var h = arrow[HEIGHT_HEADER];
    var transx = arrow[TRANSX_HEADER];
    var transy = arrow[TRANSY_HEADER];
    var rotate = arrow[ROTATE_HEADER];
    var quantite = arrow[QUANTITE_HEADER];
    var view = arrow[VIEW_HEADER];
    var strokeColor = arrow[STROKECOLOR_HEADER];
    var fillColor = arrow[FILLCOLOR_HEADER];
    var police="Verdana";
    
    var taille = 2;
    var opacite = 1;
    var epaisseurTrait = 4;
    
    
    var svg = $('#svgbasics').svg('get');
    var group = svg.group(null,rectId,{
        transform:"translate("+transx+","+transy+") rotate("+rotate+")"
    });
    //svg.line(g, 450, 120, 550, 20, {strokeWidth: 5}); 
    svg.line(group,x,y, x - (-w), y, {
        id:rectId+"sub",
        fill: fillColor, 
        stroke: strokeColor, 
        strokeWidth: epaisseurTrait,
        transform:"translate(0,0)"
    }); 
    
    if (! ( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) )) {        
        $('#'+rectId).bind('click', svgClicked);
        $('#'+rectId).bind('mouseover', svgOver);
        $('#'+rectId).bind('mouseout', svgOut); 
    }
    return group;
}

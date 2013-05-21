/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function drawcaps() {
                myGraph.updateViewBox();
                var displayList = [];

                $('#svgbasics').svg('get').clear();
                //g_main = $('#svgbasics').svg('get').group({id: 'mainGroup'});
                if (activeView == "CARTON")
                    myGraph.drawPalette30();
                var arrow = [];
                var rowLength = 0;
                if (arrec == null)
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
                            if (arrow[ORDER_HEADER] == j) {
                                if (activeView == "ROOM") {
                                    filter = "room";
                                }
                                if (activeView == "CARTON")
                                    filter = selectedPalette;

                                if ((arrow[FORME_HEADER] == "rectangle") && (arrow[VIEW_HEADER] == filter) && (arrow[LIEU_HEADER] == locationVal)) {
                                    insertRect(arrow);
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
                if (activeView == "ROOM") {
                    arrow[QUANTITE_HEADER] = searchInArray(VIEW_HEADER, id, arrec);
                    drawText(group, id, strokeColor, texte, 0, x - (-5), y - (-height), rotate);
                    drawText(group, id, strokeColor, arrow[QUANTITE_HEADER].toString(), 1, x - (-5), y - (-height), rotate);


                }
                if (activeView == "CARTON") {
                    drawText(group, id, strokeColor, arg1 + "-" + arg2, 0, x - (-5), y - (-height), rotate);
                    drawText(group, id, strokeColor, quantite.toString(), 1, x - (-5), y - (-height), rotate);
                }
            }
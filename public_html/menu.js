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



function copyBtn(x, y) {
    window.open("upload.html", "upload", config = 'height=120, width=400, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no');
}

function flush_mem() {
    var j = 0;
    var arrow = new Array(COL_NUMBER);
    while (j < arrec.length) {
        arrow = arrec[j];
        console.info("mem = " + arrow);
        j++;
    }
}
function flush_clip() {
    var j = 0;
    var arrow = new Array(COL_NUMBER);
    while (j < buf_arrec.length) {
        arrow = buf_arrec[j];
        console.info("mem = " + arrow);
        j++;
    }
}
function deleteRow() {
    if ((selectedIndex == -1) || (selectedIndex == null))
        return;
    deleteProductBtn();
    setTimeout("drawcaps()", 800);
    closeMenuObj();
}

function removeLclDb() {
    closeMenu();
    stock.storeRemoveAll();
    initArray();
    stock.init();
    drawcaps();
}
function syncM2SBtn() {
    closeMenu();
    syncM2SPhp();
}

function syncS2MBtn() {
    closeMenu();
    stock.storeRemoveAll();
    syncS2MPhp();
    reloadGui();
    setTimeout("drawcaps()", 800);
}

function syncS2MArticleBtn() {
    closeMenu();
    art_array = [];
    article.artRemoveAll();
    article.init();
    syncS2MArticlePhp();
}

function setDesc() {
    var arrow = arrec[selectedRow];
    if (activeView == "ROOM") {
        arrow[TEXTE_HEADER] = document.getElementById("textePalette").value;
        selArr[TEXTE_HEADER] = document.getElementById("textePalette").value;
    }
    if (activeView == "CARTON") {
        arrow[ARG1_HEADER] = document.getElementById("prefix").value;
        arrow[ARG2_HEADER] = document.getElementById("article").value;
        arrow[QUANTITE_HEADER] = document.getElementById("nbrCoiffes").value;
    }
    changeArrayRow(selectedRow, arrow);
    drawcaps();
}

function fillVal() {
    var comb = document.getElementById("artCombo").value;
    var mySplitResult = comb.split("-");
    document.getElementById("prefix").value = mySplitResult[0];
    document.getElementById("article").value = mySplitResult[1];
}

function load_comboArt(select_id, option_array) {

                for (var i = 0; i < option_array.length / 2; i++) {
                    add_option(select_id, option_array[i][0] + "-" + FormatNumberLength(option_array[i][1], 8));
                }
            }
            function populateCombo(comboName) {
                var arr = [];
                arr = art_array;
                load_comboArt(comboName, arr);
            }

            function FormatNumberLength(num, length) {
                var r = "" + num;
                while (r.length < length) {
                    r = "0" + r;
                }
                return r;
            }

            function OnColorChanged(selectedColor, colorPickerIndex) {
                setColor(selectedColor);
            }
            
            
            function toggleMenu() {
                togglediv('centermenu', "testWind");
            }
            function toggleMenuObject() {
                togglediv('centermenu', 'contextObjMenu');
            }

            function closeMenu() {
                var wnd = document.getElementById("testWind");
                wnd.style.display = "none";
            }

            function closeMenuObj() {
                var wnd = document.getElementById("contextObjMenu");
                wnd.style.display = "none";
            }

            function hideMenuBars() {
                var wnd1 = document.getElementById("floating_bar");
                var wnd2 = document.getElementById("floating_bar_bottom");
                var bod = document.getElementById("svgbasics");
                if (wnd1.style.display == "block") {
                    wnd1.style.display = "none";
                    bod.style.marginTop = "0px";
                }
                else {
                    wnd1.style.display = "block";
                    bod.style.marginTop = "70px";
                }

                if (wnd2.style.display == "block")
                    wnd2.style.display = "none";
                else
                    wnd2.style.display = "block";
            }
            function toggle2(showHideDiv) {//contextObjMenu
                var ele = document.getElementById(showHideDiv);
                var wnd = document.getElementById("testWind");
                wnd.style.left = posx + 'px';
                wnd.style.top = posy + 'px';
                
                if (ele.style.display == "block") {
                    wnd.style.display = "none";
                    }
                else {
                    wnd.style.display = "block";
                    }
            }
            function togglediv(showHideDiv, divId) {
                var ele = document.getElementById(showHideDiv);
                var wnd = document.getElementById(divId);
                wnd.style.left = posx + 'px';
                wnd.style.top = posy + 'px';
                if (ele.style.display == "block") {
                    wnd.style.display = "none";
                }
                else {
                    wnd.style.display = "block";
                }
            }

            function toggleVueCartonMenu() {
                document.getElementById("descrip_palette").style.display = "none";
                document.getElementById("descrip_carton").style.display = "block";
            }
            function toggleVuePaletteMenu() {
                document.getElementById("descrip_palette").style.display = "block";
                document.getElementById("descrip_carton").style.display = "none";
            }
            function setColorPicker() {
                document.getElementById('colorPalette').color.showPicker();
            }
            function setColor(val) {
                var ele = document.getElementById('palette');
                var btn = document.getElementById('colorBtn');
                if (itemFocused == 0) {
                    if (ele.style.display == "block") {
                        ele.style.display = "none";
                        btn.innerHTML = "color";
                    }
                    else {
                        ele.style.display = "block";
                        btn.innerHTML = "";
                    }
                }
                setHexColor(val);
                document.getElementById('colorBtn').style.background = '#' + val;
                document.getElementById('colorBtn').value = val;
            }
            function toggleColor() {
                var ele = document.getElementById('colorPalette');
                if (ele.color.isVisible())
                    ele.color.hidePicker();
                else
                    ele.color.showPicker();
            }
            function cleanAll() {
                localStorage.clear();
                reloadGui();
                setTimeout("drawcaps()", 800);
            }
            function SendColor(val) {
                setHexColor(val);
                document.getElementById('colorBtn').style.background = '#' + val;
                document.getElementById('colorBtn').value = val;
            }
            function load_combo_lieu() {
                var typeOptions = [];
                typeOptions[0] = "ay";
                typeOptions[1] = "magentaCRD";
                typeOptions[2] = "magentaMatiere";
                typeOptions[3] = "magentaConsommables";

                load_combo("locationCombo", typeOptions);
            }

            function load_combo_type() {
                var typeOptions = [];
                typeOptions[0] = "palette30";
                typeOptions[1] = "palette60";
                typeOptions[2] = "paletteEurope";

                load_combo("typeProduitCombo", typeOptions);
            }
            
            function loadComboElements(){
                var typeOptions = [];	
                typeOptions[0] = "vueDev";
                typeOptions[1] = "vueAvant";
                typeOptions[2] = "vueArriere";
                typeOptions[3] = "vueCoteDroit";
                typeOptions[4] = "vueCoteGauche";
                typeOptions[5] = "texte";
                typeOptions[6] = "liseret";
                typeOptions[7] = "logo";
                typeOptions[8] = "cotation";
                typeOptions[9] = "cartouche";
	
                load_combo("typeCombo",typeOptions);
            }
            
            function load_combo_loc() {
                var typeOptions = [];
                typeOptions[0] = "ay";
                typeOptions[1] = "magentaCRD";
                typeOptions[2] = "magentaMatiere";
                typeOptions[3] = "magentaConsommables";

                load_combo("locProduitCombo", typeOptions);
            }

            function add_option(select_id, text) {
                var select = document.getElementById(select_id);
                select.options[select.options.length] = new Option(text);
            }

            function changeLocation() {
                closeMenu();
                locationVal = document.getElementById("locationCombo").value;
                activeView = "ROOM";
                drawcaps();

            }

            function send_ftp() {
                var filename = document.getElementById("exportName").value;
                ftp(filename);
            }
            function setFile() {
                var filename = document.getElementById("exportName").value;
                if (filename.isNaN)
                    filename = "export.txt";
                sendFile(arrec, filename);
            }
            function getFile() {
                stock.storeRemoveAll();
                var filename = document.getElementById("exportName").value;
                if (filename.isNaN)
                    filename = "export.txt";
                readFile("../export/" + filename);
                reloadGui();
                setTimeout("drawcaps()", 800);
            }
            function changeTypeProduit() {
                var typeProduit = document.getElementById("typeProduitCombo").value;
                m_typeProduit = typeProduit;
                m_width = 160;
                m_height = 80;

                if (typeProduit == "palette60") {
                    m_width = 160;
                    m_height = 160;
                }

                if (typeProduit == "palette30") {
                    m_width = 160;
                    m_height = 80;
                }

                if (typeProduit == "paletteEurope") {
                    m_width = 130;
                    m_height = 90;
                }

                if (itemFocused == 0)
                    return;
                var arrow = arrec[selectedIndex];
                arrow[WIDTH_HEADER] = m_width;
                arrow[HEIGHT_HEADER] = m_height;
                arrow[TYPE_HEADER] = typeProduit;
                closeMenuObj();
                drawcaps();
            }

            function changeLocationProduit() {
                var locProduit = document.getElementById("locProduitCombo").value;

                if (itemFocused == 0)
                    return;
                var arrow = arrec[selectedIndex];
                arrow[LIEU_HEADER] = locProduit;
                closeMenuObj();
                drawcaps();
            }

            function upTest() {
                var formData = new FormData($('form')[0]);
                $.ajax({
                    url: 'upload.php', //server script to process data
                    type: 'POST',
                    xhr: function() {  // custom xhr
                        myXhr = $.ajaxSettings.xhr();
                        if (myXhr.upload) { // check if upload property exists
                            myXhr.upload.addEventListener('progress', progressHandlingFunction, false); // for handling the progress of the upload
                        }
                        return myXhr;
                    },
                    //Ajax events
                    beforeSend: beforeSendHandler,
                    success: completeHandler,
                    error: errorHandler,
                    // Form data
                    data: formData,
                    //Options to tell JQuery not to process data or worry about content-type
                    cache: false,
                    contentType: false,
                    processData: false
                });
            }
            
            function exportSvg() {
            var xml = $('#svgbasics').svg('get').toSVG();
             $('#resultat').html(xml.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'));
            }
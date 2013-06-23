/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
// GUI CallBack

var indexPalette=1;
var dy=0;
var transx=0;
var transy=0;
var rotate_deg = 0;
var texte = "";
var ratioZoom=1;
var GetInitCoordx=0;
var GetInitCoordy=0;
var GetInitCoordxVirtRect = 0;
var GetInitCoordyVirtRect = 0;
var lblx;
var lbly; 
var lblState;
var start_drag=0;
var dx=0;
var start = null; 
var outline = null; 
var offset = null; 

var selectedIndex=0;
var bOver=0;
var bDragging = 0;
var nbrClick=0;
var itemFocused = 0;
var selectedPalette;
var selectedIndexOver=-1;
var selectedItemOver;
var selectedItem;
var previousSelectedItem;

var indexRec=0;
var recX;
var recY;
var transX=0;
var w;
var h;
var offsetX=0;//40;
var offsetY=0;//200;
var mouseX;
var mouseY;
var activeView = "ROOM";
var back_drag=0;
var x_ori_back = 0;
var y_ori_back = 0;
var dx_back = 0;
var dy_back = 0;
var m_forme="rectangle";
var m_typePalette="palette30";
var m_width = 160;
var m_height = 80;
var m_select = 0;
var m_paste_done = 0;
var m_copy_done = 0;
var m_buf_index = 0;
var m_selectGroup;

function addPalette(){
    var index =  stock.getNewIndex();
    var id = "pal_"+index;
    //addNewRowPalette("palette30","g"+id,ID_HEADER,index);
    addNewRowPalette(m_typePalette,"g"+id,ID_HEADER,index);
}
function delPalette(){
    var arrow = arrec[selectedIndex];
    var palId = arrow[ID_HEADER];
    //delete palette
    stock.remove(arrow[ID_HEADER]);
    for(i=0;i<arrow.length;i++)
                arrow[i]="";
    //arrow[INDEX_HEADER]="";
    //seek in the list to remove carton
    var j = 0;
    var i = 0;
    for(j=0;j<arrec.length;j++){
        arrow = arrec[j];
        if(arrow[VIEW_HEADER] == palId){
            stock.remove(arrow[ID_HEADER]);
            for(i=0;i<arrow.length;i++)
                arrow[i]="";
        }
    }
    //clean array
    cleanArray();
}

function cleanArray(){
    for(var j=0;j<arrec.length;j++){
        var lclarrow = arrec[j];
        for(k=0;k<lclarrow.length;k++)
            lclarrow[k]="-1";
    }
    arrec= [];
}
function delCaisse(){
    var i = 0;
    var arrow = arrec[selectedIndex];
    stock.remove(arrow[ID_HEADER]);
    for(i=0;i<arrow.length;i++)
        arrow[i]="";
    initArray();
    //clean array
    cleanArray();
}
function deleteProductBtn(){
    if(activeView==="ROOM")
        delPalette();
    else{
        delCaisse();
    } 
    stock.init();
    resetData();
    drawcaps();
}
function addProductBtn(){
    if(activeView==="ROOM")
        addPalette();
    else{
        addCaisse();
    }
}
function copyProduct(){
    if(activeView==="ROOM")
        copyPalette();
    else{
        copyCaisse();
    } 
    closeMenuObj();
}
function pasteProduct(){
    if(activeView==="ROOM")
        pastePalette();
    else{
        pasteCaisse();
    } 
    closeMenuObj();
}

function selectProduct(){
    setMultiSelect();
    m_select=1;
    m_copy_done=0;
    //flush_clipboard();
    if(activeView=="ROOM")
        selectPalette();
    else{
        selectCaisse();
    } 
    closeMenuObj();
}
function deselectProduct(){
    unsetMultiSelect();
    m_select=0;
    m_copy_done=0;
    //flush_clipboard();
    if(activeView=="ROOM")
        deselectPalette();
    else{
        deselectCaisse();
    } 
    closeMenuObj();
}
function flush_clipboard(){
    buf_arrec=[];
    m_buf_index=0;
    if(DEBUG==1)
        console.info("buf length="+buf_arrec.length);
}
function selectCaisse(){
    flush_clipboard();
    m_select=1;
}
function selectPalette(){
    flush_clipboard();
    m_select=1;
}

function deselectCaisse(){
    flush_clipboard();
    m_select=0;
}
function deselectPalette(){
    flush_clipboard();
    m_select=0;
}
/*
function copyPalette(){
    var arrow = new Array(COL_NUMBER);
    flush_clipboard();
    arrow = arrec[selectedIndex];
    buf_arrec[0]=arrow //palette
    var palId = arrow[ID_HEADER];
    //seek in the list to remove carton
    var j = 0;
    var k = 1;
    for(j=0;j<arrec.length;j++){
        var lclArrow = arrec[j];
        if(lclArrow[VIEW_HEADER] == palId){
            if(DEBUG==1)
                console.info("copyPalette"+lclArrow);
            buf_arrec[k]=lclArrow;
            k++;
        }
    }
}*/
function copyPalette(){
    if(m_select===0){
        flush_clipboard();
        m_paste_done = 0;
        m_copy_done = 0;
        addItemToClipboard();
    }else{
        m_copy_done = 1;
        if(m_paste_done === 1){
            //flush_clipboard();
            m_paste_done = 0;
            m_copy_done = 0;
        }
    }
}
function copyCaisse(){
    if(m_select===0){
        flush_clipboard();
        m_paste_done = 0;
        m_copy_done = 0;
        addItemToClipboard();
    }else{
        m_copy_done = 1;
        if(m_paste_done === 1){
            //flush_clipboard();
            m_paste_done = 0;
            m_copy_done = 0;
        }
    }
}
/*
function pastePalette(){
    if (buf_arrec.length>0){
        //paste palette
        var arrow = new Array(COL_NUMBER);
        arrow = buf_arrec[0];
        var lclArrow = new Array(COL_NUMBER);
        var k=0;
        for(k=0;k<COL_NUMBER;k++)
            lclArrow[k] = arrow[k];
        
        var index = allocateCaisseIndex2(arrec);
        var stockIndex = window.localStorage.getItem("stock:index");
        var paletteId = "gpal_"+index;
        lclArrow[ID_HEADER] = paletteId;
        lclArrow[INDEX_HEADER] = stockIndex;
        lclArrow[TRANSX_HEADER] = posx*ratioZoom;
        lclArrow[TRANSY_HEADER] = posy*ratioZoom;
        lclArrow[LIEU_HEADER]=locationVal;
        var l = arrec.length;
        arrec[l] = lclArrow;
        recordLine(lclArrow);
        
        var i ;
        for(i=1;i<buf_arrec.length>0;i++){
            lclArrow = new Array(COL_NUMBER);
            k=0;
            var tmparrow = new Array(COL_NUMBER);
            tmparrow = buf_arrec[i];
            for(k=0;k<COL_NUMBER;k++)
                lclArrow[k] = tmparrow[k];
            
            index = allocateCaisseIndex2(arrec);
            stockIndex = window.localStorage.getItem("stock:index");
            lclArrow[ID_HEADER] = "gcai_"+index;
            lclArrow[INDEX_HEADER] = stockIndex;
            lclArrow[VIEW_HEADER] = paletteId;
            lclArrow[LIEU_HEADER]=locationVal;
            
            var lcl = arrec.length;
            arrec[lcl] = lclArrow;
            recordLine(lclArrow);
        }
        
        drawcaps();
    }
}
*/

/*
function copyMultiCaisse(){
    var arrow = new Array(COL_NUMBER);
    arrow = arrec[selectedIndex];
    buf_arrec[++m_buf_index]=arrow
}
*/

function addItemToClipboard(){
    if(m_copy_done===0){
        var lclarrow = new Array(COL_NUMBER);
        var arrow = new Array(COL_NUMBER);
        arrow = arrec[selectedIndex];
        for(i=0;i<lclarrow.length;i++)
            lclarrow[i] = arrow[i];
        buf_arrec[m_buf_index++]=lclarrow;
        console.info("buff added="+lclarrow);
    }
}

function removeItemFromClipboard(){
    if(m_copy_done==0){
        var i=0;
        //var lclarrow = new Array(COL_NUMBER);
        var item = selectedItem.getAttributeNS(null,"id");
        console.log("item="+item);
        var index = seekLineInArray(ID_HEADER,item,buf_arrec);
        console.info("index found="+item+"="+index);
        if(buf_arrec[index]!=undefined){
            var lclarrow = buf_arrec[index];
            console.info("buff removed="+index+"="+lclarrow+" "+lclarrow[ID_HEADER]);
            for(i=0;i<lclarrow.length;i++)
                lclarrow[i]="";
        }
        console.log("clipboard")
        flush_clip();
    }
}

function pasteCaisse(){
    var index;
    var stockIndex;
    var i=0;
    var prev_offsetx = 0;
    var prev_offsety = 0;
    var offsetx = 0;
    var offsety = 0;
    var index_copy = 0;
    var diffx = 0;
    var diffy = 0;
    for(i==0;i<m_buf_index;i++){
        var arrow = new Array(COL_NUMBER);
        if(buf_arrec[i]!=undefined){
            arrow = buf_arrec[i];
            if((arrow[VIEW_HEADER]!="")){
                arrow = buf_arrec[i];
                index = allocateCaisseIndex2(arrec);
                stockIndex = stock.getNewIndex();
                arrow[ID_HEADER] = "gcai_"+index;
                arrow[INDEX_HEADER] = stockIndex;
                arrow[VIEW_HEADER] = selectedPalette;
                offsetx =  arrow[TRANSX_HEADER];
                offsety = arrow[TRANSY_HEADER];
                if(index_copy>0){
                    diffx = offsetx - prev_offsetx;
                    diffy = offsety - prev_offsety;
                }else{
                    diffx = 0;
                    diffy = 0;
                }
        
                arrow[TRANSX_HEADER] = posx*ratioZoom + parseInt(diffx);
                arrow[TRANSY_HEADER] = posy*ratioZoom + parseInt(diffy);
                arrow[LIEU_HEADER]=locationVal;
                var l = arrec.length;
                arrec[l] = arrow;
                recordLine(arrow);
                prev_offsetx = offsetx;
                prev_offsety = offsety;
                index_copy ++;
            }
        }
    }

    //m_paste_done = 1;
    //m_copy_done = 0;
    m_select=0;
    flush_clipboard();
    drawcaps();
    console.log("  memory   ");
    flush_mem();
    console.log("   clip     ");
    flush_clip();
}
function pastePalette(){
    var index;
    var stockIndex;
    var paletteId = 0;
    var newpaletteId = 0;
    var i=0;
    var prev_offsetx = 0;
    var prev_offsety = 0;
    var offsetx = 0;
    var offsety = 0;
    var index_copy = 0;
    var diffx = 0;
    var diffy = 0;
    for(i===0;i<m_buf_index;i++){
        var arrow = new Array(COL_NUMBER);
        if(buf_arrec[i]!==undefined){
            arrow = buf_arrec[i];
            if((arrow[VIEW_HEADER]!=="")){
                arrow = buf_arrec[i];
                paletteId = arrow[ID_HEADER];
                //allocate palette
                index = allocateCaisseIndex2(arrec);
                stockIndex = stock.getNewIndex();
                newpaletteId = "gpal_"+index;
                arrow[ID_HEADER] = newpaletteId;
                arrow[INDEX_HEADER] = stockIndex;
                offsetx =  arrow[TRANSX_HEADER];
                offsety = arrow[TRANSY_HEADER];
                if(index_copy>0){
                    diffx = offsetx - prev_offsetx;
                    diffy = offsety - prev_offsety;
                }else{
                    diffx = 0;
                    diffy = 0;
                }
        
                arrow[TRANSX_HEADER] = posx*ratioZoom + parseInt(diffx);
                arrow[TRANSY_HEADER] = posy*ratioZoom + parseInt(diffy);
                arrow[LIEU_HEADER]=locationVal;
                var l = arrec.length;
                arrec[l] = arrow;
                recordLine(arrow);
                prev_offsetx = offsetx;
                prev_offsety = offsety;
                index_copy ++;
                
                //
                var j =0;
                var k =0;
                var tmparrow = new Array(COL_NUMBER);
                for(j = 0 ; j < arrec.length;j++){
                    if(arrec[j]!=undefined){
                        tmparrow = arrec[j];;
                        if((tmparrow[VIEW_HEADER]===paletteId)&&(tmparrow!="")){
                            k=0;
                            //console.info("pal found="+id);
                            var lclArrow = new Array(COL_NUMBER);
                            for(k=0;k<COL_NUMBER;k++)
                                lclArrow[k] = tmparrow[k];
            
                            index = allocateCaisseIndex2(arrec);
                            stockIndex = stock.getNewIndex();
                            lclArrow[ID_HEADER] = "gcai_"+index;
                            lclArrow[INDEX_HEADER] = stockIndex;
                            lclArrow[VIEW_HEADER] = newpaletteId;
                            lclArrow[LIEU_HEADER]=locationVal;
            
                            var lcl = arrec.length;
                            arrec[lcl] = lclArrow;
                            recordLine(lclArrow);
                        }
                    }
                }
            }
        }
    }

    //m_paste_done = 1;
    //m_copy_done = 0;
    m_select=0;
    flush_clipboard();
    drawcaps();
    console.log("  memory   ");
    flush_mem();
    console.log("   clip     ");
    flush_clip();
}
function addCaisse(){
    var index = allocateCaisseIndex2(arrec);
    var stockIndex = stock.getNewIndex();
    var id = "cai_"+index;
    addNewRowCaisse("caisse25","g"+id,ID_HEADER,stockIndex,selectedPalette);
    var j=0;
    var k=0;
    if(DEBUG==1){
        for(j=0;j<arrec.length;j++){
            var arrow = new Array(COL_NUMBER);
            arrow = arrec[j];
            //for(k=0;k<arrow.length;k++){
            console.info(arrow[0]+" - "+arrow[1]);
        }
    }
}
function allocateIndex(argArrec,stockSize){
    var index =  stockSize;//window.localStorage.getItem("stock:index");
    var tmpArrow;
    var i=0;
    var alloc_index=1;
    for(i=0;i<index-1;i++){
        tmpArrow = argArrec[i];
        if(alloc_index==tmpArrow[INDEX_HEADER]){
            alloc_index++;
            i=-1;
        }
    }
    return alloc_index;
}
function allocateCaisseIndex2(argArrec){
    var id="";
    var alloc_index=1;
    var max = 1;
    for(i=0;i<argArrec.length;i++){
        var tmpArrow = new Array(COL_NUMBER);
        tmpArrow = argArrec[i];
        id = tmpArrow[ID_HEADER];
        if (id==null)
            id="gcai_00";
        var mySplitResult = id.split("_");
        var val = parseInt(mySplitResult[1]);
        if(val>max)
            max = val;
    }

    return ++max;
}
function allocateCaisseIndex(argArrec,stockSize){
    var index =  stockSize;//window.localStorage.getItem("stock:index");
    var tmpArrow;
    var i=0;
    var alloc_index=1;
    var id="";
    for(i=0;i<index-1;i++){
        tmpArrow = argArrec[i];
        if (tmpArrow==null)
            continue
            
        id = tmpArrow[ID_HEADER];
        if (id==null)
            id="gcai_00";
        var mySplitResult = id.split("_");
        if(alloc_index==mySplitResult[1]){
            alloc_index++;
            i=-1;
        }
    }
    return alloc_index;
}
/*
function addCaisseRow(arrow){
    var alloc_index = allocateIndex(arrec,window.localStorage.getItem("stock:index"));
    var id = "cai_"+alloc_index;
    addNewRowCaisseRow("caisse25","g"+id,ID_HEADER,index,selectedPalette,arrow);
}*/
function vuePaletteBtnPressed(){
    activeView="ROOM";
    var btn = document.getElementById("vuePalette");
    btn.disabled=true;
    document.getElementById('addBtn').value= "Ajouter une palette";
    toggleVuePaletteMenu();
    drawcaps();
}
function vueCartonBtnPressed(){
    if(selectedItem==null)
        return;
    activeView="CARTON";
    var btn = document.getElementById("vuePalette");
    btn.disabled=false;
    var btnCarton = document.getElementById("vueCarton");
    btnCarton.disabled=true;
    selectedPalette = selectedItem.getAttributeNS(null,"id");
    document.getElementById('addBtn').value= "Ajouter un carton";
    var btnAdd = document.getElementById("addBtn");
    btnAdd.disabled=false;
    toggleVueCartonMenu();
    drawcaps();
    populateCombo("artCombo");
}

function setEvents(rectId){
    $('#'+rectId).bind('click', svgClicked);
    $('#'+rectId).bind('mouseover', svgOver);
    $('#'+rectId).bind('mouseout', svgOut);
}

function drawText(group,id,strokeColor,texte,lineNumber,transx,transy,rotate){
    var svg = $('#svgbasics').svg('get');
    var police="Verdana";
    var color = strokeColor;
    var taille = 15;
    var opacite = 1;
    var epaisseurTrait = 1;
    var marqueId = id+"_txt"+lineNumber;
    var g = svg.group(group,{
        fontWeight: 'bold', 
        fontSize: taille, 
        fill: color,
        transform:"translate(0,0)"
    }); // rotate("+rotate+")";
    svg.text(g, transx, transy-(-15*(lineNumber-4)), texte);    
}
var virtRect;
function drawVirtualRect(x,y,w,h){
    var svg = $('#svgbasics').svg('get');
    var group = svg.group(null,"gVirtRect");

    svg.rect(group, x, y, w, h, 1, 1, {
        id:"virtRect",
        fill: "none", 
        stroke: "black", 
        strokeWidth: 5,
        transform:"translate(0,0)"
    }); 
    return group;
}
function drawPlayRect(sw,sh){
    var w = 100;
    var h = 100;
    var i = 0;
    var rw = sw / w;
    var rh = sh / h;
    var r = (rw > rh) ? rw : rh;
    var svg = $('#svgbasics').svg('get');
    var group = svg.group(null,"gPlayRect");
    for(i=0;i<=r;i++){
        svg.rect(group, i*w, 0, sw, sh, 1, 1, {
            id:"playRect",
            fill: "none", 
            stroke: "blue", 
            strokeWidth: 1,
            transform:"translate(0,0)"
        }); 
    
        svg.rect(group, 0,i*h, sw, sh, 1, 1, {
            id:"playRect",
            fill: "none", 
            stroke: "blue", 
            strokeWidth: 1,
            transform:"translate(0,0)"
        }); 
    
    }
    return group;
}

function setMultiSelect(){
    m_select=1;
    m_selectGroup = $('#svgbasics').svg('get').group({id: 'mSelectId'});
    /*if (! ( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) )) {        
        $('#'+m_selectGroup).bind('click', svgClicked);
        $('#'+m_selectGroup).bind('mouseover', svgOver);
        $('#'+m_selectGroup).bind('mouseout', svgOut); 
    }*/
}
function unsetMultiSelect(){
    m_select=0;
    var container = document.getElementById("mSelectId");
    var transx = getTransX(container);
    var transy = getTransY(container);
    var rotation = getRotation(container);
    
    var mainsvg =  container.parentNode;
    var el = container.getElementsByTagName("g");
    for(var i=el.length-1; i>=0; i--) {
        
        var id = el[i].getAttributeNS(null, "id");
        if(id!==null){
            if(id.indexOf("gpal") !== -1){  
                var dx = getTransX(el[i]) - (-transx);
                var dy = getTransY(el[i]) - (-transy);
                var rotate_deg = getRotation(el[i]) - (-rotation);
                el[i].setAttributeNS(null,"transform", "translate("+dx+","+dy+") rotate("+rotate_deg+")");
                mainsvg.appendChild(el[i]);
            
            }
        }
    }
    mainsvg.removeChild(container);
}

function getTransX(node){
    var trans = node.getAttributeNS(null,"transform");
    if(trans===null)
        return 0;
    var trans1 = trans.split("rotate");
    var trans2 = trans1[0].split("(");
    var trans3 = trans2[1].split(")");
    var trans4 = trans3[0].split(",");
    var transx = trans4[0];
    return transx;
}
function getTransY(node){
    var trans = node.getAttributeNS(null,"transform");
    if(trans===null)
        return 0;
    var trans1 = trans.split("rotate");
    var trans2 = trans1[0].split("(");
    var trans3 = trans2[1].split(")");
    var trans4 = trans3[0].split(",");
    
    var transy = trans4[1];
    return transy;
}
function getRotation(node){
    var trans = node.getAttributeNS(null,"transform");
    if(trans===null)
        return 0;
    var trans1 = trans.split("rotate");
    var trans2 = trans1[1].split("(");
    var trans3 = trans2[1].split(")");
    var rotate_deg = trans3[0];
    return rotate_deg;
}
function rotate(){
    var arrow = arrec[selectedIndex];
    var prec_rotate = parseInt(arrow[ROTATE_HEADER]);
    var rot = prec_rotate + 45;
    arrow[ROTATE_HEADER] = rot;
    var xl = parseInt(arrow[X_HEADER]) + parseInt(arrow[TRANSX_HEADER]);
    var yl = parseInt(arrow[Y_HEADER]) + parseInt(arrow[TRANSY_HEADER]);
    $(selectedItem).attr("transform", "translate("+parseInt(arrow[TRANSX_HEADER])+","+parseInt(arrow[TRANSY_HEADER])+") rotate("+rot+")");
    changeArrayRow(selectedRow,arrow);
}
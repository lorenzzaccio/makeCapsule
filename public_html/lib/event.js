/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
    
var posx = 0;
var posy = 0;
var handlingGesture = false;
var rotate_deg = 0;
var m_locked=0;
function initEventHandler(){
    
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        //ratioZoom=1;
        document.addEventListener('touchmove', function(event) {
            event.preventDefault();
            tmouseMove(event);
        }, false);

        document.addEventListener('touchstart', function(event) {
            tmouseDown(event);
        });
        document.addEventListener('touchend', function(event) {
            tmouseUp(event);
        }, false);
        document.addEventListener('gesturestart', function(event) {
            gestureStart(event);
        }, false);
        document.addEventListener('gesturechange', function(event) {
            gestureChange(event);
        }, false);
        document.addEventListener('gestureend', function(event) {
            gestureEnd(event);
        }, false);
    }else{
        //ratioZoom=1;
        $("svg").bind('mousedown',mouseDown);
        $("svg").bind("mouseup", mouseUp);
        $("svg").bind("mousemove", mouseMove);
        $("svg").bind('click', svgClickedBckg);
    } 
    resetData();
}

function resetData(){
    itemFocused=0;
    selectedItemOver = null;
    selectedItem = null;
    selectedIndex = -1;
    selectedIndexOver = -1;
    selectedRow=-1;
    bOver = 0;
    nbrClick=0;
//back_drag=0;
}

function svgClickedBckg(e) { 
    //if(e.clientX>=1100)
    //   return;
    if(bOver==0){
        closeMenuObj();
        if(activeView=="ROOM"){
            var btnCarton = document.getElementById("vueCarton");
            btnCarton.disabled=true;
        }
        nbrClick=0;
        if((itemFocused==1) ){
            itemFocused=0;
            if(m_select==0){
                $(selectedItem.firstChild).attr('stroke', 'black');
            //removeItemFromClipboard();
            }
        //hideCP();
        }
        start_drag=0;
        resetData();
        if(back_drag==0)
            back_drag=1;
        if(back_drag==1)
            back_drag=0;
    }                
}

function resetClick(){
    nbrClick=0;
}

function svgClicked() { 
    back_drag=0;                
    nbrClick = parseInt(nbrClick)+1;
    window.setTimeout(resetClick,200);
    if(nbrClick==2){
        if(activeView=="ROOM"){
            vueCartonBtnPressed();
            svgOut();
            
        }else{
            if(activeView=="CARTON")
                vuePaletteBtnPressed();
            svgOut();
        }
    } 
} 

 
function svgOver() {        
    var item;
    bOver=1;
    if( (itemFocused==1) && (start_drag==0)){
        selectedItemOver=this;
        
        item = selectedItemOver.getAttributeNS(null,"id");
        var row = getRowNumArrec(item,ID_HEADER);
        if(row!=selectedIndex){
            selectedIndexOver = row;
        }else
            selectedIndexOver=selectedIndex;
    }
                    
    if( (itemFocused==0) && (start_drag==0)){
        selectedItem = this;
        item = this.id;
        item = selectedItem.getAttributeNS(null,"id");
        
        selectedIndex = getRowNumArrec(item,ID_HEADER);
        
        if(m_select==0){
            transx = getTransX(selectedItem);
            transy = getTransY(selectedItem);
        }else{
            var group = document.getElementById("mSelectId");
                transx = getTransX(group);
                transy = getTransY(group);
        }
        console.info("trans="+transx+","+transy);
        
    }
    if((selectedIndexOver != selectedIndex)&&(start_drag==0)&&(m_select==0)){
        $(this.firstChild).attr('stroke', 'lime'); 
        //$(this).animate({svgTransform: 'rotate(360)'}, 2000);
    }
} 

function svgOut() { 
    bOver=0;
    nbrClick=0;
    if( (itemFocused==0) && (m_select==0) )
        $(this.firstChild).attr('stroke', 'black'); 
    if((selectedIndexOver != selectedIndex)&& (start_drag==0) && (selectedIndexOver!=-1) && (itemFocused==1) && (m_select==0))
        $(selectedItemOver.firstChild).attr('stroke', 'black'); 
    selectedIndexOver=-1;
    selectedItemOver = null;
}
            
function svgDrag(event, ui){
    // update coordinates manually, since top/left style props don't work on SVG
    $(this).attr('x', ui.position.left); 
    $(this).attr('y', ui.position.top); 
}
        
function getNbrCaisse(lclSelectedItem){
    var item = selectedItem.getAttributeNS(null,"id");
    return searchInArray(VIEW_HEADER,item,arrec);
}

function mouseMove(e){
    m_locked=0;
    nbrClick=0;
    longClickStarted=0;
    clearTimeout(pressTimer);
    var el = e.target;
    posx = e.clientX;
    posy= e.clientY;
    
    if(back_drag==1){
        dx_back = (e.clientX-x_ori_back)/ratioZoom;
        dy_back = (e.clientY-y_ori_back)/ratioZoom;  
        var svg = $('#svgbasics').svg('get');
        zoomx =  parseInt(dx_back);
        zoomy =  parseInt(dy_back);
        svg.configure({
            viewBox: zoomx+' '+zoomy+' '+zoomw+' '+zoomh
        });        
    }else{
        back_drag=0;
    }
    
    if(start_drag==1){
        if(!bDragging){            
            bDragging=1;
        }
        dx = (e.clientX-GetInitCoordx)/ratioZoom - (-transx);
        dy = (e.clientY-GetInitCoordy)/ratioZoom - (-transy);
        if(m_select===1){
            console.info("dx="+dx+" dy="+dy);
            $(selectedItem.parentNode).attr("transform", "translate("+dx+","+dy+") rotate("+rotate_deg+")");
        }else
            $(selectedItem).attr("transform", "translate("+dx+","+dy+") rotate("+rotate_deg+")");
    }else{
        bDragging=0;
    }
}

function tmouseMove(e){
    m_locked=0;
    var touch = e.touches[0];
    mouseX = touch.pageX;
    mouseY = touch.pageY;
    
    longClickStarted=0;
    clearTimeout(pressTimer);
    
    if((back_drag==1)&&(!handlingGesture)){
        dx_back = (mouseX-x_ori_back)*ratioZoom;
        dy_back = (mouseY-y_ori_back)*ratioZoom;  
        var svg = $('#svgbasics').svg('get');
        zoomx =  parseInt(dx_back);
        zoomy =  parseInt(dy_back);
        svg.configure({
            viewBox: zoomx+' '+zoomy+' '+zoomw+' '+zoomh
        });        
    }else{
        back_drag=0;
    }
    
    if(start_drag==1){
        if(!bDragging){            
            bDragging=1;
        }
        dx = (mouseX-GetInitCoordx)*ratioZoom - (-transx);
        dy = (mouseY-GetInitCoordy)*ratioZoom - (-transy);
        $(selectedItem).attr("transform", "translate("+dx+","+dy+") rotate("+rotate_deg+")");
    }else{          
        bDragging=0;
    }
}

function tmouseDown(e){
    var arrow=[];
    var touch = e.changedTouches.item(0);
    var el = touch.target;
    var id = el.parentNode.getAttributeNS(null,"id");
    //document.getElementById("verb4").value="id="+id;
    mouseX = touch.pageX;
    mouseY = touch.pageY;
    if(m_locked==0){
    if((id!="svgbasics")&&( (id.indexOf("gpal")!=-1)||(id.indexOf("gcai") != -1))){
        previousSelectedItem = selectedItem;
        selectedItem = el.parentNode;
        selectedIndex = getRowNumArrec(id,ID_HEADER);
        selectedRow = selectedIndex;
        var arrow = arrec[selectedRow];
        
        if((previousSelectedItem)&&(m_select==0))
            $(previousSelectedItem.firstChild).attr('stroke','black'); 
        if(m_select==0)
            $(selectedItem.firstChild).attr('stroke','red'); 
        
        if(m_select==0){
            $(selectedItem.firstChild).attr('stroke','red');
        }else{
 
            var color = el.getAttributeNS(null,'stroke');
            //alert("color="+color);
            if(color=="blue"){
                $(selectedItem.firstChild).attr('stroke', 'black');
                removeItemFromClipboard();
            }else{
                $(selectedItem.firstChild).attr('stroke', 'blue');
                addItemToClipboard();
            }
        }
    
                
        rotate_deg = parseInt(arrow[ROTATE_HEADER]);    
        
        //document.getElementById("verb4").value=id;
        if(activeView=="ROOM"){
            if(selectedItem){
                var arrow = arrec[selectedIndex];
                document.getElementById("textePalette").value = arrow[TEXTE_HEADER];
                document.getElementById("nbrCarton").value=arrow[QUANTITE_HEADER];
            }
            var btnCarton = document.getElementById("vueCarton");
            btnCarton.disabled=false;
        }
        
        if(activeView=="CARTON"){
            if(selectedItem){
                var arrow = arrec[selectedIndex];
                document.getElementById("prefix").value=arrow[ARG1_HEADER];
                document.getElementById("article").value=arrow[ARG2_HEADER];
                document.getElementById("nbrCoiffes").value=arrow[QUANTITE_HEADER];
            }
            var btnCarton = document.getElementById("vueCarton");
            btnCarton.disabled=true;
        }
        
        if(longClickStarted==0){
                pressTimer = window.setTimeout(setLongClick,600);
                longClickStarted=1;
                posx = e.clientX;
                posy = e.clientY;
            }
            
        selArr = arrec[selectedRow];
        transx = arrow[TRANSX_HEADER];
        transy = arrow[TRANSY_HEADER];
        bOver=1;
        back_drag=0;
        start_drag = 1;
        itemFocused=1;
    }else{
        bOver=0;
        start_drag = 0;
        if(id=="svgbasics"){
            itemFocused=0;
            var btnCarton = document.getElementById("vueCarton");
            btnCarton.disabled=true;
            if(selectedItem)
                $(selectedItem.firstChild).attr('stroke','black'); 
            back_drag=1;
        }
    }
        
    if(bOver==1){
        GetInitCoordx = mouseX;
        GetInitCoordy = mouseY;
        start_drag = 1;
        back_drag=0;
    }else{
        if(id=="svgbasics"){
            start_drag = 0;
            if(!handlingGesture){
                if(back_drag==0)
                    back_drag=1;
                x_ori_back=mouseX-zoomx/ratioZoom;
                y_ori_back=mouseY-zoomy/ratioZoom;
            }
            if (itemFocused==1){
                itemFocused=0;
                $(selectedItem.firstChild).attr('stroke', 'black'); 
            }
        }
       
        if(longClickStarted==0){
            pressTimer = window.setTimeout(setLongClick,600);
            longClickStarted=1;
            posx = mouseX;
            posy = mouseY;
        } 
    }
    m_locked=1;
    }
    
}

function mouseDown(e){
    //if(e.clientX>=1100)
    //    return;     
    if(m_locked==0){
        var el = e.target;
        var parent = el.parentNode;
        if(bOver==1){
            back_drag=0;
            //set the selected object at the of the others
            el.parentNode.parentNode.appendChild(el.parentNode); 
            
            //new item selected and previous selected
            if((selectedIndexOver != selectedIndex)&&(itemFocused==1)&&(selectedIndexOver!=-1) ){
                //if we are not in the multi selection mode
                if(m_select==0)
                    $(selectedItem.firstChild).attr('stroke', 'black');
                selectedItem=selectedItemOver;
                selectedIndex=selectedIndexOver;
                if(m_select==0){
                    GetInitCoordx = el.clientX;
                    GetInitCoordy = el.clientY;
                }else{
                    GetInitCoordx = el.parentNode.clientX;
                    GetInitCoordy = el.parentNode.clientY;
                }
                var arrow = arrec[selectedIndex];
                
                if(m_select==0){
                    transx = getTransX(selectedItem);
                    transy = getTransY(selectedItem);
                    rotate_deg = parseInt(arrow[ROTATE_HEADER]);
                }
                
                rotate_deg = parseInt(arrow[ROTATE_HEADER]);
                selectedRow = selectedIndex;
                start_drag = 1;
                if(activeView=="ROOM"){
                    var count = getNbrCaisse(selectedIndex);
                    var arrow = arrec[selectedRow];
                    arrow[QUANTITE_HEADER]=count;
                }
            }
            //item already selected            
            if((selectedIndexOver == selectedIndex)&&(itemFocused==1)&&(selectedIndexOver!=-1)){
                selectedItem=selectedItemOver;
                selectedIndex=selectedIndexOver;
                GetInitCoordx = e.clientX;
                GetInitCoordy = e.clientY;
                var arrow = arrec[selectedIndex];
                if(m_select==0){
                    transx = getTransX(selectedItem);
                    transy = getTransY(selectedItem);
                    rotate_deg = parseInt(arrow[ROTATE_HEADER]);
                }
                rotate_deg = parseInt(arrow[ROTATE_HEADER]);
                selectedRow = selectedIndex;
                start_drag = 1;
                if(activeView=="ROOM"){
                    var count = getNbrCaisse(selectedIndex);
                    var arrow = arrec[selectedRow];
                    arrow[QUANTITE_HEADER]=count;
                }
            }
            
            //new item selected, no previous
            if((selectedItem)&&(itemFocused==0)){
                itemFocused=1;
                start_drag = 1;
                GetInitCoordx = e.clientX;
                GetInitCoordy = e.clientY;
                var arrow = arrec[selectedIndex];
                console.info("arrow selected="+arrow);
                if(m_select==0){
                    transx = getTransX(selectedItem);
                    transy = getTransY(selectedItem);
                    rotate_deg = parseInt(arrow[ROTATE_HEADER]);
                }
                selectedRow = selectedIndex;
            }
   
            if(m_select===0){
                $(selectedItem.firstChild).attr('stroke','red');
            }else{
                var color = el.getAttributeNS(null,'stroke');
                if(color==="blue"){
                }else{
                    $(selectedItem.firstChild).attr('stroke', 'blue');
                     var group = document.getElementById("mSelectId");
                     group.appendChild(el.parentNode); 
                }
                var group = document.getElementById("mSelectId");
                transx = getTransX(group);
                transy = getTransY(group);
            }
             
            //handleBtnDown(selectedItem,selectedIndex);
            selArr = arrec[selectedRow];
        
            if(longClickStarted==0){
                pressTimer = window.setTimeout(setLongClick,600);
                longClickStarted=1;
                posx = e.clientX;
                posy = e.clientY;
            }
        }else{
            start_drag = 0;
            if (itemFocused==1){
                itemFocused=0;
                if(m_select==0){
                    $(selectedItem.firstChild).attr('stroke', 'black'); 
                }
            }
            if(back_drag==0){
                back_drag=1;
                x_ori_back=e.clientX-zoomx/ratioZoom;
                y_ori_back=e.clientY-zoomy/ratioZoom;
            }
            if(longClickStarted==0){
                pressTimer = window.setTimeout(setLongClick,600);
                longClickStarted=1;
                posx = e.clientX;
                posy = e.clientY;
            }
        }
        m_locked=1;
    }
}



var pressTimer;
var longClickStarted = 0;
function setLongClick(){   
    if(itemFocused==1){
        //display object context menu
        toggleMenuObject();
        longClickStarted=0;
        back_drag=0;
        clearTimeout(pressTimer);
    }else{
        if(bOver==1){
        //nothing
        }else{
            //display context menu
            toggleMenu();
            longClickStarted=0;
            back_drag=0;
            clearTimeout(pressTimer);
        }
    }
    
}
function mouseUp(e){
    m_locked=0;
    longClickStarted=0;
    back_drag=0;
    clearTimeout(pressTimer);
    if(back_drag==1){
        back_drag=0;
        updateViewCookie();
    }
    if((start_drag) &&(bDragging)){
        var arrow = arrec[selectedRow];
        arrow[TRANSX_HEADER]=dx;//*ratioZoom;
        arrow[TRANSY_HEADER]=dy;//*ratioZoom;
        changeArrayRow(selectedRow,arrow);
    }
    start_drag = 0;
    bDragging = 0;
    dx=0;
    dy=0; 
    
}
function tmouseUp(e){
    m_locked=0;
    longClickStarted=0;
    back_drag=0;
    clearTimeout(pressTimer);
    //alert("mouseup");
    if(back_drag==1){
        back_drag=0;
        updateViewCookie();
    }
                
    if((start_drag) &&(bDragging)){
        start_drag = 0;
        var arrow = arrec[selectedRow];
        arrow[TRANSX_HEADER]=dx;
        arrow[TRANSY_HEADER]=dy;
        changeArrayRow(selectedRow,arrow);
        transx=0;
        transy=0;
    }
    start_drag = 0;
    bDragging = 0;
    dx=0;
    dy=0;          
}
function gestureStart(event) {
    event.preventDefault();
    handlingGesture = true;
    back_drag=0;
    var node = event.target;
    
    x = zoomx;//parseInt(node.getAttributeNS(null, 'x'));
    y = zoomy;//parseInt(node.getAttributeNS(null, 'y'));
			
    width = zoomw;//parseInt(node.getAttributeNS(null, 'width'));
    height = zoomh ; // parseInt(node.getAttributeNS(null, 'height'));

    //alert(x + "," + y + "," + width + "," + height);
    var transform = (node.getAttributeNS(null, 'transform'));
    rotation = parseInt(transform.split('rotate(')[1].split(' ')[0]); // ouch
	
    if(isNaN(rotation)) {
        rotation = 0;
    }
}
		
function gestureChange(event) {
    event.preventDefault();
    var node = event.target;
    
    // scale
    /*var newWidth = width * event.scale;
    var newHeight = height * event.scale;
			
    var newX = x - (newWidth - width)/2;
    var newY = y - (newHeight - height)/2; 
						
    node.setAttributeNS(null, 'width', newWidth);
    node.setAttributeNS(null, 'height', newHeight);
    node.setAttributeNS(null, 'x', newX);
    node.setAttributeNS(null, 'y', newY);*/
    /*
     *var mydiv = document.getElementById("svgbasics");
    var curr_width = mydiv.offsetWidth;
    ratioZoom = newWidth/curr_width;
    var toto = document.getElementById("wheelvalue");
    var svg = $('#svgbasics').svg('get');
    toto.value=ratioZoom; 
    svg.configure({viewBox: newX+' '+newY+' '+newWidth+' '+newHeight});
    updateViewCookie();
    */
   
    var newWidth = width / event.scale;
    var newHeight = height / event.scale;
    //dx_back = (mouseX-x_ori_back);//ratioZoom;
    //dy_back = (mouseY-y_ori_back);//ratioZoom;  
    //document.getElementById("verb3").value="y="+dx_back;
    var svg = $('#svgbasics').svg('get');
    zoomw =  parseInt(newWidth);
    zoomh =  parseInt(newHeight);
    svg.configure({
        viewBox: zoomx+' '+zoomy+' '+zoomw+' '+zoomh
    });  
/*    
    // rotation
    var newRotation = rotation + event.rotation;
    var centerX = newX + newWidth/2;
    var centerY = newY + newHeight/2;
    setRotation(node, newRotation, centerX, centerY);
    */
}
		
function gestureEnd(event) {
    //rotation = rotation + event.rotation;
    updateViewCookie();
    handlingGesture = false;
}
		
function setRotation(node, rotation, x, y) {
    var centerX = x + width/2;
    var centerY = y + height/2;
		
    node.setAttributeNS(null, 'transform', 'rotate('+ rotation +' '+ x +' '+ y +')');
}


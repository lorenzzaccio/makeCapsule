/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var textboxgui = [];
var labelboxgui = [];
var svgRoot;
var svgEle;
var svgNode;
var gmenu;
var menu;
var myMapApp;
var textbox1;
var textbox2;
var display;
var rectBg;
var curseurZoom;
var tableIndex = 1;
var rowLength = 1;
var tableId = "myTable";
var selectedRow=0;
var selectedCol = 0;
var selectedValueCombo = "";
var step = 10;

    function addRow(tableId){
                var add = 0;
                var type = trim(document.getElementById('typeCombo').value);
                addRow(tableId,type);
   }


	
            function populateFontCombo(comboName){
                var fontArray = [];
                fontArray = font_init(fonts);	
            }

            function left(){
                var svg = $('#svgbasics').svg('get');
                zoomx = zoomx + step/ratioZoom;
                svg.configure({viewBox: zoomx+' '+zoomy+' '+zoomw+' '+zoomh});
                updateViewCookie();
            }
            function right(){
                var svg = $('#svgbasics').svg('get');
                zoomx = zoomx - step/ratioZoom;
                svg.configure({viewBox: zoomx+' '+zoomy+' '+zoomw+' '+zoomh});
                updateViewCookie();
            }
            function down(){
                var svg = $('#svgbasics').svg('get');
                zoomy = zoomy  - step/ratioZoom;
                svg.configure({viewBox: zoomx+' '+zoomy+' '+zoomw+' '+zoomh});
                updateViewCookie();
            }
            
            function up(){
                var svg = $('#svgbasics').svg('get');
                zoomy = zoomy  + step/ratioZoom;
                svg.configure({viewBox: zoomx+' '+zoomy+' '+zoomw+' '+zoomh});
                updateViewCookie();
            }
            
            function zoommoins(){
                var svg = $('#svgbasics').svg('get');
                zoomw = zoomw  + step/ratioZoom;
                zoomh = zoomh  + step/ratioZoom;
                svg.configure({viewBox: zoomx+' '+zoomy+' '+zoomw+' '+zoomh});
                updateViewCookie();
            }
            
            function zoomplus(){
                var svg = $('#svgbasics').svg('get');
                zoomw = zoomw  - step/ratioZoom;
                zoomh = zoomh  - step/ratioZoom;
                svg.configure({viewBox: zoomx+' '+zoomy+' '+zoomw+' '+zoomh});
                updateViewCookie();
            }     

//MENU

//var BTN_HEADER=0;
var k=0;
var INDEX_HEADER=0;
var ID_HEADER=1;
var X_HEADER=2;
var Y_HEADER=3;
var TRANSX_HEADER=4;
var TRANSY_HEADER=5;
var ROTATE_HEADER=6;
var FORME_HEADER=7;
var WIDTH_HEADER=8;
var HEIGHT_HEADER=9;
var ARG1_HEADER=10;
var ARG2_HEADER=11;
var TEXTE_HEADER=12;
var FILLCOLOR_HEADER=13;
var STROKECOLOR_HEADER=14;
var TYPE_HEADER=15;
var LIEU_HEADER=16;
var VIEW_HEADER = 17;
var WARE_HEADER= 18;
var QUANTITE_HEADER=19;
var ORDER_HEADER=20;
var SYNC_HEADER=21;

function rectOver(){
    rectOver=true;
}

function rectOut(){
    rectOver=false;
}

function initialize() {
                        display = getDisplay(document,'mainMenu');
                        myMapApp = new mapApp(display,false,undefined);
                        //styles
                        var textStyles = {"font-family":"Arial,Helvetica","font-size":32,"fill":"dimgray"};
                        var boxStyles = {"fill":"orange","stroke":"dimgray","stroke-width":1.5};
                        var labelboxStyles = {"fill":"none","stroke":"none","stroke-width":1.5};
                        var cursorStyles = {"stroke":"red","stroke-width":1.5};
                        var selBoxStyles = {"fill":"blue","opacity":0.5};
			var textYOffset = 35;
                        var oriy = -350;
                        var orix = 50;
                        var endy = 1000;
                        var endx = 1000;
                        
                        var rowLength = 0;
                        //first a few styles
                        var buttonTextStyles = {"font-family":"Arial,Helvetica","fill":"black","font-size":32};
                        var buttonStyles = {"fill":"orange"};
                        var shadeLightStyles = {"fill":"white"};
                        var shadeDarkStyles = {"fill":"navy"};
                        
                        
                        var arrow = new Array(COL_NUMBER);
                        if(document.getElementById(tableId)!= null)
                            rowLength = document.getElementById(tableId).rows.length;    
                        if(rowLength>0){
                            arrow= readRow(tableId,tableIndex);
                        }
                         
                       var t=1400;
                        lblx = new label("lblx","mainMenu","",25,orix +100,oriy +100,800,50,textYOffset,textStyles,labelboxStyles,cursorStyles,selBoxStyles,undefined,undefined);//"[a-zA-Z ]"
                        lbly = new label("lbly","mainMenu","",25,orix +100,oriy +130,800,50,textYOffset,textStyles,labelboxStyles,cursorStyles,selBoxStyles,undefined,undefined);//"[a-zA-Z ]"
                        lblState = new label("lblState","mainMenu","",50,orix +100,oriy +160,850,50,textYOffset,textStyles,labelboxStyles,cursorStyles,selBoxStyles,undefined,undefined);//"[a-zA-Z ]"
                        lblItemSelected = new label("lblItemSelected","mainMenu","",25,orix +100,oriy +190,850,50,textYOffset,textStyles,labelboxStyles,cursorStyles,selBoxStyles,undefined,undefined);//"[a-zA-Z ]"
                        lblDrag = new label("lblDrag","mainMenu","",25,orix +100,oriy +210,850,50,textYOffset,textStyles,labelboxStyles,cursorStyles,selBoxStyles,undefined,undefined);//"[a-zA-Z ]"
                        lbltransx = new label("lbltransx","mainMenu","",25,orix +100,oriy +240,800,50,textYOffset,textStyles,labelboxStyles,cursorStyles,selBoxStyles,undefined,undefined);//"[a-zA-Z ]"
                        lbltransy = new label("lbltransy","mainMenu","",25,orix +100,oriy +270,800,50,textYOffset,textStyles,labelboxStyles,cursorStyles,selBoxStyles,undefined,undefined);//"[a-zA-Z ]"
                        lblIndex = new label("lblIndex","mainMenu","",25,orix +100,oriy +300,850,50,textYOffset,textStyles,labelboxStyles,cursorStyles,selBoxStyles,undefined,undefined);//"[a-zA-Z ]"
            }
            
            function showRoses(comboboxName,selectedValues,selectedIndizes) {
                selectedValueCombo = selectedValues.join(",");
                if (selectedValueCombo.length === 0) {
                    selectedValueCombo = " ";
                }
            }

            function initMenu(){
                if(rowLength>0){
                    tableIndex =1;
                    selectedRow = 1;
                    var arrow= readRow(tableId,tableIndex);
                    setValueTextBox(arrow);
                }
            }
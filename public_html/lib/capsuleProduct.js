/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var COL_NUMBER_STOCK = 12;
var COL_NUMBER = 12;
var COOKIE_NAME = "stock";

var typeArr = [];
typeArr[0] = "vue_dev";
typeArr[1] = "vue_avant";
typeArr[2] = "vue_arriere";
typeArr[3] = "vude_cote_droit";
typeArr[4] = "vue_cote_gauche";
typeArr[5] = "texte";
typeArr[6] = "liseret";
typeArr[7] = "logo";
typeArr[8] = "cartouche";

function loadDefaultValue(type) {
    var defaultValue = [];
    if ((type == selArr[TYPE_HEADER]) && (itemFocused == 1)) {
        defaultValue = copyRow(selArr);
        defaultValue[TRANSX_HEADER] = 0;
        defaultValue[TRANSY_HEADER] = 0;
        defaultValue[ARG1_HEADER] = document.getElementById("prefix").value;
        defaultValue[ARG2_HEADER] = document.getElementById("article").value;
        defaultValue[QUANTITE_HEADER] = document.getElementById("nbrCoiffes").value;
        return defaultValue;
    }

    if (type == "vueDev") {
        defaultValue[1] = 0;
        defaultValue[2] = "4.22";
        defaultValue[3] = "orange";
        defaultValue[4] = 122;
        defaultValue[5] = 34;
        defaultValue[6] = "jonc cannelure";
        defaultValue[7] = "class open";
        defaultValue[8] = "helio";
        defaultValue[9] = 0;
        defaultValue[10] = 0;
    }

    if (type == "vueAvant") {
        defaultValue[1] = decalageVueAvantx;
        defaultValue[2] = decalageVueAvanty;
        defaultValue[3] = "orange";
        defaultValue[4] = 0;
        defaultValue[5] = 0;
        defaultValue[6] = "jonc cannelure";
        defaultValue[7] = "class open";
        defaultValue[8] = "helio";
        defaultValue[9] = 0;
        defaultValue[10] = 1;
    }
    if (type == "vueArriere") {
        defaultValue[1] = decalageVueArrx;
        defaultValue[2] = decalageVueArry;
        defaultValue[3] = "orange";
        defaultValue[4] = 0;
        defaultValue[5] = 0;
        defaultValue[6] = "jonc cannelure";
        defaultValue[7] = "class open";
        defaultValue[8] = "helio";
        defaultValue[9] = 0;
        defaultValue[10] = 2;
    }
    if (type == "texte") {
        defaultValue[1] = "champagne";
        defaultValue[2] = fonts[0];
        defaultValue[3] = "black";
        defaultValue[4] = "7";
        defaultValue[5] = "23";
        defaultValue[6] = "1";
        defaultValue[7] = "0.1";
        defaultValue[8] = "mac";
        defaultValue[9] = 0;
        defaultValue[10] = 20;
    }

    if (type == "liseret") {
        defaultValue[1] = 0;
        defaultValue[2] = 0;
        defaultValue[3] = "black";
        defaultValue[4] = "10";
        defaultValue[5] = "0";
        defaultValue[6] = "1";
        defaultValue[7] = "0.1";
        defaultValue[8] = "mac";
        defaultValue[9] = 0;
        defaultValue[10] = 30;
    }

    if (type == "logo") {
        defaultValue[1] = 0;
        defaultValue[2] = 0;
        defaultValue[3] = 0;
        defaultValue[4] = 0.2;
        defaultValue[5] = 0;
        defaultValue[6] = 1;
        defaultValue[7] = 0;
        defaultValue[8] = "mac";
        defaultValue[9] = "miniLogoCapsTech.svg";
        defaultValue[10] = 50;
    }

    if (type == "cotation") {
        defaultValue[1] = decalageVueAvantx;
        defaultValue[2] = decalageVueAvanty;
        defaultValue[3] = "red";
        defaultValue[4] = "black";
        defaultValue[5] = 0;
        defaultValue[6] = 0;
        defaultValue[7] = 0;
        defaultValue[8] = 0;
        defaultValue[9] = 0;
        defaultValue[10] = 80;
    }

    if (type == "cartouche") {
        defaultValue[1] = 1;
        defaultValue[2] = -100;
        defaultValue[3] = 450;
        defaultValue[4] = 0.55;
        defaultValue[5] = 0;
        defaultValue[6] = 1;
        defaultValue[7] = 0;
        defaultValue[8] = "mac";
        defaultValue[9] = "cartouche.svg";
        defaultValue[10] = 100;
    }

    return defaultValue;
}
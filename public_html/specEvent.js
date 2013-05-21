/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function handleBtnDown(lclSelectedItem,lclSelectedIndex){
    if(activeView=="ROOM"){
                if(lclSelectedItem){
                    var arrow = arrec[lclSelectedIndex];
                    document.getElementById("textePalette").value = arrow[TEXTE_HEADER];
                    document.getElementById("nbrCarton").value=arrow[QUANTITE_HEADER];
                    rotate_deg = parseInt(arrow[ROTATE_HEADER]);
                }
                var btnCarton = document.getElementById("vueCarton");
                btnCarton.disabled=false;
            }
        
            if(activeView=="CARTON"){
                if(lclSelectedItem){
                    var arrow = arrec[lclSelectedIndex];
                    document.getElementById("prefix").value=arrow[ARG1_HEADER];
                    document.getElementById("article").value=arrow[ARG2_HEADER];
                    document.getElementById("nbrCoiffes").value=arrow[QUANTITE_HEADER];
                    rotate_deg = parseInt(arrow[ROTATE_HEADER]);
                }
                var btnCarton = document.getElementById("vueCarton");
                btnCarton.disabled=false;
            }
}
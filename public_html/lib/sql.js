/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var httpAddress ="";//127.0.0.1/touch/";// "192.168.1.14/touch/";

function ajaxFunction(){
	var ajaxRequest;  // The variable that makes Ajax possible!
	
	try{
		// Opera 8.0+, Firefox, Safari
		ajaxRequest = new XMLHttpRequest();
	} catch (e){
		// Internet Explorer Browsers
		try{
			ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try{
				ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e){
				// Something went wrong
				alert("Your browser broke!");
				return false;
			}
		}
	}
	// Create a function that will receive data sent from the server
	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == 4){
			//var ajaxDisplay = document.getElementById('ajaxDiv');
			var ajaxDisplay = ajaxRequest.responseText;
                        
                        
		}
	}
	var queryString = "?client_id=" + selectedIndex;// + "&wpm=" + wpm + "&sex=" + sex;
	ajaxRequest.open("GET", "getRequest.php" + queryString, true);
	ajaxRequest.send(null); 
}

function setDb(arrow){
	var ajaxRequest;  // The variable that makes Ajax possible!
	var http;
	/*
         *try{
		// Opera 8.0+, Firefox, Safari
		http = new XMLHttpRequest();
	} catch (e){
		// Internet Explorer Browsers
		try{
			http = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try{
				http = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e){
				// Something went wrong
				alert("Your browser broke!");
				return false;
			}
		}
	}*/
	var url = "setRequest.php";
        var params = query;
        http.open("POST", url, true);

        //Send the proper header information along with the request
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.setRequestHeader("Content-length", params.length);
        http.setRequestHeader("Connection", "close");
        http.send(params);
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
		alert(http.responseText);
            }
        }
        

	//ajaxRequest.open("POST", "setRequest.php" + queryString, true);
	//ajaxRequest.send(null); 
        
}
function send_array(arrow){
        var req = {'tab[]' : arrow , type : 'demo'};
        $.ajax({
                   type: "POST",
                   url: "php/setRequest.php",
                   data: req ,
                   success: function(x){
                     $('#resultat').html(x);
                   }
                 });
}

function update(val1,val2,cond1,cond2){
        var tab=[];
        tab[0]=val1;
        tab[1]=val2;
        tab[2]=cond1;
        tab[3]=cond2;
        
        var req = {'tab[]' : tab , type : 'demo'};
        $.ajax({
                   type: "POST",
                   url: "php/update.php",
                   data: req ,
                   success: function(x){
                     $('#resultat').html(x);
                   }
                 });
}
function sendFile(arrow,file){        
        var req = {'tab[]' : arrow,'exportfile' : file , type : 'sync'};
        $.ajax({
                   type: "POST",
                   url: "php/download.php",
                   data: req ,
                   success: function(x){
                     $('#resultat').html(x);
                     alert(x + "ligne(s) copiée(s)");
                   }
                 });
}
function uploadFile(){
    //var req = {'enctype="multipart/form-data"' : filename , type : 'sync'};
    //var file=document.getElementById("file");
    var formData = new FormData($('form')[0]);
    $.ajax({
        url: 'upload.php',  //server script to process data
        type: 'POST',
        xhr: function() {  // custom xhr
            myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){ // check if upload property exists
                myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // for handling the progress of the upload
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
    /*
        $.ajax({
                   type: "POST",
                   url: "upload_file.php",
                   data: req ,
                   success: function(x){
                     $('#resultat').html(x);
                     alert(x + "file uploaded as"+filename);
                   }
                 });*/
}
function progressHandlingFunction(e){
    if(e.lengthComputable){
        $('progress').attr({value:e.loaded,max:e.total});
    }
}
function errorHandler(){
    alert("Oups, error !!!");
}
function beforeSendHandler(){
    alert("ready to send");
}
function completeHandler(){
    alert("file uploaded");
}

function readFile(file){
    stock.storeRemoveAll();
    initArray();
    stock.init();
    arrec=null;
    arrec=[];   
 
    
    var req = {'filepath' : file , type : 'sync'};
        $.ajax({
                   type: "POST",
                   url: "php/readExport.php",
                   data: req ,
                   success: function(x){
                     //$('#resultat').html(x);
                     
                     var tmparrow = x.split(";");
                     var j=0;
                     var val=0;
                     var max = 0;
                     for(i=1;i<tmparrow.length-1;i++){
                        arrow=tmparrow[i].split(","); 
                        recordLine(arrow);
                        arrec[j] = arrow;
                        //val = arrow[INDEX_HEADER];
                        // if(val>max)
                        //     max = val;
                        j++;
                     }
                     //window.localStorage.setItem("stock:index", stock.index = max++);
                     if(j>0)
                         drawcaps();
                     
                     //$('#resultat').html(arrow);
                   }
                 });
}

function ftp(filename){
    var file ="";
    file = filename;
    var req = {'exportfile' : file , type : 'sync'};
        $.ajax({
                   type: "POST",
                   url: "php/ftp.php",
                   data: req ,
                   error: function(x) {
                       alert("Erreur d'envoi du fichier");
                   },
                   success: function(x){
                       if(x=="1")
                       alert("Fichier envoyé");
                   else
                       alert("Erreur d'envoi du fichier");
                       //$('#resultat').html(x);
                     }
                    
                 });
}

function syncM2S(arrow){        
        var req = {'tab[]' : arrow , type : 'sync'};
        $.ajax({
                   type: "POST",
                   url: "php/duplicate.php",
                   data: req ,
                   success: function(x){
                     $('#resultat').html(x);
                   }
                 });
}
function syncS2MPhp2(){
    	var ajaxRequest;  // The variable that makes Ajax possible!
	try{
		// Opera 8.0+, Firefox, Safari
		ajaxRequest = new XMLHttpRequest();
	} catch (e){
		// Internet Explorer Browsers
		try{
			ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try{
				ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e){
				// Something went wrong
				alert("Your browser broke!");
				return false;
			}
		}
	}
	// Create a function that will receive data sent from the server
	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == 4){
			//var ajaxDisplay = document.getElementById('ajaxDiv');
			var ajaxDisplay = ajaxRequest.responseText;
                        syncLclStorage(ajaxRequest.responseText);
		}
	}
	var queryString = "?client_id=" + selectedIndex;// + "&wpm=" + wpm + "&sex=" + sex;
	ajaxRequest.open("GET", httpAddress+"php/syncS2M.php" + queryString, true);
	ajaxRequest.send(null); 
}
function syncS2MPhp(){
    var arr = [];
    
/* call the php that has the php array which is json_encoded */
                $.getJSON(httpAddress+'php/syncS2M.php', function(data) {
                        /* data will hold the php array as a javascript object */
                        arr = data[0];
                        syncLclStorage(arr);
                        /*
                        $.each(data, function(key) {
                            var arr = [];
                            arr.push(JSON.parse(data[key]));
                            syncLclStorage(arr);
                                //$('ul').append('<li id="' + key + '">' + val.first_name + ' ' + val.last_name + ' ' + val.email + ' ' + val.age + '</li>');
                        });*/
                });
}
function syncS2MArticlePhp(){
    var arr = [];
    /* call the php that has the php array which is json_encoded */
    $.getJSON(httpAddress+'php/syncS2MArticle.php', function(data) {
    /* data will hold the php array as a javascript object */
    arr = data[0];
    syncLclStorageArticle(arr); 
    });
}
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

            
var DEBUG = 0;
var STORAGE;// = "stock";    
var PARSER;// = /stock\d+/;
var index=1;
//var staticMemory = {
    function staticMemory(storageName,parserKey){
        STORAGE = storageName;  
        PARSER = parserKey;
        index: window.localStorage.getItem(STORAGE+":index");
    }
    //index: window.localStorage.getItem(STORAGE+":index"),
    
    staticMemory.prototype.init = function() {
        arrec_index=0;
        // initialize the storage index
        if (!this.index) {
            window.localStorage.setItem(STORAGE+":index", this.index = 1);
        }

        // initialize the table and populate it with data stored in web storage
        if (window.localStorage.length - 1) {
            var i, key;
            for (i = 0; i < window.localStorage.length; i++) {
                key = window.localStorage.key(i);
                if (PARSER.test(key)) {
                    this.tableAdd(JSON.parse(window.localStorage.getItem(key)));
                }
            }
        }
        
    }
    staticMemory.prototype.getNewIndex = function(){
        return window.localStorage.getItem(STORAGE+":index");
    }
    staticMemory.prototype.storeAdd = function(entry) {
        entry.index = this.index;
        window.localStorage.setItem(STORAGE+this.index, JSON.stringify(entry));
        if(DEBUG==1)
            console.log("added :"+JSON.stringify(entry));
        window.localStorage.setItem(STORAGE+":index", ++this.index);
        if(DEBUG==1){
        //dump localstorage
        for (var i = 0; i < window.localStorage.length; i++){
            var key = window.localStorage.key(i);
            if (PARSER.test(key)) {
                var arrow  = [];
                var j=0;
                var key2;
                var line  = JSON.parse(window.localStorage.getItem(key));
                for (key2 in line) {
                    arrow[j] = line[key2];
                    j++;
                }
                console.info("list :"+key+"-"+arrow[1]);
            }
        }
    }
    }
    staticMemory.prototype.storeRead = function(entry){
        
    }
    staticMemory.prototype.storeEdit= function(entry) {};
    staticMemory.prototype.storeUpdate = function(entry) {
        for (var i = 0; i < window.localStorage.length; i++){
            var key = window.localStorage.key(i);
            if (PARSER.test(key)) {
                var line  = JSON.parse(window.localStorage.getItem(key));
                if(line.id==entry.id){
                    window.localStorage.setItem(key, JSON.stringify(entry));
                    return;
                }
                
            }
        }
    }
    staticMemory.prototype.storeRemoveAll = function() {
        window.localStorage.clear();
        window.localStorage.setItem(STORAGE+":index", 1);
    }
    staticMemory.prototype.remove = function(entry){
        j=0;
        i=0;
        
        if (window.localStorage.length - 1) {
            var  i, key;
            var l=window.localStorage.length;
            for (i = 0; i < l; i++) {
                key = window.localStorage.key(i);
                if (PARSER.test(key)) {
                    var obj = JSON.parse(window.localStorage.getItem(key));
                    var toto = obj.id;
                
                    if(toto==entry){
                        if(DEBUG==1)
                            console.warn("removed :"+window.localStorage.getItem(key));
                        window.localStorage.removeItem(key);
                        if(DEBUG==1){
                        //dump localstorage
                        for (var i = 0; i < window.localStorage.length; i++){
                            var key = window.localStorage.key(i);
                            if (PARSER.test(key)) {
                                var arrow  = [];
                                var j=0;
                                var key2;
                                var line  = JSON.parse(window.localStorage.getItem(key));
                                for (key2 in line) {
                                    arrow[j] = line[key2];
                                    j++;
                                }
                                console.info("list :"+key+"-"+arrow[1]);
                            }
                        }
                       }
                    }
                
                }
            }
        }
    }
    staticMemory.prototype.getLength = function(){
        var length=0;
        if (window.localStorage.length - 1) {
            var i, key;
            for (i = 0; i < window.localStorage.length; i++) {
                key = window.localStorage.key(i);
                if (PARSER.test(key)) {
                    length++;
                }
            }
        }
        return length;
    }
    
    staticMemory.prototype.tableAdd = function(entry) {
        var arrow  = [];
        var  key,j;
        j=0;
        //console.info("in tableAdd");
        for (key in entry) {
            if (entry.hasOwnProperty(key) ){//&& !(key == -1) && !(key =="index")) {
                arrow[j] = entry[key];
                j=j+1;
            }
        }
        arrec[arrec_index] = arrow;
        arrec_index++;
    }
    
    staticMemory.prototype.tableEdit = function(entry) {}
    staticMemory.prototype.tableRemove = function(entry) {}
//};


            
var art_index = 0;            
var article = {
            
    index: window.localStorage.getItem("article:index"),

    init: function() {
        art_index = 0;
        // initialize the storage index
        if (!article.index) {
            window.localStorage.setItem("article:index", article.index = 1);
        }

        // initialize the form
        
        // initialize the table and populate it with data stored in web storage
        if (window.localStorage.length - 1) {
            var stock_list = [], i, key;
            for (i = 0; i < window.localStorage.length; i++) {
                key = window.localStorage.key(i);
                if (/article\d+/.test(key)) {
                    article.artTableAdd(JSON.parse(window.localStorage.getItem(key)));
                    //stock_list.push(JSON.parse(window.localStorage.getItem(key)));
                }
            }
            /*
            if (stock_list.length) {
                stock_list
                    .sort(function(a, b) {
                        return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
                    })
                    .forEach(article.artTableAdd);
            }*/
        }
        
    },
    artAdd: function(entry) {
        entry.index = article.index;
        window.localStorage.setItem("article"+ entry.index, JSON.stringify(entry));
        article.artTableAdd(entry);
        window.localStorage.setItem("article:index", ++article.index);
        art_index++;
        //console.log("new entry ...");*/
    },
    artRead:function(entry){
        
    },
    artEdit: function(entry) {},
    artUpdate: function(entry) {window.localStorage.setItem("article"+ entry.index, JSON.stringify(entry));},
    artRemoveAll: function(entry) {
        art_index=0;
        window.localStorage.setItem("article:index", article.index = 1);
        window.localStorage.clear();
        window.localStorage.setItem("article:index", 1);
            
    },
    getLength:function(entry){
        var length=0;
      if (window.localStorage.length - 1) {
            var i, key;
            for (i = 0; i < window.localStorage.length; i++) {
                key = window.localStorage.key(i);
                if (/article\d+/.test(key)) {
                    length++;
                }
            }
      }
      return length;
    },
    artTableAdd: function(entry) {
        var arrow  = [];
        var  key,j;
        j=0;
        for (key in entry) {
            if (entry.hasOwnProperty(key)) {
                arrow[j] = entry[key];
                j=j+1;
            }
        }
        art_array[art_index] = arrow;
        art_index++;
    },
    artTableEdit: function(entry) {},
    artTableRemove: function(entry) {}
    
};

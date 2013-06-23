
/* Menucool Color Picker v2012.6.30. http://www.MenuCool.com*/

var MC=MC||{};
MC.cPC=function(a,b){typeof OnColorChanged!=="undefined"&&OnColorChanged(a,b)};
MC.ColorPicker=function(){
    var b=function(a,b,c){
        if(a.addEventListener)a.addEventListener(b,c,0);
        else if(a.attachEvent)a.attachEvent("on"+b,c);
        else a["on"+b]=c
    },
    d=function(a){if(!a)return 0;
        var b=/(^| )color( |$)/;
        return b.test(a)
    },
    a,c=function(){this.a=this.b=this.c=null;
        this.i=-1;
        this.R=[];
        this.S=[];
        this.h()
    };
    c.prototype={
        d:function(b){
            var a=document.createElement("div");
            a.className="clear";
            b.appendChild(a)},
        e:function(b,c,d){
            var a=document.createElement("div");
            if(b=="TT"){a.className="transChooser";
                a.setAttribute("rgb","transparent")}else{a.style.backgroundColor="#"+b+d+c;
                a.setAttribute("rgb","#"+b+d+c)}return a
        },
        f:function(a){
            a.cancelBubble=true;
            a.f&&a.f()
        },
        g:function(){
            for(var b,a=this.c,h=["00","00","11","22","33","44","55","66","77","88","99","AA","BB","CC","DD","EE","FF","TT"],g=0;g<18;g++){b=this.e(h[g],h[g],h[g]);
            a.appendChild(b)}this.d(a);
            for(var d=["00","33","66","99","CC","FF"],c=0;c<6;c++){
                for(var f=0;f<3;f++)
                    for(var e=0;e<6;e++){
                    b=this.e(d[f],d[e],d[c]);a.appendChild(b)
                }
                this.d(a)
            }
            this.d(a);
            for(var c=0;c<6;c++){
                for(var f=3;f<6;f++)
                   for(var e=0;e<6;e++){
                       b=this.e(d[f],d[e],d[c]);
                       a.appendChild(b)
                    }
                    this.d(a)
            }
        },
    h:function(){
        this.r=document.getElementById("colorpicker");
        if(this.r&&this.r.getAttribute("href").indexOf("uco")>0&&this.r.innerHTML.indexOf("ick")>0){
            this.a=document.createElement("div");
            this.a.id="hexBox";
            this.b=document.createElement("div");
            this.b.id="bgBox";
            this.c=document.createElement("div");
            this.c.id="colorContainer";this.j();
            this.r.innerHTML="";
            this.r.removeAttribute("href");
            this.r.appendChild(this.a);
            this.r.appendChild(this.b);
            this.r.appendChild(this.c);
            this.g();this.m();
            var a=this;
            b(document.body,"click",function(){if(a.i>-1)a.S[a.i].style.zIndex=1;a.o()})
        }
    },
    j:function(){b(this.c,"mouseover",this.k);
        b(this.c,"click",this.l)},k:function(b){if(b.target)var c=b.target;
        else c=b.srcElement;
        if(c.id!="colorContainer")a.b.style.backgroundColor=a.a.innerHTML=c.getAttribute("rgb");
        a.f(b)},l:function(c){
        if(c.target)var b=c.target;
        else b=c.srcElement;
        if(b.id!="colorContainer"){
            a.S[a.i].style.backgroundColor=a.R[a.i].value=b.getAttribute("rgb");
            a.S[a.i].style.zIndex=1;
            a.o();
            MC.cPC(b.style.backgroundColor,a.i)}a.f(c)
    },
    m:function(){
        for(var c=document.getElementsByTagName("input"),e=this,b=0,f=c.length;
        b<f;b++)
            if(d(c[b].className)){
                var a=this.R.length;
            if(c[b].i===undefined){
                this.R[a]=c[b];
                this.R[a].i=a;
                this.R[a].onchange=function(){e.n(e.S[this.i],this)};
                this.S[a]=document.createElement("span")
                ;this.S[a].i=a;
                this.S[a].className="colorChooser";
                this.R[a].parentNode.insertBefore(this.S[a],this.R[a].nextSibling);
                this.p(this.S[a]);
                this.n(this.S[a],this.R[a])
            }
        }
},
n:function(b,a){
    try{b.style.backgroundColor=a.value}catch(c){}
},
o:function(){
    this.r.style.display="none"
},
p:function(c){
    var a=this;
        b(c,"click",function(b){if(a.i>-1)a.S[a.i].style.zIndex=1;
            a.i=c.i;
            c.appendChild(a.r).style.display="block";
            a.S[a.i].style.zIndex=2;a.f(b)})
    }
};
var e=function(){
    if(!a)a=new c
};
(function(){b(window,"load",e)})();
return{refresh:function(){for(var b=0,c=a.R.length;b<c;b++)a.n(a.S[b],a.R[b])},reload:function(){a.m()}}}()
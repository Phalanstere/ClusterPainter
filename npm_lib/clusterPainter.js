/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */ /*global define */
var $               = require('jquery');
require('jquery-ui');
require('gsap');
var Q = require('q');

function ClusterPainter(params) {
  "use strict";
  var self = this;
  this.cluster = [];
  this.square  = null;  // the total screen
  this.ratio    = 1;     // screen ratio
  this.cleanArea = 0.96;
  this.length   = 0;      // number of invoked images  
  
  this.loaded    = []; // hold the already loaded images
 
  this.animations = [];  // holds the animations 
  
  this.old_jobs     = [];  // stores the jobs that need to be cleared with a new call   
  this.actual_jobs  = [];
  this.temp_jobs    = []; 
  
  this.stage        = false; 
  
  this.get_image = function() {
      
  };
  
  this.check_loaded = function(item) {
    return false;   
      
  };
  
  this.get_greensock_props = function(event) {
    var props,  
    config = {};

    
    props = ['left', 'top', 'opacity', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'rotation', 'width', 'height', 'zIndex', 'skewX', 'skewY',
        'border', 'borderRadius', 'background', 'fontSize', 'fontFamily',
        'letterSpacing', 'color', 'textShadow', 'boxShadow',
        'transition','ease', 'webkitFilter', 'webkitPerspective', 
    ];

    for (var i = 0; i < props.length; i++ ) {
        var key = props[ i ];
       
        
        if ( event[key] ) {
            config[key] = event[key];
        }
    }
    
    return config;  
    };
  

  
  
 // this returns the event - to be process later (in process animations)
 this.greensock_data = function(events) {
   var tl,
       el,
       config = {},
       delay, duration = 0,
       props,
       configs      = [],
       els          = [],
       durations    = [],
       delays       = [],
       data    = { 
                 configs: null,
                 els    : null
                 };
       
     for (var i = 0; i < events.length; i++) {
        config = self.get_greensock_props(events[i]);

        configs.push(config);
        el = document.getElementById( events[i].div );
        els.push(el);   
        
        duration = (events[i].duration / 1000).toFixed(2);
        durations.push(duration);
                
        delay = (events[i].delay / 1000).toFixed(2);
        delays.push(delay);
        };         
        
  data.configs      = configs;
  data.els          = els;
  data.durations    = durations;
  data.delays       = delays;

  return data;      
 };
 
 
 
 this.process_animations = function() {
   var tl, 
        i, j, 
        a;
   
   tl = new TimelineMax({  });
   tl.pause();  
     
   for (i = 0; i < self.animations.length; i++) {
    a = self.animations[i];
    for (j = 0; j < a.configs.length; j++)
     {
     tl.to( a.els[j], a.durations[j], a.configs[j], a.delays[j] );      
     }
    //  
    }  
   
   tl.play();
   
   // console.log("ACTUAL JOBS WERDEN OLD JOBS - in process animation");
   // self.old_jobs    = self.actual_jobs;
   

 };
 
 
 
/// event could be an array of events  
this.greensock_event = function(event, cb) {
                
        var tl,
            el,
            config = {},
            delay,
            props;

        el = null;
       
        
        /// ARRAY OF EVENTS
        if (Array.isArray(event) === true) 
            { 
            console.log("ARRAY");    
            var configs     = [],   // array of configs
                els         = [];   // array of dom elements
                
            
            
            for (var i = 0; i < event.length; i++) {
                
                config = self.get_greensock_props(event[i]);
                configs.push(config);
                el = document.getElementById( event[i].div );
                els.push(el);   
                
                };

             // testfall = els; 
             

             
             if (cb) tl = new TimelineMax({ onComplete: cb });
             else tl = new TimelineMax({  });
             
             tl.pause();
             for (var i = 0; i < event.length; i++) {

                tl.to( els[i], 1, configs[i], 0 ); 
                }
             tl.play();
                
            }
        /////////////////////// SINGLE EVENTS
        else
            {
            if (event.div) el = document.getElementById( event.div );          
            config = self.get_greensock_props(event);
            
    
            if ( event.delay != null ) {
                delay = (event.delay/1000).toFixed( 2 );
            } else {
                delay = 0;
            }
    
            tl = new TimelineMax({  });
            tl.pause();
            tl.to( el, (event.duration/1000).toFixed(2), config, delay );
            tl.play();
            }

    };
  
 
 this.interaction = function(job) {
  
  if (self.type === "default" || self.type == "foto")
  {
  $("#" + job.img.id).draggable({     
        start : function(event, ui) {           
            
            // SOLLTE HIER DIE ANDEREN UM GENAU 1 HERUNTERSETZEN, DANN STÖRE ICH DIE LOGIK NUR UNWESENTLICH
            $("." + self.css_class).css("zIndex", 1);  
            
            
            $(this).css("zIndex", 9);
           
            // i should store the position
        },
        stop: function(event, ui) {
            var l, t, rot, zIndex;
            l = parseInt( $(this).css("left"), 10);
            t = parseInt( $(this).css("top"), 10);            
            $(this).attr("l", l);
            $(this).attr("t", t);            
            
            
        }
    });
  
     
  $("#" + job.img.id).click(function() {
       var w = parseInt($(this).css("width"), 10);
       
       if (w < window.innerWidth*0.9)
        {
        var div = job.time.toString(); 
            
        var e = {
                left: 1,
                top: 1,
                div: div,
                duration: 200,
                opacity: 1,
                rotation: "0",
                width: 1920,
                height: 1080,
                zIndex: 10,
                ease: "Sine.easeOut",
                }; 

        self.greensock_event(e);

       }
       else
        {

            
        var w = parseInt($(this).attr("w"), 10);
        var l = parseInt($(this).attr("l"), 10);
        var t = parseInt($(this).attr("t"), 10);        
        var h = parseInt($(this).attr("h"), 10);
        
        var div = job.time.toString(); 
                     
        var e = {
                div: div,
                duration: 200,
                rotation: 0,
                width: w,
                height: h,
                top: t,
                left: l,
                ease: "Bounce.easeOut",
                zIndex: 1,
                }; 

        self.greensock_event(e);

   
        }
       
    }); 
    // end default + photo  
    }
    
 if (self.type === "film") {
    
    $("#" + job.img.id).mouseenter(function() {
        var s = '<img src = "' + job.img.src + '">'; 
         
        $("#filmstill").html(s);
    
    });
    // end film 
    }   
    
     
 };  

 
 
   
  this.random_position = function(range) {
        var x,y, pos;
        x = range.x + parseInt(Math.random() * range.width, 10);
        y = range.y + parseInt(Math.random() * range.height, 10);
        
        return{
              x: x,
              y: y        
              };
                    
  };
 

 
this.transform_area = function(area, ratio) {
    
    var nh = Math.sqrt( area/ ratio);
    var nw = nh*ratio;
       
    return   {
             width: nw,
             height: nh,
             };

};
     
 this.optimize = function(width, offsetx, ratio) {
    var sw = self.width,
    elements = parseInt(sw/width ),
    new_width,
    modulo;
    
    modulo = sw % width;  

    // console.log("Elements " + elements);
    // console.log("MODULO: " + modulo); 


     elements ++;
     new_width = (sw - offsetx* (elements+1) ) / (elements);
     // console.log("NEUE BREITE " + new_width);    



    return   {
             width: parseInt(new_width, 10),
             height: parseInt(new_width/ratio, 10),
             elements: elements,
             };

 };    
     
this.clear_dom = function() {
    var oj, i, el;
    
    // console.log("IN CLEAR DOM: DIE ALTEN JOBS NEHMEN ACTUAL AUF")
    // self.old_jobs    = self.actual_jobs;
   
    
    for (i = 0; i < self.old_jobs.length; i++) {
      oj = self.old_jobs[i];
      el = document.getElementById(  oj.time.toString() );
      el.remove();
    };
    
    
 
};     
     
 this.remove_film = function() {
        var job = null, 
        e, 
        events = [];
        
        for (var i = 0; i < self.old_jobs.length; i++) {

            job = self.old_jobs[i];
            e = {
                div: job.img.id,
                duration: 1600,
                opacity: 0.01,
                left: 3000

                }; 
            events.push(e);                        
        };
 
    if (events.length > 0) self.greensock_event(events, self.clear_dom);
 };  
    
     
 this.remove_default = function() {
        var job = null, 
        e, 
        events = [];
        
        for (var i = 0; i < self.old_jobs.length; i++) {

            job = self.old_jobs[i];
            e = {
                div: job.img.id,
                duration: 1000,
                opacity: 0.01,
                left: (Math.random() * 5000 -2500)*2,
                top: Math.random() * 5000 - 2500,
                }; 
            events.push(e);                        
        };
 
    if (events.length > 0) self.greensock_event(events, self.clear_dom);
 }; 
  
  
 this.outside_screen = function(type) {
     
     if (type == "vertical")
        {
        var sign, p = parseInt ((Math.random() * self.height) + self.height, 10);
        sign = Math.random();
        if (sign < 0.5) p*= -1;    
        return p;
        }
     else
        {
        var sign, p = parseInt ((Math.random() * self.width) + self.width, 10);
        sign = Math.random();
        if (sign < 0.5) p*= -1;   
        return p;            
        }
     
      
 }; 
  
  
this.check_filmstage = function(height, ratio) {
    var sh, h;

    $("#" + self.div).append('<div id = "filmstage"><div id = "filmstill"></div></div');
    sh = parseInt($("#" + self.div).css("height"), 10) - height;

    $("#filmstage").css({
            top: height,
            height: sh
            });
    
    h = parseInt( $("#filmstill").css("width"), 10);  
    h = parseInt(h/ratio); 
       
    $("#filmstill").css({
            height: h
            });  
    
    
    self.stage = true;
}; 
  
this.position_film = function(job) {
    var ratio   = job.img.width/job.img.height,    
        e,
        el,
        no,
        left, 
        top,
        md, 
        hct = 0, // horizontal counter
        vct = 0; // vertical lines      
   
   no = parseInt ( $("#" + job.img.id).attr("no"), 10);
   
     
   var h = parseInt ( $(".filmsnippet").css("height"), 10);     
   var w = parseInt ( $(".filmsnippet").css("width"), 10);  
  
   if (self.stage === false) self.check_filmstage(h, ratio);
   
   left = (w + 16) * no;
   
    e = {
        div: job.img.id,
        left: left,
        duration: 0,
        };      
   
    self.greensock_event(e); 
         
} ;
  
  
 this.position_default = function(job) {

    var ratio   = job.img.width/job.img.height,
        size    = job.img.width*job.img.height,
        targetSize,
        targetWidth,
        offsetSize,
        offsetX = 15,
        offsetY = 15,
        individual,
        imgSize,
        e,
        e1,
        no,
        left, 
        top,
        md, 
        hct = 0, // horizontal counter
        vct = 0; // vertical lines
                  
    individual = parseInt(self.square*self.cleanArea / self.length, 10);
    
    imgSize = self.transform_area(individual, ratio);
    imgSize  = self.optimize(imgSize.width, offsetX, ratio);
    
    no = parseInt ( $("#" + job.img.id).attr("no"), 10);
    
    
    if (no === 0)
        { 
        left = 10;
        top = 10;
        hct ++;
        }
    else
        { 
        md = no % imgSize.elements;  
        vct = parseInt(no /imgSize.elements);
        left = (imgSize.width + offsetX) * md + offsetX;
        top = ((imgSize.height+offsetY) *vct) + offsetY; 
        hct ++;
        }

   
    e1 = {
        div: job.img.id,
        duration: 0,
        width: imgSize.width,
        opacity: 0,
        left: left,
        top: top,
        height: imgSize.width/ratio,
        zIndex: 1,
        delay: Math.random() * 1400,
        };        

   self.greensock_event(e1);   
     
   return null; 
     
 };
 

this.position_carousel = function(job) {
     var e;
     
     e = {
        div: job.img.id,
        duration: 0,
        left: 100,
        zIndex: 1,
        "-webkit-transform" : "translate3d(1000px, 0px, 0px)",
        // skewX: -33,
        // skewY: 17,
        // webkitPerspective: 200,
        // transform: 'rotateY(50deg)'
        };        
    
    self.greensock_event(e); 
}; 



 this.position_foto = function(job) {
     // getting the data
     var range = {}, 
         target_range = {},
         ratio = job.img.width/job.img.height,
         pos, w, h, 
         e, e1; // events
     
     w = $("#" + job.time).css("width");
     w = parseInt(w,10);
     h = w/ratio;          
            
     // setting the initial position
     range.x        = window.innerWidth*-1;
     range.y        = 0;
     range.width    = window.innerWidth;
     range.height   = window.innerHeight;
               
     pos = self.random_position(range);
            
     e = {
        div: job.img.id,
        duration: 0,
        rotation: (Math.random() * 180 -90),
        width: w,
        height: h,
        top: pos.y,
        left: pos.x,
        zIndex: 1,
        };        
    
    self.greensock_event(e);  
    
     // setting the tagret position
     target_range.x        = 0;
     target_range.y        = 0;
     target_range.width    = window.innerWidth;
     target_range.height   = window.innerHeight;
    
    
    pos = self.random_position(target_range);
    
    e1 = {
        div: job.img.id,
        duration: Math.random() *700,
        rotation: parseInt( (Math.random() * 20 -10), 10),
        delay: Math.random() * 3000,
        width: w,
        height: h,
        top: pos.y,
        left: pos.x,
        ease: "Sine.easeOut",
        zIndex: 1,
        };      
    
   // self.greensock_event([e, e1]);        
   var data = self.greensock_data([e1]);    
 
           
    //setting the attributes  
              
    $("#" + job.time).attr("l", pos.x);
    $("#" + job.time).attr("t", pos.y);
      
    $("#" + job.time).attr("w", w);
    $("#" + job.time).attr("h", h);
    
    // here I return the animation
    return data;
 };
 

 

 this.positioning = function(job) {
     var animations;
     
     switch(self.type)
        {
        case "foto":
           animations = self.position_foto(job); 
           return animations;
        break;   
        
        case "default":
          animations = self.position_default(job);
          return animations;
        break; 
        
        case "film":
          animations = self.position_film(job);
          return animations;
        break;
        /*
        case "carousel":
        animations = self.position_carousel(job);
        return animations;
        */
        }
        
     
 };

 this.fadeOut = function() {
     self.old_jobs = self.actual_jobs;
     self.actual_jobs = [];
     
     switch(self.type) {
       case "default":
         self.remove_default();
       break;  
       
       case "foto":
        self.remove_default();
       break;
       
       case "film":
        self.remove_film();
       break;
       
     }; 
 };

 this.set_type = function(type) {
   if (self.type === "film")
    { 
    $("#filmstage").remove();
    self.stage = false;
    
    }   
   
   switch(type) {
     case "default":
       self.css_class = "standard";
     break;  
     
     case "foto":
       self.css_class = "foto";
     break;       
     
     case "film":
        self.css_class = "filmsnippet";
     break;
     
     default:
     break; 
   };
   
   self.type = type;  
 };

    
 this.paint = function(id) {
   self.fadeOut();
   // console.log("ACTUAL JOBS in paint - werden gelöscht");
   // self.actual_jobs = [];

   
   var i, 
       nice,
       id,
       ct = 0,  // counter
       cluster,
       jobs,
       animations = [], 
       len = self.cluster[id].list.length;
       self.length = len;
       
       jobs = self.cluster[id].list;        


        
       function read(job) {
        
        var deferred = Q.defer();
        
        
        job.img = new Image();
        job.img.src = job.file;
        job.img.id  = job.time;
        
        job.img.onload = function(){ // always fires the event.          
            var s = '<div id = "' + job.img.id + '" no ="' + ct + '" class = "' + self.css_class + '"><img src = "' + job.img.src + '"/></div>';
            $("#" + self.div).append(s);
            
            self.actual_jobs.push(job);
            
            ct++;
                        
            self.interaction(job);
            var anim = self.positioning(job);
            if (anim) self.animations.push(anim);
  
            deferred.resolve();
        };
       
       
        
        return deferred.promise;
                 
       };
       
       
       function done() {
       self.process_animations(); 
       };
       

       
       function painting()
       {         
       var deferred = Q.defer(); 
       ///// 
       return jobs.reduce(function (previous, job) {
        return previous.then(function () {
            return read(job);
        });
        }, Q()); 
        //////
        deferred.resolve();
        return deferred.promise;
       }
       

       painting().then(done);
    
    } ; 
    
  
  
 
  
  this.init = function() {
      // gesamt = this; // temporary

      self.width = parseInt( $("#scenery").css("width"), 10),
      self.height = parseInt( $("#scenery").css("height"), 10);
          
      self.square = self.width*self.height;
      self.ratio  = self.width/self.height;  

      if (params.source)
        {
        if (typeof(params.source) === "string") 
            {
            // now a check if the string contain the json extension
             $.getJSON("cluster.json", function(json){
                    self.cluster = json;
                });
            }            
        }
     //////////// div check
     if ( ! params.div) self.div = "scenery";
     else               self.div = params.div;   
 
       
     if ( ! params.cleanArea) self.cleanArea = 0.8;  
     else                     self.cleanArea = params.cleanArea;
        
     if (! params.css_class) self.css_class = "standard"; 
     else                    self.css_class = params.css_class;
        
     if ( ! params.type)   self.type = "default";  
     else                  self.type = params.type; 
        
  };
  
 self.init();   
}


module.exports = exports = ClusterPainter;
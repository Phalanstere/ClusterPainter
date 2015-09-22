/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */ /*global define */


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
  
  this.get_image = function() {
      
  };
  
  this.check_loaded = function(item) {
    return false;   
      
  };
  
  this.get_greensock_props = function(event) {
    var props,  
    config = {};

    
    props = ['left', 'top', 'opacity', 'scale', 'rotation', 'width', 'height', 'zIndex', 'skewX', 'skewY',
        'border', 'borderRadius', 'background', 'fontSize', 'fontFamily',
        'letterSpacing', 'color', 'textShadow', 'boxShadow',
        'transition','ease', 'webkitFilter'
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
 };
 
 
 
/// event could be an array of events  
this.greensock_event = function(event) {
                
        var tl,
            el,
            config = {},
            delay,
            props;

        el = null;
        /// ARRAY OF EVENTS
        if (Array.isArray(event) === true) 
            {   
            var configs     = [],
                els         = [];
                
            
            for (var i = 0; i < event.length; i++) {
                config = self.get_greensock_props(event[i]);
                configs.push(config);
                el = document.getElementById( event[i].div );
                els.push(el);   
                
                };

                
             tl = new TimelineMax({  });
             tl.pause();
             for (var i = 0; i < event.length; i++) {
                tl.to( els[i], (event.duration/1000).toFixed(2), configs[i], 0 ); 
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
  
  
  $("#" + job.img.id).draggable({     
        start : function(event, ui) {           
            
            // SOLLTE HIER DIE ANDEREN UM GENAU 1 HERUNTERSETZEN, DANN STÖRE ICH DIE LOGIK NUR UNWESENTLICH
            $(".standard").css("zIndex", 1);  
            
            
            $(this).css("zIndex", 9);
           
            // i should store the position
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
                rotation: 0,
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
     
  
 this.position_default = function(job) {

    var ratio   = job.img.width/job.img.height,
        size    = job.img.width*job.img.height,
        targetSize,
        targetWidth,
        offsetSize,
        offsetX = 10,
        offsetY = 10,
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
                
    /*
    offsetSize = (offsetX * (job.img.height + offsetY)) + (offsetY*job.img.width);
    
    targetSize = ((self.square / self.length) - (offsetSize*length)) * self.cleanArea;
    */
        
    individual = parseInt(self.square*self.cleanArea / self.length, 10);
    console.log(individual);
    
    imgSize = self.transform_area(individual, ratio);
    imgSize  = self.optimize(imgSize.width, offsetX, ratio);
    
    // console.log("width: " + imgSize.width + " height " + imgSize.height);
    
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
        console.log("HEIGHT " + imgSize.height + " HCT" + hct + " VCT " + vct +" LEFT: " + left + " TOP: " + top + " ELEM " + imgSize.elements);
        }
   
   
    console.log("NUMMER " + no + " LEFT " + left);
    
    e = {
        div: job.img.id,
        duration: 0,
        width: imgSize.width,
        opacity: 1,
        left: left,
        top: top,
        height: imgSize.width/ratio,
        zIndex: 1,
        delay: Math.random() * 2000
        };        
    
    self.greensock_event(e);  
    
    e1 = {
        div: job.img.id,
        duration: Math.random() *700,
        opacity: 1,
        };      
    
   // self.greensock_event([e, e1]);        
   // var data = self.greensock_data([e1]);    
    
    
    
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
        }
        
     
 };

    
 this.paint = function(id) {
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
            var s = '<div id = "' + job.img.id + '" no ="' + ct + '" class = "standard"><img src = "' + job.img.src + '"/></div>';
            $("#scenery").append(s);
            
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
      gesamt = this;
      ////////////// cluster check
      // self.square = window.innerHeight * window.innerWidth;
      // self.ratio  = (window.innerWidth / window.innerHeight).toFixed(1);
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
      if ( ! params.div) {
        alert("kein DIV");    
        }
      
      if ( ! params.cleanArea) {
        self.cleanArea = 0.8;  
        } 
        
      if ( ! params.type) {
        self.type = "default";  
      }
      else self.type = params.type;  
        
  };
  
 self.init();   
}

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */ /*global define */
var $               = require('jquery');
var ClusterPainter  = require('./npm_lib/clusterPainter.js');


    
    $(document).ready(function(){
        "use strict";
        var gesamt;
        var testfall;
        var attr;


        var c = new ClusterPainter({
                                   source: "cluster.json",  
                                   css_class: "standard",
                                   div: "scenery",
                                   type: "default"
                                   });


        $(".button").click(function(){
            var id = parseInt($(this).attr("id"), 10) -1;
            c.paint(id);
        });


        $("#Types").change(function(){
            var v = $(this).val();
            c.set_type(v);
        });
        

    });
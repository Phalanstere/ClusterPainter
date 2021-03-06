# ClusterPainter.js

> A fast library to display image clusters 


## Features:

- **Versatile**: usable in any given div 
- **Fast**: the animations are based on the performant [gsap](http://greensock.com/gsap) library, therefore extremely fast

##<a href="http://burckhardt.ludicmedia.de/ClusterPainter">Demo</a>##

<a href="http://burckhardt.ludicmedia.de/ClusterPainter">Here</a> you can see the library in action

<img src="http://burckhardt.ludicmedia.de/ClusterPainter/Screenshot3.png">

#### npm

```html
	npm install cluster-painter
```


Embed the libary: 

```javascript
	var ClusterPainter = require("cluster-painter")
```

Here is a typical html file

```html
 <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>ClusterPainter</title>

	<link rel="stylesheet" href="node_modules/cluster-painter/css/clusterPainter.css">

  </head>

  <body>
    <div id = "container">
        <div id = "1" class = "button">1</div>
        <div id = "2" class = "button">2</div>
        <div id = "3" class = "button">3</div>
        <div id = "4" class = "button">4</div>
        <div id = "5" class = "button">5</div>          

        <select id = "Types" class="select">
            <option selected>Select</option>
                <option selected>default</option>
                <option >foto</option>
                <option>film</option>
        </select>               
    </div>
    <div id = "scenery"></div>
  </body>
</html>
```

## Generating cluster data

To generate a cluster file, create an image folder with the name **images**, place all your images therein and then run the following command

```html
	node node_modules/cluster-painter/create_cluster.js
```
In case you want to use another folder name (or another timeframe), you have to modify the **create_cluster.js** file

```javascript
var x = new TV({
                path: "./images",             // here you have to pass the folder
                filename: "cluster.json",     // **please leave this unchanged!**
                callback: null,
                timeframe: "day"   // valid entries are [minute][hour][day][week][month][year]
                });

```

If you have followed these instructions, you have prepared your image data sufficiently. 

## Working with the npm version

The library is optimized for a **browserified** client side use. So you can use the handy **require** call instead adding resources to your html file. 

The only resource you have to embed manually is a link to the \*.css which is necessary for a decent visual result

```html
    <link rel="stylesheet" href="node_modules/cluster-painter/css/clusterPainter.css">
```

The basic idea is that you have a super-simple api (and not have to worry how it works).


However, it's nice if something is working right from the start. 
To get accomodated to the library I recommend embedding the following snippet to your html code

```html

  		<div id = "1" class = "button">1</div>
  		<div id = "2" class = "button">2</div>
  		<div id = "3" class = "button">3</div>
  		<div id = "4" class = "button">4</div>
  		<div id = "5" class = "button">5</div>    		
  		
  		<select id = "Types" class="select">
    		<option selected>Select</option>
    			<option selected>default</option>
    			<option >foto</option>
    			<option>film</option>
		</select>
  		  		
  	</div>
  	<div id = "scenery"></div>
```

In the index.js (or whereever you want to require cluster-painter), you can invoke the **clusterPainter** object, like this:
  
```javascript
		var cluster = new ClusterPainter({
								   source: "cluster.json",	
								   css_class: "standard",
								   div: "scenery",
								   type: "default"
								   });
```

- the **source** parameter takes the json file you have created with the first step.
- the **css_class** paramater refers to the style class that the images shall use 
- the **div** parameter allows the library to operate in a given div
- the **type** parameter specifies the animation type. Actually, **default**, **foto** and **film** are supported   


The full code of the index.js, file could look like this. Here the interaction part is added which fits to the supposed html-code.
However, invoking the **clusterPainter** is easy, you just have to pass a paint command and then the id of the image cluster

 
```javascript 
	/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */ /*global define */
	var $               = require('jquery');
	var ClusterPainter  = require('cluster-painter');
	
	
	  
	    $(document).ready(function(){
	        "use strict";
	
	
	        var cluster = new ClusterPainter({
	                                   source: "cluster.json",  
	                                   css_class: "standard",
	                                   div: "scenery",
	                                   type: "foto"
	                                   });
	
	
	      
	
			 
	         $(".button").click(function(){
	            var id = parseInt($(this).attr("id"), 10) -1;
	            cluster.paint(id);
	        });
	        
	        $("#Types").change(function(){
	            
	            var v = $(this).val();
	            cluster.set_type(v);
	        });
	        
	
	    });
	
	});
```

If you want to change the dislay type, you write:

```javascript
   	cluster.paint[id]
```



### default effect
<img src="http://burckhardt.ludicmedia.de/ClusterPainter/Screenshot.png">


### photographs effect
<img src="http://burckhardt.ludicmedia.de/ClusterPainter/Screenshot2.png">



### filmstrip effect
<img src="http://burckhardt.ludicmedia.de/ClusterPainter/Screenshot3.png">




## Installating conventionally:

#### CDN

Include the following lines in your `head` and you are ready to go:
```html
 	<script src="lib/jquery2.1.minified.js"></script>
 	<script src="lib/jquery-ui.min.js"></script>
 	<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
 	<script src="https://cdnjs.cloudflare.com/ajax/libs/q.js/1.1.0/q.js"></script>
    <script src="lib/clusterPainter.js"></script>
```
You find a working index.html in the main directory


Bascally everythings works as mentioned above. 
 






---
### License

[MIT](http://opensource.org/licenses/MIT)



### Copyright

Copyright &copy; 2015. Phalanstere.



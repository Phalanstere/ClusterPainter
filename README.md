# ClusterPainter.js

> A fast library to display image clusters 

<img src="http://burckhardt.ludicmedia.de/ClusterPainter/Screenshot.png">

## Features:

- **Versatile**: usable in any given div 
- **Fast**: the animations are based on the performant [gsap](http://greensock.com/gsap) library, therefore extremely fast

##<a href="http://burckhardt.ludicmedia.de/ClusterPainter">Demo</a>##

<a href="http://burckhardt.ludicmedia.de/ClusterPainter">Here</a> You can see the library in action

## Installation:

#### CDN

Include the following lines in your `head` and you are ready to go:
```html
 	<script src="lib/jquery2.1.minified.js"></script>
 	<script src="lib/jquery-ui.min.js"></script>
 	<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
 	<script src="https://cdnjs.cloudflare.com/ajax/libs/q.js/1.1.0/q.js"></script>
    <script src="lib/clusterPainter.js"></script>
```


#### npm

Very soon the library will support npm and browserify 


## Usage:
	

When all the files are loaded (via $(document).ready od body onload, you can create a **clusterPainter** object, like this:
  
```html
		var c = new ClusterPainter({
								   source: "cluster.json",	
								   css_class: "standard",
								   div: "scenery",
								   type: "default"
								   });
```

- the **source** parameter may take a json file or an array of objects that hold the images. An object should look like this: 

```html
object
	.time
	.file

```

If you don't want to hassle with that, you can use the <a href="https://github.com/Phalanstere/TimestampedVisuals">**VisualTimestamps libary**</a> which creates the necessary format.


- the **css_class** paramater refers to the style class that the images shall use
- the **div** parameter allows makes the library operate in a given div
- the **type** parameter specifies the animation type. Actually, **default** and **foto** are supported  


---
### License

[MIT](http://opensource.org/licenses/MIT)



### Copyright

Copyright &copy; 2015. Phalanstere.



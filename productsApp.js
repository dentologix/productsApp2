var ProductsApp = function (userOptions){

	var options = $.extend({
		"callback" : false,
		"templateEl" :  $("#products-modal .products-list-item.template"),
		"selectedProduct" : false
	}, userOptions);

	var thisApp = this;

	var productsService = new Service({
		"frontend" :false,
		"backend" :false,
		"printRecived" : false,
		"printFrontendCallback" :false,
		"serviceURL" : 'apps/productsApp/productsApp.php',
		"secure" : false
	});


	thisApp.service = productsService;

	thisApp.show = function(showOptions){
	 
	 	$.extend(options, showOptions);
	 	$("#products-modal").modal("show");

	}

/* */
	thisApp.load = function(cats, types){

		productsService.post("load", new Array(cats, types), function(recived){
			
			thisApp.products = recived;

			$.each(thisApp.products,function(index, product){


				if(product.category == "2"){
					$( ".fixed").append(thisApp.productTemplate(product, function (){thisApp.selectedProduct=product;options.callback();}));
				};
				if(product.category == "3"){
					$( ".movable").append(thisApp.productTemplate(product, function (){thisApp.selectedProduct=product;options.callback();}));
				};
				if(product.category == "4"){
					$( ".other").append(thisApp.productTemplate(product, function (){thisApp.selectedProduct=product;options.callback();}));
				};

			});

		})

	}



/* */
	thisApp.productTemplate = function(product, callback){

		var t = options.templateEl.clone();

		t.find(".product-name").css("color", product.color);
		t.find(".product-name").text(product.name);
		t.find(".product-long-name").text(product.long_name);
		t.find(".product-price").text(product.price);
		t.find(".product-name").css("background-color",product.color);
		thisApp.adjustColour(t.find(".product-name"));

	    t.on("click",function(){
	     callback(); 
	    });

		t.removeClass("template");
		return t;

	}

/* */
thisApp.adjustColour = function (el){
   /* aargumennt is a jquery object...*/
	//console.log(el);
	/*
	el = el[0];
console.log("paa"+el);
   var rgbstring = el.style.backgroundColor;
   var triplet = rgbstringToTriplet(rgbstring);
   var newtriplet = [];
   // black or white:
   var total = 0; for (var i=0; i<triplet.length; i++) { total += triplet[i]; }
   if(total > (3*256/1.7)) {
     newtriplet = [0,0,0];
   } else {
     newtriplet = [255,255,255];
   }
   var newstring = "rgb("+newtriplet.join(",")+")";
   el.style.color = newstring;
   */
   return true;
}







thisApp.init = function(){

	thisApp.events();
  	thisApp.load('2,3,4','1,2,3');
	setTimeout(function(){
		scroll($(".products-dropdown-menu"));
	},1000)

}

/* */
thisApp.events = function(){

$("#btn-products-hide").click(function(){

 options.callback();
  $("#products-modal").modal("hide");
  //$("#task-modal").modal("show");
  
});



}

thisApp.init();
}
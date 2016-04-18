if(typeof Object.create !=='function'){
	Object.create = function(obj){
		function F(){};
		F.prototype = obj;
		return new F();
	}
}

(function($,window,document,undefined){
	var Weather = {

		init: function(elem){
			var self=this;

			self.template = '<h1>{{City}}</h1><div class="manual"><h2>Wind speed ({{wind}} mph) {{text}}</h2></div><span>+{{Temp}}</span><span><sup>o</sup>C</span>';
			this.container = $('div.container');
			self.elem=elem;
			self.$elem= $(elem);
			self.url = $(elem).data('text');

			self.data();
		},

		data: function(){
			var self = this;

			self.fetch().done(function(data){
				var way = data.query.results.channel;
				self.nameCity = way.location.city;
				self.temp = Math.floor((+way.item.condition.temp-32)*5/9);
				self.text = way.item.condition.text;
				self.wind = way.wind.speed; 
				console.log(self.temp);
				self.display();

			});
		},

		display: function(){
			var self = this;

			$('.container').animate({ opacity: 1}, 500);
			self.container.html(function(){
				return self.template.replace(/{{City}}/,self.nameCity).replace(/{{wind}}/, self.wind).replace(/{{text}}/, self.text).replace(/{{Temp}}/, self.temp);
			});						
		},

		fetch: function(){
			return $.ajax({
				url: this.url,
				dataType: 'jsonp'
			});
		}		
	}	

	$.fn.weatherShow = function(){
		return this.each(function(){
			var weather = Object.create(Weather);
			weather.init(this);
		});
	};
})(jQuery,window,document);	
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
			this.container = $('#weather-block');
			self.elem=elem;
			self.$elem= $(elem);
			self.url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+$(elem).data('text')+'%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
			console.log(self.url);
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
				
				self.display();

			});
		},

		display: function(){
			var self = this;

			$('#weather-block').animate({ opacity: 1}, 500);
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

	$('li').on('click', function(){
	$(this).weatherShow()});
		
})(jQuery,window,document);	


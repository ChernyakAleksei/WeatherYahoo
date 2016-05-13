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

			self.template = '<h1>{{City}}</h1><div class="manual"><h2>Wind speed ({{wind}} mph) {{text}}</h2></div><span>{{Temp}}</span><span><sup>o</sup>C</span>';
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
				console.log(way);
				self.nameCity = way.location.city;
				self.temp = Math.floor((+way.item.condition.temp-32)*5/9);
				self.temp = self.temp>0?'+'+self.temp:self.temp;
				self.text = way.item.condition.text;
				self.wind = way.wind.speed; 
				self.itemForecast=way.item.forecast;
				
				self.weakforcast();
				self.display();

			});
		},

		display: function(){
			var self = this;

			$('#weather-block').animate({ opacity: 1}, 500);
			self.container.html(function(){
				return self.template.replace(/{{City}}/,self.nameCity)
				.replace(/{{wind}}/, self.wind)
				.replace(/{{text}}/, self.text)
				.replace(/{{Temp}}/, self.temp);
			});						
		},

		fetch: function(){
			return $.ajax({
				url: this.url,
				dataType: 'jsonp'
			});
		},

		weakforcast:function(){
			var self = this,
			ul = $('<ul class="week"></ul>'),
			div = $('<div></div>');
			for (var i=0,l=4;i<l;i++){
				var date = self.itemForecast[i].date,
						day = self.itemForecast[i].day,
						highT = Math.floor((+self.itemForecast[i].high-32)*5/9),
						lowT = Math.floor((+self.itemForecast[i].low-32)*5/9),
						text = self.itemForecast[i].text,
						li,ul;
						highT = highT>0?'+'+highT:highT;
						lowT = lowT>0?'+'+lowT:lowT;
						li=$('<li></li>').html('<b>'+day+' '+highT+'  '+lowT+'</b><br><b>'+text+'</b>');
						ul.append(li);
			}
			div.append(ul);
			self.ul = div.html();
			self.template += self.ul;
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


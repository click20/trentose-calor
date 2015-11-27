/* your code should go here */
$(document).ready(function(){
    $("#btn-filter").click( function(){
        $("#summary").html("");
        controller.init( $("select[id=cities]").val() );
    })
       
});


var model = {
    collection: data,
    
    init: function(){
        var week= [];
        
        for(var l=0; l< this.collection.length; l++){
        week.push({
            day: this.collection[l].day,
            condition: this.collection[l].condition,
            city: this.collection[l].city
        }); 
        l = l+7;
        }    
        return week;     
    },
    
    cityMinMaxTemp: function(city,day){
        var trial= []; var arrayTemp=[]; var minTemp=0; var maxTemp=0;
            for(var i=0; i<this.collection.length; i++){
                if( this.collection[i].city == city && this.collection[i].day == day ){    
                    trial.push(this.collection[i].temperature);           
            }else{
                continue;
            }
        }
        minTemp= Math.min(...trial);
        maxTemp= Math.max(...trial);
        arrayTemp.push(minTemp,maxTemp);
//        console.log(arrayTemp);
           
        return arrayTemp;
    }
};

var view = {
       
        init: function(city) {
            
            var tmpl = '<li> <div class="icon"> <img src="img/icons/SOST.png"> </div> <div class="stats"> <h2>DAY</h2> <strong>min</strong> MINºC <strong>max</strong> MAXºC </div> </li>';
            
            if(city == ""){
                return;
            }   
            
            for(var f=0; f<4; f++){
                    $("#summary").append(                                                                                                                                                  tmpl.replace("SOST",controller.getCondition(f))
                                         .replace("DAY",controller.getDay(f))
                                         .replace("MIN",controller.getMinTemp(city,controller.getWeek(f).day))
                                         .replace("MAX",controller.getMaxTemp(city,controller.getWeek(f).day)) 
                                        );
            }
        }
};


var controller= {
            
            init: function(city) {
                view.init(city);      
            },
            
            getWeek: function(position){
                var WEEK= model.init(position);
                return WEEK[position];
            },
    
            getDay: function(position){
                var DAY= model.init(position);
                return DAY[position].day;
            },
    
            getCondition: function(position){
                var CONDITION= model.init(position);
                return CONDITION[position].condition;
            },
    
            getMinTemp: function(city,day){
                var MIN= model.cityMinMaxTemp(city,day);
                return MIN[0];
            },
            
            getMaxTemp: function(city,day){
                var MAX= model.cityMinMaxTemp(city,day);
                return MAX[1];
            },
            
};




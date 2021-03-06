/* your code should go here */
$(document).ready(function(){
      controller.init();
});


var model={
    
    init: function(pos){
        var week=[];
        
        for(var l=0; l<data.length; l++){
        week.push({
            day: data[l].day,
            condition: data[l].condition
        }); 
        l=l+3;
        }    
        return week;
    },
    
    MinMaxTemp: function(day){
        var trial= []; var arrayTemp=[]; var minTemp=0; var maxTemp=0;
            for(var i=0; i<data.length; i++){
                if( data[i].day == day ){
                    trial.push(data[i].temperature);
//                        console.log(trial);
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
       
        init: function() {
            
            var tmpl = '<li> <div class="icon"> <img src="img/icons/SOST.png"> </div> <div class="stats"> <h2>DAY</h2> <strong>min</strong> MINºC <strong>max</strong> MAXºC </div> </li>';
            
            for(var f=0; f<4; f++){
                    $("#summary").append(
                            tmpl.replace("SOST",controller.getCondition(f))
                            .replace("DAY",controller.getDay(f))
                            .replace("MIN",controller.getMinTemp(controller.getWeek(f).day))
                            .replace("MAX",controller.getMaxTemp(controller.getWeek(f).day)) );
            }
        }
};
    
var controller= {
            
            init: function() {
                view.init();
                
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
    
            getMinTemp: function(day){
                var MIN= model.MinMaxTemp(day);
                return MIN[0];
            },
            
            getMaxTemp: function(day){
                var MAX= model.MinMaxTemp(day);
                return MAX[1];
            },
            
};
    


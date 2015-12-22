/**
 * Created by Astora on 2015-11-26.
 */
$(document).ready(function(){
    $.get("/models/getModelAll",function(data, status){
        console.log(status);
        for(var i in data) {
            console.log(data[i]);
            console.log(i);
            var Data = '<li><div class="col s3 m3 l3 center-align list imgBanner"><img src="'+data[i].Image[0] +'" width="100%"></div><div class="col s3 m3 l3 center-align list">'+data[i].ModelName+'</div><div class="col s3 m3 l3 center-align list">'+data[i].Brand+'</div><div class="col s3 m3 l3 center-align list">'+data[i].Pay+'</div></li>';
            $('#resultData').append(Data);
        }
    });
});
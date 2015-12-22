/**
 * Created by Astora on 2015-12-06.
 */
$(document).ready(function(){
    $('#submitBtn').click(function(){
        var form= document.getElementById('SearchFormTag');
        form.submit();
    })
})
$(document).ready(function(){
    var str = window.location.href;
    str=str.slice(str.indexOf('/search'));
    str="/models".concat(str);
    console.log(str);
    $.get(str,function(data, status){
        for(var i in data) {
            console.log(data[i]);
            var FinForm = '<div class="searchResultContentBox" style="background: url('+data[i].Image[0]+')"><div class="ContentDetail"><span>['+data[i].Brand+']</span><span>'+data[i].ModelName+'</span><span>'+data[i].Pay+'</span></div><div class="contentDetailButtons"><div class="HeartButton valign-wrapper"><img src="/Images/Btn_Heart.png" class="valign"></div><div class="ShareButton valign-wrapper"><img src="/Images/Btn_Share.png" class="valign"></div><div class="CheckButton valign-wrapper"><img src="/Images/Btn_Check.png" class="valign"></div><div class="ChatButton valign-wrapper"><img src="/Images/Btn_Chat.png" class="valign"></div><div class="MallButton valign-wrapper"><img src="/Images/Btn_Mall.png" class="valign"></div></div></div>';
            $('#firstSearchContent').append(FinForm);
        }
    })
})

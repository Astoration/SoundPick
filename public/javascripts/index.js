/**
 * Created by Astora on 2015-12-21.
 */
$(document).ready(function(){
    $('#LoginBg').hide();
    $('#login_button a:first-child').click(function(){
        $('#LoginBg').show();
    });
    $('#LoginClose').click(function(){
        $('#LoginBg').hide();
    })
    $.post('/users/getUserStatus',{},function(data,status){
        var User = data;
        if(User!=null){
            $('#login_button').empty();
            $('#login_button').append('<div style="font-size: 1vw;color:white;">'+User.UserID+' 님 환영합니다</div>')
            $('#login_button').append('<a id="logout" href="#">로그아웃</a>')
            $('#login_button').append('<a href="#">시작하기</a>')
            $('#logout').click(function(){
                $.post('/users/logout',{},function(){
                    location.href('/');
                });
            });
        }
    })
});
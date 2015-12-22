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
});
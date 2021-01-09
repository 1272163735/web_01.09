$(function () {
    $('.go-Reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('.go-login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
})
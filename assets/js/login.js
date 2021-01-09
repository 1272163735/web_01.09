$(function () {
    $.ajaxPrefilter(function (options) {
        options.url = "http://api-breakingnews-web.itheima.net" + options.url;
    })
    layui.form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            if ($('.reg-box [name=password]').val() !== value) {
                $('.reg-box [name=repassword]').val('');
                $('.reg-box [name=password]').val('');
                return '两次密码不一致，请重新输入';
            }
        }

    })
    $('.go-Reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('.go-login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    $('.reg-box .layui-form').on('submit', function (e) {
        e.preventDefault();
        // console.log(111);
        var data = $(this).serialize();
        // username = $('.reg-box [name=username]').val();
        // password = $('.reg-box [name=password]').val();
        // console.log(username, password);
        // console.log(data);
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            // data: {
            //     username: username,
            //     password: password
            // },
            data: data,
            // dataType: 'JSONP',
            success: function (res) {
                // console.log(res);
                layer.msg(res.message)
                if (res.status === 0) {
                    $('.go-login').click();
                }

            }
        })
    })
    $('.login-box .layui-form').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            // data: {
            //     username: username,
            //     password: password
            // },
            data: data,
            // dataType: 'JSONP',
            success: function (res) {
                console.log(res);
                layer.msg(res.message)
                if (res.status === 0) {
                    localStorage.setItem('token', res.token);
                    location.href = 'index.html'
                }
                // console.log(res.token);

            }
        })
    })

})
$(function () {
    getUserInfo();
    $('#btnLogout').on('click', function () {
        //eg1
        layer.confirm('确定关闭吗？', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token');
            location.href = 'login.html';
            layer.close(index);
        });
    })
})
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // layui.layer.msg('获取用户信息成功')
            rederAvatar(res.data);
        }
    })
}
function rederAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html(name);
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic);
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide();
        $('.text-avatar').show().html(name[0].toUpperCase());
    }
}

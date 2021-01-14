$(function () {
    var layer = layui.layer
    var form = layui.form

    initCate()
    //渲染富文本框
    initEditor()
    //获取文章列表，并在刷新页面的时候渲染下拉框的内容
    function initCate() {
        $.ajax({
            method: 'GET',
            //获取分类列表
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg('获取文章分类列表失败')
                }
                layer.msg('获取文章分类列表成功')
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render();
            }
        })
    }

    //给选择封面的按钮绑定事件
    var options = {
        aspectRatio: 400 / 200,
        preview: '.img-preview'
    }
    $('#image').cropper(options)

    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click();
    })

    //将选择的图片渲染到裁剪区域
    $('#coverFile').on('change', function () {
        var file = $(this)[0].files
        // console.log(file);
        var newImgURL = URL.createObjectURL(file[0]);
        // console.log(newImgURL);
        $('#image')
            .cropper('destroy')
            .attr('src', newImgURL)
            .cropper(options)
    })

    var art_state = '已发布'
    $('#btnSave2').on('click', function () {
        art_state = '草稿'
    })
    $('#form-pub').on('submit', function (e) {
        e.preventDefault()
        var fd = new FormData($(this)[0])
        fd.append('state', art_state)
        $('#image')
            .cropper('getCroppedCanvas', {
                width: 400,
                height: 280
            }).toBlob(function (blob) {
                fd.append('cover_img', blob)
                pub(fd)
            })
    })

    function pub(fd) {
        console.log(fd);
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('文章发布失败')
                }
                layer.msg('文章发布成功')
                location.href = '../art_list/art_list.html'
            }
        })
    }
})
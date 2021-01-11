$(function () {
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('获取文章分类列表失败')
                }
                // layui.layer.msg('获取文章分类列表成功')
                var str = template('template-tbody', res);
                $('tbody').html(str)
            }
        })
    }
    initArtCateList()
    var indexAdd = null;
    $('#btnAddCate').on('click', function () {
        indexAdd = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })
    $('body').on('submit', '#boxAddCate', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败')
                }
                initArtCateList()
                layer.msg('新增分类成功')
                layui.layer.close(indexAdd)
            }
        })
    })
    var indexEdit = null;
    $('html').on('click', '#btnEditCate', function () {
        var id = $(this).attr('data-id')
        indexEdit = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            // data: $(this).serialize(),
            success: function (res) {
                console.log(res.data);
                layui.form.val('boxEditCate', res.data)
            }
        })
    })
    $('body').on('submit', '#boxEditCate', function (e) {
        e.preventDefault();
        $.ajax({

            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改分类失败')
                }
                initArtCateList()
                layer.msg('修改分类成功')
                layui.layer.close(indexEdit)
            }
        })
    })
    $('body').on('click', '#deleteEdit', function () {
        var id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/deletecate/' + id,
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('删除分类失败')
                }
                layui.layer.msg('删除分类成功')
                initArtCateList()

            }
        })
    })
})
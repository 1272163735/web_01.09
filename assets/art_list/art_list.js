$(function () {
    var p = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    initTable()
    initCate()

    //管道符
    template.defaults.imports.dataFormat = function (date) {
        return date.split('.')[0];
    }
    //筛选（表单提交事件）
    $('#myForm').on('submit', function (e) {
        e.preventDefault();
        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val();


        p.cate_id = cate_id;
        p.state = state;
        initTable()
    })

    //给删除按钮绑定事件
    $('tbody').on('click', '.btn-delete', function () {
        // console.log(111);
        var length = $('.btn-delete').length;
        let id = $(this).attr('data-id');
        layer.confirm('是否删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败')
                    }
                    layer.msg('删除文章成功');
                    if (length === 1) {
                        p.pagenum = p.pagenum === 1 ? 1 : p.pagenum - 1;
                    }
                    initTable()
                }
            })

            layer.close(index);
        });
    })


    //文章列表获取
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: p,
            success: function (res) {
                // console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg('获取文章列表失败')
                }
                var htmlStr = template('data-table', res)
                $('tbody').html(htmlStr);
                renderPage(res.total)
            }
        })
    }
    //筛选表格内文章
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取文章分类列表失败')
                }
                let htmlStr = template('tpl-table', res)
                $('[name=cate_id]').html(htmlStr);
                layui.form.render();
            }
        })
    }
    //分页
    function renderPage(total) {
        layui.laypage.render({
            elem: 'pageBox',
            count: total,
            limit: p.pagesize,
            curr: p.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                p.pagenum = obj.curr
                p.pagesize = obj.limit
                // console.log(obj);
                // console.log(first);
                if (!first) {
                    initTable()
                }
            }
        })
    }

})
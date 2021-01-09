$(function () {
    // 点击'去注册账号'链接
    $('#link_reg').on('click', function () {
        $('.login_box').hide()
        $('.reg_box').show()
    })
    // 点击'去登录'链接
    $('#link_login').on('click', function () {
        $('.login_box').show()
        $('.reg_box').hide()
    })
    // 通过 form.verify添加自动校验规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('#reg_password').val()
            if (pwd !== value) return ('两次输入的密码不一样')
        }
    })
    // 监听注册表单提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=uesrname]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data,
            function (res) {
                // console.log($('#form_reg [name=uesrname]').val());
                // console.log($('#form_reg [name=password]').val());
                // console.log(res);
                if (res.status !== 0) {
                    // return console.log(res.message);
                    return layer.msg(res, message)
                }
                layer.msg('注册成功,请登录！');
                $('#link_login').click()
            })
    })
    // 监听登录表单的事件
    $('#form_login').submit(function (e) {
        e.preventDefault()
        var newdata = {
            username: $('#form_login [name=uesrname]').val(),
            password: $('#form_login [name=password]').val()
        }
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取form表单里面的数据
            // data: $(this).serialize(),
            data: newdata,
            success: function (res) {
                if (res.status !== 0) {
                    // console.log($(this).serialize());
                    // console.log(res.message);
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                console.log(res.token);
                // 把token的值存贮在本地存储localstorage中
                localStorage.setItem('token',res.token)

                // 跳转到后台主面
                location.href = '/index.html'
            }
        })
    })
})
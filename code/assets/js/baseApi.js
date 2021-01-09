// 每次调用get或者post请求时
// 会先调用ajaxPrefilter函数
// 在这个函数中我们可以拿到Ajax的配置对象
$.ajaxPrefilter(function (options) {
    options.url='http://api-breakingnews-web.itheima.net'+options.url
})
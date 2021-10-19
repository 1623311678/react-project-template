// https://github.com/chimurai/http-proxy-middleware/blob/master/recipes/servers.md

var browserSync = require('browser-sync').create();
var { createProxyMiddleware } = require('http-proxy-middleware');


var apiProxy = createProxyMiddleware('/admin/internal/web/graphql/core/', {
    // target: 'https://testshopluo.myfunpinpin.top/',
    target: "https://gaea-dashboard-api-test-7qy5ieof5a-uc.a.run.app/",
    changeOrigin: true,   // for vhosted sites
    // secure: false,
});

// 静态服务器
const bs = browserSync.init({
    server: {
        baseDir: "./build/dashboard/",
        middleware: [apiProxy],
    },
    port: 8080,

});
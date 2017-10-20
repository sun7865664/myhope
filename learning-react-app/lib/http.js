var async = require('async'),
    express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    multer = require('multer');

var logger = require('logger-node').getLogger();
var upload = multer({
    dest: "./public/images"
});
(function() {
    'use strict';

    var httpHelp = {};
    var app = express();

    function initRouter() {

        var routes = require('../config/routes');

        for (var key in routes) {
            logger.info('Init controller:', key);

            var method;
            var path = key;

            var ss = key.split(' ');
            if (ss.length == 1) {
                path = key;

            } else if (ss.length == 2) {
                method = ss[0].toLowerCase();
                path = ss[1];

            } else {
                return next('wrong url path');
            }

            if (method == 'get') {
                app.get(path, routes[key]);

            } else if (method == 'post') {
                var patt1 = new RegExp(/^\/upload/);
                if (patt1.test(path)) {
                    app.post(path, upload.single('file'), routes[key]);
                } else {
                    app.post(path, routes[key]);
                }
            } else if (method == 'put') {
                app.put(path, routes[key]);

            } else if (method == 'delete') {
                app.delete(path, routes[key]);

            } else {
                app.all(path, routes[key]);
            }

        }

    }

    function start(serverConfig, next) {
        app.listen(serverConfig.port, function(err) {
            if (err) return next(err);
            logger.info('HTTP On:', serverConfig.port);
            return next();
        });
    }

    httpHelp.bootstrap = function(config, next) {
        next = next || function() {};

        app.engine('.html', ejs.__express);
        app.set('view engine', 'html');
        app.set('views', __dirname + '/../views');

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: false
        }));
        app.use(express.static(__dirname + '/../assets'));

        // app.use(upload);

        app.use(session(config.session));

        app.use(function(err, req, res, next) {
            //打印请求
            logger.debug(req.method, ':', req.url);
            if (err) {
                logger.error(err.stack);
                res.render('phone/error', {
                    "error": "服务器发生异常"
                });
            }
        });

        app.use(function(req, res, next) {
            res.locals.DateFormate = function(date, fmt) {
                if (!fmt) {
                    fmt = "yyyy-MM-dd";
                }
                var o = {
                    "M+": date.getMonth() + 1, //月份
                    "d+": date.getDate(), //日
                    "h+": date.getHours(), //小时
                    "m+": date.getMinutes(), //分
                    "s+": date.getSeconds(), //秒
                    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                    "S": date.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            };

            //打印请求
            logger.debug(req.method, ':', req.url);

            if (req.url === '/favicon.ico') {
                return res.end();
            }

            //注入方法
            res.jsonResponse = require('./jsonResponse');
            var policies = config.policies;
            var key = req.path;
            var flag = false;
            for (var policie in policies) {
            if (key.match(policie)) {
                var func = policies[policie];
                flag = true;
                res.locals.userinfo = req.session.user;
                if (func === true) {
                    return next();
                } else {
                    return func(req, res, next);
                }
            }
            }
            if (flag === false) {
            logger.error("接口在polices.js中未作配置，请前往配置");
            return res.render("error", {
                "error": "服务器错误"
            });
            }

            // return next();
        });

        initRouter();

        start(config.local, next);

    };

    module.exports = httpHelp;
})();

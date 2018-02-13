var app = require('koa')();
var router = require('koa-router')();
var koaBody = require('koa-body')();

// router.get('/', function *(next) {
//     this.body = 'hello koa !'
// });

// router.get('/api', function *(next) {
//     this.body = 'test data'
// });
// router.get('/api/1', function *(next) {
//     this.body = 'test data 1'
// });
// router.get('/api/2', function *(next) {
//     this.body = {
//         a: 1,
//         b: '123'
//     }
// });
// router.post('/api/post', koaBody, function *(next) {
//     console.log(this.request.body)
//     this.body = JSON.stringify(this.request.body)
// });



// 首页 —— 广告（超值特惠）
var homeAdData = require('./home/ad.js');
router.get('/api/homead', function *(next) {
    this.body = homeAdData
});
// 首页 —— 推荐列表（猜你喜欢）
var homeListData = require('./home/list.js')
router.get('/api/homelist/:city/:page', function *(next) {
    // 参数
    const params = this.params
    const paramsCity = params.city
    const paramsPage = params.page

    console.log('当前城市：' + paramsCity)
    console.log('当前页数：' + paramsPage)

    this.body = homeListData
});

var searchListData = require('./search/list.js')
router.get('/api/searchlist/:city/:page/:type/:keyword', function *(next) {
    // 参数
    const params = this.params
    const paramsCity = params.city
    const paramsPage = params.page
    const paramsKeyword = params.keyword
    const paramsType = params.type

    console.log('当前城市：' + paramsCity)
    console.log('当前页数：' + paramsPage)
    console.log('当前keyword：' + paramsKeyword)
    console.log('当前type：' + paramsType)

    this.body = searchListData
});


var detailComment = require('./detail/comment.js');
router.get('/api/detail/comment/:id/:page', function *(next) {
    const params = this.params
    const page = params.page
    const id = params.id

    console.log('商户id: ' + id)
    console.log('当前页数: ' + page)
    this.body = detailComment
});

var detailInfo = require('./detail/info.js');
router.get('/api/detail/info/:id', function *(next) {
    const params = this.params
    const id = params.id

    console.log('商户id: ' + id)
    this.body = detailInfo
});

var orderList = require('./orderList/list.js');
router.get('/api/orderList/:id', function *(next) {
    const params = this.params
    const id = params.id

    console.log('用户id: ' + id)
    this.body = orderList
});


// 提交评论
router.post('/api/submitComment', function *(next) {
    console.log('提交评论')

    // 获取参数

    this.body = {
        errno: 0,
        msg: 'ok'
    }
})







app.use(router.routes())
   .use(router.allowedMethods());

app.listen(3000);

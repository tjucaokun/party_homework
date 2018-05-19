var $ = Dom7 ; 

var app = new Framework7({
    root: '#app',

    name: 'My App',

    id: 'com.myapp.test',

    theme: 'auto', 

    panel: {
        swipe: 'left',
    },

    routes: [
        {
            path: '/main/',
            url: './pages/main.html',
        },
        {
            path: '/ranks/',
            url: './pages/ranks.html',
        }
    ],

});

var mainView = app.views.create('.view-main')

// app.request.get('127.0.0.1:2999',(data) => {
//     console.log(data);
//     alert(data);
// })
var urll = 'http://api.map.baidu.com/telematics/v3/weather?location=嘉兴&output=json&ak=5slgyqGDENN7Sy7pw29IUvrZ';
var url1 = 'http://127.0.0.1:2999/posts'
// app.request({
//     url: url1,
//     async: true,
//     datatype: 'jsonp',
//     jsonp:'callback',
//     statusCode: {
//       404: function (xhr) {
//         alert('page not found');
//       }
//     }
//   })
function BeginGame(){
    console.log('begin');
    let datas=[1];
    var a = app.request.json(url1,null,
                        data => {
                            console.log(data);
                            datas = [...data];
                        }, 
                        error => console.log(error));

    $.when(a).done(console.log(datas));
    
    $('#data').on('click',function(){
        data = document.createElement('div');
        data.values = datas;
        $(this).appendChild(data);
})
};

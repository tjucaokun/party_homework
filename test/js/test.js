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
            path:'/index/',
            url:'./index.html'
        },
        {
            path: '/main/',
            url: './pages/main.html',
        },
        {
            path: '/ranks/',
            url: './pages/ranks.html',
        },
        {
            path: '/end/',
            url: './pages/end.html',
        },
        {
            path: '/checkpoint/',
            url: './pages/checkpoint.html',
        }
    ],

});

var mainView = app.views.create('.view-main');

var url1 = 'http://127.0.0.1:2999/posts';
var url2 = 'http://127.0.0.1:2999/profile';       

let ranknum = 0 ;
var ranks = [];
app.on('pageInit',function (e) {
// do something on page init
    // var page = e.detail.page;
    console.log(e.route.url)
    if (e.route.url == '/ranks/'){
        setTimeout(function initranks(){
            ranknum = 1 ;
            ranks = [] ;
            app.request.json(url2,null,rank => {
        
                console.log(rank);
                rank.sort(sortscore);
                appendtbody(rank);
            },error => console.log(error));
        
        },100);
        
    }
    else if (e.route.url == '/end/'){
        initend();
    }
});
function initend(){
    $('#confirm').on('click',function(){
        name = $('#name').val();
        app.request.postJSON(url2,
            {name:name,score:55},
            success => console.log(success),
            error => console.log(error));
    })
}

function appendtbody(ranks){
    var tbody = document.getElementById('tbody');
    for( var i=0; i< ranks.length; i++){
        var trow = getDataRow(ranks[i]);
        tbody.appendChild(trow);
    };
}
function getDataRow(h){  
    var row = document.createElement('tr');  
      
    var idCell = document.createElement('td');
    idCell.innerHTML = ranknum; 
    row.appendChild(idCell);   
      
    var nameCell = document.createElement('td');  
    nameCell.innerHTML = h.name;  
    row.appendChild(nameCell);  
      
    var jobCell = document.createElement('td');  
    jobCell.innerHTML = h.score;  
    row.appendChild(jobCell);   
    
    ranknum++;
    return row; //返回tr数据      
} 
function sortscore(a,b){
    return b.score - a.score;
}
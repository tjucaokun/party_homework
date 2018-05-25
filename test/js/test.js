

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

let datas=[];
var id = -1;
var score = 0;
var tscore = 0;
var ans;
var able=1;
var keep=1;
let ranknum = 0 ;
var ranks = [];
var len;
var cas = 0;
localStorage.setItem('level',1);
var qnum;
var timebar = 0 ;

function getdata()
{
    var b = app.request.json(url1,null,function(data){
        // console.log(data);
        // console.log("asd");

        datas = data;
        //len=(data.length);
        console.log(len);
    },null);
}

function lev()
{
    cas = 1;
    //console.log(data);
    //console.log("asd");
    //datas = data;
    qnum=5;
    len = (datas.length);
    tscore = 0;
    console.log(len);
    id = parseInt(Math.random() * (len - 5));
    len = id + 5;
    id--;
    
    timebar+=1;
    console.log("sba:"+timebar);
    showDeterminate(true, keep);
    
    fresh();
    //console.log(len);
    
}
function BeginGame(){
    qnum=50;
    cas = 0;
    id = -1;
    score = 0;
     timebar++;
    console.log('begin');
    //var b = app.request.json(url1,null,function(data){
        // console.log(data);
        // console.log("asd");

        ///datas = data;
        len=(datas.length);
        console.log(len);

        showDeterminate(true,keep);
        
        fresh();
    //},null);
};
getdata();
app.on('pageInit',function (e) {
    getdata();
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
    else if (e.route.url == '/end/'||e.route.url =='./pages/end.html'){
        initend();
        timebar=0;
        score=0;
    }
    else if (e.route.url =='/checkpoint/'||e.route.url =='./pages/checkpoint.html'){
        //passpoint();
        timebar=0;
        initcheckpoint();

    }
    else if (e.route.url == '/main/'||e.route.url =='./pages/main.html'){
        //timebar=0;
        if(cas == 1)
            lev();
        else
            BeginGame();

        initmain();
    }
    else if(e.route.url == '/index/'||e.route.url =='./index.html')
    {
        timebar=0;
    }
});
function c1(){choose(1);}
function c2(){choose(2);}
function c3(){choose(3);}
function c4(){choose(4);}
function c6(){fresh();}

function initmain() {
    $('.set-inline-progress').on('click', function (e) {
        var progress = $(this).attr('data-progress');
        app.progressbar.set('#demo-inline-progressbar', progress);
      });
      
    $('#1').on('click',function()
    {
        choose(1);
    });
    $('#2').on('click',function()
    {
        choose(2);
    });
    $('#3').on('click',function()
    {
        choose(3);
    });
    $('#4').on('click',function()
    {
        choose(4);
    });

    $('#6').on('click',function(){
        
        fresh();
    });
}
//结束页面逻辑
function initend(){
    $('#sco').text(score);
    $('#confirm').on('click',function(){
        name = $('#name').val();
        app.request.postJSON(url2,
            {name:name,score:score},
            success => console.log(success),
            error => console.log(error));
    })
}

//排行榜逻辑
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

//main逻辑

function next()
{
    console.log(datas[id]);

    id+=1;
}

function choose(sid)
{
    if(able==1){
    ans = datas[id].ans;
    console.log(id);
    console.log(datas[1]);
    var str1='#'+sid;
    var str2='#'+ans;

    console.log(str1+' '+str2);
    if(sid==ans)
    {
        score+=10;
        tscore+=10;
        $(str1).css({'background-color': 'rgb(0, 200, 0)'});

    }
    else
    {
        $(str1).css({'background-color': 'rgb(200, 0, 0)'});
        $(str2).css({'background-color': 'rgb(0, 200, 0)'});
    }

    able=0;
    setTimeout(fresh,500);
    
    }
};
var cnt=0;
var progress = 0;
function showDeterminate(inline,tp) {
  determinateLoading = true;
  var progressBarEl;
  
  if (inline) {
    // inline progressbar
    progressBarEl = app.progressbar.show('#demo-determinate-container', 0);
  }
  
  function simulateLoading(tp) {
      console.log(timebar);
    //app.progressbar.set(progressBarEl, progress);
    if(timebar>1){
        timebar--;
    return ;
    }
    if (timebar==0)
    { return ;}
    
    //app.progressbar.set(progressBarEl, progress);
    setTimeout(function () {

      var progressBefore = progress;
      progress += 0.1 * 30;
      app.progressbar.set(progressBarEl, progress);
      
      cnt+=0.25;
      $("#100").text(8-parseInt(cnt));
      if (progressBefore < 100 && id<len) {
        simulateLoading(tp); //keep "loading"
      }
      else if(id<len){
        determinateLoading = false;
        
        //app.progressbar.hide(progressBarEl); //hide
        fresh();
        simulateLoading(tp); 
      }
      else
      {
          cnt=0;
          //timebar--;
      }
    }, 0.1 * 1000 + 200);
  }
  simulateLoading(tp);
}
// show inline determinate progressbar
function fresh()
{
    progress = 0;
    id+=1;
    cnt=0;
    if(id>=len)
    {
        if(cas==0){
            mainView.router.load({
            path: '/end/',
            url: './pages/end.html'
        });
        }
        else
        {
            if(passpoint()){
            mainView.router.load({
                path: '/checkpoint/',
                url: './pages/checkpoint.html'
            });}
            else
            {
                mainView.router.load({
                    path: '/end/',
                    url: './pages/end.html'});
            }

            console.log("leve  "+localStorage.getItem('level'));
        }  
    }
    else{
    //console.log(id);
    $('#5').text(score);
    $('#0').text(datas[id].question);
    $('#1').text(datas[id].s1);
    $('#2').text(datas[id].s2);
    $('#3').text(datas[id].s3);
    $('#4').text(datas[id].s4);
    $('#7').text(qnum);
    qnum--;
    $('#1').css({'background-color': 'rgb(250, 250, 250)'});
    $('#2').css({'background-color': 'rgb(250, 250, 250)'});
    $('#3').css({'background-color': 'rgb(250, 250, 250)'});
    $('#4').css({'background-color': 'rgb(250, 250, 250)'});
    //keep+=1;
    able=1;
    }
    
    //showDeterminate(true,keep);
    
}
//选关页面逻辑
function initcheckpoint() {
    levelFn();
}

function levelFn() {
    var level = document.getElementsByClassName('level')[0];
    level.style.display = 'block';
    var choose = level.getElementsByClassName('chooseLevel')[0];
    var theLevel = choose.getElementsByTagName('div');
    var menu = level.getElementsByClassName('menu')[0];
    var highest = localStorage.getItem('level');
    for (var i = 0; i < highest; i++) {
        theLevel[i].innerHTML = i + 1;
        theLevel[i].className = 'levelOpen';
        theLevel[i].onclick = function() {
            cas=1;
            mainView.router.load({
                path: '/main/',
                url: './pages/main.html'
            });
        }
    }

}

function passpoint(){
    if (tscore>=20){
        var num = localStorage.getItem('level');
        // console.log(num);
        num++;
        localStorage.setItem('level',num);

        return true;
    }else{
        return false;
    }
}

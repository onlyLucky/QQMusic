$(function(){
    init();
    interactive()
})
//初始化样式
function init (){
    searchInput();
    copyYear();
    bottomBtn();
}
//用户交互部分
function interactive(){
    songList();
    rollBtn({
        length:6,
        boxEl:".newSongs"
    });
    rollBtn({
        length:6,
        boxEl:".wonderful"
    })
}
function searchInput(){
    $('.search-input input').focus(()=>{
        $(".search-box").css({
            "visibility": "visible",
            "maxHeight": "800px"
        })
    })
    $('.search-input input').blur(()=>{
        $(".search-box").css({
            "visibility": "hidden",
            "maxHeight": "0px"
        })
    })
}

function bottomBtn(){
    $(window).scroll(function(){
        if($(window).scrollTop()>=130){
            $(".backTop").css("display","block");
        }else {
            $(".backTop").css("display","none");
        }

    })
    $(".backTop").click(function () {
        $(window).scrollTop(0);
    })

    console.log($(window).scrollTop());
}
function copyYear(){
    $("#copyYear").text((new Date()).getFullYear());
}

function songList(){
    let x=100;
    let index=0
    //上一张
    let left=function (){

        $(".songList .btn-left").click(function(){
            index++
            index=index>=2?0:index;
            if(x>=300){
                x=100;
                $(".songList .playlist-ul").css({
                    "left":"0%"
                });
            }else{
                x+=100;
            }
            $(".songList .playlist-ul").stop().animate({left:`-${x}%` },1000);
            let point=$(".songList .bottom-point-item")[index];
            $(point).addClass("active").siblings().removeClass('active');
        })
    }
//下一张
    let right=function (){
        $(".songList .btn-right").click(()=>{
            index++
            index=index>=2?0:index;
            if(x<=0){
                x=200
                $(".songList .playlist-ul").css({
                    "left":"-300%"
                });
            }else{
                x-=100;
            }
            $(".songList .playlist-ul").stop().animate({left:`-${x}%` },1000);
            let point=$(".songList .bottom-point-item")[index];//addClass前要为jq对象才能调用
            $(point).addClass("active").siblings().removeClass('active');
        })
    }
    //圆点的点击
    function point(){
        $(".songList .bottom-point-item").click(function(){
            let current=$(this).index()
            if(current===index){
                return false
            }else{
                $(this).addClass("active").siblings().removeClass("active");
                //像其他多个点的情况可以加循环遍历
                if(index>current){
                    x=x+100;
                    index=0;
                    $(".songList .playlist-ul").stop().animate({left:`-${x}%` },1000);
                }else {
                    x=x-100;
                    index=1;
                    $(".songList .playlist-ul").stop().animate({left:`-${x}%` },1000);
                }

            }
        })
    }
    left();
    right();
    point();
}
function rollBtn({
    length,
    boxEl
                 }) {
    let x = 100,
        index = 0

    /*上一张*/
    function left() {
        $(boxEl+" .btn-left").click(function () {
            index++;
            index = index >= (length-2)? 0 : index;
            if (x >= (length-1)*100) {
                x = 200;
                $(boxEl+" .ns-roll-box").css({
                    "left": "0%"
                })
            } else {
                x += 100
            }
            $(boxEl+" .ns-roll-box").stop().animate({left: `-${x}%`}, 800);
            let point = $(boxEl+" .bottom-point-item")[index];
            $(point).addClass("active").siblings().removeClass("active")
        })
    }
    /*下一张*/
    function right(){
        $(boxEl+" .btn-right").click(function () {
            index--
            index=index<0?(length-3) : index;
            if(x<=0){
                x=(length-3)*100;
                $(".newSongs .ns-roll-box").css({
                    "left": `-${(length-2)*100}%`
                })
            }else {
                x-=100;
            }
            $(boxEl+" .ns-roll-box").stop().animate({left: `-${x}%`}, 800);
            let point = $(boxEl+" .bottom-point-item")[index];
            $(point).addClass("active").siblings().removeClass("active")
        })
    }
    /*圆点点击*/
    function point(){
        $(boxEl+" .bottom-point-item").click(function(){
            let current=$(this).index();
            if(current===index){
                return false
            }else {
                $(this).addClass("active").siblings().removeClass("active");
                if(index>current){
                    let len=index-current;
                    index=current;
                    for(let i=0;i<len;i++){
                        if(x<=0){
                            x=(length-3)*100;
                            $(boxEl+" .ns-roll-box").css({
                                "left": `-${(length-2)*100}%`
                            })
                        }else {
                            x-=100;
                        }
                        $(boxEl+" .ns-roll-box").stop().animate({left: `-${x}%`}, 400);
                    }
                }else if(index<current) {
                    let len=current-index;
                    index=current;
                    for(let i=0;i<len;i++){
                        if (x >= (length-1)*100) {
                            x = 200;
                            $(boxEl+" .ns-roll-box").css({
                                "left": "0%"
                            })
                        } else {
                            x += 100
                        }
                        $(boxEl+" .ns-roll-box").stop().animate({left: `-${x}%`}, 400);
                    }

                }
            }
        })
    }
    point()
    left();
    right();
}

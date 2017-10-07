(function( w ) {
    /*
     * 管道的特点：
     * 1、成对出现，所以x轴可以共享，但是y轴不共享
     * 2、上下管道之间的路径固定，可以由用户指定
     * 3、管道的高度是随机生成的，随机生成上管道的高度，下管道就可以计算了
     * 4、当管道走出画布，从右边出来时，高度需要重新随机生成
     * */

    /*
     * constructor { Pipe } 管道
     * param { ctx: Context } 绘图环境
     * param { imgDown：Image } 口朝下的管道，在画布的上面
     * param { imgUp：Image } 口朝上的管道，在画布的下面
     * param { space：number } 上下管道的间距
     * param { landHeight：number } 大地的高度
     * param { speed：number } 速度
     * */
        function Pipe(ctx,imgDown,imgUp,space,landHeight,speed) {
            this.ctx=ctx;
            this.imgDown=imgDown;
            this.imgUp=imgUp;
            this.speed=speed;
            this.landheight=landHeight;
            this.space=space;
            
            
            //管道的最小高度
            this.minHeight=50;
            
            //默认宽度和高度
            this.width=this.imgDown.width;
            this.height=this.imgDown.height;
            
            Pipe.len++;
            
            this.x=300+this.width*3*(Pipe.len-1);
            this.y=0;
            
            
            //初始化管道的坐标
            this.init();
        }
    
    //管道的数量
        Pipe.len=0;
    //扩展原型
    util.extend(Pipe.prototype,{
        //初始化管道的坐标
        init:function () {
            
            //单个管道的最大高度
            var maxheight=this.ctx.canvas.height-this.landheight-this.space-this.minHeight;
            
            
            //随机产生的管道的长度为min和max之间
            var randomheight=Math.random()*maxheight;
            randomheight=randomheight<=this.minHeight?this.minHeight:randomheight;
            
            //上面的管道的y坐标=随机产生的高度-管道默认的高度
            this.downy=randomheight-this.height;
            //下面的管道的y坐标=随机产生的高度+间隔
            this.upy=randomheight+this.space;
        },
        //绘制管道
        draw:function () {
            this.ctx.drawImage(this.imgDown,this.x,this.downy);
            this.ctx.drawImage(this.imgUp,this.x,this.upy);
            this.drawpath();
        },
        drawpath:function () {
            this.ctx.rect(this.x,this.downy,this.width,this.height);
            this.ctx.rect(this.x,this.upy,this.width,this.height);
        },
        update:function () {
            this.x-=this.speed;
            //管道走出画布向右拼接
            if(this.x<=-this.width)
            {
                //重新出来的管道要初始化
                this.init();
                this.x+=this.width*3*(Pipe.len+1);
            }
        }
        
    })
    
    // 工厂模式
    w.getPipe = function( ctx, imgDown, imgUp, space, landHeight, speed ) {
        return new Pipe( ctx, imgDown, imgUp, space, landHeight, speed );
    };
}( window ));

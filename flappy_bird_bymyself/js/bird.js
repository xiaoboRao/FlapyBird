(function( w ) {
    /*
     * constructor { Bird } 鸟构造函数
     * param { ctx: Context } 绘图环境
     * param { img: Image } 鸟图
     * param { widthFrame: number } 一排的帧数
     * param { heightFrame: number } 一列的帧数
     * param { x: number } 鸟的起始x轴坐标
     * param { y: number } 鸟的起始y轴坐标
    **/

    function Bird(ctx,img,widthframe,heightframe,x,y) {
        this.ctx=ctx;
        this.img=img;
        this.widthframe=widthframe;
        this.heightframe=heightframe;
        this.x=x;
        this.y=y;

        //计算一只小鸟的宽和高
        this.width=this.img.width/this.widthframe;
        this.height=this.img.height/this.heightframe;

        //当前小鸟的帧数
        this.currentframe=0;

        //小鸟下落的速度
        this.speed=2;

        //加速度
        this.speedplus=0.5;

        //绑定事件
        this.bind();

    }
    
    //给小鸟原型扩展方法；
    util.extend(Bird.prototype,{
        draw:function () {
            //当下落速度为1时，旋转角度为10度；
            var baseline=Math.PI/180*10;
            var maxline=Math.PI/180*45;
            
            //根据速度计算旋转的弧度
            var rotateradian=baseline*this.speed;
            
            //限制最大的旋转角度为70度；
            rotateradian=rotateradian>=maxline?maxline:rotateradian;
            
            //这里是保存了上面的所有对画布的操作，防止被下面的对坐标操作而别影响；
            this.ctx.save();

            /**
             * 1.平移到小鸟的中心点
             * 2.然后根据下落的速度旋转坐标系
             * 3.绘制小鸟，但是绘制的x和y坐标变为负的宽高的一半
             */
            
            this.ctx.translate(this.x+this.width/2,this.y+this.height/2);
            this.ctx.rotate(rotateradian);
            //先图片从集合中扣出来，然后画在对应的坐标上
            this.ctx.drawImage(this.img,this.width*this.currentframe,0,this.width,this.height,
            -this.width/2,-this.height/2,this.width,this.height
            );
            this.ctx.restore();
        },
        
        update:function () {
            //绘制下一帧
            this.currentframe=++this.currentframe>=this.widthframe?0:this.currentframe;
            
            //让小鸟不停下落
            this.y+=this.speed;
            
            //加速掉落
            this.speed+=this.speedplus;
        },
        
        //绑定事件
        bind:function () {
            var self=this;
            this.ctx.canvas.addEventListener('click',function () {
                self.speed=-3;
            })
        }
    })
    // 用来存储已经创建好的鸟实例对象
    var bird = null;

    // 工厂模式
    w.getBird = function( ctx, img, widthFrame, heightFrame, x, y ) {

        // 单利模式,整个游戏只要一个bird就够了
        if ( !bird ) {
            bird = new Bird( ctx, img, widthFrame, heightFrame, x, y );
        }

        return bird;
    };
}( window ));
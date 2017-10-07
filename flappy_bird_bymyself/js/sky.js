(function( w ) {
    var cvs = document.getElementById('cvs');
    var ctx = cvs.getContext('2d');

    /*
     * 绘制背景
     * construcotor { Sky } 背景构造函数
     * parasm { ctx: Context } 绘制环境
     * parasm { img: Image } 背景图像
     * parasm { speed: number } 背景速度
     * */
    function Sky(ctx,img,speed) {
        this.ctx=ctx;
        this.img=img;
        this.width=this.img.width;
        this.height=this.img.height-111;
        this.speed=speed||2;


        Sky.len++;
        //每创建一个实例,len增加;
        this.x=this.width*(Sky.len-1);
        this.y=0;
    }
    
    
    
    Sky.len=0;
    //增加原型方法
    util.extend(Sky.prototype, {
        draw:function () {
            this.ctx.drawImage(this.img,this.x,this.y);
        },
        update:function () {
            this.x-=this.speed;
            if(this.x<=-this.width)
            {
                this.x+=this.img.width*Sky.len;
            }
        }
    })
    
    w.getSky = function( ctx, img, speed ) {
        return new Sky( ctx, img, speed );
    };
    
}( window ));
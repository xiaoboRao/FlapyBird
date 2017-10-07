(function( w ) {
  
    function Land(ctx,img,speed) {
        this.ctx=ctx;
        this.img=img;
        this.speed=speed||2;
        Land.len++;
        this.x=this.img.width*(Land.len-1);
        this.y=this.ctx.canvas.height-this.img.height;
    }
    
    //创建大地的实例数
    Land.len=0;
    util.extend(Land.prototype,{
        draw:function () {
            this.ctx.drawImage(this.img,this.x,this.y);
        },
        //每次更新是，对应的每一张图片都像前进speed px；
        update:function () {
            //每次循环，都要将对应的图片向前移动speed px；
            this.x-=this.speed;
            //判断移动的总距离是否为一张图片的长度;如果是就+对应照片长度，使其返回到最后的位置，然后后面的继续前进,Land.len相当于4；
            this.x+=this.x<=-this.img.width?this.img.width*Land.len:0;
        }
    })
    
    
    // 工厂模式
    w.getLand = function( ctx, img, speed ) {
        return new Land( ctx, img, speed );
    };
}( window ));
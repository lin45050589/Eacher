/**
* @description:  动态特效
* @param {type}
* @return:
*/
//入口函数
$(function () {
    /*功能 ：故障设备 tab栏切换 */
    // 注册点击事件
    $('.tabs>a').click(function () {
        // 排他修改自身样式
        $(this).addClass('active').siblings().removeClass('active');

        // // 显示对应的盒子  需要在dom树中隐藏一个盒子  不建议使用
        // // let index = $(this).index();
        // $('.monitor  .content').eq(index).show().siblings('.content').hide();

        //根据不同的按钮 加载不同的内容
        if ($(this).text() == '故障设备监控') {
            $('.content .head span:eq(0)').text('故障时间');
            $('.carousel .row .address').text('深圳深圳市宝安区松柏路创维工业园2栋南区');
            $('.carousel .row .address').next().text('1000001');
        } else {
            $('.monitor .content .head span:eq(0)').text('异常时间');
            $('.row .address').text('深圳市宝安区新安街道安福路一巷裕安花园17栋502');
            $('.carousel .row .address').next().text('1000002')
        }
    })

    /*无限滚动条
     1 需要获得滚动的高度
      row总数量*row高度()-当前显示row数量（）
     2 无限向上滚动，top的高度为负数， 从0开始滚动
    */
    function scrollAnimation() {
        // jq 自定义动画
        $('.carousel').animate({ top: -35 }, 3000, 'linear', function () {
            $('.carousel').css('top', 0);
            // 递归调用
            scrollAnimation()
        })
    }
    // 调用 开始滚动
    scrollAnimation()

    // 设备故障移入移出事件
    // 1 移入 动画停止：排他改样式
    $('.carousel>.row').mouseenter(function () {

        $(this).addClass('active').siblings().removeClass('active')
    })
    // 1 移出  动画继续：移出样式
    $('.carousel').mouseleave(function () {
        // 移出样式
        $('.carousel>.row').removeClass('active')
    })


    // 订单统计tab栏切换
    // 数据数组
    var orderData = [
        { orders: '20,301,987', amount: '99834' },
        { orders: '301,987', amount: '9834' },
        { orders: '1,987', amount: '3834' },
        { orders: '987', amount: '834' }
    ];

    // 绑定事件
    $('.order .filter a').click(function () {
        // 排他改样式
        $(this).addClass('active').siblings().removeClass('active');
        // 获取当前点击元素的下标
        var index = $(this).index();
        // 加载数据
        $('.order .data .item:eq(0) h4').text(orderData[index].orders);
        $('.order .data .item:eq(1) h4').text(orderData[index].amount);
    })


    // 销售额统计
    // 绑定事件
    $('.sales .caption a').click(function () {
        // 排他改样式
        $(this).addClass('active').siblings().removeClass('active');
    })


    // 全国热销数据
    var hotData = [
        { name: '可爱多', num: '9,086' },
        { name: '娃哈哈', num: '8,341' },
        { name: '喜之郎', num: '7,407' },
        { name: '八喜', num: '6,080' },
        { name: '小洋人', num: '6,724' },
        { name: '好多鱼', num: '2,170' },
    ];
    // 全国热销移入事件
    $('.sup:eq(0) li').mouseenter(function () {
        // 排他改样式
        $(this).addClass('active').siblings().removeClass('active');

        // 重新加载数据 数组最后一个元素 移动到数组最前面   利用unshift() .pop()
        hotData.unshift(hotData.pop());
        // 清除原数据
        $('.sup:eq(1)').empty()
        // 加载新数据
        for (var i = 0; i < hotData.length; i++) {
            $('.sup:eq(1)').append('<li>' +
                '<span>' + hotData[i].name + '</span>' +
                '<span><i class="icon-up" style="color: #DC3C33"></i>' + hotData[i].num +
                '</span>' +
                '</li>');

        }

    })

})
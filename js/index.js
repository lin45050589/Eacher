require('jQuery')
/* 1.动态特效 */
$(function () {
    /* 功能1 ： 故障设备  知识点：tab栏切换 */
    //1.给 .tabs>a 注册点击事件
    $('.tabs>a').click(function () {
        //2.排他思想修改自身样式
        $(this).addClass('active').siblings().removeClass('active');
        //3.排他思想显示对应盒子
        let index = $(this).index();
        $('.monitor .content').eq(index).show().siblings('.content').hide();
    });


    /* 功能2 ： 无限滚动条
        思路 ：
          (1)获取需要滚动的高度 ：  
            row总数量*row高度(15*35) - 当前显示row数量*row高度（10*35） = 175px
          (2).carousel无限向上滚动，如果top>-175px,则修改为0开始滚动
    */
    function scrollAnimation() {
        /* jq自定义动画 */
        $('.carousel').stop(true).animate({ top: -175 }, 8000, 'linear', function () {
            $('.carousel').css('top', 0);
            /* 动画结束后继续递归调用 */
            scrollAnimation();
        });
    };
    //开始滚动
    scrollAnimation();

    /* 功能3 ： 设备故障移入移出事件 */
    //1.移入row : 动画停止，排他思想修改样式
    $('.carousel>.row').mouseenter(function () {
        //排他思想修改样式
        $(this).addClass('active').siblings().removeClass('active');
    });

    //2.移出row : 动画继续， 移除样式
    $('.carousel').mouseleave(function () {
        //移除样式
        $('.carousel>.row').removeClass('active');
    });

    /* 功能4 ： 订单区域 tab栏切换 */
    //数据数组
    var orderData = [
        { orders: '20,301,987', amount: '99834' },
        { orders: '301,987', amount: '9834' },
        { orders: '1,987', amount: '3834' },
        { orders: '987', amount: '834' }
    ];

    $('.filter>a').click(function () {
        //1.获取当前点击的a标签下标
        let index = $(this).index();
        //2.排他思想修改样式
        $(this).addClass('active').siblings().removeClass('active');
        //3.修改数据
        $('.order .data>.item:eq(0)').children('h4').text(orderData[index].orders);
        $('.order .data>.item:eq(1)').children('h4').text(orderData[index].amount);

    });

    /* 功能5 ： 全国热榜移入 */
    var hotData = [
        { name: '可爱多', num: '9,086' },
        { name: '娃哈哈', num: '8,341' },
        { name: '喜之郎', num: '7,407' },
        { name: '八喜', num: '6,080' },
        { name: '小洋人', num: '6,724' },
        { name: '好多鱼', num: '2,170' },
    ];

    $('.province .sup:eq(0)>li').mouseenter(function () {
        //1.数组第一个元素移到最后面
        hotData.push(hotData.shift());
        //2.排他思想修改样式
        $(this).addClass('active').siblings().removeClass('active');
        //3.拼接html字符串
        let htmlStr = '';
        for (var i = 0; i < hotData.length; i++) {
            htmlStr += `<li><span></span>${hotData[i].name}<span> <s class="icon-up" style="color: #DC3C33"></s>${hotData[i].num}</span></li>`
        };
        //4.替换ul内容
        $('.province .sup:eq(1)').html(htmlStr);
    });
});


/* 2.echarts图表  : jq入口函数可以写多个*/

//1.饼图
$(function () {
    // 3.1 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector('.pie'));

    // 3.2 指定图表的配置项和数据
    var option = {
        title: {
            left: 'center',
            top: 20,
            textStyle: {
                color: '#ccc'
            }
        },

        color: ['#006cff', '#006c00', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#006cff'],

        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },


        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: [
                    { value: 180, name: '湖北' },
                    { value: 88, name: '云南' },
                    { value: 120, name: '北京' },
                    { value: 130, name: '山东' },
                    { value: 135, name: '河北' },
                    { value: 66, name: '江苏' },
                    { value: 130, name: '浙江' },
                    { value: 150, name: '四川' },
                ].sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    };

    // 3.3使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
});

//3.折线图
$(function () {
    // 3.1 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector('.line'));

    // 3.2 指定图表的配置项和数据
    var data = [
        [
            [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
        ],
        [
            [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
            [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
        ],
        [
            [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
            [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
        ],
        [
            [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
            [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
        ]
    ];

    var option = {
        title: {
            text: '单位:万',
            left: 30,
            // 文字颜色
            textStyle: {
                color: '#4c9bfd'
            },
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['预期销售额', '实际销售额'],
            left: 'right'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            // 文字颜色
            axisLabel: {
                color: '#4c9bfd'
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        },
        yAxis: {
            /* 刻度为数据最大刻度 */
            max: 'dataMax',
            type: 'value',
            // 文字颜色
            axisLabel: {
                color: '#4c9bfd'
            },
        },
        series: [
            {
                name: '预期销售额',
                type: 'line',
                stack: '总量',
                //曲线
                smooth: true,
                //圆圈大小
                symbolSize: 8,
                itemStyle: {
                    color: '#00f2f1'  // 线颜色
                },
                data: data[0][0]
            },
            {
                name: '实际销售额',
                type: 'line',
                stack: '总量',
                //曲线
                smooth: true,
                //圆圈大小
                symbolSize: 8,
                data: data[0][1],
                itemStyle: {
                    color: '#ed3f35'  // 线颜色
                }
            }
        ]
    };
    // 3.3使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
});


//2.柱状图
$(function () {
    // 3.1 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector('.bar'));

    // 3.2 指定图表的配置项和数据
    //自定义柱子样式
    var item = {
        value: 1000,
        itemStyle: {
            color: '#254065',
            opacity: 0.5
        },
    };

    var option = {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
                axisTick: {
                    alignWithLabel: true
                },
                //x底部文字
                axisLabel: {
                    textStyle: {
                        color: '#3398DB'
                    }
                },
            }
        ],
        yAxis: [
            {
                type: 'value',
                //y右侧文字
                axisLabel: {
                    textStyle: {
                        color: '#3398DB'
                    }
                },
            },
            {
                type: 'value',
            }
        ],
        series: [
            {
                name: '直接访问',
                type: 'bar',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            { offset: 0, color: '#00fffb' },
                            { offset: 1, color: '#0061ce' },
                        ]
                    ),
                },
                barWidth: '60%',
                data: [2100, 1900, 1700, 1560, 1400, item, item, item, 900, 750, 600, 480, 240],
            }
        ]
    };


    // 3.3使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
});


//3.折线图
$(function () {
    // 3.1 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector('.line'));

    // 3.2 指定图表的配置项和数据
    var data = [
        [
            [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
        ],
        [
            [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
            [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
        ],
        [
            [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
            [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
        ],
        [
            [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
            [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
        ]
    ];

    var option = {
        title: {
            text: '单位:万',
            left: 30,
            // 文字颜色
            textStyle: {
                color: '#4c9bfd'
            },
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['预期销售额', '实际销售额'],
            left: 'right'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            // 文字颜色
            axisLabel: {
                color: '#4c9bfd'
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        },
        yAxis: {
            /* 刻度为数据最大刻度 */
            max: 'dataMax',
            type: 'value',
            //修改刻度颜色
            splitLine: {
                lineStyle: {
                    color: '#012f4a'
                }
            },
            // 文字颜色
            axisLabel: {
                color: '#4c9bfd'
            },
        },
        series: [
            {
                name: '预期销售额',
                type: 'line',
                stack: '总量',
                //曲线
                smooth: true,
                //圆圈大小
                symbolSize: 8,
                itemStyle: {
                    color: '#00f2f1'  // 线颜色
                },
                data: data[0][0]
            },
            {
                name: '实际销售额',
                type: 'line',
                stack: '总量',
                //曲线
                smooth: true,
                //圆圈大小
                symbolSize: 8,
                data: data[0][1],
                itemStyle: {
                    color: '#ed3f35'  // 线颜色
                }
            }
        ]
    };
    // 3.3使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    //开启定时刷新图表数据

    var index = 0;

    setInterval(function () {
        //1.数组下标++ 切换数据
        index++;
        if (index > 3) {//数组最大下标为3,
            index = 0;
        };
        //2.替换数据
        option.series[0].data = data[index][0];
        option.series[1].data = data[index][1];
        //3.重新渲染 echarts图表
        myChart.setOption(option)
    }, 2000);
});


//4.环形图
$(function () {
    // 3.1 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector('.gauge'));

    // 3.2 指定图表的配置项和数据
    var option = {
        series: [
            {
                // 起始的角度
                startAngle: 180,
                name: '访问来源',
                type: 'pie',
                radius: ['130%', '150%'],
                center: ['48%', '80%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    {
                        value: 100, itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#00fffb' }, // 0 起始颜色
                                    { offset: 1, color: '#0061ce' }  // 1 结束颜色
                                ]
                            )
                        }
                    },
                    { value: 100, itemStyle: { color: '#12274d' } },
                    { value: 200, itemStyle: { color: 'transparent' } }
                ]
            }
        ]
    };

    // 3.3使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);


});

//5.迁徙图
$(function () {
    // 3.1 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector('.geo'));

    // 3.2 指定图表的配置项和数据
    var geoCoordMap = {
        '新疆玛纳斯基地': [86.22, 44.30],
        '九江': [116.00, 29.70],
        '新乡': [116.402217, 35.311657],
        ' ': [79.92, 37.12],
        '  ': [86.85, 47.70],
        '若羌县': [88.17, 39.02],
        '上海': [121.4648, 31.2891],
        '东莞': [113.8953, 22.901],
        '东营': [118.7073, 37.5513],
        '中山': [113.4229, 22.478],
        '临汾': [111.4783, 36.1615],
        '临沂': [118.3118, 35.2936],
        '丹东': [124.541, 40.4242],
        '丽水': [119.5642, 28.1854],
        '乌鲁木齐': [87.9236, 43.5883],
        '佛山': [112.8955, 23.1097],
        '保定': [115.0488, 39.0948],
        '兰州': [103.5901, 36.3043],
        '包头': [110.3467, 41.4899],
        '北京': [116.4551, 40.2539],
        '北海': [109.314, 21.6211],
        '南京': [118.8062, 31.9208],
        '南宁': [108.479, 23.1152],
        '南昌': [116.0046, 28.6633],
        '南通': [121.1023, 32.1625],
        '厦门': [118.1689, 24.6478],
        '台州': [121.1353, 28.6688],
        '合肥': [117.29, 32.0581],
        '呼和浩特': [111.4124, 40.4901],
        '咸阳': [108.4131, 34.8706],
        '哈尔滨': [127.9688, 45.368],
        '唐山': [118.4766, 39.6826],
        '嘉兴': [120.9155, 30.6354],
        '大同': [113.7854, 39.8035],
        '大连': [122.2229, 39.4409],
        '天津': [117.4219, 39.4189],
        '太原': [112.3352, 37.9413],
        '威海': [121.9482, 37.1393],
        '宁波': [121.5967, 29.6466],
        '宝鸡': [107.1826, 34.3433],
        '宿迁': [118.5535, 33.7775],
        '常州': [119.4543, 31.5582],
        '广州': [113.5107, 23.2196],
        '廊坊': [116.521, 39.0509],
        '延安': [109.1052, 36.4252],
        '张家口': [115.1477, 40.8527],
        '徐州': [117.5208, 34.3268],
        '德州': [116.6858, 37.2107],
        '惠州': [114.6204, 23.1647],
        '成都': [103.9526, 30.7617],
        '扬州': [119.4653, 32.8162],
        '承德': [117.5757, 41.4075],
        '拉萨': [91.1865, 30.1465],
        '无锡': [120.3442, 31.5527],
        '日照': [119.2786, 35.5023],
        '昆明': [102.9199, 25.4663],
        '杭州': [119.5313, 29.8773],
        '枣庄': [117.323, 34.8926],
        '柳州': [109.3799, 24.9774],
        '株洲': [113.5327, 27.0319],
        '武汉': [114.3896, 30.6628],
        '汕头': [117.1692, 23.3405],
        '江门': [112.6318, 22.1484],
        '沈阳': [123.1238, 42.1216],
        '沧州': [116.8286, 38.2104],
        '河源': [114.917, 23.9722],
        '泉州': [118.3228, 25.1147],
        '泰安': [117.0264, 36.0516],
        '泰州': [120.0586, 32.5525],
        '济南': [117.1582, 36.8701],
        '济宁': [116.8286, 35.3375],
        '海口': [110.3893, 19.8516],
        '淄博': [118.0371, 36.6064],
        '淮安': [118.927, 33.4039],
        '深圳': [114.5435, 22.5439],
        '清远': [112.9175, 24.3292],
        '温州': [120.498, 27.8119],
        '渭南': [109.7864, 35.0299],
        '湖州': [119.8608, 30.7782],
        '湘潭': [112.5439, 27.7075],
        '滨州': [117.8174, 37.4963],
        '潍坊': [119.0918, 36.524],
        '烟台': [120.7397, 37.5128],
        '玉溪': [101.9312, 23.8898],
        '珠海': [113.7305, 22.1155],
        '盐城': [120.2234, 33.5577],
        '盘锦': [121.9482, 41.0449],
        '石家庄': [114.4995, 38.1006],
        '福州': [119.4543, 25.9222],
        '秦皇岛': [119.2126, 40.0232],
        '绍兴': [120.564, 29.7565],
        '聊城': [115.9167, 36.4032],
        '肇庆': [112.1265, 23.5822],
        '舟山': [122.2559, 30.2234],
        '苏州': [120.6519, 31.3989],
        '莱芜': [117.6526, 36.2714],
        '菏泽': [115.6201, 35.2057],
        '营口': [122.4316, 40.4297],
        '葫芦岛': [120.1575, 40.578],
        '衡水': [115.8838, 37.7161],
        '衢州': [118.6853, 28.8666],
        '西宁': [101.4038, 36.8207],
        '西安': [109.1162, 34.2004],
        '贵阳': [106.6992, 26.7682],
        '连云港': [119.1248, 34.552],
        '邢台': [114.8071, 37.2821],
        '邯郸': [114.4775, 36.535],
        '郑州': [113.4668, 34.6234],
        '鄂尔多斯': [108.9734, 39.2487],
        '重庆': [107.7539, 30.1904],
        '金华': [120.0037, 29.1028],
        '铜川': [109.0393, 35.1947],
        '银川': [106.3586, 38.1775],
        '镇江': [119.4763, 31.9702],
        '长春': [125.8154, 44.2584],
        '长沙': [113.0823, 28.2568],
        '长治': [112.8625, 36.4746],
        '阳泉': [113.4778, 38.0951],
        '青岛': [120.4651, 36.3373],
        '韶关': [113.7964, 24.7028]
    };

    var BJData = [
        [{
            name: '新乡'
        }, {
            name: '新乡',
            value: 200
        }],
        [{
            name: '新乡'
        }, {
            name: '呼和浩特',
            value: 90
        }],
        [{
            name: '新乡'
        }, {
            name: '哈尔滨',
            value: 90
        }],
        [{
            name: '新乡'
        }, {
            name: '石家庄',
            value: 90
        }],
        [{
            name: '新乡'
        }, {
            name: '昆明',
            value: 30
        }],
        [{
            name: '新乡'
        }, {
            name: '北京',
            value: 100
        }],
        [{
            name: '新乡'
        }, {
            name: '长春',
            value: 40
        }],
        [{
            name: '新乡'
        }, {
            name: '重庆',
            value: 40
        }],
        [{
            name: '新乡'
        }, {
            name: '贵阳',
            value: 50
        }],
        [{
            name: '新乡'
        }, {
            name: '南宁',
            value: 30
        }],
        [{
            name: '新乡'
        }, {
            name: '济南',
            value: 10
        }],
        [{
            name: '新乡'
        }, {
            name: '太原',
            value: 40
        }],
        [{
            name: '新乡'
        }, {
            name: '西安',
            value: 60
        }],
        [{
            name: '新乡'
        }, {
            name: '武汉',
            value: 50
        }],
        [{
            name: '新乡'
        }, {
            name: '合肥',
            value: 40
        }],
        [{
            name: '新乡'
        }, {
            name: '南京',
            value: 30
        }],
        [{
            name: '新乡'
        }, {
            name: '沈阳',
            value: 20
        }],
        [{
            name: '新乡'
        }, {
            name: '成都',
            value: 10
        }]
    ];

    var SHData = [
        [{
            name: '九江'
        }, {
            name: '九江',
            value: 200
        }],

        [{
            name: '九江'
        }, {
            name: '长沙',
            value: 95
        }],
        [{
            name: '九江'
        }, {
            name: '武汉',
            value: 30
        }],
        [{
            name: '九江'
        }, {
            name: '南昌',
            value: 20
        }],
        [{
            name: '九江'
        }, {
            name: '合肥',
            value: 70
        }],
        [{
            name: '九江'
        }, {
            name: '南京',
            value: 60
        }],
        [{
            name: '九江'
        }, {
            name: '福州',
            value: 50
        }],
        [{
            name: '九江'
        }, {
            name: '上海',
            value: 100
        }],
        [{
            name: '九江'
        }, {
            name: '深圳',
            value: 100
        }],

    ];

    var GZData = [
        [{
            name: '新疆玛纳斯基地'
        }, {
            name: '新疆玛纳斯基地',
            value: 200
        }],
        [{
            name: '新疆玛纳斯基地'
        }, {
            name: '  ',
            value: 90
        }],
        [{
            name: '新疆玛纳斯基地'
        }, {
            name: ' ',
            value: 40
        }],
        [{
            name: '新疆玛纳斯基地'
        }, {
            name: '呼和浩特',
            value: 90
        }],
        [{
            name: '新疆玛纳斯基地'
        }, {
            name: '昆明',
            value: 40
        }],
        [{
            name: '新疆玛纳斯基地'
        }, {
            name: '成都',
            value: 10
        }],
        [{
            name: '新疆玛纳斯基地'
        }, {
            name: '兰州',
            value: 95
        }],
        [{
            name: '新疆玛纳斯基地'
        }, {
            name: '银川',
            value: 90
        }],
        [{
            name: '新疆玛纳斯基地'
        }, {
            name: '西宁',
            value: 80
        }],

    ];

    var planePath = 'path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705';

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
                res.push([{
                    coord: fromCoord
                }, {
                    coord: toCoord
                }]);
            }
        }
        return res;
    };

    var color = ['#3ed4ff', '#ffa022', '#a6c84c'];
    var series = [];
    [
        ['新乡', BJData],
        ['九江', SHData],
        ['新疆', GZData]
    ].forEach(function (item, i) {
        series.push({
            name: item[0] + ' Top10',
            type: 'lines',
            zlevel: 1,
            effect: {
                show: true,
                period: 6,
                trailLength: 0.7,
                color: '#fff',
                symbolSize: 3
            },
            lineStyle: {
                normal: {
                    color: color[i],
                    width: 0,
                    curveness: 0.2
                }
            },
            data: convertData(item[1])
        }, {
            name: item[0] + ' Top10',
            type: 'lines',
            zlevel: 2,
            effect: {
                show: true,
                period: 6,
                trailLength: 0,
                symbol: planePath,
                symbolSize: 15
            },
            lineStyle: {
                normal: {
                    color: color[i],
                    width: 1,
                    opacity: 0.4,
                    curveness: 0.2
                }
            },
            data: convertData(item[1])
        }, {
            name: item[0] + ' Top10',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
                brushType: 'stroke'
            },
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{b}'
                }
            },
            symbolSize: function (val) {
                return val[2] / 8;
            },
            itemStyle: {
                normal: {
                    color: color[i]
                }
            },
            data: item[1].map(function (dataItem) {
                return {
                    name: dataItem[1].name,
                    value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                };
            })
        });
    });

    option = {
        title: {
            left: 'left',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            top: 'bottom',
            left: 'right',
            data: ['北京 Top10', '上海 Top10', '广州 Top10'],
            textStyle: {
                color: '#fff'
            },
            selectedMode: 'single'
        },
        geo: {
            map: 'china',
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#132937',
                    borderColor: '#0692a4'
                },
                emphasis: {
                    areaColor: '#0b1c2d'
                }
            }
        },
        series: series
    };

    // 3.3使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
});


$(function () {
    $('.tabs a').click(function () {
        $(this).addClass('active').siblings().removeClass('active')
        if ($(this).text() == '故障设置监控') {
            $('.content .head span:eq(0)').text('故障时间')
            $('.carousel-view .row .address').text('深圳市宝安区石岩街道松柏路创维工业园2栋南区412')
            $('.carousel-view .row .address').next().text('1000001')
        } else {
            $('.content .head span:eq(0)').text('异常时间')
            $('.carousel-view .row .address').text('深圳市宝安区新安街道留仙二路中粮商务公园3栋1701')
            $('.carousel-view .row .address').next().text('1000002')
        }
    })
    $('.content .row').mouseenter(function () {
        $(this).addClass('active').siblings().removeClass('active')
    })

    $('.content .row').mouseleave(function () {
        $(this).removeClass('active')
    })

    // 滚动
    // 滚动距离= 真实高度(12*35)-可视高度(10*35)=
    function gundong() {
        $('.carousel-view .carousel').animate({ top: -35 }, 4000, 'linear', function () {
            $('.carousel-view .carousel').css('top', 0)
            gundong()
        })

    }
    gundong()


    // 订单统计tab栏切换
    // 数据数组
    let orderData = [
        { orders: '20,301,987', amount: '99834' },
        { orders: '301,987', amount: '9834' },
        { orders: '1,987', amount: '3834' },
        { orders: '987', amount: '834' }
    ];

    $('.order .filter a').click(function () {
        $(this).addClass('active').siblings().removeClass('active')
        let index = $(this).index();
        $('.order .data .item:eq(0) h4').text(orderData[index].orders)
        $('.order .data .item:eq(1) h4').text(orderData[index].amount)

    })


    // 销售额统计

    // $('.sales .date a').click(function () {
    //     $(this).addClass('active').siblings().removeClass('active')

    // })

    //热榜数据
    let hotData = [
        { name: '可爱多', num: '9,086' },
        { name: '娃哈哈', num: '8,341' },
        { name: '喜之郎', num: '7,407' },
        { name: '八喜', num: '6,080' },
        { name: '小洋人', num: '6,724' },
        { name: '好多鱼', num: '2,170' },
    ];
    // 全国热榜
    $('.cup:eq(0) li').mouseenter(function () {
        $(this).addClass('active').siblings().removeClass('active')
        // 将数组中最后一个元素，移动数组最前面
        hotData.unshift(hotData.pop())
        // 清空旧数据
        $('.cup:eq(1)').empty();
        // 渲染新数据
        for (let i = 0; i < hotData.length; i++) {
            $('.cup:eq(1)').append('<li>' +
                '<span>' + hotData[i].name + '</span>' +
                '<span>' + hotData[i].num + '<i class="icon-down" style="color: #68D8FE;">+</i></span> </li>'
            )
        }

    })


    // 图标渲染: 饼图
    $(function () {
        let myChart = echarts.init($('.pei')[0]);

        let option = {
            backgroundColor: '#2c343c',
            color: ['#006cff', '#006c00', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#006cff'],
            toolbox: {
                show: true,

            },
            series: [

                {
                    name: '面积模式',
                    type: 'pie',
                    radius: ['10%', '60%'],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    data: [
                        { value: 180, name: '湖北' },
                        { value: 88, name: '云南' },
                        { value: 120, name: '北京' },
                        { value: 130, name: '山东' },
                        { value: 135, name: '河北' },
                        { value: 66, name: '江苏' },
                        { value: 130, name: '浙江' },
                        { value: 150, name: '四川' },
                    ].sort(function (a, b) { return a.value - b.value }),
                    roseType: 'radius',


                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }

                }
            ]
        };

        myChart.setOption(option);
    });


    // 柱状图
    $(function () {
        let item = {
            value: 100,
            itemStyle: {
                color: '#254065',
                opacity: 0.5,
            }

        }
        let myChart = echarts.init($('.bar')[0]);
        let option = {
            color: ['#3398db'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                textStyle: {
                    color: '#f00'
                }
            },

            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },

            toolbox: {
                // show: true,

            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
                    //x轴文字颜色
                    axisLabel: {
                        color: '#007bd5',
                    },

                    //x轴线
                    axisTick: {
                        show: true,
                        lengrh: 6,
                        lineStyle: {
                            show: true,
                            length: 6,
                            color: '#007bd5'
                        }
                    },
                      //坐标轴轴线
                      axisLine: {
                        lineStyle: {
                            color: '#0078d4'
                        }
                    }

                },

            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        color: '#007bd5'
                    },
                    splitLine: {
                        lineStyle: {
                            color: ['#007bd5'],
                            width: 1
                        }
                    },
                    axisTick: {
                        lineStyle: {
                            show: true,
                            length: 6,
                            color: '#007bd5'
                        }
                    },
                     //坐标轴轴线
                     axisLine: {
                        lineStyle: {
                            color: '#0078d4'
                        }
                    }
                }
            ],
            series: [
                {
                    name: '直接访问',
                    type: 'bar',
                    data: [100, 152, 200, 234, 290, item, item, item, 130, 85, 70, 60, 55],
                    // showBackground: true,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                { offset: 0, color: '#83bff6' },
                                { offset: 0.5, color: '#188df0' },
                                { offset: 1, color: '#188df0' }
                            ]
                        )
                    },




                }
            ]
        };


        myChart.setOption(option);

    })


    //环形图
    $(function () {
        let myChart = echarts.init($('.gauge')[0]);
        let option = {

            series: [
                {
                    startAngle: 200,
                    name: '',
                    type: 'pie',
                    radius: ['110%', '130%'],
                    center: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {
                            value: 100, itemStyle: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 0, color: '#00bfdd' },
                                        { offset: 1, color: '#0065c2' }
                                    ]
                                )
                            }
                        },
                        { value: 100, itemStyle: { color: '#12274d' } },
                        { value: 100, itemStyle: { color: 'transparent' } },


                    ]
                }
            ]
        };



        myChart.setOption(option);

    })

    // 折线图

    $(function () {
        let myChart = echarts.init(document.querySelector('.line'));


        let data = [
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
        let option = {
            title: {

                text: '单位:万',
                textStyle: {
                    color: '#4c9bfd'
                },
                left: 30

            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['预期销售额', '实际销售额'],
                left: 'right',
                textStyle: {
                    color: '#4c9bfd'
                },
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
                    color: '#007bd5'
                },
                axisTick: {
                    lineStyle: {
                        color: '#007bd5'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#0078d4'
                    }
                },
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            },
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        color: '#007bd5'
                    },
                    splitLine: {
                        lineStyle: {
                            color: ['#007bd5'],
                            width: 1
                        }
                    },
                    axisTick: {
                        lineStyle: {
                            show: true,
                            length: 6,
                            color: '#007bd5'
                        }
                    },
                    //坐标轴轴线
                    axisLine: {
                        lineStyle: {
                            color: '#0078d4'
                        }
                    }
                }
            ],
            series: [
                {
                    name: '预期销售额',
                    type: 'line',
                    stack: '总量',
                    data: data[0][0],
                    smooth: true,
                    symbolSize: 8,
                    itemStyle: {
                        color: '#007bd5'    //线颜色
                    },


                },
                {
                    name: '实际销售额',
                    type: 'line',
                    stack: '总量',
                    data: data[0][1],
                    smooth: true,     //曲线
                    symbolSize: 8,    //圆圈大小
                    itemStyle: {
                        color: '#ed3f35'    //线颜色
                    },


                }
            ]
        };

        myChart.setOption(option);


       $('.sales .date a').click(function(){
           $(this).addClass('active').siblings().removeClass('active')
           let index=$(this).index()-1
           option.series[0].data = data[index][0]
           option.series[1].data = data[index][1]
           myChart.setOption(option);

       })
        let i = 0;
        setInterval(function () {
            
            if (i > 3) {
                i = 0
            }else{
                i++
            }

           $('.sales .date a').eq(i).click();



        }, 2000)


    })

})

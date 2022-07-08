<template>
    <div class="wrap" ref="barWarpRef">
        <titleComponent title="项目状态"></titleComponent>
			<div id="barChart" class="bar" style="width: 466px;height:560px;margin-left: 30px;" ref="barChartRef"></div>
		
	</div>
</template>

<script>
import titleComponent from "@/components/titleComponent";
export default {
    name: "projectStatusBar",
    components: {
        titleComponent
    },
    props: {
        bigScreenData: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data(){
        return{
            projectStatus: [],
            projectStatusNum: [],
        }
    },
    watch: {
        bigScreenData(newData, oldData){
            let projStatusList = newData.mapStatusName
            this.projectStatus = projStatusList.map((item) => {
                return item.proj_stauts
            })
            this.projectStatusNum = projStatusList.map((item) => {
                return item.tatol_stauts
            })
            this.initChart()
        }
    },
    mounted() {

    },
    methods: {
        initChart(){
            let myChart = this.$echarts.init(document.getElementById("barChart"));
            let option = {
                roam: false, // 禁止滚轮事件
                tooltip: {
                    show: false,
                },
                grid: {
                        // x: 40, //距离左边
                        // x2: 40, //距离右边
                        // y: 60, // 上距离
                        // y2: 60, // 下距离
					height:170
                },
                xAxis: {
                    axisLabel: {
                        interval: 0, //横轴信息全部显示
                        rotate: 0, //0度角倾斜显示
                        show: true,
                        textStyle: {
                            color: '#1FB0F4',
                            fontSize: 16
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#B6C1C4',
                        },
                    },
					splitLine: {
					    show: false,
					},
                    axisTick: {
                        show: false,
                    },
                    data: this.projectStatus
                },
                yAxis: {
                    type: 'value',
                    name: '单位（个）',
                    splitNumber: 4,
                    nameTextStyle: {
                        color: "#fff",
                        fontSize: 16
                    },
                    show: true,
					splitLine: {
					    show: true,
						lineStyle:{
							type:'dotted',
							color:'rgba(200,200,200,0.3)'
						}
					},
                    axisLabel: {
                        textStyle: {
                            color: '#fff',
                            fontSize: 16
                        },
                    }
                },
                series: [{
                    name: 'a',
                    tooltip: {
                        show: false
                    },
                    data: this.projectStatusNum,
                    type: 'bar',
                    barWidth: 20,
                    barGap: 100,
                    // barCategoryGap: '40%',
                    label: {
                        show: true, // 柱子顶部的数值
                        position: 'top',
                        top: 0,
                        textStyle: {
                            color: '#1AC0F4',
                            fontSize: 14
                        },
                        offset: [0, -10],
                    },
                    itemStyle: {
                        normal: {
                            color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: "#4729FB" // 0% 处的颜色
                            }, {
                                offset: 0.5,
                                color: "#3077F7" // 50% 处的颜色
                            }, {
                                offset: 1,
                                color: "#1FB0F4" // 100% 处的颜色
                            }], false)
                        }
                    },
                    // barGap: 0
                }, {
                    type: 'bar',
                    barWidth: 4,
                    itemStyle: {
                        normal: {
                            color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: "#235DFF" // 0% 处的颜色
                            }, {
                                offset: 0.5,
                                color: "#59ACF7" // 50% 处的颜色
                            }, {
                                offset: 1,
                                color: "#71CAFF" // 100% 处的颜色
                            }], false)
                        }
                    },
                    barGap: 0,
                    data: this.projectStatusNum
                }, {
                    name: 'b',
                    tooltip: {
                        show: false
                    },
                    type: 'pictorialBar',
                    itemStyle: {
                        borderWidth: 0,
                        borderColor: '#47A6FF',
                        color: '#1AC0F4',

                    },
                    symbol: 'path://M 0,0 l 120,0 l -30,60 l -120,0 z',
                    symbolSize: ['13', '3'],
                    symbolOffset: ['-1', '-2'], // 左右 ，上下
                    symbolRotate: 0,
                    symbolPosition: 'end',
                    data: this.projectStatusNum,
                    z: 3
                }],
            };

            option && myChart.setOption(option);
            window.addEventListener('resize', () => {
                myChart.resize()
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .wrap{
        height: 360px;
		margin-top: 5px;
        //flex: 3;
        display: flex;
        flex-direction: column;
        #barChart{
            flex: 1;
        }
    }
	.bar{
		width: 100%;
		height: 100%;
		// z-index: 999;
		padding: 10px 10px;
		background-image: url(../assets/images/barImgbg.png);
		background-size: 100% 100%;
		background-repeat:no-repeat;
	}
</style>
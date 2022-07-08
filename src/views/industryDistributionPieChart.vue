<template>
    <div class="wrap" ref="wrapRef">
        <titleComponent title="产业分布"/>
		<div class="industrybg">
			<div id="chart" ref="chartRef"></div>
		</div>
    </div>
</template>

<script>
import titleComponent from "@/components/titleComponent";
export default {
    name: "industryDistributionPieChart",
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
        return {
            myChart: null,
            pieData: []
        }
    },
    watch: {
        bigScreenData(newData, oldData){
            let projTypeList = newData.mapTypeName
            this.pieData = projTypeList.map((item) => {
                let obj = {}
                obj['name'] = item.proj_type
                obj['value'] = item.tatol_type
                return obj
            })
            this.initChart()
        }
    },
    mounted() {

    },
    methods: {
        initChart(){
            let chartDom = document.getElementById('chart');
            this.myChart = this.$echarts.init(chartDom);
            let option;

            option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)',
                    textStyle: {
                        fontSize: 18,
                        fontWeight: 'bold'
                    }
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['50%', '90%'],
                        top: '6%',
                        bottom: '10%',
                        avoidLabelOverlap: true,
                        itemStyle: {
                            borderRadius: 6,
                            borderColor: '#000409',
                            borderWidth: 2
                        },
                        labelLine: {
                            length: 10,
                            length2: 70,
                            maxSurfaceAngle: 80,
                            minTurnAngle: 120,
                            lineStyle: {
                                width: 2
                            }
                        },
                        label: {
                            formatter: '{b|{b}}{c|({c})}\n  {per|{d}%}  ',
                            rich: {
                                b: {
                                    color: '#fff',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    padding: [10, 4],
                                    lineHeight: 33
                                },
                                c: {
                                    color: '#fff',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    lineHeight: 33,
                                    padding: [10, 4],
                                },
                                per: {
                                    color: '#fff',
                                    fontSize: 16,
                                    padding: [10, 4],
                                }
                            }
                        },
                        data: this.pieData
                    }
                ]
            };

            /*this.pieData = [{"name":"其他","value":12},{"name":"商业","value":24},{"name":"住宅","value":6},{"name":"工业","value":2}]
            option = {
                series: [
                    {
                        name: 'Nightingale Chart',
                        type: 'pie',
                        radius: [20, 100],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: 8
                        },
                        data: this.pieData
                    }
                ]
            };*/

            option && this.myChart.setOption(option);

            window.addEventListener('resize', () => {
                this.myChart.resize()
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .wrap{
        height: 300px;
        //flex: 3;
        display: flex;
        flex-direction: column;
        #chart{
            flex: 1;
        }
		.industrybg{
			display: flex;
			width:448px;
			height:100%;
			padding: 0px 18px;
			padding-top: 17px;
			margin-left: 33px;
			background-image: url(../assets/images/panImgbg.png);
			background-repeat: no-repeat;
		}
    }
</style>
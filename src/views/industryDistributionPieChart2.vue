<template>
    <div class="wrap" ref="wrapRef">
        <titleComponent title="产业分布"/>
		<div class="industrybg">
			<div id="main" style="width: 220px;height:225px;"></div>
			<div class="panItem">
				<div class="itemRow" v-for="item in pieData" v-key="pieData.name">
					<div class="color-block" :style="{'background-color': item.color}"></div>
					<div class="text-name">{{item.name}}</div>
					<div class="num">{{item.value}}&nbsp;起</div>
				</div>
			</div>
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
            pieData: [],
			color:['#FB497C','#FF7714','#FFF440','#03BDA0','#4FCCFF']
        }
    },
    watch: {
        bigScreenData(newData, oldData){
			console.log("-------------------------------"+JSON.stringify(newData))
            let projTypeList = newData.mapTypeName
            this.pieData = projTypeList.map((item,index) => {
                let obj = {}
                obj['name'] = item.proj_type
                // obj['value'] = item.num
				obj['value'] = item.tatol_type
				obj['color'] = this.color[index]
                return obj
            })
            this.initChart()
        }
    },
    mounted() {
		console.log("----"+JSON.stringify(this.bigScreenData))
            this.initChart()
    },
    methods: {
        initChart(){
			var myChart = this.$echarts.init(document.getElementById('main'));
			 
			        // 指定图表的配置项和数据
			        var option = {
						color:['#FB497C','#FF7714','#FFF440','#03BDA0','#4FCCFF'],
						tooltip:{
							trigger:'item',
							show: true
						},
			                series : [
			                    {
			                        name: '访问来源',
			                        type: 'pie',
			                        radius: ['50', '100'],
									center: ['50%', '50%'],
									label: {
									   show: false,
									},
									itemStyle: {
										borderRadius: 5
									},
			                        data:this.pieData,
			                        // roseType: 'area',
			                        itemStyle: {
			                            normal: {
			                                shadowBlur: 6,
			                                shadowColor: 'rgba(0, 0, 0, 0.5)'
			                            }
			                        }
			                    }
			                ]
			            };
			 
			        // 使用刚指定的配置项和数据显示图表。
			        myChart.setOption(option);
            // let chartDom = document.getElementById('chart');
            // this.myChart = this.$echarts.init(chartDom);
            // let option;

            // option = {
            //     tooltip: {
            //         trigger: 'item',
            //         formatter: '{b}: {c} ({d}%)',
            //         textStyle: {
            //             fontSize: 18,
            //             fontWeight: 'bold'
            //         }
            //     },
            //     series: [
            //         {
            //             type: 'pie',
            //             radius: ['60%', '100%'],
            //             top: '6%',
            //             bottom: '10%',
            //             avoidLabelOverlap: true,
            //             itemStyle: {
            //                 borderRadius: 6,
            //                 borderColor: '#000409',
            //                 borderWidth: 4
            //             },
            //             labelLine: {
            //                 length: 10,
            //                 length2: 80,
            //                 maxSurfaceAngle: 80,
            //                 minTurnAngle: 120,
            //                 lineStyle: {
            //                     width: 2
            //                 }
            //             },
            //             label: {
            //                 formatter: '{b|{b}：}{c|{c}}  {per|{d}%}  ',
            //                 rich: {
            //                     b: {
            //                         color: '#fff',
            //                         fontSize: 16,
            //                         fontWeight: 'bold',
            //                         padding: [10, 4],
            //                         lineHeight: 33
            //                     },
            //                     c: {
            //                         color: '#fff',
            //                         fontSize: 16,
            //                         fontWeight: 'bold',
            //                         lineHeight: 33,
            //                         padding: [10, 4],
            //                     },
            //                     per: {
            //                         color: '#fff',
            //                         fontSize: 16,
            //                         padding: [10, 4],
            //                     }
            //                 }
            //             },
            //             data: this.pieData
            //         }
            //     ]
            // };

            // option && this.myChart.setOption(option);

            // window.addEventListener('resize', () => {
            //     this.myChart.resize()
            // })
        }
    }
}
</script>

<style lang="scss" scoped>
    .wrap{
        height: 260px;
        //flex: 3;
        display: flex;
        flex-direction: column;
        #chart{
            flex: 1;
        }
    }
	.panItem{
		margin-top: 35px;
	}
	.color-block{
		width: 35px;
		height: 13px;
	}
	.industrybg{
		display: flex;
		width:448px;
		height:290px;
		padding: 0px 18px;
		padding-top: 17px;
		margin-left: 33px;
		background-image: url(../assets/images/panImgbg.png);
		background-repeat: no-repeat;
	}
	.num{
		color: #adadad;
		font-size: 16px;
	}
	.text-name{
		color: #fff;
		font-size: 16px;
	}
	.itemRow{
		display: flex;
		width: 180px;
		height: 37px;
		margin-left: 30px;
		justify-content: space-around;
	}
</style>
<template>
    <div class="wrap" ref="barWarpRef">
		<div class="curtain"></div>
	<div class="detail" :style="{ right: right }">
		<div class="question">
			<div class="alert" v-if="!show" @click="openDetail"></div>
			<div class="alertNum" v-if="!show" @click="openDetail">{{alertNum}}</div>
			<div class="right-text" style="margin-top: 98px;"><a href="#" @click="openDetail">问题</a></div>
			<div class="right-text"><a href="#" @click="openDetail">进度</a></div>
		</div>
		<div class="right-info">
			<div class="title" @click="showProblem('0')">问题情况</div>
			<div class="question-info" @click="showProblem('0')">
				<div class="project-details">
				    <div class="project-item">
				        <div class="project-title">
				            <span class="project-name">问题上报数</span>
				            <span class="project-unit">单位：个</span>
				        </div>
				        <div style="height: 50px;text-align: left;">
				            <countUtil :count="problemNum"></countUtil>
				        </div>
				    </div>
				    <div class="project-item" style="padding-left: 60px;">
				        <div class="project-title">
				            <span class="project-name">问题整改数</span>
				            <span class="project-unit">单位：个</span>
				        </div>
				        <div style="height: 50px;text-align: left">
				            <countUtil :count="rectifyNum"></countUtil>
				        </div>
				    </div>
				</div>
				<div v-if="projblemTypeList" id="barChart2" class="bar" style="width: 467px;height:320px;" ref="barChartRef"></div>
			</div>
			<div class="title" style="margin-top: 60px;">进度预警</div>
			<div class="process" @click="showProblemInfo(projblemInvestment[0].proj_name)">
				<div class="process-info" >
					<div class="process-left" style="margin-left: -20px;">
						<div class="staticPic">
							<div class="process-num"><span>{{alertNum}}</span>个</div>
						</div>
						<div class="alertImg"></div>
					</div>
					<div class="process-right">
						<div class="process-row" v-for="item in projblemInvestment" @click.stop="showProblemInfo(item.proj_name)">
							<a href="#" style="color: #fff;">
								<div class="rows">
									{{item.proj_name}}项目
								</div>
							</a>
							<a href="#" style="color: #fff;">
								<div class="rows">
									延期 {{item.plan_time_one}} 天
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
		
	</div>
</template>

<script>
	import { getProjblemInvestment } from "@/api/index";
	import { getProjblemProject } from "@/api/index";
	import { getProjblemTotal } from "@/api/index";
	import countUtil from "@/components/countUtil";
export default {
    name: "problemProcess",
	components: {
	    countUtil
	},
    props: {
        bigScreenData: {
            type: Object,
            default() {
                return {};
            }
        },
    },
    data(){
        return{
            projectStatus: [],
            projectStatusNum: [],
            countProjNum: "0",
            estimateTotal: "0",
			alertNum:0,
			right:'-551px',
			show:false,
			projblemTypeList:[],
			projblemInvestment:[],
			rectifyNum:-1,
			problemNum:-1,
			projblemProject:[{
				proj_name:'',
				problem_type:'',
				problem_code:'',
				check_memo:'',
				handle_plan:'',
				handle_result:'',
			}],
			projName:[],
			probType:[],
			probCode:[],
			process:[
				{
					projectName:'长岭居商住项目',
					delay:'2',
				},
				{
					projectName:'生物安全创新港',
					delay:'3',
				},
				{
					projectName:'智汇中心',
					delay:'1',
				},
				{
					projectName:'知识城国际创新驱动中心项目',
					delay:'6',
				},
			]
			
        }
    },
    watch: {
        // bigScreenData(newData, oldData){
        //     //重置数据，只为了数字能滚动，因为数字需要改变才能滚动
        //     this.countProjNum = "000000"
        //     this.estimateTotal = "000000"
        //     this.enterArea = "000000"
        //     this.parcelArea = "000000"

        //     if(this.timer){
        //         clearInterval(this.timer)
        //     }
        //     this.timer = setInterval(() => {
        //         this.countProjNum = newData.tatol ? newData.tatol : "0"
        //         this.estimateTotal = (newData.total_money/10000) ? (newData.total_money/10000) : "0"
        //         this.enterArea = (newData.jz_area/10000) ? (newData.jz_area/10000) : "0"
        //         this.parcelArea = (newData.zd_area/10000) ? (newData.zd_area/10000) : "0"
        //     }, 0)
        // },
		projblemTypeList(newData, oldData){
		    let projStatusList = newData
		    this.projectStatus = projStatusList.map((item) => {
		        return item.problem_type
		    })
		    this.projectStatusNum = projStatusList.map((item) => {
		        return item.num
		    })
		    this.initChart()
		}
		
    },
    mounted() {

    },
    methods: {
		showProblem(index){
			this.$emit("showDetails" , index)
		},
		showProblemInfo(name){
			this.$emit("showDetails" , name)
		},
		hiddenInfo(){
			this.show = false
			this.right = '-551px'
		},
		loadInvest(){
			getProjblemInvestment().then(res => {
				console.log("---"+JSON.stringify(res))
			    if(res.code == 200){
					this.projblemInvestment = res.data.projblemInvestment
					this.alertNum = this.projblemInvestment.length
			    } else {
			        this.$message({
			            showClose: true,
			            message: res?.message ? res?.message : "网络出错，请稍后再试！",
			            type: 'error'
			        });
			    }
			}).catch(err => {
			    this.loadingInstance.close()
			    console.log(err)
			})
		},
		loadStatic(){
			getProjblemTotal().then(res => {
				console.log("---"+JSON.stringify(res))
			    if(res.code == 200){
					this.rectifyNum = res.data.rectifyNum
					this.problemNum = res.data.problemNum
					this.projblemTypeList = res.data.projblemTypeList
			    } else {
			        this.$message({
			            showClose: true,
			            message: res?.message ? res?.message : "网络出错，请稍后再试！",
			            type: 'error'
			        });
			    }
			}).catch(err => {
			    this.loadingInstance.close()
			    console.log(err)
			})
			this.loadInvest();
			getProjblemProject().then(res => {
				console.log("---"+JSON.stringify(res))
			    if(res.code == 200){
					this.projblemProject = res.data.projblemProject
					this.projblemProject.forEach(function(item,index){
						console.log(item.proj_name)
						this.projName.push(item.proj_name)
						this.probType.push(item.problem_type)
						this.probCode.push(item.problem_code)
					})
					// this.projblemProject.proj_name = res.data.projblemProject.proj_name
					// this.projblemProject.problem_type = res.data.projblemProject.problem_type
					// this.projblemProject.problem_code = res.data.projblemProject.problem_code
					// this.projblemProject.check_memo = res.data.projblemProject.check_memo
					// this.projblemProject.handle_plan = res.data.projblemProject.handle_plan
					// this.projblemProject.handle_result = res.data.projblemProject.handle_result
			    } else {
			        this.$message({
			            showClose: true,
			            message: res?.message ? res?.message : "网络出错，请稍后再试！",
			            type: 'error'
			        });
			    }
			}).catch(err => {
			    this.loadingInstance.close()
			    console.log(err)
			})
		},
		openDetail(){
			this.show = !this.show
			if(this.show){
				this.loadStatic()
				this.$emit("initData")
				this.right = '0px'
			}else{
				this.right = '-551px'
			}
		},
        initChart(){
            let myChart = this.$echarts.init(document.getElementById("barChart2"));
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
					height:222
                },
                xAxis: {
                    axisLabel: {
                        interval: 0, //横轴信息全部显示
                        rotate: 0, //0度角倾斜显示
                        show: true,
                        textStyle: {
                            color: '#fff',
                            fontSize: 16
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0,0,0,0)',
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
                    name: '单位（起）',
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
                    barWidth: 15,
                    barGap: 100,
                    // barCategoryGap: '40%',
                    label: {
                        show: true, // 柱子顶部的数值
                        position: 'top',
                        top: 0,
                        textStyle: {
                            color: '#fff',
                            fontSize: 14
                        },
                        offset: [0, -10],
                    },
                    itemStyle: {
                        normal: {
                            color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: "#1FB0F4" // 0% 处的颜色
                            }, {
                                offset: 0.5,
                                color: "#1FB0F4" // 50% 处的颜色
                            }, {
                                offset: 1,
                                color: "#1FB0F4" // 100% 处的颜色
                            }], false)
                        }
                    },
                    // barGap: 0
                }, ],
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
	::-webkit-scrollbar {
	    /*滚动条整体样式*/
	    width : 0.18rem;  /*高宽分别对应横竖滚动条的尺寸*/
	    height: 0.010rem;
	}
	::-webkit-scrollbar-thumb {
	    /*滚动条里面小方块*/
	    // border-radius: 0rem;
	    box-shadow   : inset 0 0 0.0625rem rgba(31, 61, 129, 0.3);
	    background   : #4A68CC;
	}
	::-webkit-scrollbar-track {
	    /*滚动条里面轨道*/
	    box-shadow   : inset 0 0 0.0625rem rgba(31, 61, 129, 0.6);
	    /*background   : #ededed;*/
	}
    .wrap{
        height: 360px;
		margin-top: 5px;
        //flex: 3;
        display: flex;
        flex-direction: column;
        #barChart2{
            flex: 1;
        }
    }
	.question{
		width: 108px;
		height: 400px;
		position: absolute;
		right: 544px;
		top: 30%;
		background-image: url("../assets/images/question.png");
		background-repeat: no-repeat;
		background-size: 100% 100%;
		z-index: 997;
		padding: 15px 32px;
		margin-right: -27px;
		box-sizing: border-box;
		.right-text{
			font-size: 25px;
			color:#A8B1CB;
			padding-top: 22px;
			padding-left: 12px;
		}
		.alert{
			width: 26px;
			height: 28px;
			position: absolute;
			right: 39px;
			top: 25%;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: url("../assets/images/alert.png");
			z-index: 998;
		}
		.alertNum{
			width: 23px;
			height: 23px;
			position: absolute;
			right: 36px;
			top: 22%;
			color: #fff;
			text-align: center;
			font-size: 20px;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: url("../assets/images/alertNum.png");
			z-index: 999;
		}
	}
	.project-details {
	    display: flex;
	    margin-top: 6px;
	    margin-bottom: 16px;
	}
	.project-unit {
	    color: #ccc;
	    font-size: 14px;
		padding-top: 3px;
	}
	.project-name {
	    font-size: 18px;
	    color: #ffffff;
	}
	.project-item {
	    flex: 1;
	    margin-right: -35px;
	}
	.staticPic{
		width: 205px;
		height: 120px;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-image: url("../assets/images/staticPic.png");
	}
	
	.project-title {
	    display: flex;
		width: 193px;
	    justify-content: space-between;
	    margin-bottom: 16px;
	}
	.project-item:last-child {
	    margin-right: 0;
	}
	
	.detail{
		display: flex;
		position: absolute;
		top:100px;
		right: 10px;
		-moz-transition: right 0.7s ease-out 0s;
		-webkit-transition: right 0.7s ease-out 0s;
		-o-transition: right 0.7s ease-out 0s;
		transition: right 0.7s ease-out 0s;
		.right-info{
			background-color: #305097;
			width: 524px;
			height: 915px;
			padding: 12px 12px;
		}
		.title{
			width: 480px;
			height: 25px;
			padding: 6px 10px;
			color: #fff;
			font-size: 20px;
			letter-spacing: 2px;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: url("../assets/images/title2.png");
		}
		.question-info{
			width: 467px;
			height: 440px;
			padding: 20px 20px;
			margin-top: 15px;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: url("../assets/images/page2-bg2.png");
		}
		.process{
			width: 467px;
			height: 220px;
			padding: 20px 20px;
			margin-top: 15px;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: url("../assets/images/panImgbg.png");
		}
	}
	.process-num span{
		color: #FF9F07;
		font-weight: bold;
		font-size: 29px;
		padding: 10px 8px;
	}
	.process-num{
		padding-top: 45px;
		padding-left: 70px;
		color: #fff;
		font-size: 25px;
	}
	.process-info{
		display: flex;
		margin-top: 10px;
	}
	.process-row{
		width: 287px;
		display: flex;
		justify-content: space-between;
		color:#fff;
	}
	.rows{
		width: 136px;
		line-height: 21px;
		font-size: 18px;
		margin-top: 10px;
	}
	.process-left{
		display: flex;
		flex-direction: column;
	}
	.process-right{
		width: 326px;
		height: 210px;
		overflow-y: auto;
	}
	.alertImg{
		width: 190px;
		height: 120px;
		margin-left: 18px;
		margin-top: -50px;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-image: url("../assets/images/9.png");
	}
	.bar{
		width: 100%;
		height: 100%;
		// z-index: 999;
		padding: 10px 10px;
	}
	.curtain{
		position: absolute;
		left: 1922px;
		top: 77px;
		width: 400px;
		height: 975px;
		z-index: 10005;
		background-color: #173277;
	}
	a{
		line-height: 28px;
		text-decoration: none;
		color: #A8B1CB;
	}
</style>
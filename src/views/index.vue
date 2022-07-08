<template>
    <div class="container">
        <div class="main-wrap">
            <div class="main-title">
                <div class="logo"></div>
<!--                <div></div>-->
                <div v-if="!fullPageBool" @click="handleFullScreen" class="iconfont full-screen-icon">&#xeb98;</div>
                <div v-else @click="handleFullScreen" class="iconfont full-screen-icon">&#xeb99;</div>
            </div>
            <div class="main-content">
                <div class="left-wrap" @click="hiddenInfo">
                    <projectSynopsis :bigScreenData="projTotalData"></projectSynopsis>
                    <industryDistributionPieChart :bigScreenData="projPjData"></industryDistributionPieChart>
                    <projectStatusBar :bigScreenData="projStatusData"></projectStatusBar>
				</div>
                <div class="right-wrap">
                    <echartsMap :dataOb="projData" @hiddenInfo="hiddenInfo"></echartsMap>
                </div>
<!-- 				<div class="question" v-if="show">
					<div class="alert" @click="openDetail"></div>
					<div class="alertNum" @click="openDetail">{{alertNum}}</div>
					<div class="right-text" style="margin-top: 106px;"><a href="#" @click="openDetail">问题</a></div>
					<div class="right-text"><a href="#" @click="openDetail">进度</a></div>
				</div> -->
				<problemProcess ref="problemProcess" :bigScreenData="projTotalData" :statusData="projStatusData" @initData="initData" @showDetails="showProb"></problemProcess>
            </div>
			<div class="filter" v-if="showFilter"></div>
			<div class="problemInfo" v-if="showProblem">
				<div class="problemTitle">
					<span>问题情况</span>
					<a href="#" @click="closeProb">x</a>
				</div>
				<div class="problemContent">
					<div class="problemRow">
						<div class="problemName"><span>*</span>项目名称</div>
						<div class="select">
							<select v-model="projName" @change="probChange">
								<option v-for="item in projNameList" :value="item">{{item}}</option>
							</select>
						</div>
					</div>
					<div class="problemRow">
						<div class="problemName"><span>*</span>问题类型</div>
						<div class="select">
							<select v-model="probType" @change="probChange">
								<option v-for="item in probTypeList" :value="item">{{item}}</option>
							</select>
						</div>
					</div>
					<div class="problemRow">
						<div class="problemName"><span>*</span>问题编号</div>
						<div class="select">
							<select v-model="probCode" @change="probChange">
								<option v-for="item in probCodeList" :value="item">{{item}}</option>
							</select>
						</div>
					</div>
					<div class="problemRow">
						<div class="problemName" style="padding-left: 21px;width: 160px;">问题详情</div>
						<div class="textareaBg">
							<textarea style="resize:none;" disabled>{{probInfo.check_memo}}</textarea>
						</div>
					</div>
					<div class="problemRow">
						<div class="problemName" style="padding-left: 21px;width: 160px;">整改情况</div>
						<div class="textareaBg">
							<textarea style="resize:none;" disabled>{{probInfo.handle_plan}}</textarea>
						</div>
					</div>
					<div class="problemRow">
						<div class="problemName" style="padding-left: 21px;width: 160px;">整改结果</div>
						<div class="textareaBg">
							<textarea style="resize:none;" disabled>{{probInfo.handle_result}}</textarea>
						</div>
					</div>
				</div>
			</div>
			<div class="problemInfo" v-if="showProcess">
				<div class="problemTitle">
					<span>进度预警</span>
					<a href="#" @click="closeProb">x</a>
				</div>
				<div class="problemContent">
					<div class="problemRow">
						<div class="problemName"><span>*</span>项目名称</div>
						<div class="select">
							<select v-model="projName2" @change="probChange2">
								<option v-for="item in projNameList2" :value="item">{{item}}</option>
							</select>
						</div>
					</div>
					<div class="problemRow">
						<div class="problemName" style="padding-left: 21px;width: 160px;">施工进度情况</div>
						<div class="textareaBg" style="height: 308px;">
							<textarea style="height: 285px;resize:none;margin-top: 10px;" disabled >{{progInfo.work_progress}}</textarea>
						</div>
					</div>
					<div class="mileStone">
						<div class="table">
								<div class="th">
									<div class="title1">里程碑名称</div>
									<div class="title2">计划完成时间</div>
								</div>
								<div style="width:100%;height:223px;overflow-y: auto;">
									<div class="tr" v-for="item in progInfo.projblemWeek">
										<div class="title1" style="line-height: 39px;width: 502px;">{{item.milepost_one}}</div>
										<div class="title2" style="line-height: 39px;width: 232px;margin-left: 8px;">{{item.plan_time_one.substr(0,10)}}</div>
									</div>
								</div>
						</div>
						<!-- <div class="right-arrow" v-if="showRight" @click="nextP"></div> -->
						<!-- <div class="left-arrow" v-if="showLeft" @click="lastP"></div> -->
					</div>
				</div>
			</div>
        </div>
    </div>
</template>

<script>
import "../assets/font/iconfont.css"
import screenfull from 'screenfull';
// import { getIndexData } from "@/api/index";
import { getProjblemProgress } from "@/api/index";
import { getProjblemProject } from "@/api/index";
import { getProjTotal } from "@/api/index";
import { getStatusCount } from "@/api/index";
import { getTypeNameCount } from "@/api/index";
import { getProjectName } from "@/api/index";
import { getCheckSmartWorkLogin } from "@/api/index";
import projectSynopsis from "@/views/projectSynopsis";
import problemProcess from "@/views/problemProcess";
import industryDistributionPieChart from "@/views/industryDistributionPieChart";
import projectStatusBar from "@/views/projectStatusBar";
import echartsMap from "@/components/echartsMap";
import {Profn} from "@/uitls/Profn";
import {Loading} from "element-ui";
export default {
    name: 'index',
    components: {
        projectSynopsis,
        industryDistributionPieChart,
        projectStatusBar,
        echartsMap,
		problemProcess
    },
    data(){
        return {
            loadingInstance: null,
            fullPageBool: false,
            fullscreen: false,
            timer: null,
            projTotalData: {},
			projStatusData: {},
			projPjData:{},
			projData: {},
			isLogin:'',
            projectStatus: [],
            projectStatusNum: [],
			showLeft:false,
			showRight:false,
			mileStone:[
				{
					name:'',
					time:'',
				},
			],
			projblemProject:[],
			projblemProgress:[],
			projNameList:[],
			probTypeList:[],
			probCodeList:[],
			projNameList2:[],
			projblemWeek:[],
			projblemWeekAll:[],
			probInfo:{
				proj_name:'',
				problem_type:'',
				problem_code:'',
				check_memo:'',
				handle_plan:'',
				handle_result:'',
			},
			progInfo:{
				proj_name:'',
				work_progress:'',
				milepost_one:'',
				plan_time_one:'',
				projblemWeek:[]
			},
			page:1,
			tablePage:1,
			projName:'',
			projName2:'',
			probType:'',
			probCode:'',
            total: 0,
			show:true,
			showFilter:false,
			showProblem:false,
			showProcess:false,
			full:null,
			loginInfo:{
				userCode:'',
				token:''
			}
        }
    },
    created() {
		this.loadingInstance = Loading.service({
		    lock: true,
		    text: '努力加载中...',
		    background: 'rgba(0, 0, 0, 0.8)'
		})
    },
    mounted() {
		this.full = setInterval(function(){
			this.fullscreen = !this.fullscreen
			let $window = document.documentElement;
				Profn.fullPage($window);
		},2000)
		var urls = window.location.search
		if(!urls){
			this.loadingInstance.close()
			this.$message({
			    showClose: true,
			    message: "系统检测到您未登录，请登录！",
			    type: 'error'
			});
			setTimeout(function(){
				window.open("https://203.88.203.38:8080/kfq/","_self")
			},2200)
			return
		}
		console.log("------"+urls.substr(1).split('&')[1].split('=')[1])
		this.loginInfo.userCode = urls.substr(1).split('&')[0].split('=')[1]
		this.loginInfo.token = urls.substr(1).split('&')[1].split('=')[1]
				//进入详情再返回首页判断是否是全屏状态
				let isFull = JSON.parse(sessionStorage.getItem("fullPageBool"))
				this.fullPageBool = isFull ? isFull : false
				this.fullScreenListener()

		// if(this.progInfo.projblemWeek.length < 6){
		// 	for(var i = 6 ; this.progInfo.projblemWeek.length < 6 && i>0 ; i--){
		// 		this.progInfo.projblemWeek.push({
		// 				milepost_one:'',
		// 				plan_time_one:'',
		// 			})
		// 	}
		// }
        this.initData()
        if(this.timer){
            clearInterval(this.timer)
        }
		setTimeout(function(){
			clearInterval(this.full)
		},15000)
        this.timer = setInterval(() => {
            this.initData()
        }, 2000 * 10)
		setInterval(() => {
		    this.loginInfoLoad()
		}, 600000)
    },
    methods: {
        initData(){
			const self = this
			self.loginInfoLoad()
            getProjTotal().then(res => {
                if(res.code == 200){
                    this.projTotalData = res?.data;
                } else {
                    this.loadingInstance.close()
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
			getStatusCount().then(res => {
			    if(res.code == 200){
			        this.projStatusData = res?.data;
			        this.loadingInstance.close()
			    } else {
			        this.loadingInstance.close()
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
			getTypeNameCount().then(res => {
			    if(res.code == 200){
			        this.projPjData = res?.data;
					console.log("------"+JSON.stringify(this.projPjData) )
			        this.loadingInstance.close()
			    } else {
			        this.loadingInstance.close()
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
			getProjblemProgress().then(res => {
				self.projNameList2 = []
			    if(res.code == 200){
					self.projblemProgress = res.data.projblemProgress
					self.projblemProgress.forEach(function(item,index){
						console.log("---"+item.proj_name)
						self.projNameList2.push(item.proj_name)
					})
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
			this.$refs.problemProcess.loadInvest()
			if(this.$refs.problemProcess.show){   //展开时会使地图点位变化错乱，避免错乱，不需重加载地图数据
				return
			}
			getProjectName().then(res => {
			    if(res.code == 200){
			        this.projData = res?.data;
			        this.loadingInstance.close()
			    } else {
			        this.loadingInstance.close()
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
		
		loginInfoLoad(){
			var loginInfo = this.loginInfo
			getCheckSmartWorkLogin(loginInfo).then(res => {
			    if(res.code == 200){
					console.log("------"+res.data)
			        this.isLogin = res.data;
					if(this.isLogin == '验证失败'){
						this.loadingInstance.close()
						this.$message({
						    showClose: true,
						    message: "系统检测到您未登录，请登录！",
						    type: 'error'
						});
						setTimeout(function(){
							window.open("https://203.88.203.38:8080/kfq/","_self")
						},2200)
					}
			    } else {
			        this.loadingInstance.close()
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
		interSection(arr1,arr2){
			var arr1= arr1
			var arr2= arr2
			if(arr1.length<1){
				return arr2
			}
			if(arr2.length<1){
				return arr1
			}
			var arr3 = arr1.filter(item=>{
			    return arr2.includes(item)
			})
			return arr3
		},
		probChange(){
			const self = this
			var list = []
			var list2 = []
			var list3 = []
			if(self.projName!=''){
				self.projblemProject.forEach(function(item,index){
					if(item.proj_name == self.projName){
						list.push(item)
					}
				})
			}
			if(self.probType!=''){
				self.projblemProject.forEach(function(item,index){
					if(item.problem_type == self.probType){
						list2.push(item)
					}
				})
			}
			if(self.probCode!=''){
				self.projblemProject.forEach(function(item,index){
					if(item.problem_code == self.probCode){
						list3.push(item)
					}
				})
			}
			setTimeout(function(){
				self.probInfo = {
					check_memo:'暂无数据',
					handle_plan:'暂无数据',
					handle_result:'暂无数据',
				}
				var list4 = self.interSection(list,list2)
				if(list4.length<1){
					self.probInfo = {
						check_memo:'暂无数据',
						handle_plan:'暂无数据',
						handle_result:'暂无数据',
					}
					return
				}
				var list5 = self.interSection(list4,list3)
				console.log("-------"+JSON.stringify(list4)+"----"+JSON.stringify(list5))
				if(list5.length<1){
					self.probInfo = {
						check_memo:'暂无数据',
						handle_plan:'暂无数据',
						handle_result:'暂无数据',
					}
					return
				}
				self.probInfo = list5[0]
				console.log("-------"+JSON.stringify(self.probInfo))
			},200)
		},
		probChange2(){
			const self = this
			console.log("-------"+JSON.stringify(self.projblemProgress))
			console.log("--------"+self.projName2)
			// getProjblemProgress().then(res => {
			//     if(res.code == 200){
			// 		self.projblemProgress = res.data.projblemProgress
			//     } else {
			//         this.$message({
			//             showClose: true,
			//             message: res?.message ? res?.message : "网络出错，请稍后再试！",
			//             type: 'error'
			//         });
			//     }
			// }).catch(err => {
			//     this.loadingInstance.close()
			//     console.log(err)
			// })
			self.showRight = false
			self.showLeft = false
			if(self.projName2!=''){
				self.page = 1
				self.projblemProgress.forEach(function(item,index){
					console.log("--------"+self.projName2+"---"+item.proj_name)
					if(item.proj_name == self.projName2){
						console.log("---"+JSON.stringify(self.projblemProgress))
						self.progInfo = item
						self.projblemWeekAll = self.progInfo.projblemWeek
						console.log("-----"+JSON.stringify(self.projblemWeekAll))
						if(self.progInfo.projblemWeek.length>6){
							self.showRight = true
							// self.progInfo.projblemWeek = self.progInfo.projblemWeek.slice(0,6)
						}else{
							self.showRight = false
						}
						// if(self.progInfo.projblemWeek.length < 6){
						// 	for(var i = 6 ; self.progInfo.projblemWeek.length < 6 && i>0 ; i--){
						// 		self.progInfo.projblemWeek.push({
						// 				milepost_one:'',
						// 				plan_time_one:'',
						// 			})
						// 	}
						// }
					}
				})
			}
		},
		showProb(index){
			this.showFilter = true
			const self = this
			if(index == '0'){
				this.showProblem = true
				getProjblemProject().then(res => {
				    if(res.code == 200){
						self.projblemProject = res.data.projblemProject
						self.projblemProject.forEach(function(item,index){
							console.log("---"+item.proj_name)
							self.projNameList.push(item.proj_name)
							self.probTypeList.push(item.problem_type)
							self.probCodeList.push(item.problem_code)
						})
						self.projName = self.projNameList[0]
						self.probType = self.probTypeList[0]
						self.probCode = self.probCodeList[0]
						setTimeout(function(){
							self.probChange()
						},100)
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
			}else{
			if(index == '1'){
				this.showProcess = true
				getProjblemProgress().then(res => {
					self.projNameList2 = []
				    if(res.code == 200){
						self.projblemProgress = res.data.projblemProgress
						self.projblemProgress.forEach(function(item,index){
							console.log("---"+item.proj_name)
							self.projNameList2.push(item.proj_name)
							setTimeout(function(){
							self.projName2 = self.projNameList2[0]
							self.probChange2()
							},500)
						})
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

			}else{
				self.showProcess = true
				self.projName2 = index
				getProjblemProgress().then(res => {
					self.projNameList2 = []
				    if(res.code == 200){
						self.projblemProgress = res.data.projblemProgress
						self.projblemProgress.forEach(function(item,index){
							console.log("---"+item.proj_name)
							self.projNameList2.push(item.proj_name)
						})
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
				self.probChange2()
			}
			}
		},
		hiddenInfo(){
			this.$refs.problemProcess.hiddenInfo()
		},
		nextP(){
			this.showLeft = true
			this.page++;
			var beginP = 6*(this.page-1)
			var endP = 6*this.page
			if(this.projblemWeekAll.slice(beginP,endP).length<1){
				this.showRight = false
				return
			}
			this.progInfo.projblemWeek = this.projblemWeekAll.slice(beginP,endP)
			if(this.progInfo.projblemWeek.length < 6){
				this.showRight = false
				for(var i = 6 ; this.progInfo.projblemWeek.length < 6 && i>0 ; i--){
					this.progInfo.projblemWeek.push({
							milepost_one:'',
							plan_time_one:'',
						})
				}
			}
		},
		lastP(){
			this.showRight = true
			if(this.page <= 1){
				return
			}
			if(this.page == 2){
				this.showLeft = false
			}
			this.page--;
			var beginP = 6*(this.page-1)
			var endP = 6*this.page
			this.progInfo.projblemWeek = this.projblemWeekAll.slice(beginP,endP)
		},
		closeProb(){
			this.showFilter = false
			this.showProblem = false
			this.showProcess = false
			this.showLeft = false
			this.showRight = false
			this.probInfo = {}
			this.projName = ''
			this.probType = ''
			this.probCode = ''
			this.projNameList2 = []
			this.projNameList = []
			this.probTypeList = []
			this.probCodeList = []
			this.page = 1
			this.progInfo = {
				projblemWeek:[{
						milepost_one:'',
						plan_time_one:'',
					},{
						milepost_one:'',
						plan_time_one:'',
					},{
						milepost_one:'',
						plan_time_one:'',
					},{
						milepost_one:'',
						plan_time_one:'',
					},{
						milepost_one:'',
						plan_time_one:'',
					},{
						milepost_one:'',
						plan_time_one:'',
					}]
				}
			this.projName2 = ''
		},
        handleFullScreen(){
			clearInterval(this.full)
			Profn.cancelFullpage($window)
            this.fullscreen = !this.fullscreen
            let $window = document.documentElement;
            if(this.fullPageBool){
                Profn.fullPage($window);
            }else{
                Profn.cancelFullpage($window)
            }
            this.fullPageBool = this.fullPageBool ? false :true;
            //记录是否是全屏状态，以便进入详情再返回首页判断是否是全屏状态
            sessionStorage.setItem("fullPageBool", this.fullPageBool)
        },
        fullScreenListener(){
            //监听f11的全屏，f11关闭全屏，无法监听到
            let that=this
            window.addEventListener('keydown', function (event) {
                let e = event || window.event || arguments.callee.caller.arguments[0];
                if (e && e.keyCode == 122) {//捕捉F11键盘动作
                    e.preventDefault();  //阻止F11默认动作,自行定义全屏事件，否则f11全屏后，h5的全屏api失效
                    let el = document.documentElement;
                    let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;//定义不同浏览器的全屏API　　　　　　
                    if (typeof rfs != "undefined" && rfs) {
                        rfs.call(el);
                    } else if (typeof window.ActiveXObject != "undefined") {
                        let wscript = new ActiveXObject("WScript.Shell");
                        if (wscript != null) {//执行全屏
                            wscript.SendKeys("{F11}");
                        }
                    }
                    //监听不同浏览器的全屏事件，并件执行相应的代码
                    document.addEventListener("webkitfullscreenchange", function () {
                        if (document.webkitIsFullScreen) {
                            //全屏后要执行的代码
                            that.fullPageBool = true
                        } else {
                            //退出全屏后执行的代码
                            that.fullPageBool = false
                        }
                    }, false);

                    document.addEventListener("fullscreenchange", function () {
                        if (document.fullscreen) {
                            //全屏后执行的代码
                            that.fullPageBool = true
                        } else {
                            //退出全屏后要执行的代码
                            that.fullPageBool = false
                        }
                    }, false);

                    document.addEventListener("mozfullscreenchange", function () {
                        if (document.mozFullScreen) {
                            //全屏后要执行的代码
                            that.fullPageBool = true
                        } else {
                            //退出全屏后要执行的代码
                            that.fullPageBool = false
                        }
                    }, false);
                    document.addEventListener("msfullscreenchange", function () {
                        if (document.msFullscreenElement) {
                            //全屏后要执行的代码
                            that.fullPageBool = true
                        } else {
                            //退出全屏后要执行的代码
                            that.fullPageBool = false
                        }
                    }, false)
                } else if (e && e.keyCode == 116){
                    sessionStorage.setItem("fullPageBool", "false")
                }
            })
        }
    },
}
</script>
<style lang="scss" scoped>
	::-webkit-scrollbar {
	    /*滚动条整体样式*/
	    width : 0.13rem;  /*高宽分别对应横竖滚动条的尺寸*/
	    height: 0.0125rem;
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
	body{
		background-color: #fff !important;
	}
    .container{
        width: 100%;
        height: 100%;
        background-image: url("../assets/images/map_bg.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center center;
    }
	.problemInfo{
		position: absolute;
		top:13%;
		left: 26%;
		width: 944px;
		height: 848px;
		z-index: 1001;
		background-image: url("../assets/images/sqr.png");
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: center center;
		.problemTitle{
			width: calc( 91% + 4px );
			height: 40px;
			color: #fff;
			font-size: 20px;
			padding: 10px 25px;
			letter-spacing: 2px;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			margin-top: 42px;
			margin-left: 40px;
			background-image: url("../assets/images/sqrTitle.png");
			background-repeat: no-repeat;
			background-size: 100% 100%;
		}
		.problemTitle a{
			color: #fff !important;
			line-height: 20px !important;
			font-size: 22px !important;
		}
		.problemContent{
		}
	}
    .main-wrap{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 10px 15px;
        box-sizing: border-box;
        background-image: url("../assets/images/title.png");
		background-size: 1733px 95px;
        background-repeat: no-repeat;
        background-position: top center;
        .main-title{
            height: 53px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .logo{
                height: 53px;
                width: 200px;
				margin-left: 43px;
				margin-top: 20px;
                background-image: url("../assets/images/logo.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
                background-position: center center;
            }
            .full-screen-icon{
                font-size: 40px;
                color: #fff;
                cursor: pointer;
            }
        }
		.question{
			width: 108px;
			height: 400px;
			position: absolute;
			right: 0;
			top: 38%;
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
		.problemRow{
			display: flex;
			padding: 9px 0px;
			padding-left: 65px;
			.problemName{
				width: 180px;
				color: #fff;
				font-size: 20px;
				letter-spacing: 2px;
			}
			.problemName span{
				color: red;
				line-height: 50px;
				vertical-align: middle;
				padding: 0px 6px;

			}

		}
		.textareaBg{
			width: 540px;
			height: 120px;
			padding: 12px 5px;
			padding-left: 35px;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: url("../assets/images/problemArea.png");
		}
		.right-arrow{
			width: 33px;
			height: 33px;
			float: right;
			margin-top: -30px;
			margin-right: 68px;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: url("../assets/images/arrow-right.png");
		}
		.left-arrow{
			width: 33px;
			height: 33px;
			margin-top: -30px;
			margin-left: 40px;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: url("../assets/images/arrow-left.png");
		}
		.problemRow textarea{
			width: 100%;
			height: 98%;
			color:#A8B1CB;
			letter-spacing:1px;
			line-height: 35px;
			font-size:20px;
			background-color: rgba(0, 0, 0, 0);
			border-style: none;
			margin-left: -20px;
		}
		.select select{
			width: 580px;
			height: 50px;
			padding: 5px 8px;
			color: #A8B1CB;
			font-size: 19px;
			border-style: none;
			background-color: rgba(0,0,0,0);
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: url("../assets/images/selectBg.png");
		}
		.select select option{
			color: #595959;
			font-size: 16px;
		}
        .main-content{
            width: 100%;
            flex: 1;
            //height: calc(100vh - 0.125rem - 0.125rem - 0.6625rem - 0.5rem);
            margin-top: 40px;
            display: flex;
            .left-wrap{
                flex: 3;
                display: flex;
                flex-direction: column;
                //background: #7D2424FF;
            }
            .right-wrap{
                flex: 5;
                //background: #4A61BAFF;
            }
        }
    }
	.compTime{
		width: 286px;
		height: 50px;
	}
	.next{
		margin-top: -30px;
		float: right;
		margin-right: 70px;
		width: 30px;
		height: 30px;
		background-image: url("../assets/images/arrow-right.png");
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.table{
		margin-top: 20px;
		width: 80%;
		height: 273px;
		margin-left: 75px;
		background-image: url("../assets/images/table.png");
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.tr{
		width: 100%;
		height: 39px;
		color:#A8B1CB;
		font-size: 19px;
		text-align: center;
	}
	.title1{
		float: left;
		width: 512px;
		line-height: 42px;
		text-align: center;
		vertical-align: middle;
	}
	.title2{
		float: left;
		width: 240px;
		text-align: center;
		line-height: 42px;
		vertical-align: middle;
	}
	.th{
		width: 100%;
		color: #fff;
		font-size: 19px;
	}
	.filter{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1000;
		filter: blur(18px);
		-webkit-filter: blur(18px);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-image: url("../assets/images/filterBg.jpg");
	}
	.tbody{
		height: 300px;
		overflow-y: auto;
	}
	a{
		line-height: 28px;
		text-decoration: none;
		color: #A8B1CB;
	}
</style>

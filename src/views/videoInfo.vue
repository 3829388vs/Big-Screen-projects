<template>
	<el-container>
		<el-header>
			<div class="projname">
				<div class="projname-text">{{projName}}</div>
			</div>
		</el-header>
		<el-main>
			<plyaer v-if="loaded" ref="play" :sourceUrl="url" @playStatus= "changePlayStatus" @closeLoad="closeLoad" @AvaUrl="getAvalilableUrl" :channel="channel"></plyaer>
<!-- 			<el-dialog title="视频回放" :visible.sync="dialogFormVisible" :modal='false'>
				<div class="data-form">
				<el-row style="display: flex;justify-content: center;">
					<span style="line-height: 30px;vertical-align: middle;font-size: 18px;margin-left: 3px;">请选择起始日期</span>
					<el-date-picker
					  v-model="form.Date"
					  type="daterange"
					  value-format="yyyy-MM-dd"
					  range-separator="至"
					  start-placeholder="开始日期"
					  end-placeholder="结束日期"
					  size="large"
					  :picker-options="setDateRange"
					  @change="changeDate">
					</el-date-picker>
				</el-row>
				<el-row style="display: flex;justify-content: center;margin-top: 25px;">
					<el-time-select
						placeholder="起始时间"
						v-model="form.startTime"
						:picker-options="{
						  start: '00:00',
						  step: '00:05',
						  end: nowTime
						}"
						style="font-size: 18px !important;width: 175px;">
					  </el-time-select>
					  <el-time-select
						placeholder="结束时间"
						v-model="form.endTime"
						:picker-options="{
						  start: '00:00',
						  step: '00:05',
						  end: nowTime2,
						  minTime: form.startTime
						}"
						style="font-size: 18px !important;width: 175px;">
					  </el-time-select>
				  </el-row>
				  </div>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="sureDialog">确 定</el-button>
			  </div>
			</el-dialog> -->
		</el-main>
		<div class="curtain"></div>
		<div class="right-opration">
			<div class="operateArea" :style="{ left: left }">
				<div class="opraTitle">云台控制</div>
				<a href="#"><div class="arrow-hidden" @click="showOpra">{{arrow}}</div></a>
				<div class="dirOpe">
					<!-- <div class="dirName"></div> -->
					<div :class="{'direction' : true , 'dir1' : dir1, 'dir2' : dir2, 'dir3' : dir3, 'dir4' : dir4, 'dir5' : dir5, 'dir6' : dir6, 'dir7' : dir7, 'dir8' : dir8}"></div>
					<div @mousemove="dir1 = true" @mouseout="dir1 = false" style="position: absolute;top: 156px;left: 185px;width: 48px;height: 48px;z-index: 10000;" @click="Operate('top')" v-if="!isDisable"></div>
					<div @mousemove="dir2 = true" @mouseout="dir2 = false" style="position: absolute;top: 178px;left: 137px;width: 48px;height: 48px;z-index: 10000;" @click="Operate('leftTop')" v-if="!isDisable"></div>
					<div @mousemove="dir3 = true" @mouseout="dir3 = false" style="position: absolute;top: 175px;left: 236px;width: 48px;height: 48px;z-index: 10000;" @click="Operate('rightTop')" v-if="!isDisable"></div>
					<div @mousemove="dir4 = true" @mouseout="dir4 = false" style="position: absolute;top: 224px;left: 116px;width: 48px;height: 48px;z-index: 10000;" @click="Operate('left')" v-if="!isDisable"></div>
					<div @mousemove="dir5 = true" @mouseout="dir5 = false" style="position: absolute;top: 224px;left: 256px;width: 48px;height: 48px;z-index: 10000;" @click="Operate('right')" v-if="!isDisable"></div>
					<div @mousemove="dir6 = true" @mouseout="dir6 = false" style="position: absolute;top: 296px;left: 186px;width: 48px;height: 48px;z-index: 10000;" @click="Operate('bottom')" v-if="!isDisable"></div>
					<div @mousemove="dir7 = true" @mouseout="dir7 = false" style="position: absolute;top: 279px;left: 130px;width: 48px;height: 48px;z-index: 10000;" @click="Operate('leftBottom')" v-if="!isDisable"></div>
					<div @mousemove="dir8 = true" @mouseout="dir8 = false" style="position: absolute;top: 278px;left: 241px;width: 48px;height: 48px;z-index: 10000;" @click="Operate('rightBottom')" v-if="!isDisable"></div>
<!-- 					<el-row class="top">
					  <el-button class="buttons" size="large" icon="el-icon-top-left" @click="Operate('leftTop')" :disabled="isDisable"></el-button>
					  <el-button class="buttons" size="large" icon="el-icon-top" @click="Operate('top')" :disabled="isDisable"></el-button>
					  <el-button class="buttons" size="large" icon="el-icon-top-right" @click="Operate('rightTop')" :disabled="isDisable"></el-button>
					</el-row>
					<el-row class="middle">
					  <el-button class="buttons" size="large" icon="el-icon-back" @click="Operate('left')" :disabled="isDisable"></el-button>
						<el-button class="buttons" :type="type" size="large" icon="el-icon-switch-button" @click="change">{{type == 'success' ? '开启' : '停止'}}</el-button>
					  <el-button class="buttons" size="large" icon="el-icon-right" @click="Operate('right')" :disabled="isDisable"></el-button>
					</el-row>
					<el-row class="bottom">
					  <el-button class="buttons" size="large" icon="el-icon-bottom-left" @click="Operate('leftBottom')" :disabled="isDisable"></el-button>
					  <el-button class="buttons" size="large" icon="el-icon-bottom" @click="Operate('bottom')" :disabled="isDisable"></el-button>
					  <el-button class="buttons" size="large" icon="el-icon-bottom-right" @click="Operate('rightBottom')" :disabled="isDisable"></el-button>
					</el-row>
					<label class="label">云台方向</label> -->
				</div>
				<div class="dirOpe camaOpe">
					<!-- <div class="dirName2"></div> -->
					<div class="camaContr">
						<div style="display: flex;">
							<div class="camaText">镜头</div>
							<el-select size='large' :popper-append-to-body="false" v-model="opType" class="selects" placeholder="请选择" v-if="!isDisable">
								<el-option label="变倍" value="1">变倍</el-option>
								<el-option label="变焦" value="2">变焦</el-option>
								<el-option label="光圈" value="3">光圈</el-option>
							</el-select>
						</div>
						<div class="camaAR">
							<a href="#">
								<div class="add" @click="opeDir('add')" v-if="!isDisable">
									<div class="addIcon"></div>增加
								</div>
							</a>
							<a href="#">
								<div class="reduce" @click="opeDir('dec')" v-if="!isDisable">
									<span style="padding-left: 15px;">减少</span><div class="reduceIcon"></div>
								</div>
							</a>
						</div>
					</div>
<!-- 					<el-row class="top">
					<label class="label">镜头控制：</label>
					<el-select v-if="isDisable" :disabled="true" size='large' class="selects" placeholder="请选择"></el-select>
					<el-select v-else size='large' class="selects" v-model="opType" placeholder="请选择" >
						<el-option label="变倍" value="1">变倍</el-option>
						<el-option label="变焦" value="2">变焦</el-option>
						<el-option label="光圈" value="3">光圈</el-option>
					</el-select>
					</el-row>
					<el-row class="bottom">
						<label class="label" style="margin-right: 60px;">操作：</label>
					  <el-button class="buttons" size="large" type="primary"  @click="opeDir('add')" :disabled="isDisable">增加</el-button>
					  <el-button class="buttons" size="large" type="primary"  @click="opeDir('dec')" :disabled="isDisable">减小</el-button>
					</el-row> -->
					<!-- <label class="label" style="line-height:170px;margin-left: 150px;">云台镜头</label> -->
				</div>
				<div class="searchRec">
					<div class="camaContr">
						<div>
							<div class="camaText" style="display: flex;">回放
								<div :class="{recImg : true , recImg2 : isShowRed}" @click="showRed"></div>
							</div>
							<div class="data-form" v-if="isShowRed">
							<el-row>
								<el-date-picker
								style="width: 250px;"
								  v-model="form.Date"
								  type="daterange"
								  value-format="yyyy-MM-dd"
								  range-separator="至"
								  start-placeholder="开始日期"
								  end-placeholder="结束日期"
								  size="middle"
								  :picker-options="setDateRange"
								  @change="changeDate">
								</el-date-picker>
							</el-row>
							<el-row style="margin-top: 10px;">
								<el-time-select
									placeholder="起始时间"
									v-model="form.startTime"
									:picker-options="{
									  start: '00:00',
									  step: '00:05',
									  end: nowTime
									}"
									style="font-size: 18px !important;width: 125px;">
								  </el-time-select>
								  <el-time-select
									placeholder="结束时间"
									v-model="form.endTime"
									:picker-options="{
									  start: '00:00',
									  step: '00:05',
									  end: nowTime2,
									  minTime: form.startTime
									}"
									style="font-size: 18px !important;width: 125px;">
								  </el-time-select>
							  </el-row>
							  </div>
						</div>
						<div class="search" v-if="isShowRed">
							<a href="#"><div @click="sureDialog" class="back-home-btn2 search-btn">查询</div></a>
						</div>
					</div>
				</div>
<!-- 				<div class="dirOpe cloud">
					<div class="dirName3"></div>
					<div class="camaContr">
						<div class="camaText">云台控制选项</div>
						<el-select size='large' :popper-append-to-body="false" class="selects" v-model="opType2" placeholder="请选择" v-if="!isDisable">
							<el-option label="灯光" value="11">灯光</el-option>
							<el-option label="雨刷" value="12">雨刷</el-option>
							<el-option label="红外灯" value="13">红外灯</el-option>
							<el-option label="自动旋转" value="15">自动旋转</el-option>
							<el-option label="设置线扫左边界" value="16">设置线扫左边界</el-option>
							<el-option label="设置线扫右边界" value="17">设置线扫右边界</el-option>
							<el-option label="线扫" value="18">线扫</el-option>
							<el-option label="打开云台菜单" value="22">打开云台菜单</el-option>
							<el-option label="关闭云台菜单" value="23">关闭云台菜单</el-option>
							<el-option label="确定云台菜单" value="24">确定云台菜单</el-option>
							<el-option label="上移云台菜单" value="25">上移云台菜单</el-option>
							<el-option label="下移云台菜单" value="26">下移云台菜单</el-option>
							<el-option label="左移云台菜单" value="27">左移云台菜单</el-option>
							<el-option label="右移云台菜单" value="28">右移云台菜单</el-option>
						</el-select>
						<div class="funAR">
							<div class="zhixing" @click="operFunc(1)" v-if="!isDisable"></div>
							<div class="guanbi" @click="operFunc(2)" v-if="!isDisable"></div>
						</div>
					</div>
					</div> -->
<!-- 					<el-row class="top">
					<label class="label">云台控制：</label>
					<el-select v-if="isDisable" :disabled="true" size='large' class="selects" placeholder="请选择"></el-select>
					<el-select v-else size='large' class="selects" v-model="opType2" placeholder="请选择" :disabled="false">
						<el-option label="灯光" value="11">灯光</el-option>
						<el-option label="雨刷" value="12">雨刷</el-option>
						<el-option label="红外灯" value="13">红外灯</el-option> -->
						<!-- <el-option label="巡航" value="14">巡航</el-option> -->
<!-- 						<el-option label="自动旋转" value="15">自动旋转</el-option>
						<el-option label="设置线扫左边界" value="16">设置线扫左边界</el-option>
						<el-option label="设置线扫右边界" value="17">设置线扫右边界</el-option>
						<el-option label="线扫" value="18">线扫</el-option> -->
						<!-- <el-option label="设置巡迹" value="19">设置巡迹</el-option> -->
						<!-- <el-option label="巡迹" value="20">巡迹</el-option> -->
						<!-- <el-option label="辅助" value="21">辅助</el-option> -->
<!-- 						<el-option label="打开云台菜单" value="22">打开云台菜单</el-option>
						<el-option label="关闭云台菜单" value="23">关闭云台菜单</el-option>
						<el-option label="确定云台菜单" value="24">确定云台菜单</el-option>
						<el-option label="上移云台菜单" value="25">上移云台菜单</el-option>
						<el-option label="下移云台菜单" value="26">下移云台菜单</el-option>
						<el-option label="左移云台菜单" value="27">左移云台菜单</el-option>
						<el-option label="右移云台菜单" value="28">右移云台菜单</el-option>
					</el-select>
					</el-row>
					<el-row class="bottom">
						<label class="label" style="margin-right: 60px;">操作：</label>
					  <el-button class="buttons" size="large" type="primary"   @click="operFunc(1)" :disabled="isDisable">执行</el-button>
					  <el-button class="buttons" size="large" type="primary"   @click="operFunc(0)" :disabled="isDisable">关闭</el-button>
					</el-row> -->
					<!-- <label class="label" style="line-height:150px;margin-left: 150px;">云台功能</label> -->
				<div class="right-btn">
					<!-- <a href="#"><div :class="{'switch' : true , 'open' : isOpen , 'cancl' : isCancel}" @click="change">{{isOpen ? '开启' : '关闭'}}</div></a> -->
					<!-- <div class="record" @click="openDiag"></div> -->
					<div class="cancel">
						<a href="#"><div @click="handleToDet" class="back-home-btn2">返回</div></a>
					</div>
				</div>
			</div>
		</div>
	</el-container>
</template>

<script>
	import {getVideo} from "@/api";
	import {getRecordVideo} from "@/api";
	import {getOperateDirect} from "@/api";
	import {getOperateCamera} from "@/api";
	import {getOperateFunc} from "@/api";
	import {Loading} from "element-ui";
	import plyaer from "@/components/plyaer";
	export default {
	components: {
	    plyaer,
	},
	name: 'videoInfo',
	data() {
		return {
	        projList: [],
	        imgPath: [],
			disabledShot:null,
			checkedPontsName:'',
			status:1,
			status2:1,
			status3:1,
			opType:'1',
			opType2:null,
			isDisable:false,
			loaded:false,
			isOpen:true,
			isCancel:false,
			type:'success',
			arrow:'<',
			isShow:false,
			url:'',
			channel:'',
			projName:'',
			projId:'',
			right:'20px',
			left:'3px',
			dir0:true,
			dir1:false,
			dir2:false,
			dir3:false,
			dir4:false,
			dir5:false,
			dir6:false,
			dir7:false,
			dir8:false,
			width:'0px',
			dialogFormVisible:false,
			isShowRed:false,
			form:{
				Date: [],
				startTime: '',
				endTime: ''
			},
			backTime:3000,
			turn:0,
			nowTime:'',
			nowTime2:'',
			setDateRange:{
				disabledDate: time => {
					return time.getTime() > Date.now() || time.getTime() < Date.now()-10 * 24 * 3600 * 1000;
				}
			},
		}
	},
	created(){
		this.channel = this.$route.query.channelId
		this.projName = this.$route.query.projName
		this.projId = this.$route.query.projId
		console.log("-----"+this.projId)
	},
	mounted() {
	    this.getUrl()
		const self = this
		setTimeout(function(){
			self.$message({
				message: "因长时间未操作，系统即将返回上一页...",
				// type: 'error'
			});
			setTimeout(function(){
				self.handleToDet();
			},2500)
		},600000)
	},
	methods: {
		getUrl(){
			let self = this
			console.log("------------------------")
			getVideo(self.channel).then(res => {
				console.log(res)
				if(res.code == 200){
					self.url = res.data.url
					console.log(self.url)
					self.loaded = true
				} else {
					this.$message({
						showClose: true,
						message: res?.message ? res?.message : "网络出错，请稍后再试！",
						type: 'error'
					});
				}
			}).catch(err => {
				console.log(err)
			})
		},
		change(){
			if(this.type == 'success'){
				this.isDisable = false
				this.type = 'danger'
				this.isCancel = true
				this.isOpen = false
			}else{
				this.isDisable = true
				this.type = 'success'
				this.isCancel = false
				this.isOpen = true
			}
		},
		handleToDet(){
			console.log("-----"+this.projId)
			this.$router.push({ path: 'details', query: { projId: this.projId } })
		},
		changeDate(){
			var time = new Date()
			var year = time.getFullYear()
			var month = time.getMonth()+1
			var day = time.getDate()
			var hour = time.getHours()
			var min = time.getMinutes()
			if(min.length < 2){
				min = '0' + min
			}
			if(hour.length < 2){
				hour = '0' + hour
			}
			if(month < 10){
				month = '0' + month
			}
			if(day < 10){
				day = '0' + day
			}
			var date = year + "-" + month + "-" + day
			if(this.form.Date[0] == this.form.Date[1] && this.form.Date[0] == date){
				this.nowTime = hour + ":" + min
				this.nowTime2 = this.nowTime
			}
			if(this.form.Date[0] != this.form.Date[1] && this.form.Date[1] == date){
				this.nowTime = "23:59"
				this.nowTime2 = hour + ":" + min
			}
			if(this.form.Date[0] != date && this.form.Date[1] != date){
				this.nowTime = "23:59"
				this.nowTime2 = "23:59"
			}
			this.form.startTime = ""
			this.form.endTime = ""
		},
		openDiag(){
			this.dialogFormVisible = true
		},
		closeLoad(){
			this.loadingInstance.close()
		},
		sureDialog(){
			if(!this.form.Date || this.form.startTime == '' ||
			this.form.endTime == ''){
				alert("请选择时间或日期范围")
				return
			}
			let self = this
			self.loadingInstance = Loading.service({
			    lock: true,
			    text: '视频加载中...',
			    background: 'rgba(0, 0, 0, 0.3)'
			})
			self.dialogFormVisible = false
			var beginTime = self.form.Date[0] + ' ' +self.form.startTime+':00'
			var endTime = self.form.Date[1] + ' ' +self.form.endTime+':00'
			var info = {
				channelId: self.channel,
				beginTime: beginTime,
				endTime: endTime
			}
			getRecordVideo(info).then(res => {
				console.log(res)
				if(res.code == 200){
					if(res.data.url == '无法获取该设备该时间段视频'){
						alert("无法获取该设备该时间段视频")
						return
					}
					self.loaded = false
					if(self.turn == 0){
						self.url = res.data.url
						self.$refs.play.playVideo2(self.url)
					}
					if(self.turn == 1){
						self.url = res.data.inurl
						self.$refs.play.playVideo2(self.url)
					}
					if(self.turn == 2){
						self.url = res.data.iccurl
						self.$refs.play.playVideo2(self.url)
					}
					console.log(self.url)
					self.loaded = true
				} else {
					this.$message({
						showClose: true,
						message: res?.message ? res?.message : "网络出错，请稍后再试！",
						type: 'error'
					});
				}
			}).catch(err => {
				console.log(err)
			})
		},
		operDirection(info){
			var info = info
			getOperateDirect(info).then(res => {
				console.log(res.data)
				if(res.code == 200){
					console.log(res.data)
				} else {
					this.$message({
						showClose: true,
						message: res?.message ? res?.message : "网络出错，请稍后再试！",
						type: 'error'
					});
				}
			}).catch(err => {
				console.log(err)
			})
		},
		operCamera(info){
			var info = info
			getOperateCamera(info).then(res => {
				console.log(res.data)
				if(res.code == 200){
					console.log(res.data)
				} else {
					this.$message({
						showClose: true,
						message: res?.message ? res?.message : "网络出错，请稍后再试！",
						type: 'error'
					});
				}
			}).catch(err => {
				console.log(err)
			})
		},
		operFunc(status){
			let self = this
			if(!this.opType2){
				alert("请选择")
				return
			}
			var info = {
				channelId: self.channel,
				command: status,
				operateType: this.opType2, 
				target: 0,
			}
			getOperateFunc(info).then(res => {
				console.log(res.data)
				if(res.code == 200){
					console.log(res.data)
				} else {
					this.$message({
						showClose: true,
						message: res?.message ? res?.message : "网络出错，请稍后再试！",
						type: 'error'
					});
				}
			}).catch(err => {
				console.log(err)
			})
		},
		opeDir(dir){
			if(!this.opType){
				alert("请选择")
				return
			}
			let self = this
			var direct = ''
			var dirInfo = {
				channelId: self.channel,
				command: this.status2,
				operateType: this.opType, 
				direct: 0,
				step:1,
			}
			if(self.status2 == 1){
				setTimeout(function(){
					self.status2 = 0
					self.opeDir(dir)
				},700)
			}
			if(dir == 'add'){
				dirInfo.direct = 1
			}
			if(dir == 'dec'){
				dirInfo.direct = 2
			}
			this.operCamera(dirInfo)
			self.status2 = 1 //重置状态
		},
		showOpra(){
			this.isShow = !this.isShow;
			if(this.isShow){
				this.arrow = ">";
				this.left = "-400px";
			}else{
				this.arrow = "<";
				this.left = "3px"
			}

		},
		showRed(){
			this.isShowRed = !this.isShowRed
		},
		Operate(dir){
			let self = this
			var direct = 0
			var dirInfo = {
				channelId: self.channel,
				command: this.status,
				direct: 0, 
				stepX: 0,
				stepY: 0,
			}
			if(self.status == 1){
				setTimeout(function(){
					self.status = 0
					self.Operate(dir)
				},1000)
			}

			if(dir == 'leftTop'){
				dirInfo.direct = 5
				dirInfo.stepX = 1
				dirInfo.stepY = 1
			}
			if(dir == 'top'){
				dirInfo.direct = 1
				dirInfo.stepY = 2
			}
			if(dir == 'rightTop'){
				dirInfo.direct = 7
				dirInfo.stepY = 1
				dirInfo.stepX = 1
			}
			if(dir == 'left'){
				dirInfo.direct = 3
				dirInfo.stepX = 1
			}
			if(dir == 'right'){
				dirInfo.direct = 4
				dirInfo.stepX = 1
			}
			if(dir == 'leftBottom'){
				dirInfo.direct = 6
				dirInfo.stepX = 1
				dirInfo.stepY = 1
			}
			if(dir == 'bottom'){
				dirInfo.direct = 2
				dirInfo.stepY = 2
			}
			if(dir == 'rightBottom'){
				dirInfo.direct = 8
				dirInfo.stepX = 1
				dirInfo.stepY = 1
			}
			this.operDirection(dirInfo)
			self.status = 1 //重置状态
		},
		getAvalilableUrl(status){
			this.turn = status
			console.log("---"+this.turn)
		},
		changePlayStatus(status) { //获取子组件的播放状态
		   if(status) {
		       this.disabledShot = false
		   } else {
		       this.disabledShot = true
		       this.url = ''
		       this.checkedPontsName = ''
		   }
		 }
	}
	}
</script>

<style lang="scss">
	.el-select-dropdown__item{
		background-color: #2E3446;
		border: 1px solid #2B2E36;
		font-size: 20px;
		padding-top: 3px;
		padding-bottom: 3px;
		height: 47px;
		color: #d1d1d1;
	} 
	.el-select-dropdown__item:hover{
		background-color: #2E3446;
		border: 1px solid #6C6F79;
		color: #aeaeae;
	} 
	.el-range-input{
		color: #d1d1d1 !important;
		background-color: #2E3446;
		font-size: 16px !important;
	}
	.el-range-separator{
		color: #fff !important;
		font-size: 17px !important;
	}
	.el-select-dropdown{
		background-color: #2E3446;
		// color: #fff;
		border: 1px solid #6C6F79;
	} 
	.el-input__inner{
	background-color: #2E3446;
	border: 1px solid #6C6F79;
	font-size: 16px;
	color: #d1d1d1;
	}
	.selects .el-input__inner{
	background-color: #2E3446;
	border: 1px solid #6C6F79;
	font-size: 20px;
	color: #d1d1d1;
	}
	.top,.middle,.bottom{
		margin-bottom: 15px;
		height: 40px;

	}
	@keyframes rightWidth
	{
		from {width:0px;}
		to {width:400px;}
	}
	
	@-webkit-keyframes rightWidth
	{
		from {width:0px;}
		to {width:400px;}
	}
	@keyframes rightWidth2
	{
		from {width:0px;}
		to {width:370px;}
	}
	
	@-webkit-keyframes rightWidth2
	{
		from {width:0px;}
		to {width:370px;}
	}
	.right-opration{
		position: absolute;
		right:20px;
		z-index: 9999;
	}
	.projname{
		width: 100%;
		height: 100%;
		font-size: 28px;
		font-weight: bold;
		color: #fff;
		padding: 15px 0px;
		margin-left: 72px;
		background-size: 1733px 95px;
		background-repeat: no-repeat;
		background-image: url("../assets/images/videoTitle.png");
		.projname-text{
			width: 430px;
			text-align: center;
			margin-left: 660px;
			letter-spacing: 5px;
		}
	}
	.data-form{
		width: 100%;
		margin-top: 15px;
		margin-left: 95px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.buttons{
		width: 130px;
		height: 45px;
		font-weight: bold;
		font-size: 19px;
	}
	.back-home-btn2:hover{
		width: 133px;
		height: 57px;
	    cursor: pointer;
	    font-size: 22px;
		letter-spacing: 8px;
		padding-left: 10px;
	    line-height: 57px;
	    text-align: center;
		color: #fff;
	    background-image: url("../assets/images/back1.png");
	    background-size: 100% 100%;
	    background-repeat: no-repeat;
	}
	.back-home-btn2{
		width: 133px;
		height: 57px;
	    cursor: pointer;
	    font-size: 22px;
	    line-height: 57px;
	    text-align: center;
		padding-left: 10px;
		letter-spacing: 8px;
		color: #fff;
	    background-image: url("../assets/images/back.png");
	    background-size: 100% 100%;
	    background-repeat: no-repeat;
	}
	.opraTitle{
		position: absolute;
		left: 0px;
		top: 2px;
		line-height: 45px;
		vertical-align: middle;
		letter-spacing: 2px;
		padding: 0px 15px;
		color: #fff;
		font-size: 19px;
		height: 45px;
		width: 370px;
		z-index: 10000;
		background-color: #6C6F79;
		
	}
	.recImg2{
		background-image: url("../assets/images/arrow2.png") !important;
	}
	.recImg{
		width: 25px;
		height: 25px;
		margin-left: 5px;
		background-image: url("../assets/images/arrow.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.searchRec{
		width: 100%;
		height: 250px;
		display: flex;
		padding-left: 22px;
	}
	.search-btn{
		width: 240px !important;
		height: 35px !important;
		line-height: 35px !important;
		font-size: 20px !important;
		margin-top: 12px;
		margin-left: 95px;
	}
	.arrow-hidden{
		width: 23px;
		height: 140px;
		position: absolute;
		top: 430px;
		left: -21px;
		z-index: 9998;
		font-size: 21px;
		line-height: 140px;
		text-align: center;
		vertical-align: middle;
		color: #E6E6E6;
		background-image: url("../assets/images/question2.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.operateArea{
		width: 400px;
		height: 972px;
		margin-top: 78px;
		position: absolute;
		left: 410px;
		// display: flex;
		// justify-content: center;
		background-image: url("../assets/images/operaBg.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		-moz-transition: left 0.7s ease-out 0s;
		-webkit-transition: left 0.7s ease-out 0s;
		-o-transition: left 0.7s ease-out 0s;
		transition: left 0.7s ease-out 0s;
		.dirOpe{
			display: flex;
			width: 415px;
			height: 150px;
			padding: 20px 20px;
		}
		// .dirName{
		// 	width: 90px;
		// 	height: 90px;
		// 	margin-right: 36px;
		// 	margin-top: 8px;
		// 	background-image: url('../assets/images/yuntai.png');
		// 	background-size: 100%;
		// 	background-repeat: no-repeat;
		// }
		// .dirName2{
		// 	width: 90px;
		// 	height: 90px;
		// 	margin-right: 36px;
		// 	margin-top: 8px;
		// 	background-image: url('../assets/images/shot.png');
		// 	background-size: 100%;
		// 	background-repeat: no-repeat;
		// }
		.dirName3{
			width: 90px;
			height: 90px;
			margin-right: 36px;
			margin-top: 8px;
			background-image: url('../assets/images/function.png');
			background-size: 100%;
			background-repeat: no-repeat;
		}
		.direction{
			margin-top: 115px;
			margin-left: 75px;
			width: 230px;
			height: 230px;
			background-image: url("../assets/images/direction1.1.png");
			background-size: 100%;
			background-repeat: no-repeat;
		}
		.dir1{
			background-image: url("../assets/images/1.png");
		}
		.dir2{
			background-image: url("../assets/images/8.png");
		}
		.dir3{
			background-image: url("../assets/images/2.png");
		}
		.dir4{
			background-image: url("../assets/images/7.png");
		}
		.dir5{
			background-image: url("../assets/images/3.png");
		}
		.dir6{
			background-image: url("../assets/images/5.png");
		}
		.dir7{
			background-image: url("../assets/images/6.png");
		}
		.dir8{
			background-image: url("../assets/images/4.png");
		}
		.camaText{
			color: #E6E6E6;
			letter-spacing: 2px;
			font-size: 21px;
			margin-top: 35px;
			padding: 8px 30px;
			padding-right: 10px;
		}
		.selects{
			width: 250px;
			height: 40px;
			background-image: url("../assets/images/select.png");
			background-size: 100%;
			background-repeat: no-repeat;
			margin-left: 12px;
			margin-top: 35px;
		}
		.camaOpe{
			width: 100% !important;
			height: 90px !important;
			margin-top: 180px;
		.camaAR{
			display: flex;
			width: 250px;
			padding-left: 98px;
			margin-top: 10px;
			justify-content: space-between;
			.add{
				width: 120px;
				height: 40px;
				background-image: url("../assets/images/add.png");
				background-size: 100% 100%;
				background-repeat: no-repeat;
				display: flex;
				color:#FCFEFE;
				font-size: 19px;
				line-height: 40px;
				vertical-align: middle;
				letter-spacing: 5px;
				.addIcon{
					width: 18px;
					height: 27px;
					padding-left: 8px;
					margin-top: 6px;
					margin-right: 15px;
					margin-left: 10px;
					background-image: url("../assets/images/addicon.png");
					background-size: 100% 100%;
					background-repeat: no-repeat;
				}
			}
			.add:hover{
				width: 120px;
				height: 40px;
				background-image: url("../assets/images/add1.png");
				background-size: 100% 100%;
				background-repeat: no-repeat;
			}
			.reduce{
				width: 120px;
				height: 40px;
				background-image: url("../assets/images/add.png");
				background-size: 100% 100%;
				background-repeat: no-repeat;
				display: flex;
				color:#FCFEFE;
				font-size: 19px;
				line-height: 40px;
				vertical-align: middle;
				letter-spacing: 5px;
				.reduceIcon{
					width: 18px;
					height: 20px;
					padding-left: 8px;
					margin-top: 17px;
					margin-left: 12px;
					background-image: url("../assets/images/reduceicon.png");
					background-size: 100%;
					background-repeat: no-repeat;
				}
			}
			.reduce:hover{
				width: 120px;
				height: 40px;
				background-image: url("../assets/images/add1.png");
				background-size: 100% 100%;
				background-repeat: no-repeat;
			}
		}
		}
		.cloud{
			width: 490px !important;
			height: 220px !important;
			background-image: url("../assets/images/bg3.png") !important;
			.funAR{
				display: flex;
				width: 300px;
				padding-left: 16px;
				justify-content: space-between;
			.zhixing{
				width: 140px;
				height: 44px;
				background-image: url("../assets/images/execute.png");
				background-size: 100%;
				background-repeat: no-repeat;
			}
			.zhixing:hover{
				width: 140px;
				height: 44px;
				background-image: url("../assets/images/execute1.png");
				background-size: 100%;
				background-repeat: no-repeat;
			}
			.guanbi{
				width: 140px;
				height: 44px;
				background-image: url("../assets/images/shut.png");
				background-size: 100%;
				background-repeat: no-repeat;
			}
			.guanbi:hover{
				width: 140px;
				height: 44px;
				background-image: url("../assets/images/shut1.png");
				background-size: 100%;
				background-repeat: no-repeat;
			}
			}
		}
		.label{
			color: #efefef;
			font-size: 30px;
			font-weight: bold;
			padding-left: 100px;
			padding-right: 35px;
			line-height: 70px;
		}
		.right-btn{
			width: 300px;
			height: 300px;
			padding: 20px 20px;
			// margin-left: -670px;
			.switch{
				width: 133px;
				height: 57px;
				font-size: 22px;
				color: #fff;
				line-height: 57px;
				padding-left: 10px;
				vertical-align: middle;
				letter-spacing: 8px;
				text-align: center;
				margin-top: 30px;
				margin-left: 130px;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				background-image: url("../assets/images/back.png");
				// margin-left: 670px;
			}
			.cancel{
				width: 380px;
				display: flex;
				justify-content: center;
				color: white;
				margin-left: 10px;
				margin-top: 30px;
			}
		}
		.open{
			background-image: url("../assets/images/back.png");
		}
		.open:hover{
			background-image: url("../assets/images/back1.png");
		}
		.cancl{
			background-image: url("../assets/images/back.png");
		}
		.cancl:hover{
			background-image: url("../assets/images/back1.png");
		}
	}
	.curtain{
		position: absolute;
		left: 1902px;
		top: 77px;
		width: 400px;
		height: 975px;
		z-index: 10005;
		background-color: #173277;
	}
	a{
		text-decoration: none;
		color: #fff;
	}
</style>
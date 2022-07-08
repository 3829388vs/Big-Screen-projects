<template>
	<div class="left-all">
	<div class="right-menu-wrap boxAnimation">
	    <div class="projList">项目列表</div>
	    <div ref="rightMenu" class="right-menu">
			<div style="padding: 15px 10px;overflow-y: auto;height: 415px;width: 100%;">
			<div v-for="item in projList" @click="handlerGetProjectContent(item.proj_id)" class="menu-item"><img src="../assets/images/page2-circle.png" class="icons" /><span v-bind:id="item.proj_id">{{item.proj_name}}</span></div>
			</div>
		</div>
	</div>
    <div class="details-left-wrap" ref="leftView">
        <div class="proj-cont">
            <div class="cont-title">建设规模及内容</div>
            <div class="text-cont" style="overflow-y: auto">{{content}}</div>
        </div>
    </div>
	</div>
</template>

<script>
import {getProjectName} from "@/api";
import countUtil from "@/components/countUtil";
export default {
    name: "detailsLeft",
    props: {
        dataOb: {
            type: Object,
            default(){
                return {}
            }
        }
    },
    components: {
        countUtil
    },
    data(){
        return{
            enter_area: "",
            estimate_total: "",
            content: "",
			projList: [],
			projid:'',
			isSel:false,
            industryTypeName: {
                1: "自建项目",
                2: "代建项目",
                3: "合资公司项目",
                4: "股权投资在建项目",
            },
        }
    },
    mounted() {
		    this.initData()
			this.content = this.dataOb.jsmb
			this.projid = this.dataOb.proj_id
			this.sele(this.projid)
			console.log("--mounted---"+this.projid)
			this.$emit("handleRefreshPage", proj_id)
        this.setProjContentBoxHeight(this.dataOb.jsmb, false)
        let projContHeight = this.$refs.projCont.offsetHeight
        this.$refs.projCont.style.height= `${projContHeight}px`
        // this.enter_area = this.dataOb.enter_area ? this.dataOb.enter_area?.toString() : "0"
        // this.estimate_total = this.dataOb.estimate_total ? this.dataOb.estimate_total?.toString() : "0"
    },
    watch: {
        dataOb: {
            handler (n, o) {
				this.content = this.dataOb.jsmb
				this.projid = this.dataOb.proj_id
				this.sele(this.projid)
				console.log("--------------handler---"+this.projid)
				this.$emit("handleRefreshPage", proj_id)
                // this.enter_area = n.enter_area ? n.enter_area?.toString() : "0"
                // this.estimate_total = n.estimate_total ? n.estimate_total?.toString() : "0"
                this.setProjContentBoxHeight(n.jsmb, true)
            },
            deep: true // 深度监听父组件传过来对象变化
        }
    },
    methods: {
		handlerGetProjectContent(proj_id){
			this.sele(proj_id)
		    this.$emit("handleRefreshPage", proj_id)
		},
		sele(id){
			setTimeout(function(){   //等列表全部渲染后再执行，避免获取不到id
				var allEl = document.getElementsByTagName('span')
					var el = document.getElementById(id)
					for(var i = 0;i<allEl.length;i++){
						allEl[i].classList.remove("sel")  //选取前清空所有元素样式
					}
					el.classList.add("sel")
			},200)

		},
        setProjContentBoxHeight(content, isWatch){
            this.$refs.projCont.innerHTML = ""
            let leftViewHeight = 0
            if(isWatch){
                leftViewHeight = this.$refs.leftView.offsetHeight - 100
            } else {
                leftViewHeight = this.$refs.leftView.offsetHeight - 170
            }
            let leftTopHeight = this.$refs.leftTop.offsetHeight
            this.$refs.projCont.style.height= `${leftViewHeight - leftTopHeight}px`
            this.$refs.projCont.innerHTML = content ? content : "暂无数据"
        },
		initData(){
		    getProjectName().then(res => {
		        if(res.code == 200){
		            this.projList = res?.data?.mapProjName
					this.projid = this.dataOb.proj_id
					this.sele(this.projid)
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
		}
		
    }
}
</script>

<style lang="scss" scoped>
    ::-webkit-scrollbar {
        /*滚动条整体样式*/
        width : 0.27rem;  /*高宽分别对应横竖滚动条的尺寸*/
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
	.sel{
		color: #fff;
		font-weight: bold;
	}
    .details-left-wrap{
        height: 400px;
        width: 492px;
        color: #fff;
        padding: 25px;
		margin-left: 9px;
		margin-top: 12px;
        box-sizing: border-box;
        background-image: url("../assets/images/page2-bg2.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center center;
        .number-item{
            margin-top: 3px;
            padding: 19px 0;
        }
        .text-cont{
			width: 446px;
			height: 300px;
            font-size: 18px;
            margin-top: 21px;
			padding-right: 20px;
            letter-spacing: 2px;
            line-height: 30px;
        }
        .info-item{
            display: flex;
            font-size: 21px;
            font-weight: bold;
            letter-spacing: 2px;
            color: #ffffff;
            padding: 10px 0;
        }
        .top-text{
            letter-spacing: 3px;
        }
        .static-num{
            width: 100%;
            margin-top: 20px;
            padding: 0px 5px;
            font-weight: bold;
            font-size: 26px;
            text-align: left;
            /*letter-spacing: 17px;*/
        }
       /* .num-item{
            width: 37px;
            height: 57px;
            display: inline-block;
            font-size: 33px;
            font-weight: 700;
            line-height: 57px;
            text-align: center;
            margin-right: 10px;
            background-image: url("../assets/images/num_bg.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
        .num-item:last-child{
            margin-right: 0;
        }*/
        .flex-between{
            display: flex;
            justify-content: space-between;
        }
        .cont-title{
            font-size: 20px;
            margin-left: -1px;
        }
        .proj-cont{
            margin-top: 5px;
            color: #fafafa;
            text-align: left;
        }
        .title2{
            font-size: 21px;
            font-weight: bold;
            letter-spacing: 2px;
            color: #ffffff;
        }
        .unit{
            font-size: 14px;
            padding-top: 5px;
            color: #068bff;
        }
        .leader{
            color: #fff;
            font-size: 28px !important;
            font-weight: bold;
            padding-top: 3px !important;
        }
    }
	.right-menu-wrap{
	    height: 550px;
	    width: 480px;
	    z-index: 99;
	    // position: absolute;
	    // top: 0;
	    // right: 0;
	    transform: translate(530px, 0);
	    transition: all .5s ease-in;
	}
	.projList{
		height: 33px;
		background-image: url(../assets/images/projLi.png);
		background-repeat: no-repeat;
		text-align: left;
		padding-top: 15px;
		padding-left: 22px;
		font-size: 19px;
		color: #f9f9f9
	}
	.boxAnimation{
	    transform: translate(0, 0);
	    transition: all .5s ease-in;
	}
	.right-menu{
	    height: 470px;
	    width: 100%;
	    margin-top: 10px;
		margin-left: 9px;
		padding-top: 15px;
		// padding: 17px;
	    // overflow-y: auto;
		background-image: url("../assets/images/page2-bg1.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.menu-item{
	    color: #ccc;
	    font-size: 19px;
	    cursor: pointer;
	    font-weight: normal;
	    text-align: left;
	    padding: 15px 0px 15px 15px;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    overflow: hidden;
	}
	.icons{
		width: 16px;
		height: 16px;
		margin-right: 14px;
	}
	.left-all{
		margin-left: 20px;
		margin-top: 30px;
	}
</style>
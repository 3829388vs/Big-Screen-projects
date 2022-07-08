<template>
	<div class="maincont">
		<div class="titleImg"></div>
    <div class="main-wrap">
        <div class="main-title">
            <div class="logo" @click="handleBackHome"></div>
<!--            <div></div>-->
            <!-- <div @click="handleShowMenu" class="expand"></div> -->
        </div>
        <!-- <div class="project-title">{{dataOb.proj_name}}</div> -->
        <div class="details-content-wrap">
            <detailsLeft :dataOb="dataOb" ref="selProj" @handleRefreshPage="handleRefreshPage"></detailsLeft>
			<div class="detailsRight">
				<detailsTop :dataOb="dataOb"></detailsTop>
				<detailsRight @handleRefreshPage="handleRefreshPage" @handleShowVideo="handleShowVideo" :isShowMenu="true" :dataOb="dataOb"></detailsRight>
			</div>
		</div>
    </div>
	</div>
</template>

<script>
import {getProjectName} from "@/api/index";
import detailsLeft from "@/views/detailsLeft";
import detailsTop from "@/views/detailsTop";
import detailsRight from "@/views/detailsRight";
import {Loading} from "element-ui";
export default {
    name: "vDetails",
    components: {
        detailsLeft,
        detailsRight,
		detailsTop,
    },
    data(){
        return{
            loadingInstance: null,
            dataOb: {},
            isShowMenu: false,
			projid:'',
			channelId:'',
			projName:'',
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
        let proj_id = this.$route.query.projId
		this.projid = proj_id
        this.getProjectDetails(proj_id)
    },
    methods: {
        getProjectDetails(proj_id){
			const self = this
            getProjectName(proj_id).then(res => {
                if(res.code == 200){
					res.data.mapProjName.forEach(function(item,index){
						if(item.proj_id == proj_id){
							self.dataOb = item;
							self.channelId = item.iccList[0].channelId
							self.projName = item.proj_name
							self.projid = item.proj_id
							console.log("--------"+JSON.stringify(self.dataOb))
							self.loadingInstance.close()
						}
					})
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
        handleShowMenu(){
            this.isShowMenu = !this.isShowMenu
        },
        handleRefreshPage(proj_id){
			this.loadingInstance = Loading.service({
			    lock: true,
			    text: '努力加载中...',
			    background: 'rgba(0, 0, 0, 0.0)'
			})
            this.getProjectDetails(proj_id)
        },
		handleShowVideo(){
			this.$router.push({path:"videoInfo", query:{channelId : this.channelId , projName: this.projName , projId: this.projid}})
			// this.startPlay()
		},
        handleBackHome(){
            this.$router.push("/")
        }
    }
}
</script>

<style lang="scss" scoped>
	.maincont{
		background-image: url("../assets/images/map_bg.png");
		//background-image: url("../assets/images/kaikong_bg.png");
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: center center;
	}
	.detailsRight{
		display: flex;
		flex-direction: column;
	}
	.titleImg{
		position: absolute;
		top: 0;
		width: 1733px;
		height: 150px;
		z-index: 999;
		margin-left: 100px;
		// background-image: url("../assets/images/title.png");
		background-repeat: no-repeat;
	}
    .main-wrap {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 10px 15px;
        box-sizing: border-box;
        .main-title {
            height: 53px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .logo {
                height: 53px;
                width: 200px;
                cursor: pointer;
				margin-left: 43px;
				margin-top: 20px;
                background-image: url("../assets/images/logo.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
                background-position: center center;
            }
            // .expand{
            //     width: 36px;
            //     height: 26px;
            //     //padding-top: 10px;
            //     cursor: pointer;
            //     background-image: url("../assets/images/expand.png");
            //     background-repeat: no-repeat;
            //     background-size: 100% 100%;
            //     background-position: center center;
            // }
        }
        .project-title{
            color: #fff;
            font-size: 28px;
            font-weight: 700;
            text-align: center;
            margin-top: 24px;
            margin-bottom: 16px;
        }
        .details-content-wrap{
            height: 100%;
            display: flex;
        }
    }
</style>
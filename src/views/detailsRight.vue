<template>
    <div class="details-right-wrap">
		<div></div>
        <imgLoop :dataOb="dataOb" @handleRefreshPage="handleRefreshPage" @handleShowVideo="handleShowVideo"></imgLoop>
        <div class="footer-wrap">
            <div class="project-progress">项目进展</div>
            <div class="project-content">{{work_progress ? work_progress : "暂无数据"}}</div>
            <div @click="handleToHome" class="back-home-btn">返回首页</div>
        </div>
    </div>
</template>

<script>
import imgLoop from "@/views/imgLoop";
export default {
    name: "detailsRight",
    props: {
        dataOb: {
            type: Object,
            default() {
                return {};
            }
        },
        isShowMenu: {
            type: Boolean,
            default() {
                return false;
            }
        },
    },
    data(){
        return{
            // isShowMenu: false
            work_progress: ""
        }
    },
    components: {
        imgLoop
    },
    watch: {
        dataOb: {
            handler (n, o) {
                this.work_progress = n.work_progress
            },
            deep: true // 深度监听父组件传过来对象变化
        }
    },
    methods: {
        handleRefreshPage(proj_id){
            this.$emit("handleRefreshPage", proj_id)
        },
		handleShowVideo(){
		    this.$emit("handleShowVideo")
		},
        handleToHome(){
            this.$router.push("/")
        }
    }
}
</script>

<style lang="scss" scoped>
    ::-webkit-scrollbar {
        /*滚动条整体样式*/
        width : 0.125rem;  /*高宽分别对应横竖滚动条的尺寸*/
        height: 0.0125rem;
    }
    ::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        // border-radius: 0.125rem;
        box-shadow   : inset 0 0 0.0625rem rgba(0, 0, 0, 0.2);
        background   : #002143;
    }
    ::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow   : inset 0 0 0.0625rem rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        /*background   : #ededed;*/
    }
    .details-right-wrap{
        flex: 1;
        color: #fff;
        margin-left: 20px;
        box-sizing: border-box;
        .footer-wrap{
            height: 235px;
            margin-top: 5px;
			margin-left: -22px;
            box-sizing: border-box;
            background-image: url("../assets/images/develop.png");
            background-repeat: no-repeat;
            background-size: 98% 100%;
            background-position: center center;
        }
        .project-progress{
            text-align: center;
            color: #07a1a6;
            font-weight: bold;
            font-size: 20px;
			padding-top: 48px;
        }
        .project-content{
            height: 90px;
			margin-left: 10px;
			margin-top: 12px;
            color: #07a1a6;
            font-size: 18px;
            text-align: left;
            line-height: 30px;
            overflow-y: auto;
			padding: 10px 40px;
        }
        .back-home-btn{
            width: 180px;
            height: 50px;
            cursor: pointer;
            font-size: 20px;
            line-height: 50px;
			font-weight: 700;
            text-align: center;
            position: absolute;
            right: 76px;
            bottom: 8px;
            background-image: url("../assets/images/camera_icon.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
    }
</style>
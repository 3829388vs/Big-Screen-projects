<template>
    <div class="container">
        <div class="main-wrap">
            <div class="main-title">
                <div class="logo"></div>
                <div v-if="!fullscreen" @click="handleFullScreen" class="iconfont full-screen-icon">&#xeb99;</div>
                <div v-else @click="handleFullScreen" class="iconfont full-screen-icon">&#xeb98;</div>
            </div>
            <div class="main-content">
                <div class="left-wrap">
                    <projectSynopsis></projectSynopsis>
                    <industryDistributionPieChart></industryDistributionPieChart>
                    <projectStatusBar></projectStatusBar>
                </div>
                <div class="right-wrap"></div>
            </div>
        </div>
    </div>
</template>

<script>
import "../assets/font/iconfont.css"
import { getIndexData } from "@/api/index";
import projectSynopsis from "@/views/projectSynopsis";
import industryDistributionPieChart from "@/views/industryDistributionPieChart";
import projectStatusBar from "@/views/projectStatusBar";
export default {
    name: 'index',
    components: {
        projectSynopsis,
        industryDistributionPieChart,
        projectStatusBar
    },
    data(){
        return {
            fullscreen: false,
            timer: null,
            bigScreenData: {},
            countProjNum: "",
            estimateTotal: "",
            enterArea: "",
            parcelArea: "",
            pieData: [],
            projectStatus: [],
            projectStatusNum: [],
            total: 0
        }
    },
    mounted() {
        // this.initData()
        // if(this.timer){
        //     clearInterval(this.timer)
        // }
        // this.timer = setInterval(() => {
        //     this.initData()
        // }, 1000 * 10)
    },
    methods: {
        initData(){
            getIndexData().then(res => {
                if(res.code == 200){
                    this.bigScreenData = res?.data?.data;
                    this.countProjNum = res?.data?.data?.countProjNum
                    this.estimateTotal = res?.data?.data?.estimateTotal
                    this.enterArea = res?.data?.data?.enterArea
                    this.parcelArea = res?.data?.data?.parcelArea
                    let projTypeList = res?.data?.data?.projTypeList
                    let projStatusList = res?.data?.data?.projStautsList
                    this.pieData = projTypeList.map((item) => {
                        let obj = {}
                        obj['name'] = item.type_name
                        obj['value'] = item.num
                        return obj
                    })
                    projTypeList.forEach(item => {
                        this.total += item.num
                    })
                    this.projectStatus = projStatusList.map((item) => {
                        return item.stauts
                    })
                    this.projectStatusNum = projStatusList.map((item) => {
                        return item.num
                    })
                    this.loading = 1;
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
        handleFullScreen(){
            this.fullscreen = !this.fullscreen;
            let element = document.documentElement;
            if (this.fullscreen) {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozExitFullScreen) {
                    document.mozExitFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }
        }
    },
    beforeDestroy() {
        if(this.timer){
            clearInterval(this.timer)
        }
    }
}
</script>
<style lang="scss" scoped>
    .container{
        width: 100%;
        height: 100%;
        background-image: url("../assets/images/map_bg.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center center;
    }
    .main-wrap{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 0.125rem 0.1875rem;
        box-sizing: border-box;
        background-image: url("../assets/images/bg_title.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center center;
        .main-title{
            height: 0.6625rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .logo{
                height: 0.6625rem;
                width: 2.8625rem;
                background-image: url("../assets/images/logo.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
                background-position: center center;
            }
            .full-screen-icon{
                font-size: 0.5rem;
                color: #fff;
                cursor: pointer;
            }
        }
        .main-content{
            width: 100%;
            flex: 1;
            //height: calc(100vh - 0.125rem - 0.125rem - 0.6625rem - 0.5rem);
            margin-top: 0.5rem;
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
        .item{
            flex: 2;
            background-color: #1FABE0;
        }
        .item1{
            flex: 3;
            background-color: #7d2424;
        }
        .item2{
            flex: 3;
            background-color: #4a61ba;
        }
    }
</style>

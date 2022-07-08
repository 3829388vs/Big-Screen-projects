<template>
    <div class="wrapper">
        <titleComponent title="项目总览"/>
		<div class="statics">
        <div class="project-details">
            <div class="project-item">
                <div class="project-title">
                    <span class="project-name">项目总数</span>
                    <span class="project-unit">单位：个</span>
                </div>
                <div style="height: 50px;text-align: left">
                    <countUtil :count="countProjNum"></countUtil>
                </div>
            </div>
            <div class="project-item">
                <div class="project-title">
                    <span class="project-name">项目总投资</span>
                    <span class="project-unit">单位：亿元</span>
                </div>
                <div style="height: 50px;text-align: left">
                    <countUtil :count="estimateTotal"></countUtil>
                </div>
            </div>
        </div>
        <div class="project-details">
            <div class="project-item">
                <div class="project-title">
                    <span class="project-name">项目总建筑面积</span>
                    <span class="project-unit">单位：万m²</span>
                </div>
                <div style="height: 50px;text-align: left">
                    <countUtil :count="enterArea"></countUtil>
                </div>
            </div>
            <div class="project-item">
                <div class="project-title">
                    <span class="project-name">项目总占地面积</span>
                    <span class="project-unit">单位：万m²</span>
                </div>
                <div style="height: 50px;text-align: left">
                    <countUtil :count="parcelArea"></countUtil>
                </div>
            </div>
        </div>
		</div>
    </div>
</template>

<script>
import titleComponent from "@/components/titleComponent";
import countUtil from "@/components/countUtil";
export default {
    name: "projectSynopsis",
    components: {
        titleComponent,
        countUtil
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
            countProjNum: "0",
            estimateTotal: "0",
            enterArea: "0",
            parcelArea: "0",
            timer: null
        }
    },
    watch: {
        bigScreenData(newData, oldData){
            //重置数据，只为了数字能滚动，因为数字需要改变才能滚动
            this.countProjNum = "000000"
            this.estimateTotal = "000000"
            this.enterArea = "000000"
            this.parcelArea = "000000"

            if(this.timer){
                clearInterval(this.timer)
            }
            this.timer = setInterval(() => {
                this.countProjNum = newData.tatol ? newData.tatol : "0"
                this.estimateTotal = (newData.total_money/10000) ? (newData.total_money/10000) : "0"
                this.enterArea = (newData.jz_area/10000) ? (newData.jz_area/10000) : "0"
                this.parcelArea = (newData.zd_area/10000) ? (newData.zd_area/10000) : "0"
            }, 0)
        }
    },
    mounted() {

    },
    beforeDestroy() {
        if(this.timer){
            clearInterval(this.timer)
        }
    }
}
</script>

<style lang="scss" scoped>
    .wrapper{
        height: 298px;
        //flex: 2;
        .project-details {
            display: flex;
            margin-top: 6px;
            margin-bottom: 16px;
        }

        .project-item {
            flex: 1;
            margin-right: -35px;
        }

        .project-item:last-child {
            margin-right: 0;
        }

        .project-title {
            display: flex;
			width: 193px;
            justify-content: space-between;
            margin-bottom: 16px;
        }

        .project-name {
            font-size: 17px;
            color: #ffffff;
        }
		.statics{
			width: 548px;
			margin-left: 35px;
			padding: 23px 18px;
			background-image: url(../assets/images/statusbg.png);
			background-repeat: no-repeat;
		}

        .project-unit {
            color: #ccc;
            font-size: 13px;
			padding-top: 3px;
        }

        /*.num-item {
            width: 34px;
            height: 50px;
            color: #fff;
            display: inline-block;
            font-size: 33px;
            font-weight: 700;
            line-height: 50px;
            text-align: center;
            margin-right: 10px;
            background-image: url("../assets/images/num_bg.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }

        .num-item:last-child {
            margin-right: 0;
        }*/
    }
</style>
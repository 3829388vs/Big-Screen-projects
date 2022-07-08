<template>
    <div class="details-left-wrap" ref="leftView">
        <div ref="leftTop" class="leftTop">
            <div class="top-text projItem">
				<div class="itemdetail">
					<div class="leader2">{{dataOb.lead_user}}</div>
					<div class="leader">集团分管领导</div>
				</div>
            </div>
			<div class="top-text projItem2">
				<div class="itemdetail">
					<div class="leader2">{{dataOb.muser_name}}</div>
					<div class="leader">二级项目负责人</div>
				</div>
			</div>
			<div class="top-text projItem3">
				<div class="itemdetail">
					<div class="leader2">{{industryTypeName[dataOb.proj_type]}}</div>
					<div class="leader">项目类型</div>
				</div>
			</div>
            <div class="number-item">
                <div class="flex-between">
                    <div class="leader2" style="height: 40px;">估算总投资:</div>
                    <div class="unit">单位：万元</div>
                </div>
                <div class="static-num">
<!--                    <span v-for="item in estimate_total" class="num-item">{{ item }}</span>-->
                    <countUtil :count="estimate_total"></countUtil>
                </div>
            </div>
            <div class="number-item">
                <div class="flex-between">
                    <div class="leader2" style="height: 40px;">总建筑面积:</div>
                    <div class="unit">单位：m²</div>
                </div>
                <div class="static-num">
<!--                    <span v-for="item in enter_area" class="num-item">{{ item }}</span>-->
                    <countUtil :count="jz_area"></countUtil>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import countUtil from "@/components/countUtil";
export default {
    name: "detailsTop",
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
            jz_area: "",
            estimate_total: "",
            content: "",
            industryTypeName: {
                1: "自建项目",
                2: "代建项目",
                3: "合资公司项目",
                4: "股权投资在建项目",
            },
        }
    },
    mounted() {
        this.setProjContentBoxHeight(this.dataOb.jsmb, false)
        let projContHeight = this.$refs.projCont.offsetHeight
        this.$refs.projCont.style.height= `${projContHeight}px`
        this.jz_area = this.dataOb.jz_area ? this.dataOb.jz_area?.toString() : "0"
        this.estimate_total = this.dataOb.total_money ? this.dataOb.total_money?.toString() : "0"
        this.content = this.dataOb.jsmb
		console.log("-----"+JSON.stringify(this.dataOb))
    },
    watch: {
        dataOb: {
            handler (n, o) {
                this.jz_area = n.jz_area ? n.jz_area?.toString() : "0"
                this.estimate_total = n.total_money ? n.total_money?.toString() : "0"
                this.setProjContentBoxHeight(n.jsmb, true)
                this.content = n.jsmb
            },
            deep: true // 深度监听父组件传过来对象变化
        }
    },
    methods: {
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
        border-radius: 0.125rem;
        box-shadow   : inset 0 0 0.0625rem rgba(0, 0, 0, 0.2);
        background   : #002143;
    }
    ::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow   : inset 0 0 0.0625rem rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        /*background   : #ededed;*/
    }
	.projItem{
		margin-right: 40px;
		background-image: url(../assets/images/ling.png);
		background-repeat: no-repeat;
	}
	.projItem2{
		margin-right: 40px;
		background-image: url(../assets/images/ze.png);
		background-repeat: no-repeat;
	}
	.projItem3{
		margin-right: 40px;
		background-image: url(../assets/images/he.png);
		background-repeat: no-repeat;
	}
	.itemdetail{
		height: 100%;
		display: flex;
		flex-direction: column;
		margin-left: 80px;
		margin-top: -5px;
	}
    .details-left-wrap{
        height: 120px;
        width: 1400px;
        color: #fff;
        padding: 20px;
        box-sizing: border-box;
        .number-item{
			margin-right: 70px;
        }
        .text-cont{
            font-size: 18px;
            margin-top: 21px;
            letter-spacing: 2px;
            line-height: 30px;
        }
		.leftTop{
			display: flex;
			margin-top: 12px;
			margin-left: 15px;
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
            padding: 0px 5px;
			margin-top: -10px;
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
        .title2{
            font-size: 21px;
            font-weight: bold;
            letter-spacing: 2px;
            color: #ffffff;
        }
        .unit{
            font-size: 14px;
			padding-left: 16px;
            color: #8a8a8a;
        }
		.leader2{
			height: 52px;
			font-size: 23px !important;
			font-weight: 700;
			color: #fff;
		}
        .leader{
            color: #8f8f8f;
            font-size: 18px !important;
        }
    }
</style>
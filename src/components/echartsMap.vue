<template>
    <div class="map-wrap" ref="mapWrap" style="margin-left: -120px;">
        <div :class="[mapBgClass]"></div>
        <div id="mapview" ref="mapView"></div>
		<div v-if="!isSecondPage" @click="enter('zhishicheng')" style="width: 85px;height: 85px;position: absolute;top: 190px;left: 665px;"></div>
		<div v-if="!isSecondPage" @click="enter('kexuecheng')" style="width: 65px;height: 65px;position: absolute;top: 530px;left: 550px;"></div>
		<div v-if="!isSecondPage" @click="enter('huangpuguang')" style="width: 60px;height: 60px;position: absolute;top: 770px;left: 530px;"></div>
		<div v-if="!isSecondPage" @click="enter('zhishicheng')" style="width: 85px;height: 85px;position: absolute;top: 190px;left: 435px;"></div>
		<div v-if="!isSecondPage" @click="enter('kexuecheng')" style="width: 65px;height: 65px;position: absolute;top: 530px;left: 320px;"></div>
		<div v-if="!isSecondPage" @click="enter('huangpuguang')" style="width: 60px;height: 60px;position: absolute;top: 770px;left: 300px;"></div>
		<div v-if="isSecondPage" class="camera-btn" style="position: absolute;top: 880px;left: 800px;" @click="turnBack">返回</div>
	</div>
</template>

<script>
// import {projMarkList} from "./temp"
import {huangpu} from "../uitls/hp"
import {hpg} from "../uitls/map_hpg"
import {kxc} from "../uitls/map_kxc"
import {swd} from "../uitls/map_swd"
import {zsc} from "../uitls/map_zsc"
export default {
    name: "echartsMap",
    props: {
        dataOb: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data(){
        return {
            myChart: null,
            isShowMap: false,
            mapName: "huangpu",
			isSecondPage:false,
        }
    },
    computed: {
        mapBgClass(){
            let className = ""
            if(this.mapName === "huangpu"){
                className = "map-bg-wrap"
            } else if(this.mapName === "zsc"){
                className = "zsc-bg-wrap"
            } else if(this.mapName === "kxc"){
                className = "kxc-bg-wrap"
            } else if(this.mapName === "hpg"){
                className = "hpg-bg-wrap"
            } else if(this.mapName === "swd"){
                className = "swd-bg-wrap"
            }
            return className
        }
    },
    mounted() {
        // this.initMap()
    },
    watch: {
        dataOb(val){
            // 等接口成功获取到数据才渲染地图，避免没数据报错
            if(Object.keys(val).length && val.mapProjName.length){
                this.initMap()
            }
        }
    },
    methods: {
		enter(name){
			this.$emit("hiddenInfo");
			if(!this.isShowMap && name == "huangpuguang"){
			    this.setMapOption(hpg, this.filterProjMarkList("黄埔港"), [113.48004748195491, 23.095863428398086], 80)
			    this.isShowMap = true
			    this.mapName = "hpg"
			} else if(!this.isShowMap && name == "kexuecheng"){
			    this.setMapOption(kxc, this.filterProjMarkList("科学城"), [113.49022885913824, 23.18809472758825], 60)
			    this.isShowMap = true
			    this.mapName = "kxc"
			} else if(!this.isShowMap && name == "zhishicheng"){
			    this.setMapOption(zsc, this.filterProjMarkList("知识城"), [113.53993793597449, 23.32105153551173], 60)
			    this.isShowMap = true
			    this.mapName = "zsc"
			} else if(!this.isShowMap && name == "shengwudao"){
			    this.setMapOption(swd, this.filterProjMarkList("生物岛"), [113.36805233293829, 23.068912724089273], 240)
			    this.isShowMap = true
			    this.mapName = "swd"
			}
			this.isSecondPage = true
		},
		turnBack(){
			this.setMapOption(huangpu, [], [113.495619,23.224029], 46)
			this.isShowMap = false
			this.mapName = "huangpu"
			this.isSecondPage = false
		},
        initMap(){
            setTimeout(() => {
                let h = this.$refs.mapWrap.offsetHeight
                let w = this.$refs.mapWrap.offsetWidth - 100
                this.$refs.mapView.style.height = `${h}px`
                this.$refs.mapView.style.width = `${w}px`
                //重复调用，实例存在销毁实例
                if (this.myChart != null && this.myChart != "" && this.myChart != undefined) {
                    this.myChart.dispose(); //销毁
                }
                this.myChart = this.$echarts.init(document.getElementById('mapview'));
                this.setMapOption(huangpu, [], [113.495619,23.224029], 46)
                //数据改变时，重复调用，设置当前的地图
                if(this.mapName === "huangpu"){
                    this.setMapOption(huangpu, [], [113.495619,23.224029], 46)
                } else if(this.mapName === "hpg"){
                    this.setMapOption(hpg, this.filterProjMarkList("黄埔港"), [113.48004748195491, 23.095863428398086], 80)
                } else if(this.mapName === "kxc"){
                    this.setMapOption(kxc, this.filterProjMarkList("科学城"), [113.49022885913824, 23.18809472758825], 60)
                } else if(this.mapName === "zsc"){
                    this.setMapOption(zsc, this.filterProjMarkList("知识城"), [113.53993793597449, 23.32105153551173], 60)
                } else if(this.mapName === "swd"){
                    this.setMapOption(swd, this.filterProjMarkList("生物岛"), [113.36805233293829, 23.068912724089273], 240)
                }

                this.myChart.on('click', (params) => {
					this.$emit("hiddenInfo");
                    // console.log(2222, params.data.name)
                    // console.log(4444, this.myChart.convertFromPixel('geo', [params.event.offsetX, params.event.offsetY]));
                    // console.log(2423342, params.componentSubType)
					this.isSecondPage = true
                    if (params.componentSubType === "scatter") {
                        this.$router.push({ path: '/details', query: { projId: params.data.projId } })
                    }
                    if((!this.isShowMap && params.name == "huangpuguang") || (!this.isShowMap && params.data && params.data[4] == "黄埔港")){
                        this.setMapOption(hpg, this.filterProjMarkList("黄埔港"), [113.48004748195491, 23.095863428398086], 80)
                        this.isShowMap = true
                        this.mapName = "hpg"
                    } else if((!this.isShowMap && params.name == "kexuecheng") || (!this.isShowMap && params.data && params.data[4] == "科学城")){
                        this.setMapOption(kxc, this.filterProjMarkList("科学城"), [113.49022885913824, 23.18809472758825], 60)
                        this.isShowMap = true
                        this.mapName = "kxc"
                    } else if((!this.isShowMap && params.name == "zhishicheng") || (!this.isShowMap && params.data && params.data[4] == "知识城")){
                        this.setMapOption(zsc, this.filterProjMarkList("知识城"), [113.53993793597449, 23.32105153551173], 60)
                        this.isShowMap = true
                        this.mapName = "zsc"
                    } else if(!this.isShowMap && params.name == "shengwudao"){
                        this.setMapOption(swd, this.filterProjMarkList("生物岛"), [113.36805233293829, 23.068912724089273], 240)
                        this.isShowMap = true
                        this.mapName = "swd"
                    } else {
                        // this.setMapOption(huangpu, [], [113.495619,23.224029], 46)
                        // this.isShowMap = false
                        // this.mapName = "huangpu"
                    }
                })

                window.addEventListener('resize', () => {
                    this.myChart.resize()
                })
            }, 500)
        },
        setMapOption(mapData, data, center, zoom){
			console.log("----------12122---"+JSON.stringify(data))
            this.$echarts.registerMap('china', mapData); //引入china.json
            let option = {
                geo : {
                    type: 'map',
                    map: 'china',
                    aspectScale: 1,			//echarts地图的长宽比（就是胖瘦）
                    center: center,		//设置可见中心坐标，以此坐标来放大和缩小
                    zoom: zoom,						//放大级别
                    roam : false, //是否可移动
                    hoverable : false, //是否有鼠标滑过效果
                    label : {
                        emphasis : {
                            show : false,
                        }
                    },
                    itemStyle : {
                        normal : {
                            areaColor : 'rgba(255, 255, 255, 0)', //区域颜色
                            // borderColor : 'red',
                            borderColor : 'rgba(0, 0, 0, 0)',
                            borderWidth : 3,			//重合后，边框为0，即可隐去边框
                        },
                        emphasis : {
                            show : false,
                            areaColor : 'rgba(255, 255, 255, 0)' //滑过鼠标色
                        }
                    },
                    regions : [{ //不显示南海诸岛，的小地图
                        name : '南海诸岛',
                        value : 0,
                        itemStyle : {
                            normal : {
                                opacity : 0,
                                label : {
                                    show : false
                                }
                            }
                        }
                    }]
                },
                series : [
                    {
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        // data: this.pointLocation(this.dataOb.projMarkList),
                        data: this.pointLocation(data),
                        symbolSize: 12,
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            color: '#74fcfc'
                        }
                    },
                    {
                        name: '',
                        type: 'lines',
                        zlevel: 2,
                        coordinateSystem: 'geo',
                        symbol: 'none',
                        // silent: true, //不响应鼠标点击或事件
                        effect: {
                            show: false //关闭特效
                        },
                        tooltip: {
                            show: false
                        },
                        polyline: true, //支持多点连线
                        lineStyle: {
                            normal: {
                                type:'solid',
                                // shadowBlur: 3,
                                width: 3,
                                color: "#75ffff"
                            }
                        },
                        data: this.dataLines(data)
                    },
                    {
                        name: '',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        zlevel: 2,
                        hoverAnimation: false, //hover时不高亮点
                        cursor: 'default', //鼠标设置为箭头
                        itemStyle: {
                            normal: {
                                color: '#74fcfc'
                            }
                        },
                        tooltip: {
                            show: false
                        },
                        label: {
								width:260,
                                show: true,
                                position: 'top',
                                fontSize: 18,
                                fontWeight: 'bold',
                                padding: [0, 0, 0, 190],
                                color: '#fff',
								rich:{
									img1: {
										backgroundColor:{
											image:'../assets/images/labelbg.png'
											// color:'rgb(122,121,122)'
										},
										height:30,
										width:280,
										align:'center'
									}
								},
                                formatter: function (param) {
                                    return param.name;
                                }
                        },
                        data: this.textLocation(data)
                    }
                ]
            };
            let tempSeries = {
                type: 'effectScatter',
                coordinateSystem: 'geo',
                geoIndex: 0,
                symbolSize: function (params) {
                    return (params[2] / 100) * 15 + 5;
                },
                label: {
                    normal: {
                        show: true,
                        fontSize: 18,
                        fontWeight: 'bold',
                        formatter: function (param) {
                            return param.data[3];
                        }
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    color: '#74fcfc'
                },
                encode: {
                    tooltip: 2
                },
                data: [
                    [113.48004748195491, 23.069863428398086, 150, this.filterProjMarkList("黄埔港").length, "黄埔港板块"],
                    [113.49022885913824, 23.18509472758825, 220, this.filterProjMarkList("科学城").length, "科学城板块"],
                    [113.54993793597449, 23.34105153551173, 300, this.filterProjMarkList("知识城").length, "知识城板块"]
                ]
            }

            /*let lineSeries = {
                //射线效果图层
                type: "lines", //类型：射线
                zlevel: 1, //类似图层效果
                effect: {
                    show: true,//是否显示图标
                    symbol: "arrow",//箭头图标
                    symbolSize: 10,//图标大小
                    trailLength: 0.02,//特效尾迹长度[0,1]值越大，尾迹越长重
                },
                label: {
                    show: true,
                },
                lineStyle: {
                    color: "#1797a5",
                    normal: {
                        color: "#1797a5",
                        width: 2,//尾迹线条宽度
                        opacity: 0.2,//尾迹线条透明度
                        curveness: 0.24,//尾迹线条曲直度
                    },
                },
                data: [
                    {
                        fromName: "知识城板块", //发射的省名，保存用于弹框显示
                        toName: "黄埔港板块", //接收的省名，保存用于弹框显示
                        coords: [
                            [113.53993793597449, 23.32105153551173], //发射
                            [113.48004748195491, 23.095863428398086], //接收
                        ],
                        count: 50, //数据
                    },
                    {
                        fromName: "知识城板块", //发射的省名，保存用于弹框显示
                        toName: "科学城板块", //接收的省名，保存用于弹框显示
                        coords: [
                            [113.53993793597449, 23.32105153551173], //发射
                            [113.49022885913824, 23.18809472758825], //接收
                        ],
                        count: 50, //数据
                    },
                    {
                        fromName: "科学城板块", //发射的省名，保存用于弹框显示
                        toName: "黄埔港板块", //接收的省名，保存用于弹框显示
                        coords: [
                            [113.49022885913824, 23.18809472758825], //发射
                            [113.48004748195491, 23.095863428398086], //接收
                        ],
                        count: 50, //数据
                    },
                    {
                        fromName: "科学城板块", //发射的省名，保存用于弹框显示
                        toName: "知识城板块", //接收的省名，保存用于弹框显示
                        coords: [
                            [113.49022885913824, 23.18809472758825], //发射
                            [113.53993793597449, 23.32105153551173], //接收
                        ],
                        count: 50, //数据
                    },
                    {
                        fromName: "黄埔港板块", //发射的省名，保存用于弹框显示
                        toName: "科学城板块", //接收的省名，保存用于弹框显示
                        coords: [
                            [113.48004748195491, 23.095863428398086], //发射
                            [113.49022885913824, 23.18809472758825], //接收
                        ],
                        count: 50, //数据
                    },
                    // {
                    //     fromName: "黄埔港板块", //发射的省名，保存用于弹框显示
                    //     toName: "知识城板块", //接收的省名，保存用于弹框显示
                    //     coords: [
                    //         [113.48004748195491, 23.095863428398086], //发射
                    //         [113.53993793597449, 23.32105153551173], //接收
                    //     ],
                    //     count: 50, //数据
                    // }
                ]
            }*/

            if(mapData.features.length > 1){
                let tempArr = option.series
                // tempArr.push(lineSeries)
                tempArr.push(tempSeries)
            } else {
                this.myChart.clear()
            }
            this.myChart.setOption(option);
        },
        dataLines(data){
            let res=[];
            data.forEach(item => {
				item.jd_sign = (item.jd - 0.13)
				item.wd_sign = (item.wd)
                if(item.jd && item.wd && item.jd_sign && item.wd_sign){
                    let arr = item.xy.split(",")
                    res.push({
                        // name: item.proj_name,
                        coords: [
                            [item.jd, item.wd],
                            [Number(arr[0]), Number(arr[1])],
                            [item.jd_sign, item.wd_sign]
                        ],
                    })
                }
            })
            return res;
        },
        textLocation(data){
            let res=[];
            data.forEach(item => {
				item.jd_sign = (item.jd - 0.13)
				item.wd_sign = (item.wd)
                if(item.jd && item.wd && item.jd_sign && item.wd_sign){
                    res.push({
                        projId: item.proj_id,
                        name: item.proj_name,
                        value: [item.jd_sign, item.wd_sign]
                    })
                }
            })
            return res;
        },
        pointLocation(data){
            let res=[];
            data.forEach(item => {
                if(item.xy){
                    res.push({
                        value: [item.jd,item.wd]
                    })
                }
            })
            return res;
        },
        filterProjMarkList(projPlate){
            // let arr = projMarkList.filter(item => {
            let arr = this.dataOb.mapProjName.filter(item => {
                if(item.xy){
					var jd = item.xy.split(',')[0]
					var wd = item.xy.split(',')[1]
					item.jd = jd;
					item.wd = wd;
					console.log("---"+item.proj_plate)
                    return item.proj_plate == projPlate
                }
            })
            return arr
        }
    },
    beforeDestroy() {
        window.removeEventListener("resize", function() {}, false);
    },
}
</script>

<style lang="scss" scoped>
    /* 中间地图背景 */
    .map-wrap{
        width: 100%;
        height: 100%;
        position: relative;
    }
	.camera-btn{
	    width: 186px;
	    height: 41px;
	    z-index: 999;
	    position: absolute;
	    right: 25px;
	    bottom: 20px;
		color:#fff;
		font-weight: 700;
		font-size: 20px;
		text-align: center;
		line-height: 41px;
		vertical-align: middle;
	    cursor: pointer;
	    background-image: url("../assets/images/camera_icon.png");
	    background-size: 100% 100%;
	    background-repeat: no-repeat;
	}
    .map-bg-wrap{
        width: 610px;
        height: 983px;
        position: absolute;
        top: 49%;
        left: 48%;
        transform: translate(-50%, -50%);
        background-image: url("../assets/images/huangpu_map.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .zsc-bg-wrap{
        width: 520px;
        height: 687px;
        position: absolute;
        top: 50%;
        left: 49%;
        transform: translate(-50%, -50%);
        background-image: url("../assets/images/zhishicheng.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .kxc-bg-wrap{
        width: 660px;
        height: 634px;
        position: absolute;
        top: 51%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-image: url("../assets/images/kexuecheng.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .hpg-bg-wrap{
        width: 670px;
        height: 430px;
        position: absolute;
        top: 53%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-image: url("../assets/images/huangpugang.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .swd-bg-wrap{
        width: 300px;
        height: 188px;
        position: absolute;
        top: 50%;
        left: 53%;
        transform: translate(-50%, -50%);
        background-image: url("../assets/images/shengwudao.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    #mapview{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
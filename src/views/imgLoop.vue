<template>
	<div class="contains" ref="wrapBox">
		<div class="top-text flex-between video-wrap">
            <el-carousel v-if="imgPath.length" trigger="click" height="100%">
                <el-carousel-item v-for="item in imgPath">
                    <img width="100%" height="100%" :src="item">
                </el-carousel-item>
            </el-carousel>
			<div class="camera-btn" @click="handleShowDialog">查看视频</div>

		</div>
	</div>
</template>
<script>
    import {getIndexData} from "@/api";
	import {getVideo} from "@/api";
	// import {Hls} from "../uitls/hls_min"
    export default {
		name: 'imgLoop',
		props: {
            dataOb: {
                type: Object,
                default() {
                    return {};
                }
            },
        },
		data() {
			return {
                projList: [],
                imgPath: [],
                dialogVisible: false,
				hls:null,
				hls1:null,
				disabledShot:null,
				checkedPontsName:'',
				url:''
			}
		},
		mounted() {
		},
        watch: {
            dataOb: {
                handler (n, o) {
                    this.imgPath = n.picPath
                },
                deep: true // 深度监听父组件传过来对象变化
            }
        },
		methods: {
            // initData(){
            //     getIndexData().then(res => {
            //         if(res.code == 200){
            //             this.projList = res?.data?.projList
            //         } else {
            //             this.$message({
            //                 showClose: true,
            //                 message: res?.message ? res?.message : "网络出错，请稍后再试！",
            //                 type: 'error'
            //             });
            //         }
            //     }).catch(err => {
            //         console.log(err)
            //     })
            // },
            handleShowDialog(){
				 this.$emit("handleShowVideo")
				// this.startPlay()
            },
			// startPlay(){
			//    // var urls= this.getUrl();
			//    var urls = 'http://160.0.0.143:7086/live/cameraid/1000016%240/substream/1.m3u8'
			//    var video=  this.$refs.videoRefsmall;
			// 	this.play(urls,video);
			
			// },
			// play(url,video){
			// 	console.log("--1----"+video)
			// 	 if (url.indexOf("m3u8") != -1) {
			// 		 this.hls = new Hls();
			// 		this.hls.attachMedia(this.$refs.videoRefsmall)
			// 		this.hls1 = new Hls();
			// 		// hls1.attachMedia
			// 		this.hls.loadSource(url);
			// 		// myPlayer.attachMedia(video);
			// 		this.hls.on(Hls.Events.MANIFEST_PARSED, function() {
			// 			this.$refs.videoRefsmall.play(); }
			// 		);
			// 	}else{
			// 		console.log("错误视频类型")
			// 	 }
			// },
			   changePlayStatus(status) { //获取子组件的播放状态
			      if(status) {
			          this.disabledShot = false
			      } else {
			          this.disabledShot = true
			          this.url = ''
			          this.checkedPontsName = ''
			      }
			    },
            handlerGetProjectContent(proj_id){
                this.$emit("handleRefreshPage", proj_id)
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
    .el-carousel{
        width: 100%;
    }
    .el-carousel__item{
        border-radius: 6px;
    }
	*{
		letter-spacing: 1px;
	}
    .video-wrap{
        width: 97%;
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
	.contains {
		/*width: 90vh;*/
		/*height: 72%;*/
        height: 636px;
		display: flex;
		padding: 6px 4px;
        overflow: hidden;
		background-image: url("../assets/images/img_loop_bg.png");
		background-size: 97% 100%;
		background-repeat: no-repeat;
	}
	.flex-between{
		display: flex;
		justify-content: space-between;
	}
    .right-menu-wrap{
        height: 696px;
        width: 510px;
        z-index: 99;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(530px, 0);
        transition: all .5s ease-in;
    }
    .boxAnimation{
        transform: translate(0, 0);
        transition: all .5s ease-in;
    }
    .right-menu{
        height: 650px;
        width: 100%;
        margin-top: 10px;
        overflow-y: auto;
        background-image: url("../assets/images/right_menu_bg.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .menu-item{
        color: #ccc;
        font-size: 18px;
        cursor: pointer;
        font-weight: normal;
        text-align: left;
        padding: 8px 0px 8px 8px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
</style>

<template>
    <div class="ali-player">
        <div class="main">
            <div class="video-center">
                <div v-if="!sourceUrls && !loadingVideo" class="tips">请选择视频源</div>
                <div v-if="waiting" class="tips">获取视频中，请稍等...</div>
                <div v-if="!hls" class ="video" v-loading="loadingVideo" style="background-color: #0c0b0b">
                </div>
                <video v-show ="hls" controls id="video" class="video" ref="video" :autoplay="true" style="background-color: #0c0b0b"></video>
            </div>
        </div>
    </div>
</template>

<script>
	import Hls from "../uitls/hls";
	import flvjs from "flv.js";
	import {getVideo} from "@/api";
	import {Loading} from "element-ui";
    // let Hls = require('../uitls/hls_min.js');
    export default {
        name: 'plyaer',
        components: {},
        props:{
            sourceUrl:{
                type:String,
                default:''
            },
			channel:{
				type:String,
				default:''
			},
            height:{
                type:String,
                default:'750px'
            }
        },
        data() {
            return {
                hls: null,
                sourceUrls:this.sourceUrl,//如果不赋值，在加载组件时会报错
                loadingVideo:false,
                waiting:false,
                reloadPlayTime:null, //当视频流获取超时定时器
				isType:'',
				turn:0,
				loadingInstance: null,
            }
        },
        computed: {

        },
        watch: {
            sourceUrl: {
                handler(newVal, oldVal) {
                    if(this.reloadPlayTime) { //重新播放或者播放新视频时，清空定时器
                        console.log('清空定时器...')
                        this.videoPause();
                        clearTimeout(this.reloadPlayTime);
                    }
                    if( newVal && newVal !== oldVal ) {
						console.log("-------qweqweqwewq-----------------"+newVal)
      //                   this.waiting = true
						this.sourceUrl = newVal
                        this.sourceUrls = newVal
						// this.isHlsFlv(this.sourceUrls)
      //                   this.playVideo()
                    }
                },
                // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
                immediate: false
            }

        },
        created() {
			// this.loadingInstance = Loading.service({
			//     lock: true,
			//     text: '视频加载中...',
			//     background: 'rgba(0, 0, 0, 0)'
			// })
		},
        mounted() {
			this.waiting = true
			// this.sourceUrls = newVal
			console.log(this.sourceUrl)
			console.log(this.sourceUrls)
			this.isHlsFlv(this.sourceUrls)
			this.playVideo()
        },
        methods: {
            playVideo() {
                this.$nextTick(()=>[
                    this.loadingVideo = false
                ])
				if (flvjs.isSupported() && this.isType == 'flv') {
					let self = this
					console.log("---wqwdqw--")
					var videoEl = document.getElementById('video')
					var myPlayer = flvjs.createPlayer({
						type: 'flv',
						url : self.sourceUrls
					});
					this.hls = true
					this.loadingVideo = false
					this.waiting = false
					this.$emit("closeLoad")
					// this.loadingInstance.close()
					// this.$emit('playStatus', true)
					myPlayer.attachMediaElement(videoEl);
					myPlayer.load();
					myPlayer.play();
				}else{
                if (Hls.isSupported()) {
                    this.hls = new Hls();
                    this.hls.loadSource(this.sourceUrls);
                    this.hls.attachMedia(this.$refs.video);
                    this.hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
//                        console.log(event, data);
                        console.log('playing...');
                        this.loadingVideo = false
                        this.waiting = false
						this.$emit("closeLoad")
						// this.loadingInstance.close()
						this.$emit('AvaUrl', this.turn)
                        this.$emit('playStatus', true) // 当点位存在播放地址时，可以截图
                        this.$refs.video.play();
                      /*  playSetTime = setTimeout(()=>{
                            clearTimeout(this.reloadPlayTime);
                        },3000)*/
                        //当正在播放时，取消定时器
                    });
                    let timerArr = []
                    let delay = 2500
                    this.hls.on(Hls.Events.ERROR, (event, data) => {
						let self = this
                        console.log(event, data);
                        if(data.type === "networkError") { //网络故障
                            console.log('网络故障了...')
								// this.loadingInstance.close()
								this.turn += 1
								getVideo(self.channel).then(res => {
									console.log(res)
									if(res.code == 200){
										if(self.turn == 1){
											self.sourceUrls = res.data.inurl
											self.sourceUrl = res.data.inurl
											self.isHlsFlv(self.sourceUrls)
											self.playVideo()
											console.log(self.sourceUrl)
										}else{
											if(self.turn == 2){
												self.sourceUrls = res.data.iccurl
												self.sourceUrl = res.data.iccurl
												self.isHlsFlv(self.sourceUrls)
												self.playVideo()
												console.log(self.sourceUrl)
											}else{
												self.$message.warning('获取视频失败')
											}
										}
										self.loaded = true
										self.loadingVideo = false
										self.waiting = false
									} else {
										self.loadingVideo = false
										self.waiting = false
										// self.$message({
										// 	showClose: true,
										// 	message: res?.message ? res?.message : "网络出错，请稍后再试！",
										// 	type: 'error'
										// });
									}
								}).catch(err => {
									console.log(err)
								})
                                // this.sourceUrls = ''
                                // this.disabledShot = true
                                // this.$emit('playStatus', false)
                                // this.videoPause()
                                // 监听出错事件
                            timerArr.push(this.reloadPlayTime)
                         
                            if(timerArr.length > 1) {
                               //当视频播放中无法播放时，会多次执行Hls.Events.ERROR，因此需要处理一下定时器触发问题
                                for(let i =1;i< timerArr.length;i++) {
                                    clearTimeout(timerArr[i]);
                                    timerArr.splice(i,1)
                                }
                            }
                            console.log(timerArr)
                        } else  if(data.type === "mediaError") { //推流失败
//                            console.log("播放流断了....");
                        }

                    });
                } else if (this.$refs.video.canPlayType('application/vnd.apple.mpegurl')) {
                  /*  this.$refs.video.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
                    this.$refs.video.addEventListener('loadedmetadata',function() {
                        this.$refs.video.play();
                    });*/
                }
				}

            },
			
            playVideo2(sourceUrls) {     //无判断播放
                this.$nextTick(()=>[
                    this.loadingVideo = false
                ])
				if (flvjs.isSupported() && this.isType == 'flv') {
					let self = this
					var videoEl = document.getElementById('video')
					var myPlayer = flvjs.createPlayer({
						type: 'flv',
						url : sourceUrls
					});
					this.$emit("closeLoad")
					// this.loadingInstance.close()
					this.hls = true
					this.loadingVideo = false
					this.waiting = false
					myPlayer.attachMediaElement(videoEl);
					myPlayer.load();
					myPlayer.play();
				}else{
                if (Hls.isSupported()) {
                    this.hls = new Hls();
                    this.hls.loadSource(sourceUrls);
                    this.hls.attachMedia(this.$refs.video);
                    this.hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
//                        console.log(event, data);
                        console.log('playing...');
                        this.loadingVideo = false
                        this.waiting = false
						this.$emit("closeLoad")
						// this.loadingInstance.close()
                        this.$emit('playStatus', true) // 当点位存在播放地址时，可以截图
                        this.$refs.video.play();
                    });
                    let timerArr = []
                    let delay = 2500
                    this.hls.on(Hls.Events.ERROR, (event, data) => {
						let self = this
                        console.log(event, data);
                        if(data.type === "networkError") { //网络故障
                            console.log('网络故障了...')
                                // this.sourceUrls = ''
                                // this.disabledShot = true
                                // this.$emit('playStatus', false)
                                // this.videoPause()
                                // 监听出错事件
                            timerArr.push(this.reloadPlayTime)
                         
                            if(timerArr.length > 1) {
                               //当视频播放中无法播放时，会多次执行Hls.Events.ERROR，因此需要处理一下定时器触发问题
                                for(let i =1;i< timerArr.length;i++) {
                                    clearTimeout(timerArr[i]);
                                    timerArr.splice(i,1)
                                }
                            }
                            console.log(timerArr)
                        } else  if(data.type === "mediaError") { //推流失败
//                            console.log("播放流断了....");
                        }

                    });
                } else if (this.$refs.video.canPlayType('application/vnd.apple.mpegurl')) {
                  /*  this.$refs.video.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
                    this.$refs.video.addEventListener('loadedmetadata',function() {
                        this.$refs.video.play();
                    });*/
                }
				}

            },
			
			isHlsFlv(url){
				 var extension=url.substring(url.lastIndexOf('.')+1);
			
				if("m3u8" ==extension.toLowerCase()){
					this.isType = "hls"
				}
				if("flv" ==extension.toLowerCase()){
					this.isType = "flv"
				}
			},
            // 停止流
            videoPause() {
                if (this.hls) {
                    this.$refs.video.pause();
                    this.hls.destroy();
                    this.hls = null;
                }
            }
        },
        beforeDestroy () {
            clearTimeout(this.reloadPlayTime);
            this.hls = null;
        }
    }
</script>

<style lang="scss" scoped>
    .ali-player{
        width: 100%;
        .main {
            box-sizing: border-box;
            color: #FFFFFF;
            .video-center {
                // position: relative;
				display: flex;
				justify-content: center;
                .name{
                    position: absolute;
                    left: 50%;
                    top: -20px;
                    font-size: 18px;
                    -webkit-transform: translateX(-50%);
                    transform: translateX(-50%);
                }
                .tips{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    -webkit-transform: translate(-50%, -50%);
                    transform: translate(-50%, -50%);
                    z-index: 9999;
                    opacity: 0.79;
                }
            }
        }
        #video {
            width: 100%;
            height: 970px !important;
			z-index: 0;
        }
        .video{
            width: 100%;
            height: 970px !important;
			z-index: 0;
        }
    }
</style>


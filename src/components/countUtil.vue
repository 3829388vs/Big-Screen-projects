<template>
    <div>
        <span class="toAD">
            <div
               class="qwNumBox"
               v-for="(item, index) in newCount"
               :key="index"
            >
                <div class="trasBox" :class="['rolling_' + item]">
                    <div class="qwnum">0</div>
                    <div class="qwnum">1</div>
                    <div class="qwnum">2</div>
                    <div class="qwnum">3</div>
                    <div class="qwnum">4</div>
                    <div class="qwnum">5</div>
                    <div class="qwnum">6</div>
                    <div class="qwnum">7</div>
                    <div class="qwnum">8</div>
                    <div class="qwnum">9</div>
                    <div class="qwnum">.</div>
                </div>
            </div>
        </span>
    </div>
</template>

<script>
export default {
    name: "countUtil",
    props: {
        count: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            newCount: [],
        }
    },
    watch: {
        count(newData, oldData){
            if(!newData){
                newData = "0"
            }
            let newArr = newData.toString().split("").map(item => {
                if(item === "."){
                    item = "dot"
                }
                return item
            })
            this.newCount = newArr
        }
    },
    mounted() {

    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
    .qwNumBox + .qwNumBox {
        margin-left: 3px;
    }

    .qwNumBox {
        position: relative;
        display: inline-block;
        width: 17px;
        height: 50px;
        overflow: hidden;
        // border: 1px solid rgba(72, 152, 241, 0.3);
        // border-radius: 6px;
    }
    .trasBox {
        position: absolute;
        left: 0;
        top: 0;
        height: auto;
        width: 100%;
        transform-origin: 0 0;
        transition: top 0.8s;
    }

    .qwnum {
        width: 17px;
        height: 50px;
        color: #fff;
        display: inline-block;
        font-size: 31px;
        font-weight: 400;
        line-height: 50px;
        // text-align: center;
        // margin-right: 5px;
        // background-image: url("../assets/images/num_bg.png");
        // background-size: 100% 100%;
        // background-repeat: no-repeat;
    }
    .qwnum:last-child {
        margin-right: 0;
    }
    .toAD {
        //margin-left: 12px;
        display: inline-block;
    }
    .rolling_0 {
        animation: rolling_0 2.1s ease;
        transform: translate3d(0, -0px, 0);
    }
    @-webkit-keyframes rolling_0 {
        from {
            transform: translate3d(0, -720px, 0);
        }
        to {
            transform: translate3d(0, -0px, 0);
        }
    }
    .rolling_1 {
        animation: rolling_1 3s ease;
        transform: translate3d(0, -50px, 0);
    }
    @-webkit-keyframes rolling_1 {
        from {
            transform: translate3d(0, -0px, 0);
        }
        to {
            transform: translate3d(0, -50px, 0);
        }
    }
    .rolling_2 {
        animation: rolling_2 2.1s ease;
        transform: translate3d(0, -100px, 0);
    }
    @-webkit-keyframes rolling_2 {
        from {
            transform: translate3d(0, -0px, 0);
        }
        to {
            transform: translate3d(0, -100px, 0);
        }
    }
    .rolling_3 {
        animation: rolling_3 3s ease;
        transform: translate3d(0, -150px, 0);
    }
    @-webkit-keyframes rolling_3 {
        from {
            transform: translate3d(0, -0px, 0);
        }
        to {
            transform: translate3d(0, -150px, 0);
        }
    }
    .rolling_4 {
        animation: rolling_4 2.1s ease;
        transform: translate3d(0, -200px, 0);
    }
    @-webkit-keyframes rolling_4 {
        from {
            transform: translate3d(0, -0px, 0);
        }
        to {
            transform: translate3d(0, -200px, 0);
        }
    }
    .rolling_5 {
        animation: rolling_5 3s ease;
        transform: translate3d(0, -250px, 0);
    }
    @-webkit-keyframes rolling_5 {
        from {
            transform: translate3d(0, -0px, 0);
        }
        to {
            transform: translate3d(0, -250px, 0);
        }
    }
    .rolling_6 {
        animation: rolling_6 2.1s ease;
        transform: translate3d(0, -300px, 0);
    }
    @-webkit-keyframes rolling_6 {
        from {
            transform: translate3d(0, -0px, 0);
        }
        to {
            transform: translate3d(0, -300px, 0);
        }
    }
    .rolling_7 {
        animation: rolling_7 3.1s ease;
        transform: translate3d(0, -350px, 0);
    }
    @-webkit-keyframes rolling_7 {
        from {
            transform: translate3d(0, -0px, 0);
        }
        to {
            transform: translate3d(0, -350px, 0);
        }
    }
    .rolling_8 {
        animation: rolling_8 2.1s ease;
        transform: translate3d(0, -400px, 0);
    }
    @-webkit-keyframes rolling_8 {
        from {
            transform: translate3d(0, -0px, 0);
        }
        to {
            transform: translate3d(0, -400px, 0);
        }
    }
    .rolling_9 {
        animation: rolling_9 4.1s ease;
        transform: translate3d(0, -450px, 0);
    }
    @-webkit-keyframes rolling_9 {
        from {
            transform: translate3d(0, -0px, 0);
        }
        to {
            transform: translate3d(0, -450px, 0);
        }
    }
    .rolling_dot {
        animation: rolling_dot 4.1s ease;
        transform: translate3d(0, -500px, 0);
    }
    @-webkit-keyframes rolling_dot {
        from {
            transform: translate3d(0, -0px, 0);
        }
        to {
            transform: translate3d(0, -500px, 0);
        }
    }
</style>
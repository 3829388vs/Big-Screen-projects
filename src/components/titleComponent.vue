<template>
	<div class="all">
		<div class="line"></div>
		<div class="title-wrap">{{title}}</div>
	</div>
</template>

<script>
export default {
    name: "titleComponent",
    props: {
        title: {
            type: String,
            default: ""
        }
    }
}
</script>

<style lang="scss" scoped>
	.all{
		margin-left: 25px;
	}
    .title-wrap {
        color: #fff;
        height: 25px;
        line-height: 20px;
        font-size: 20px;
        text-align: left;
        margin-bottom: 7px;
        padding: 5px 17px;
		margin-left: 10px;
        background-image: url(../assets/images/title2.png);
		background-repeat: no-repeat;
    }
	.line{
		line-height: 12px;
		height: 12px;
		margin-top: 10px;
		background-image: url(../assets/images/line.png);
		background-repeat: no-repeat;
	}
</style>
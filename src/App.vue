<template>
    <ScreenAdapter>
        <div id="app">
            <router-view/>
        </div>
    </ScreenAdapter>
</template>

<script>
import ScreenAdapter from "@/components/ScreenAdapter";
export default {
    name: "App",
    components: {
        ScreenAdapter
    }
}
</script>

<style lang="scss">
    html, body, #app{
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: #173277;
    }
</style>

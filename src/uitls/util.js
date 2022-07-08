// 主要用于echarts  px转rem 参数res是传已转rem的
export const fontSize = (res) => {
    let docEl = document.documentElement,
        clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (!clientWidth) return;
    let fontSize = 100 * (clientWidth / 1920);
    return res * fontSize;
}

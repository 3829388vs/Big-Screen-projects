import { Http } from "@/uitls/http";
export const getIndexData = (params) => {
    return Http({
        url: 'project/showProjMessage.action',
        params: params,
        method: "post"
    })
}

export const getVideo = (params) => {
    return Http({
        url: `/kfq/icc/findHlsVideo.action?channelId=${params}`,
        method: "post"
    })
}

export const getProjblemTotal = (params) => {
    return Http({
        url: '/kfq/project/projblemTotal.action',
		params: params,
        method: "post"
    })
}
export const getProjblemProject = (params) => {
    return Http({
        url: '/kfq/project/projblemProject.action',
		params: params,
        method: "post"
    })
}

export const getProjblemInvestment = (params) => {
    return Http({
        url: '/kfq/project/projblemInvestment.action',
		params: params,
        method: "post"
    })
}

export const getProjblemProgress = (params) => {
    return Http({
        url: '/kfq/project/projblemProgress.action',
		params: params,
        method: "post"
    })
}

export const getOperateDirect = (params) => {
    return Http({
        url: `/kfq/icc/OperateDirect.action?channelId=${params.channelId}&command=${params.command}&direct=${params.direct}&stepX=${params.stepX}&stepY=${params.stepY}`,
        method: "post"
    })
}

export const getOperateCamera = (params) => {
    return Http({
        url: `/kfq/icc/OperateCamera.action?channelId=${params.channelId}&command=${params.command}&direct=${params.direct}&operateType=${params.operateType}&step=${params.step}`,
        method: "post"
    })
}

export const getRecordVideo = (params) => {
    return Http({
        url: `/kfq/icc/hlsRecordVideo.action?channelId=${params.channelId}&beginTime=${params.beginTime}&endTime=${params.endTime}`,
        method: "post"
    })
}

export const getOperateFunc = (params) => {
    return Http({
        url: `/kfq/icc/OperateFunction.action?channelId=${params.channelId}&command=${params.command}&operateType=${params.operateType}&target=${params.target}`,
        method: "post"
    })
}

export const getProjTotal = (params) => {
    return Http({
        url: '/kfq/project/queryProjectCount.action',
        params: params,
        method: "post"
    })
}

export const getStatusCount = (params) => {
    return Http({
        url: '/kfq/project/queryStatusCount.action',
        params: params,
        method: "post"
    })
}

export const getTypeNameCount = (params) => {
    return Http({
        url: '/kfq/project/queryTypeNameCount.action',
        params: params,
        method: "post"
    })
}

export const getProjectName = (params) => {
    return Http({
        url: '/kfq/project/queryProjectName.action',
        params: params,
        method: "post"
    })
}

export const getProjDetail = (params) => {
    return Http({
        url: `/project/projDetail.action?projId=${params}`,
        method: "post"
    })
}

export const getCheckSmartWorkLogin = (params) => {
    return Http({
        url: `/kfq/passWord/checkSmartWorkLogin.action?userCode=${params.userCode}&token=${params.token}`,
        method: "post"
    })
}
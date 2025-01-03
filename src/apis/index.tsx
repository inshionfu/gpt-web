import { GptVersion } from "@/app/constants";
import { useAccessStore } from "@/app/store/access";
import { MessageRole } from "@/types/chat";

const dataHost = 'http://124.221.174.50'
// const dataHost = 'http://localhost:8080'
const manageHost = 'http://124.221.174.50:8080'
// const manageHost = 'http://localhost:8090'

// 商品列表
export const queryProductList = () => {
    return fetch(`${dataHost}/api/v1/sale/product_list`, {
        method: 'get',
        headers: getHeaders(),
    })
}

// 用户商品下单，获得支付url
export const createPayOrder = (productId: number) => {
    return fetch(`${dataHost}/api/v1/sale/create_order`, {
        method: 'post',
        headers: {
            ...getHeaders(),
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        body: `productId=${productId}`
    })
}

// 角色列表
export const getRoleList = async () => {
    // 从 apiPost mock 接口获取
    // return fetch(`${host}/api/roles`).then((res) =>
    //     res.json()
    // );

    // // 从本地 json 文件获取
    // return fetch(`/prompts.json`).then((res) =>
    //     res.json()
    // );

    // 从服务端api获取
    return await fetch(`${manageHost}/api/v1/gpt/mng/mmu/list`).then((res) =>
        res.json()
    );
}

// 通过MMUID查询对应的Prompt
export const getPromptByMMUId = async (
    req: {id : number}
) => {
    return await fetch(`${manageHost}/api/v1/gpt/mng/prompt/query`, {
        method: 'get',
        headers: getHeaders(),
        body: JSON.stringify(req)
    }).then((res)=>
        res.json()
    );
}

// 流式对话处理
export const completions = (data: {
    messages: { content: string; role: MessageRole }[],
    model: GptVersion
}) => {
    return fetch(`${dataHost}/api/v1/chat/completions`, {
        method: 'post',
        headers: getHeaders(),
        body: JSON.stringify(data)
    })
}

// 登录接口
export const login = (token:string) => {
    const accessState = useAccessStore.getState()
    console.log("code=" + accessState.accessCode)
    return fetch(`${dataHost}/api/v1/auth/login`, {
        method: 'post',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        body: `code=${accessState.accessCode}`
    })
}

function getHeaders() {
    const accessState = useAccessStore.getState()

    const headers =  {
        Authorization:  accessState.token,
        'Content-Type': 'application/json;charset=utf-8'
    }

    return headers
}
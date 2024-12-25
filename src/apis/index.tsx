import { GptVersion } from "@/app/constants";
import { useAccessStore } from "@/app/store/access";
import { MessageRole } from "@/types/chat";

const dataHost = 'http://124.221.174.50'
// const dataHost = 'http://localhost:8080'
// const manageHost = 'http://124.221.174.50:8080'
const manageHost = 'http://localhost:8090'

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
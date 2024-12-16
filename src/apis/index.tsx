import { GptVersion } from "@/app/constants";
import { useAccessStore } from "@/app/store/access";
import { MessageRole } from "@/types/chat";

const host = 'http://124.221.174.50'

export const getRoleList = () => {
    // 从 apiPost mock 接口获取
    // return fetch(`${host}/api/roles`).then((res) =>
    //     res.json()
    // );

    // // 从本地 json 文件获取
    return fetch(`/prompts.json`).then((res) =>
        res.json()
    );
}

export const completions = (data: {
    messages: { content: string; role: MessageRole }[],
    model: GptVersion
}) => {
    return fetch(`${host}/api/v1/chat/completions`, {
        method: 'post',
        headers: getHeaders(),
        body: JSON.stringify(data)
    })
}

export const login = (token:string) => {
    const accessState = useAccessStore.getState()
    console.log("code=" + accessState.accessCode)
    return fetch(`${host}/api/v1/auth/login`, {
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
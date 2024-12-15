import { GptVersion } from "@/app/constants";
import { MessageRole } from "@/app/types/chat";

const host = 'https://apifoxmock.com/m1/2559383-1518511-default'

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
    return fetch('http://124.221.174.50:8080/api/v1/chat/completions', {
        method: 'post',
        headers: {
            // b8b6 后续用于写入 token 加密信息
            Authorization: "b8b6",
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
}
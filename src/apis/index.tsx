import { GptVersion } from "@/app/constants";
import { MessageRole } from "@/app/types/chat";

const host = 'https://apifoxmock.com/m1/2559383-1518511-default'

export const getRoleList = () => {
    // 从 apiPost mock 接口获取
    return fetch(`${host}/api/roles`).then((res) =>
        res.json()
    );

    // // 从本地 json 文件获取
    // return fetch(`/prompts.json`).then((res) =>
    //     res.json()
    // );
}


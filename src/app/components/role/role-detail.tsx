import {useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useMemo} from "react";
import {RoleContext} from "@/app/components/role/role-list";
import {createNewMessage, userChatStore} from "@/app/store/chat-store";
import styles from "./role-detail.module.scss";
import {Avatar, Button, Tag} from "antd";
import {MessageRole} from "@/types/chat";
import { getPromptByMMUId } from "@/apis";

interface Props {
    id: number;
    title: string;
}

export function RoleDetail() {
    const {id} = useParams<{ id: any }>()
    const {roles} = useContext(RoleContext);
    const chatStore = userChatStore();
    const navigate = useNavigate();
    const [sessions, currentSessionIndex] = userChatStore(
        (state) => [state.sessions, state.currentSessionIndex, state.selectSession]
    );
    const role = useMemo(() => {
        return roles.find((role) => role.mmu.id == id);
    }, [id, roles])
    const start = () => {
        let session = chatStore.openSession({
            title: role?.mmu.role_name,
            avatar: role?.mmu.avatar
        });
        setTimeout(() => {
            const newMessage = createNewMessage(role?.prompt.content || '', MessageRole.user)
            // 带着角色信息对话
            chatStore.onSendMessage(newMessage)
            // 点击时跳转到对应的界面，并传递必要参数信息
            navigate(`/chat/${session.id}`, {state: {title: session.dialog.title}});
        }, 0)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>{role?.mmu.role_name}</div>
            <div className={styles.scroll}>
                <Avatar shape="square" size={64} src={role?.mmu.avatar}/>
                <p className={styles.desc}>
                    <Tag bordered={false} color="processing">
                        角色介绍
                    </Tag>
                    {role?.prompt.content}
                </p>
                <Button type="primary" className={styles['btn']} onClick={() => start()}>开始对话</Button>
            </div>
        </div>
    );

}
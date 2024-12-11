import {Message, MessageDirection} from '@/app/types/chat';
import styles from './dialog-message-item.module.scss'
import {Avatar, Space} from "antd";

/**
 * 用对象封装属性，方便扩展
 */
interface Props {
    message: Message;
}

/**
 * 对话面板消息元素
 * @constructor
 */
export function DialogMessageItem(props: Props) {
    const {message} = props;
    const isReceive = message.direction === MessageDirection.Receive;
    return (
        <Space className={`${styles.messageWrapper} ${isReceive ? styles.receive : styles.send}`}>
            {isReceive ? (
                <>
                    <Avatar shape="square" src={message.avatar} size={40} style={{
                        borderRadius: '4px',
                        backgroundColor: '#f6f6f6'
                    }}/>
                    <p className={styles.message}>{message.message}</p>
                </>
            ) : (
                <>
                    <p className={styles.message}>{message.message}</p>
                    <Avatar shape="square" src={message.avatar} size={40} style={{
                        borderRadius: '4px',
                        backgroundColor: '#f6f6f6'
                    }}/>
                </>
            )}
        </Space>
    );
}
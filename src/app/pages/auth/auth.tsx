import { Button, Input } from "antd"
import styles from "./auth.module.scss"

import { useNavigate } from "react-router-dom"
import { useAccessStore } from "../../store/access"
import GPTIcon from "../../icons/chatgpt.svg"
import QRCode from "../../icons/qrcode.svg"

export default function Auth() {
    const navigate = useNavigate()
    const access = useAccessStore()
    return (
        <div className={styles["auth-page"]}>
            <GPTIcon></GPTIcon>
            <div className={styles["auth-title"]}>Aihub</div>
            <div className={styles["auth-sub-title"]}>
                运用Ai提效
            </div>
            {/* <QRCode></QRCode> */}
            <img src="https://s2.loli.net/2024/12/26/2PkhCWQOxfNwm9p.png" width={250}/>
            <div className={styles["auth-tips"]}>
                扫码关注公众号【丝滑打铁】
                <a href="https://sm.ms/image/2PkhCWQOxfNwm9p" target="_blank">
                    回复【403】获取访问密码
                </a>
            </div>

            <Input
            className={styles["auth-input"]}
            type="password"
            placeholder="在此处填写访问码"
            value={access.accessCode}
            onChange={(e) => {
                access.updateCode(e.currentTarget.value);
            }}
            status={access.accessCodeErrorMsgs?'error': ''}
            />

            {access.accessCodeErrorMsgs?<span className={styles['auth-error']}>{access.accessCodeErrorMsgs}</span>:null}


            <div className={styles["auth-actions"]}>
                <Button type="primary" onClick={() => access.login()}>确认登录👣</Button>
                <Button type="text">稍后再说</Button>
            </div>
            <span>
                说明：此平台主要以学习OpenAI为主，请合理、合法、合规的使用相关资料！
            </span>
        </div>

        
    )
}
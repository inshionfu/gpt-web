import styles from "./role-list.module.scss";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import React from "react";
import {DialogResizeableSidebar} from "@/app/components/dialog/dialog-resizeable-sidebar";
import {Avatar, Spin} from "antd";
import {Role} from "@/types/role";
import {DialogHead} from "../dialog/dialog-head";

export interface RoleContextType {
    roles: Role[]
    selected: number;
    setSelected: (id: number) => void;
}

export const RoleContext = React.createContext<RoleContextType>({
    roles: [],
    selected: -1,
    setSelected: (id: number) => {
    }
})

export function RoleList() {
    // 编程式路由跳转
    const navigate = useNavigate();
    const {roles, selected, setSelected} = useContext(RoleContext);

    return (
        <DialogResizeableSidebar>
            {/*头部操作*/}
            <DialogHead/>
            {/*角色列表*/}
            <div className={styles["role-list"]}>
                {!roles ? <Spin spinning style={{margin: '24px auto', width: '100%'}}/> : null}

                {roles?.map((role) => {
                    console.log(role)
                    return (
                        <div
                            className={`${styles["role-item"]} ${selected == role.mmu.id ? styles['selected'] : ''}`}
                            key={role.mmu.id}
                            onClick={() => {
                                setSelected(role.mmu.id)
                                navigate(`/role/${role.mmu.id}`);
                            }}>

                            <Avatar shape="square" size={38} src={role.mmu.avatar}/>
                            <div className={styles["name"]}>{role.mmu.role_name}</div>
                        </div>
                    )
                })}
            </div>
        </DialogResizeableSidebar>
    );

}
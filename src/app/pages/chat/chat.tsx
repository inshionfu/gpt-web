import { DialogList } from '@/app/components/dialog/dialog-list';
import styles from './chat.module.scss';

export function Chat() {
    return (
        <div className={styles["chat"]}>
            <DialogList/>
        </div>
    );
}
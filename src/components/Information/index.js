import classNames from 'classnames/bind';
import { useState } from 'react';
import Auth from '../Auth';
import Button from '../Button';
import styles from './Information.module.scss';

const cx = classNames.bind(styles);

function Information({ user, state }) {
    const [openEditor, setOpenEditor] = useState(false);

    return (
        <>
            <div className={cx('container')}>
                <div className={cx('title')}>
                    <h3>Information</h3>
                    <Button normal onClick={() => setOpenEditor(true)}>
                        Edit
                    </Button>
                </div>
                <div>
                    Your name: <span> {user.name}</span>
                </div>
                <div>
                    Your email:<span> {user.email}</span>
                </div>
            </div>
            {openEditor && <Auth modal setOpenEditor={setOpenEditor} />}
        </>
    );
}

export default Information;

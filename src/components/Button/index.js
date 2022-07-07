import classNames from 'classnames/bind';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    disabled = false,
    children,
    large = false,
    className,
    medium = false,
    rounded = false,
    onClick,
    type,
    normal,
    ...passProps
}) {
    let Comp = 'button';

    const props = {
        onClick,
        type,
        ...passProps,
    };

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        disabled,
        large,
        medium,
        normal,
        rounded,
    });
    return (
        <Comp className={classes} {...props}>
            <span>{children}</span>
            {/* <div className={cx('loader')}></div> */}
        </Comp>
    );
}

export default memo(Button);

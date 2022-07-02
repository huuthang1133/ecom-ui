import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '~/redux/toolkit/productSlice';
import Button from '../Button';
import styles from './LoadMore.module.scss';

const cx = classNames.bind(styles);

function LoadMore({ onClick }) {
    return (
        <Button onClick={onClick} rounded>
            LoadMore
        </Button>
    );
}

export default LoadMore;

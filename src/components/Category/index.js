import { useState } from 'react';
import styles from './Category.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button';
import { createAxios } from '~/ultils/authenticated';
import { notifyError, notifySuccess } from '~/ultils/notify';
import { getCategories } from '~/redux/toolkit/categorySlice';

const cx = classNames.bind(styles);

function Category() {
    const { data: categories } = useSelector((state) => state.categoryState);
    const authState = useSelector((state) => state.authState);
    const [category, setCategory] = useState('');
    const [onEdit, setOnEdit] = useState(false);
    const [id, setId] = useState('');
    const dispatch = useDispatch();
    let axiosJWT = createAxios(authState, dispatch);

    const createCategory = async (e) => {
        e.preventDefault();
        if (onEdit) {
            try {
                const res = await axiosJWT.put(`/category/${id}`, { name: category.toLowerCase() });
                setOnEdit(false);
                setCategory('');
                notifySuccess(res.data.msg);
                dispatch(getCategories());
            } catch (err) {
                notifyError(err.response.data.msg);
            }
        } else {
            try {
                const res = await axiosJWT.post(`/category`, { name: category.toLowerCase() });
                notifySuccess(res.data.msg);
                dispatch(getCategories());
                setCategory('');
            } catch (err) {
                setCategory('');
                notifyError(err.response.data.msg);
            }
        }
    };
    const editCategory = async (e, _id, name) => {
        e.preventDefault();
        setId(_id);
        setOnEdit(true);
    };
    const deleteCategory = async (e, _id) => {
        e.preventDefault();
        try {
            const res = await axiosJWT.delete(`/category/${_id}`);
            dispatch(getCategories());
            notifySuccess(res.data.msg);
        } catch (err) {
            notifyError(err.response.data.msg);
        }
    };
    return (
        <div className={cx('categories')}>
            <form onSubmit={createCategory}>
                <label htmlFor="category">Category</label>
                <input
                    type="text"
                    name="category"
                    value={category}
                    required
                    onChange={(e) => setCategory(e.target.value)}
                />

                <Button type="submit">{onEdit ? 'Update' : 'Create'}</Button>
            </form>

            <div className={cx('col')}>
                {categories.map((category) => (
                    <div className={cx('row')} key={category._id}>
                        <p>{category.name}</p>
                        <div>
                            <Button onClick={(e) => editCategory(e, category._id, category.name)}>Edit</Button>
                            <Button onClick={(e) => deleteCategory(e, category._id)}>Delete</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Category;

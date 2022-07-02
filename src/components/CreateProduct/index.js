import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getProducts } from '~/redux/toolkit/productSlice';
import { createAxios } from '~/ultils/authenticated';
import Loading from '~/ultils/loading';
import { notifyError, notifySuccess } from '~/ultils/notify';
import Button from '../Button';
import styles from './CreateProduct.module.scss';

const cx = classNames.bind(styles);

const initialState = {
    product_id: '',
    title: '',
    price: 0,
    quantity: 0,
    description: '',
    category: '',
};

function CreateProduct() {
    const dispatch = useDispatch();
    const { data: products, loading } = useSelector((state) => state.productState);
    const categoryState = useSelector((state) => state.categoryState);
    const authState = useSelector((state) => state.authState);
    const [images, setImages] = useState(false);
    const [onEdit, setOnEdit] = useState(false);
    const [product, setProduct] = useState(initialState);
    let axiosJWT = createAxios(authState, dispatch);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            if (products.length) {
                const editProduct = products.find((_product) => _product._id === id);
                setOnEdit(Boolean(authState.data?._user?.role));
                setImages(editProduct.images);
                setProduct(editProduct);
            }
        }
        return;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, products]);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return alert('File not exist.');
        if (file.size > 1024 * 1024) return alert('Size too large!');
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') return alert('File format is incorrect.');
        let formData = new FormData();
        formData.append('file', file);
        try {
            const res = await axiosJWT.post(`/upload`, formData);
            setImages(res.data);
        } catch (err) {
            e.target.value = '';
            notifyError(err.response.data.msg);
        }
    };
    const handleDestroy = async () => {
        try {
            await axiosJWT.post(`destroy`, { public_id: images.public_id });
            setImages('');
        } catch (err) {
            notifyError(err.response.data.msg);
        }
    };

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosJWT.post(`/products`, { ...product, images });
            handleDestroy();
            notifySuccess(res.data.msg);
            dispatch(getProducts());
            setProduct(initialState);
        } catch (err) {
            if (typeof err.response.data.msg === 'string') {
                notifyError(err.response.data.msg);
            } else {
                for (const error in err.response.data.msg) {
                    notifyError(`${error}: ${err.response.data.msg[error]}`);
                }
            }
        }
    };

    const handleSubmitUpdate = async (e) => {
        e.preventDefault(e);
        try {
            const res = await axiosJWT.put(`products/${id}`, { ...product, images });
            setProduct(initialState);
            notifySuccess(res.data.msg);
            navigate('/');
        } catch (err) {
            notifyError(err.response.data.msg);
        }
    };

    const styleUpload = {
        display: images ? 'block' : 'none',
    };

    return (
        <div className={cx('container')}>
            <div className={cx('upload')}>
                <input type="file" name="file" className={cx('file_up')} onChange={handleUpload} required />
                {loading ? (
                    <div className={cx('file_img')}>
                        <Loading />
                    </div>
                ) : (
                    <div className={cx('file_img')} style={styleUpload}>
                        <img src={images ? images.url : ''} alt="" />
                        <span onClick={handleDestroy}>X</span>
                    </div>
                )}
            </div>
            <form onSubmit={onEdit ? handleSubmitUpdate : handleSubmit}>
                <div className={cx('row')}>
                    <label htmlFor="product_id">Product ID</label>
                    <input
                        type="text"
                        name="product_id"
                        id="product_id"
                        required
                        value={product.product_id}
                        onChange={handleChangeInput}
                        disabled={onEdit}
                    />
                </div>

                <div className={cx('row')}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={product.title}
                        required
                        onChange={handleChangeInput}
                    />
                </div>

                <div className={cx('row')}>
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        required
                        value={product.price}
                        onChange={handleChangeInput}
                    />
                </div>

                <div className={cx('row')}>
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        required
                        value={product.quantity}
                        onChange={handleChangeInput}
                    />
                </div>

                <div className={cx('row')}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        type="text"
                        name="description"
                        id="description"
                        required
                        value={product.description}
                        rows="5"
                        onChange={handleChangeInput}
                    />
                </div>
                <div className={cx('row')}>
                    <label htmlFor="categories">Categories: </label>
                    <select name="category" value={product.category} onChange={handleChangeInput} required>
                        <option value="">Please select a category</option>
                        {categoryState.data?.map((category) => (
                            <option value={category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <Button>{onEdit ? `Update` : `Create`}</Button>
            </form>
        </div>
    );
}

export default CreateProduct;

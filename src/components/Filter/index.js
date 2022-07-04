import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import styles from './Filter.module.scss';

const cx = classNames.bind(styles);

function Filter({ props }) {
    const [sort, setSort] = props.sort;
    const [search, setSearch] = props.search;
    const [category, setCategory] = props.category;

    const { data: categories } = useSelector((state) => state.categoryState);

    const handleCategory = (e) => {
        setCategory(e.target.value);
    };
    const handleChangeInput = (e) => {
        const search = e.target.value;
        if (!search.startsWith(' ')) {
            setSearch(e.target.value.toLowerCase());
        }
    };

    const handleChangeSelected = (e) => {
        setSort(e.target.value);
    };
    return (
        <div className={cx('filter_menu')}>
            <div className={cx('row')}>
                <span>Filters: </span>
                <select name="category" value={category} onChange={handleCategory}>
                    <option value="">All Products</option>
                    {categories?.map((category) => (
                        <option value={category._id} key={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <input type="text" value={search} placeholder="Enter your search!" onChange={handleChangeInput} />

            <div className="row sort">
                <span>Sort By: </span>
                <select value={sort} onChange={handleChangeSelected}>
                    <option value="">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="-sold">Best sales</option>
                    <option value="-price">Price: Hight-Low</option>
                    <option value="price">Price: Low-Hight</option>
                </select>
            </div>
        </div>
    );
}

export default Filter;

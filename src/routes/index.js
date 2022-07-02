import Category from '~/components/Category';
import CreateProduct from '~/components/CreateProduct';
import DetailProduct from '~/components/DetailProduct';
import config from '~/config';
// Layout
import { Home, Profile, Register, Login, Cart } from '~/pages/';
// Component

export const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.register, component: Register },
    { path: config.routes.login, component: Login },
    { path: config.routes.product, component: DetailProduct },
];

export const privateRoutes = [
    { path: config.routes.profile, component: Profile },
    { path: config.routes.cart, component: Cart },
];

export const adminRoutes = [
    { path: config.routes.create_product, component: CreateProduct },
    { path: config.routes.edit_product, component: CreateProduct },
    { path: config.routes.category, component: Category },
];

export { default as PrivateRoute } from './privateRoute';

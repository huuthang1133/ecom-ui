import { HeaderOnly } from '~/components/Layout';
import config from '~/config';
// Layout

import { Home, Profile, Register, Login } from '~/pages/';
export const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.register, component: Register, layout: HeaderOnly },
    { path: config.routes.login, component: Login, layout: HeaderOnly },
];

export const privateRoutes = [{ path: config.routes.profile, component: Profile }];

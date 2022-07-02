import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import DefaultLayout from './components/Layout/DefaultLayout';
import { getCategories } from './redux/toolkit/categorySlice';
import { getProducts } from './redux/toolkit/productSlice';
import { adminRoutes, PrivateRoute, privateRoutes, publicRoutes } from './routes';
import AdminRoute from './routes/AdminRoute';
function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts());
        dispatch(getCategories());
    }, [dispatch]);
    return (
        <Router>
            <div className="App">
                <Routes>
                    <>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </>
                    <>
                        {privateRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <PrivateRoute>
                                                <Page />
                                            </PrivateRoute>
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </>
                    <>
                        {adminRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <AdminRoute>
                                                <Page />
                                            </AdminRoute>
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </>
                </Routes>
            </div>
            <ToastContainer autoClose={2000} />
        </Router>
    );
}

export default App;

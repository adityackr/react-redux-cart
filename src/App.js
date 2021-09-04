import React, { Fragment, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData } from './store/cart-slice';

let isInitial = true;

function App() {
    const showCart = useSelector((state) => state.ui.cartIsVisible);
    const cart = useSelector((state) => state.cart);
    const notifications = useSelector((state) => state.ui.notifications);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        }
        dispatch(sendCartData(cart));
    }, [cart, dispatch]);

    return (
        <Fragment>
            {notifications && (
                <Notification
                    status={notifications.status}
                    title={notifications.title}
                    message={notifications.message}
                />
            )}
            <Layout>
                {showCart && <Cart />}
                <Products />
            </Layout>
        </Fragment>
    );
}

export default App;

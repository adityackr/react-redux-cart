import React, { Fragment, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { uiActions } from './store/ui-slice';

let isInitial = true;

function App() {
    const showCart = useSelector((state) => state.ui.cartIsVisible);
    const cart = useSelector((state) => state.cart);
    const notifications = useSelector((state) => state.ui.notifications);

    const dispatch = useDispatch();

    useEffect(() => {
        const sendCartData = async () => {
            dispatch(
                uiActions.showNotifications({
                    status: 'pending',
                    title: 'Sending...',
                    message: 'Sending cart data.',
                })
            );
            const response = await fetch(
                'https://react-redux-cart-84fc6-default-rtdb.firebaseio.com/cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify(cart),
                }
            );

            if (!response.ok) {
                throw new Error('Sending cart data failed!');
            }

            dispatch(
                uiActions.showNotifications({
                    status: 'success',
                    title: 'Success!',
                    message: 'Sent cart data successfully!',
                })
            );
        };

        if (isInitial) {
            isInitial = false;
            return;
        }

        sendCartData().catch((error) => {
            dispatch(
                uiActions.showNotifications({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending cart data failed!.',
                })
            );
        });
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

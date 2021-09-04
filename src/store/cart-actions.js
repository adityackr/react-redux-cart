import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchRequest = async () => {
            const response = await fetch(
                'https://react-redux-cart-84fc6-default-rtdb.firebaseio.com/cart.json'
            );

            if (!response.ok) {
                throw new Error('Fetching cart data failed!');
            }

            const data = await response.json();

            return data;
        };

        try {
            const cartData = await fetchRequest();
            dispatch(
                cartActions.replaceCart({
                    items: cartData.items || [],
                    totalQuantity: cartData.totalQuantity,
                })
            );
        } catch (error) {}
    };
};

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotifications({
                status: 'pending',
                title: 'Sending...',
                message: 'Sending cart data.',
            })
        );

        const sendRequest = async () => {
            const response = await fetch(
                'https://react-redux-cart-84fc6-default-rtdb.firebaseio.com/cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        items: cart.items,
                        totalQuantity: cart.totalQuantity,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Sending cart data failed!');
            }
        };

        try {
            await sendRequest();

            dispatch(
                uiActions.showNotifications({
                    status: 'success',
                    title: 'Success!',
                    message: 'Sent cart data successfully!',
                })
            );
        } catch (error) {
            dispatch(
                uiActions.showNotifications({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending cart data failed!.',
                })
            );
        }
    };
};

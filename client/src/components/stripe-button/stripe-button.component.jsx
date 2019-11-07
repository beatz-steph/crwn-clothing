import React from 'react';
import Axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_uq2YTWhgRfWu0rN6tsvS9DAl00MNJDHYap';

  const onToken = token => {
    console.log(token);
    Axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    })
      .then(response => {
        alert('payment succesful');
      })
      .catch(error => {
        console.log('Payment error', JSON.parse(error));
        alert(
          'There was an issue with your payment. PLease make sure you used the provided credit card'
        );
      });
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;

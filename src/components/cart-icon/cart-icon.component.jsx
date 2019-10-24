import React from 'react';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selector';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.style.scss';

const CartIcon = ({ toogleCartHidden, itemCount }) => (
  <div className='cart-icon' onClick={toogleCartHidden}>
    <ShoppingIcon className='shopping-icon' />
    <span className='item-count'>{itemCount}</span>
  </div>
);

const mapDispatchToProps = dispatch => ({
  toogleCartHidden: () => dispatch(toggleCartHidden())
});

const mapstateToProps = state => ({
  itemCount: selectCartItemsCount(state)
});

export default connect(
  mapstateToProps,
  mapDispatchToProps
)(CartIcon);

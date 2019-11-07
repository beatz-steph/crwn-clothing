import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionLoaded } from '../../redux/shop/shop.selectors';
import { compose } from 'redux';

import withSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionsPage from './collection.component';

const mapStateToProps = createStructuredSelector({
  isLoading: state => !selectCollectionLoaded(state)
});

export default compose(
  connect(mapStateToProps),
  withSpinner
)(CollectionsPage);

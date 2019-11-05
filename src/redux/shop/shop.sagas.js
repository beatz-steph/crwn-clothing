import { takeLatest, call, put, all } from 'redux-saga/effects';
import {
  firestore,
  covertCollectionSNapshotToMap
} from '../../firebase/firebase.utils';

import { fetchCollectionFailure, fetchCollectionSuccess } from './shop.actions';

import ShopACtionTypes from './shop.types';

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection('collections');

    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(covertCollectionSNapshotToMap, snapshot);

    yield put(fetchCollectionSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionFailure(error.message));
  }
}

export function* fetchCollectionStart() {
  yield takeLatest(
    ShopACtionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSaga() {
  yield all([call(fetchCollectionStart)]);
}

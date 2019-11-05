import { takeLatest, call, put, all } from 'redux-saga/effects';

import {
  signInSuccess,
  signInFailure,
  signOutFailure,
  signOutScuccess
} from './user.actions';

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser
} from '../../firebase/firebase.utils';

import { UserActionTypes } from './user.types';

export function* getUserProfile(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapshot = yield userRef.get();
    const userData = userSnapshot.data();

    yield put(signInSuccess({ id: userSnapshot.id, ...userData }));
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);

    yield getUserProfile(user);
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

export function* siginInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getUserProfile(user);
  } catch (error) {
    console.log(error.message);
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getUserProfile(userAuth);
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutScuccess());
  } catch (error) {
    yield put(signOutFailure(error.message));
  }
}

export function* onGoogleSignIn() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignIn() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, siginInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignIn),
    call(onEmailSignIn),
    call(onCheckUserSession),
    call(onSignOutStart)
  ]);
}

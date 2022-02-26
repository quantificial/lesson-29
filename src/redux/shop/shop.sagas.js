import { takeLatest, call, put } from 'redux-saga/effects';

import {
  firestore,
  convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils';

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollections() {
  try {
    const collectionRef = yield firestore.collection('collections');
    //const snapshot = yield collectionRef.get();
    // const collectionsMap = yield call(
    //   convertCollectionsSnapshotToMap,
    //   snapshot
    // );


    //const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    var collectionsMap = null;

    yield collectionRef
    .get()
    .then(snapshot => {
     collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    });

    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* onFetchCollectionsStart() {
  yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollections);
}

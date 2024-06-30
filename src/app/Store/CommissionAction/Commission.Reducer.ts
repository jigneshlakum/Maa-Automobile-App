import { createReducer, on } from '@ngrx/store';
import {
  loadCOMMISSIONS,
  loadCOMMISSIONSfail,
  loadCOMMISSIONSsuccess,
} from './Commission.Action';
import { CommissionAdopter, CustomerState } from './Commission.State';

const _COMMISSIONreducer = createReducer(
  CustomerState,
  on(loadCOMMISSIONS, (state) => {
    return { ...state, isloading: true };
  }),
  on(loadCOMMISSIONSsuccess, (state, action) => {
    return CommissionAdopter.setAll(action.list, {
      ...state,
      errormessage: '',
      isloading: false,
    });
  }),
  on(loadCOMMISSIONSfail, (state, action) => {
    return { ...state, errormessage: action.errormessage, isloading: false };
  })

  // on(addCUSTOMERsuccess, (state, action) => {
  //     const _maxid = Math.max(...state.ids.map(item => item as number));
  //     const _newdata = { ...action.inputdata };
  //     _newdata.id = _maxid + 1;
  //     return CommissionAdopter.addOne(_newdata, state);
  // }),
  // on(updateCUSTOMERsuccess, (state, action) => {
  //     return CommissionAdopter.updateOne(action.inputdata, state);
  // }),
  // on(deleteCUSTOMERsuccess, (state, action) => {
  //     return CommissionAdopter.removeOne(action.code, state);
  // })
);

export function COMMISSIONReducer(state: any, action: any) {
  return _COMMISSIONreducer(state, action);
}

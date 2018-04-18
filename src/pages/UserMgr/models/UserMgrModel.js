import * as UserMgrService from '../services/UserMgrService';

export default {
  namespace: 'UserMgr',
  state: {
    doctorUsers: {
      list: [],
      queryParams: {}, // doctorList 为object array,queryParams含查询条件，
      // 排序条件(direction,sort)和分页条件(limit,offset)
      /* add option begin */
      saveParams: {},
      isEdit: false,
      showAddEdit: false,
      /* end */
    },
  },
  reducers: {
    saveDoctorList(state, {
      payload: {
        datas: list,
        totalCount: total,
      },
    }) {
      const newData = {
        ...state.doctorUsers,
        list,
        queryParams: {
          ...state.doctorUsers.queryParams,
          total,
        },
      };
      return {
        ...state, doctorUsers: { ...newData },
      };
    },
    updateDoctorParams(state, {
      payload: {
        queryParams,
      },
    }) {
      const newData = {
        ...state.doctorUsers,
        queryParams,
      };
      return {
        ...state, doctorUsers: { ...newData },
      };
    },
    clearDoctorParams(state) {
      return {
        ...state,
        doctorUsers: {
          list: [],
          queryParams: {},
        },
      };
    },
    /* add option begin */
    updateSaveParams(state, {
      payload: {
        saveParams,
      },
    }) {
      const newData = {
        ...state.doctorUsers,
        saveParams,
      };
      return {
        ...state, doctorUsers: { ...newData },
      };
    },
    clearSubmitParams(state) {
      const newData = {
        ...state.doctorUsers,
        saveParams: {},
      };
      return {
        ...state,
        doctorUsers: { ...newData },
      };
    },
    updateDoctorModal(state, {
      payload: {
        newParams,
      },
    }) {
      const newData = {
        ...state.doctorUsers,
        ...newParams,
      };
      return {
        ...state,
        doctorUsers: { ...newData },
      };
    },
    /* end */
  },
  effects: {
    *queryDoctors({ payload = {} }, { call, put, select }) {
      const { doctorUsers = {} } = yield select(state => state.UserMgr) || {};
      const { queryParams = {} } = doctorUsers;
      const newPayload = {
        ...queryParams,
        ...payload,
      };
      yield put({
        type: 'updateDoctorParams',
        payload: {
          queryParams: newPayload,
        },
      });
      const response = yield call(UserMgrService.queryDoctors, newPayload);
      if (!response) {
        return;
      }
      const { datas, totalCount } = response;
      datas.map((row, index) =>
        row.index = index + 1);
      yield put({
        type: 'saveDoctorList',
        payload: {
          datas,
          totalCount,
        },
      });
    },
    /* add option begin */
    *submitDoctors({ payload = {}, callback }, { call, put, select }) {
      const { doctorUsers = {} } = yield select(state => state.UserMgr) || {};
      const { submitParams = {} } = doctorUsers;
      const newPayload = {
        ...submitParams,
        ...payload,
      };
      yield put({
        type: 'updateSaveParams',
        payload: {
          saveParams: newPayload,
        },
      });
      const response = yield call(UserMgrService.submitDoctors, newPayload);
      if (!response) {
        return;
      }
      if (!response.error) {
        if (callback) {
          callback(response);
        }
      }
    },
    *editDoctors({ payload = {}, callback }, { call, put, select }) {
      const { doctorUsers = {} } = yield select(state => state.UserMgr) || {};
      const { submitParams = {} } = doctorUsers;
      const newPayload = {
        ...submitParams,
        ...payload,
      };
      yield put({
        type: 'updateSaveParams',
        payload: {
          saveParams: newPayload,
        },
      });
      const response = yield call(UserMgrService.editDoctors, newPayload);
      if (!response) {
        return;
      }
      if (!response.error) {
        if (callback) {
          callback(response);
        }
      }
    },
    /* end */
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/UserMgr/DoctorUsers') {
          dispatch({ type: 'queryDoctors', payload: query });
        }
      });
    },
  },
};

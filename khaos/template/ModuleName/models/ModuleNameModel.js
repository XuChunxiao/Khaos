import * as ModuleNameService from '../services/ModuleNameService';

export default {
  namespace: 'ModuleName',
  state: {
    stateName: {
      list: [],
      queryParams: {}, // stateNameList 为object array,queryParams含查询条件，
      // 排序条件(direction,sort)和分页条件(limit,offset)
      /* add option begin
      saveParams: {},//添加或编辑Modal字段值
      isEdit: false,
      showAddEdit: false,
      end */
    },
  },
  reducers: {
    savePageNameList(state, {
      payload: {
        datas: list,
        totalCount: total,
      },
    }) {
      const newData = {
        ...state.stateName,
        list,
        queryParams: {
          ...state.stateName.queryParams,
          total,
        },
      };
      return {
        ...state, stateName: { ...newData },
      };
    },
    updatePageNameParams(state, {
      payload: {
        queryParams,
      },
    }) {
      const newData = {
        ...state.stateName,
        queryParams,
      };
      return {
        ...state, stateName: { ...newData },
      };
    },
    clearPageNameParams(state) {
      return {
        ...state,
        stateName: {
          list: [],
          queryParams: {},
        },
      };
    },
    /* add option begin
    updateSaveParams(state, {
      payload: {
        saveParams,
      },
    }) {
      const newData = {
        ...state.stateName,
        saveParams,
      };
      return {
        ...state, stateName: { ...newData },
      };
    },
    clearSubmitParams(state) {
      const newData = {
        ...state.stateName,
        saveParams: {},
      };
      return {
        ...state,
        stateName: { ...newData },
      };
    },
    updatePageNameModal(state, {
      payload: {
        newParams,
      },
    }) {
      const newData = {
        ...state.stateName,
        ...newParams,
      };
      return {
        ...state,
        stateName: { ...newData },
      };
    },
    end */
  },
  effects: {
    *queryPageName({ payload = {} }, { call, put, select }) {
      const { stateName = {} } = yield select(state => state.ModuleName) || {};
      const { queryParams = {} } = stateName;
      const newPayload = {
        ...queryParams,
        ...payload,
      };
      yield put({
        type: 'updatePageNameParams',
        payload: {
          queryParams: newPayload,
        },
      });
      const response = yield call(ModuleNameService.queryPageName, newPayload);
      if (!response) {
        return;
      }
      const { datas, totalCount } = response;
      datas.map((row, index) =>
        row.index = index + 1);
      yield put({
        type: 'savePageNameList',
        payload: {
          datas,
          totalCount,
        },
      });
    },
    /* add option begin
    *submitPageName({ payload = {}, callback }, { call, put, select }) {
      const { stateName = {} } = yield select(state => state.UserMgr) || {};
      const { submitParams = {} } = stateName;
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
      const response = yield call(ModuleNameService.submitPageName, newPayload);
      if (!response) {
        return;
      }
      if (!response.error) {
        if (callback) {
          callback(response);
        }
      }
    },
    *editPageName({ payload = {}, callback }, { call, put, select }) {
      const { stateName = {} } = yield select(state => state.UserMgr) || {};
      const { submitParams = {} } = stateName;
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
      const response = yield call(ModuleNameService.editPageName, newPayload);
      if (!response) {
        return;
      }
      if (!response.error) {
        if (callback) {
          callback(response);
        }
      }
    },
    end */
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/ModuleName/PageName') {
          dispatch({ type: 'queryPageName', payload: query });
        }
      });
    },
  },
};

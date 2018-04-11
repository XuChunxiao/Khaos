import * as ModuleNameService from '../services/ModuleNameService';

export default {
  namespace: 'ModuleName',
  state: {
    stateName: {
      list: [],
      queryParams: {}, // stateNameList 为object array,queryParams含查询条件，
      // 排序条件(direction,sort)和分页条件(limit,offset)
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

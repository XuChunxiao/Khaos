import { PAGE_SIZE } from '../constants';
import request from '../../../utils/request';
import { API_URL } from '../../../constants';

export function queryPageName(params = {}) {
  const newParams = {
    offset: params.offset ? params.offset : 1,
    limit: params.limit ? params.limit : PAGE_SIZE,
    ...params,
  };
  return request(`${API_URL.project.queryPageName}`, newParams);//@template
}
/* add option begin */
export function submitPageName(params = {}) {
  const newParams = {
    ...params,
  };
  return request(`${API_URL.project.submitPageName}`, newParams);//@template
}
export function editPageName(params = {}) {
  const newParams = {
    ...params,
  };
  return request(`${API_URL.project.editPageName}`, newParams);//@template
}
/* end */
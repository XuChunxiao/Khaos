import { PAGE_SIZE } from '../constants';
import request from '../../../utils/request';
import { API_URL } from '../../../constants';

export function queryDoctors(params = {}) {
  const newParams = {
    offset: params.offset ? params.offset : 1,
    limit: params.limit ? params.limit : PAGE_SIZE,
    ...params,
  };
  return request(`${API_URL.project.queryDoctors}`, newParams);
}
/* add option begin */
export function submitDoctors(params = {}) {
  const newParams = {
    ...params,
  };
  return request(`${API_URL.project.submitDoctors}`, newParams);
}
export function editDoctors(params = {}) {
  const newParams = {
    ...params,
  };
  return request(`${API_URL.project.editDoctors}`, newParams);
}
/* end */

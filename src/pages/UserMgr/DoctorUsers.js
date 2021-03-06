import React from 'react';
import { connect } from 'dva';
import { Table, Divider } from 'antd';
import moment from 'moment';
import styles from './UserMgr.less';
import { paginationParams } from '../../constants';
import DoctorFilter from './components/DoctorFilter';
/* add option begin */
import AddEditDoctorUsers from './components/AddEditDoctorUsers';
/* end */

class DoctorUsers extends React.Component {
  componentWillUnmount() {
    this.props.dispatch({
      type: 'UserMgr/clearDoctorParams',
    });
  }

  handleTableChange = (pagination, filters, sorter = {}) => {
    const { pageSize: limit, current: offset } = pagination;
    const newParams = {
      limit,
      offset,
    };
    newParams.sort = sorter.field;
    newParams.direction = sorter.order === 'descend' ? 'DESC' : 'ASC';
    // this.props.dispatch({
    //   type: 'UserMgr/updateDoctorParams',
    //   payload: {
    //     queryParams: {
    //       ...queryParams,
    //       ...newParams,
    //     },
    //   },
    // });
    this.props.dispatch({
      type: 'UserMgr/queryDoctors',
      payload: {
        ...newParams,
      },
    });
  }

  render() {
    const { loading, list, queryParams } = this.props;
    const paginationProps = {
      ...paginationParams,
      showTotal: total => `总计 ${total} 条`,
      ...queryParams,
      // className: 'fixed_bottom',
      // position: 'top',
    };
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        // width: 60,
        // fixed: 'left',
      },
      {
        title: '姓名',
        dataIndex: 'ydataAccountCompellation',
        // width: 80,
        // fixed: 'left',
      },
      {
        title: '手机号码',
        dataIndex: 'ydataAccountUserMobile',
        width: 95,
      },
      {
        title: '所在医院',
        dataIndex: 'hospitalName',
        // width: 150,
      },
      {
        title: '所在科室',
        dataIndex: 'departmentName',
        // width: 150,
      },
      {
        title: '医生职称',
        dataIndex: 'doctorPosition',
        // width: 100,
      },
      {
        title: '注册时间',
        dataIndex: 'createTime',
        key: 'createTime',
        sorter: true,
        sortOrder: queryParams.sort == 'createTime' && (queryParams.direction == 'DESC' ? 'descend' : 'ascend'),
        // width: 80,
        render: (text, record) => moment(record.createTime).format('YYYY-MM-DD'),
      },
      {
        title: '审核状态',
        dataIndex: 'auditStatus',
        // width: 80,
        render: (text, record) => (record.auditStatus == 'audit_pending' ? '待审核' : record.auditStatus == 'audit_passed' ? '审核通过' : record.auditStatus == 'audit_failed' ? '未通过' : null),
      },
      {
        title: '微信号',
        dataIndex: 'openId',
        // width: 150,
      },
      {
        title: '微信昵称',
        dataIndex: 'nickName',
        // width: 90,
      },
      {
        title: '绑定状态',
        dataIndex: 'bindStatus',
        // width: 60,
        render: (text, record) =>
          (record.bindStatus == 'NOACTIVE' ? '未绑定' : record.bindStatus == 'INACTIVE' ? '已解绑' : record.bindStatus == 'ACTIVE' ? '已绑定' : '未绑定'),
      },
      {
        title: '操作',
        width: 100,
        // fixed: 'right',
        render: (text, record) => (
          <div>
            <a onClick={() => {
              this.props.dispatch({
                type: 'UserMgr/updateDoctorModal',
                payload: {
                  newParams: {
                    showAddEdit: true,
                    isEdit: true,
                  },
                },
              });
              this.props.dispatch({
                type: 'UserMgr/updateSaveParams',
                payload: {
                  saveParams: {
                    questionTypeName: 'test',
                  },
                },
              });
            }}
            >修改
            </a>
            <Divider type="vertical" />
            <a onClick={() => { this.changeModalView('modalVisible', 'open', 'edit'); this.edit(record.ydataAccountId); }}>修改</a>
          </div>
        ),
      },
    ];

    return (
      <div className={styles.normal}>
        <DoctorFilter />
        <div>
          <Table
            // size="small"
            loading={loading.effects['UserMgr/queryDoctors']}
            rowKey={record => record.index}
            onSelectRow={this.handleSelectRows}
            dataSource={list}
            columns={columns}
            pagination={paginationProps}
            onChange={this.handleTableChange}
            scroll={{ x: 1150 }}
            // scroll={{ y: lists.length > config.listLength ? config.scroll.y : null }}
          />
        </div>
        {
          /* add option begin */
          <AddEditDoctorUsers />
          /* end */
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { doctorUsers = {} } = state.UserMgr;
  const { list = [], queryParams = {} } = doctorUsers;
  return {
    loading: state.loading,
    list,
    queryParams,
  };
}

export default connect(mapStateToProps)(DoctorUsers);

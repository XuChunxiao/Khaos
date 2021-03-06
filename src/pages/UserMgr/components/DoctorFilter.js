import React from 'react';
import { connect } from 'dva';
import { Form, Input, Select, Button } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
class DoctorFilter extends React.Component {
    handleSearch = () => {
      const searchParams = this.props.form.getFieldsValue();
      this.props.dispatch({
        type: 'UserMgr/queryDoctors',
        payload: {
          ...searchParams,
        },
      });
    }
  /* add option begin */
    showAddEditModal = () => {
      this.props.dispatch({
        type: 'UserMgr/updateDoctorModal',
        payload: {
          newParams: {
            showAddEdit: true,
          },
        },
      });
    }
  /* end */
    render() {
      const { getFieldDecorator } = this.props.form;
      const { assistants } = this.props;
      return (
        <Form layout="inline" className="filter_form">
          <FormItem label="姓名">
            {getFieldDecorator('ydataAccountCompellation')(<Input />)}
          </FormItem>
          <FormItem label="手机号">
            {getFieldDecorator('ydataAccountUserMobile')(<Input />)}
          </FormItem>
          <FormItem label="所在医院" >
            {getFieldDecorator(!assistants ? 'hospitalName' : 'enterpriseName')(<Input />)}
          </FormItem>
          <FormItem label="所在科室">
            {getFieldDecorator(!assistants ? 'departmentName' : 'department')(<Input />)}
          </FormItem>
          <FormItem label="医生职称">
            {getFieldDecorator('doctorPosition')(<Input />)}
          </FormItem>
          <FormItem label="审核状态">
            {getFieldDecorator('audit')(
              <Select
                allowClear
                style={{ width: 120 }}
                placeholder="请选择"
              >
                <Option value="audit_pending">待审核</Option>
                <Option value="audit_passed">审核通过</Option>
                <Option value="audit_failed">未通过</Option>
              </Select>)
            }
          </FormItem>
          <FormItem label="绑定状态">
            {getFieldDecorator('bindStatus')(
              <Select allowClear style={{ width: 120 }} placeholder="请选择">
                <Option value="ACTIVE">已绑定</Option>
                <Option value="INACTIVE">已解绑</Option>
                <Option value="NOACTIVE">未绑定</Option>
              </Select>)
            }
          </FormItem>
          {
/* add option begin */
            <Button
              icon="plus"
              type="primary"
              onClick={() => { this.showAddEditModal(); }}
            >添加
            </Button>
/* end */
}
          <Button icon="search" onClick={this.handleSearch} type="primary" htmlType="submit" style={{ marginRight: 10 }}>搜索</Button>
        </Form>
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

export default connect(mapStateToProps)(Form.create({
  mapPropsToFields(props) {
    const { queryParams } = props;
    const newProps = {};
    const objArr = Object.entries(queryParams);
    objArr.map((arr) => {
      newProps[arr[0]] = Form.createFormField({
        value: arr[1],
      });
    });
    return {
      ...newProps,
    };
  },
})(DoctorFilter));

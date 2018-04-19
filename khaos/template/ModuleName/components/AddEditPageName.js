import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Modal, message } from 'antd';

const FormItem = Form.Item;
class AddEditDoctorUsers extends React.Component {
    handleSubmit = () => {
      const submitParams = this.props.form.getFieldsValue();
      const { isEdit } = this.props;
      this.props.dispatch({
        type: isEdit ? 'ModuleName/editPageName' : 'ModuleName/submitPageName',
        payload: {
          ...submitParams,
        },
        callback: () => {
          this.cancelModal();
          if (isEdit) {
            message.success('编辑成功');
          } else {
            message.success('添加成功');
          }
          this.props.dispatch({ type: 'ModuleName/queryPageName', payload: {} });
        },
      });
    }

    cancelModal = () => {
      this.props.dispatch({
        type: 'ModuleName/updatePageNameModal',
        payload: {
          newParams: {
            showAddEdit: false,
          },
        },
      });
      this.props.dispatch({
        type: 'ModuleName/clearSubmitParams',
      });
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      const { isEdit, loading, showAddEdit } = this.props;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
          md: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 },
          md: { span: 12 },
        },
      };
      return (

        <Modal
          title={isEdit ? '修改@template' : '添加@template'}
          visible={showAddEdit}
          width={450}
          onCancel={this.cancelModal}
          footer={[
            <Button key="1" type="primary" onClick={() => { this.handleSubmit(); }} htmlType="submit" loading={loading.effects['UserMgr/submitDoctors']}>
                    提交
            </Button>,
            <Button key="2" style={{ marginLeft: 8 }} onClick={() => { this.cancelModal(); }}>取消</Button>,
          ]}
        >
          <Form
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="问题分类"
            >
              {getFieldDecorator('questionTypeName', {
                    rules: [{
                      required: true, message: '请输入问题分类',
                    }],
                  })(
                    <Input placeholder="请输入" style={{ width: '80%' }} />,
                  )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
}


function mapStateToProps(state) {
  const { stateName = {} } = state.ModuleName;
  const {
    list = [], queryParams = {}, isEdit = false, showAddEdit = false, saveParams = {},
  } = stateName;
  return {
    loading: state.loading,
    list,
    queryParams,
    isEdit,
    showAddEdit,
    saveParams,
  };
}

export default connect(mapStateToProps)(Form.create({
  mapPropsToFields(props) {
    const { saveParams } = props;
    const newProps = {};
    const objArr = Object.entries(saveParams);
    objArr.map((arr) => {
      newProps[arr[0]] = Form.createFormField({
        value: arr[1],
      });
    });
    return {
      ...newProps,
    };
  },
})(AddEditDoctorUsers));

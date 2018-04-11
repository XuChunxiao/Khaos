import React from 'react';
import Link from 'umi/link';
import { Layout, Icon, Breadcrumb, LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
// import Header from './Header';
import withRouter from 'umi/withRouter';
import router from 'umi/router';
import pathTtoRegexp from 'path-to-regexp';
import Nav from './Nav';
import { menuList } from './Menu';
import styles from './index.less';
import './global.less';

const {
  Header, Sider, Content, Footer,
} = Layout;


class LayoutIndex extends React.Component {
    state = {
      collapsed: false,
    };


    getBreadcrumb = () => {
      const curUrl = router.location && router.location.pathname;
      const breadArr = [];
      let parent = [];
      let over = false;
      const pushMap = (list) => {
        list.map((data) => {
          if (over) { return; }
          if (data.level == 0) {
            parent = [];
          }
          const re = data.path && pathTtoRegexp(data.path);
          if (data.path == curUrl || (re && re.exec(curUrl))) {
            if (parent.length > 0) {
              parent.map((data1) => {
                breadArr.push({
                  ...data1,
                });
              });
            }
            breadArr.push({
              ...data,
            });
            over = true;
          } else if (data.children) {
            parent.push({
              ...data,
            });
            pushMap(data.children);
          } else if (data.level == 0) {
            parent = [];
          } else if (parent.length > 1) {
            parent.splice(data.name == '添加' ? data.level : data.level - 1, 1);
          }
        });
      };

      pushMap(menuList);
      return breadArr;
    }

    toggle = () => {
      this.setState({
        collapsed: !this.state.collapsed,
      });
    }

    render() {
      const { collapsed } = this.state;
      const breadList = this.getBreadcrumb().map((list, i) => (
        <Breadcrumb.Item key={i}>
          {list.path ? <Link to={list.path}>{list.name}</Link> : list.name }
        </Breadcrumb.Item>));
      return (
        <LocaleProvider locale={zh_CN}>
          <Layout style={{ height: '100%' }}>
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
            >
              <div className={styles.logo}>
                <span className={styles.min_logo} />
                {
                    !collapsed && <span className={styles.title}>找药平台系统</span>
                }
              </div>
              {/* <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span>nav 1</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span>nav 2</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span>nav 3</span>
              </Menu.Item>
            </Menu> */}
              <Nav collapsed={this.state.collapsed} />
            </Sider>
            <Layout style={{ zIndex: 10 }}>
              <Header style={{ background: '#fff', padding: 0 }}>
                <Icon
                  className={styles.trigger}
                  type={collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
                <Breadcrumb style={{ width: '500px', display: 'inline-block' }}>
                  {breadList}
                </Breadcrumb>
                <span className={styles.action}>
                  <Link to="/setting"><i className={`iconfont icon-shezhi ${styles.head_operate}`} /></Link>
                  <a onClick={this.logout}><i className={`iconfont icon-shezhi ${styles.head_operate}`} /></a>
                </span>

                <span className={styles.action} style={{ cursor: 'default' }}>
                  你好，*****@todo
                </span>
              </Header>
              <Content style={{
                margin: '24px 16px 0px 16px', padding: '13px 24px', background: '#fff', overflowY: 'auto', borderRadius: '5px',
            }}
              >
                {this.props.children}
              </Content>
              <Footer style={{ textAlign: 'center', padding: '10px 50px' }}>
                Copyright © 2018 无锡慧方科技有限公司
              </Footer>
            </Layout>
          </Layout>
        </LocaleProvider>
      );
    }
}

export default withRouter(LayoutIndex);

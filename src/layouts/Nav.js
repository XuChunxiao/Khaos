import React from 'react';
import Link from 'umi/link';
import { Menu, Icon } from 'antd';
import router from 'umi/router';
// import auth from '../../common/Auth';
// import { PAGEAUTH } from '../../common/AuthConfig';
// import './style/layout.less';
import { menuList } from './Menu';
import styles from './index.less';

const { SubMenu } = Menu;

class Nav extends React.Component {
    state = {
      current: '#/index',
      openKeys: [],
    }


  // checkPageAuth = () => {
  //   const pageAuth = {};
  // }


    componentWillMount() {
      // this.checkPageAuth();
      const curUrl = router.location && router.location.pathname;
      menuList.map((levelone, index) => {
        if (levelone.children && !levelone.show) {
          levelone.children.map((leveltwo) => {
            if (curUrl == leveltwo.path) { this.setState({ openKeys: [`${index}`] }); }
          });
        }
      });
      this.setState({
        current: curUrl,
      });
    }

    componentDidMount() {
      const curUrl = router.location && router.location.pathname;
      menuList.map((levelone, index) => {
        if (levelone.children && !levelone.show) {
          levelone.children.map((leveltwo) => {
            if (curUrl == leveltwo.path) { this.setState({ openKeys: [`${index}`] }); }
          });
        }
      });
    }

    componentWillReceiveProps() {
      // this.checkPageAuth();
      const curUrl = router.location && router.location.pathname;
      menuList.map((levelone, index) => {
        if (levelone.children && !levelone.show) {
          levelone.children.map((leveltwo) => {
            if (curUrl == leveltwo.path) { this.setState({ openKeys: [`${index}`] }); }
          });
        }
      });
      // this.setState({
      //     current: location.hash,
      // })
    }

    onOpenChange = (openKeys) => {
      //   this.setState({ sub:openKeys[1] })
      const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.setState({ openKeys });
      } else {
        this.setState({
          openKeys: latestOpenKey ? [latestOpenKey] : [],
        });
      }
    }

    getMenus = () => {
      const { collapsed } = this.props;
      const collStyle = collapsed ? {} : { width: '200px', overFlow: 'hidden' };
      const menuNode =
            menuList.map((levelone, index) => {
              if (!levelone.children || levelone.show) {
                if (levelone.show) {
                  return <Menu.Item style={collStyle} key={`${levelone.path}${index}`} ><Link to={levelone.path}> { levelone.icon ? <i className={`anticon iconfont ${levelone.icon}`} /> : <Icon type="plus" />}  <span >{levelone.name}</span></Link></Menu.Item>;
                }
              } else if (levelone.children && !levelone.show) {
                return (
                  <SubMenu style={collStyle} key={index} title={<span>{ levelone.icon ? <i className={`anticon iconfont ${levelone.icon}`} /> : <Icon type="plus" /> } <span>{levelone.name}</span></span>}>
                    {
                        levelone.children.map((leveltwo) => {
                            return (
                              <Menu.Item style={collStyle} key={leveltwo.path}>
                                <Link to={leveltwo.path}>
                                  {leveltwo.name}
                                </Link>
                              </Menu.Item>);
                        })
                    }
                  </SubMenu>);
              }
            });
      return menuNode;
    }

    handleClick = (e) => {
      this.setState({
        current: e.key,
      });
    }

    rootSubmenuKeys = ['0', '1', '2', '4', '5', '6', '7', '9'];

    render() {
      const menuItems = this.getMenus();

      return (

        <nav className={styles.nav_bar} style={!this.props.collapsed ? { overflowY: 'auto', width: '217px' } : null}>
          <Menu
            theme="dark"
            onSelect={this.handleClick}
            openKeys={this.state.openKeys}
                // defaultOpenKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
            selectedKeys={[this.state.current]}
                // selectedKeys={[location.hash]}
            mode="inline"
          >
            {menuItems}
          </Menu>
        </nav>

      );
    }
}

export default Nav;

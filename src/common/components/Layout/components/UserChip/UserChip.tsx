import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Switch from "@material-ui/core/Switch";
import { User } from "@src/fragments/types/User";
import ArrowDropdown from "@src/icons/ArrowDropdown";
import { getUserInitials, getUserName } from "@src/misc";
import classNames from "classnames";
import React, { useEffect, useState, useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useAuth } from "@src/auth/AuthProviderFPP";
import { logOut } from "@src/auth/utils";
import "./index.scss";
import Icon from "@src/common/components/Icon";
import { Popover, Badge, Modal } from "antd";
import { useHistory } from "react-router";
import { FppMessage, FppMessageUpdate, FppShowPoint } from "@src/api/user";
import { getTimeStringInSiteTimeZone } from "@src/utils/timezone";

const useStyles = makeStyles(
  theme => ({
    arrow: {
      [theme.breakpoints.down("sm")]: {
        marginLeft: 0
      },
      marginLeft: theme.spacing(2),
      transition: theme.transitions.duration.standard + "ms"
    },
    avatar: {
      "&&": {
        [theme.breakpoints.down("sm")]: {
          height: 40,
          width: 40
        },
        height: 32,
        width: 32
      }
    },
    label: {
      display: "flex",
      alignItems: "center"
    },
    avatarInitials: {
      color: theme.palette.primary.contrastText
    },
    avatarPlaceholder: {
      alignItems: "center",
      background: theme.palette.primary.main,
      borderRadius: "100%",
      display: "flex",
      justifyContent: "center"
    },
    popover: {
      marginTop: theme.spacing(2),
      zIndex: 10
    },
    rotate: {
      transform: "rotate(180deg)"
    },
    switch: {
      "&&:hover": {
        background: "transparent"
      }
    },
    userChip: {
      [theme.breakpoints.down("sm")]: {
        height: 48
      },
      backgroundColor: theme.palette.background.paper,
      borderRadius: 24,
      color: theme.palette.text.primary,
      height: 40,
      padding: theme.spacing(0.5)
    },
    userMenuContainer: {
      position: "relative",
      paddingRight: "40px"
    },
    userMenuItem: {
      textAlign: "right"
    }
  }),
  {
    name: "UserChip"
  }
);

export interface UserChipProps {
  isDarkThemeEnabled: boolean;
  user: User;
  onLogout: () => void;
  onProfileClick: () => void;
  onThemeToggle: () => void;
}

const UserChip: React.FC<UserChipProps> = ({
  isDarkThemeEnabled,
  // user,
  onLogout,
  onProfileClick,
  onThemeToggle
}) => {
  const { user } = useAuth();
  /* const user = {
    // 本来是从provider拿的,因为前期没有user,所以先写死 2021/02/01
    email: "string",
    firstName: "User",
    lastName: "Demo111",
    avatar: {
      url: ""
    }
  };*/
  const history = useHistory();

  const classes = useStyles({});
  const [isMenuOpened, setMenuState] = useState(false);
  const [informPopoverVisible, setInformPopoverVisible] = useState(false);
  const [informShowPoint, setInformShowPoint] = useState(false);
  const [informList, setInformList] = useState([]);
  const currentInform = useRef<any>(null);
  const anchor = React.useRef<HTMLDivElement>();
  const intl = useIntl();
  const handleLogout = () => {
    setMenuState(false);
    logOut();
  };
  useEffect(() => {
    getFppShowPoint();
    getFppMessage();
  }, []);
  // 获取 是否有新的消息
  const getFppShowPoint = () => {
    FppShowPoint().then(res => {
      const showPoint = res?.data?.showPoint?.showPoint;
      setInformShowPoint(showPoint);
    });
  };
  // 消息通知列表
  const getFppMessage = () => {
    FppMessage().then(res => {
      console.log(res);
      const message = res?.data?.message;
      setInformList(message);
    });
  };
  const handleViewerProfile = () => {
    setMenuState(false);
    onProfileClick();
  };
  const handleInformModal = item => {
    setInformPopoverVisible(false);
    const { title, detail, msgType, route, id, isRead } = item;
    if (!isRead) {
      setFppMessageUpdate(id);
    }
    const content = (
      <div
        onClick={() => handleToMessageRoute(route)}
        dangerouslySetInnerHTML={{ __html: detail }}
      />
    );

    Modal.confirm({
      className: "InformModalConfirm",
      closable: true,
      title: title,
      content: content,
      icon: "",
      okText: "确定"
    });
  };
  const handleToMessageRoute = route => {
    if (!route) return;
    Modal.destroyAll();
    if (route === "/configuration/billing/history") {
      // payment_status
      history.push(route + `?payment_status=unpaid`);
    } else {
      history.push(route);
    }
  };
  // 更新未读消息
  const setFppMessageUpdate = id => {
    const data = {
      id,
      isRead: true
    };
    FppMessageUpdate(data).then(res => {
      console.log(res);
      getFppShowPoint();
      getFppMessage();
    });
  };
  const PopoverContent = () => {
    return (
      <>
        <div className="text">平台通知</div>
        <ul>
          {(informList || []).map(item => (
            <li onClick={() => handleInformModal(item)} key={item.id}>
              <div className="iconlaba">
                <Icon size="16" color="#1296db" name="iconlaba" />
              </div>
              <div className={!item.isRead ? "inform-item" : "read"}>
                <div>{item.title}</div>
                <span>{getTimeStringInSiteTimeZone(item.createdAt)}</span>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  };
  return (
    <div className={`fpp_user`} ref={anchor}>
      <Popover
        placement="bottom"
        overlayClassName="PopoverInform"
        visible={informPopoverVisible}
        content={PopoverContent}
        trigger="hover"
        onVisibleChange={visible => setInformPopoverVisible(visible)}
      >
        <div className="inform">
          <Badge dot={informShowPoint}>
            <Icon size="16" color="#2c3e50" name="icontongzhi2" />
          </Badge>
        </div>
      </Popover>
      <div className="margin-right-20 cursor-pointer">
        <a target="_blank" href="https://help.funpinpin.com/">
          帮助中心
        </a>
      </div>
      <div
        className="fpp_user-icon"
        onClick={() => setMenuState(!isMenuOpened)}
      >
        <Hidden>
          {user
            ? user.firstName || user.lastName
              ? user.firstName + user.lastName
              : user.email
            : ""}
        </Hidden>
        <ArrowDropdown
          className={classNames(classes.arrow, {
            [classes.rotate]: isMenuOpened
          })}
        />
      </div>
      <Popper
        className={classes.popover}
        open={isMenuOpened}
        anchorEl={anchor.current}
        transition
        placement="bottom-end"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "right top" : "right bottom"
            }}
          >
            <Paper>
              <ClickAwayListener
                onClickAway={() => setMenuState(false)}
                mouseEvent="onClick"
              >
                <Menu>
                  {/*<MenuItem
                    className={classes.userMenuItem}
                    onClick={handleViewerProfile}
                    data-test="accountSettingsButton"
                  >
                    <FormattedMessage
                      defaultMessage="账户设置"
                      description="button"
                    />
                  </MenuItem>*/}
                  <MenuItem
                    className={classes.userMenuItem}
                    onClick={handleLogout}
                    data-test="logOutButton"
                  >
                    <FormattedMessage
                      defaultMessage=" 退出登录 "
                      description="button"
                    />
                  </MenuItem>
                  {/* <MenuItem
                    className={classes.userMenuItem}
                    data-test="themeSwitch"
                    data-test-is-dark={isDarkThemeEnabled}
                  >
                    <FormControlLabel
                      control={
                        <Switch
                          classes={{
                            switchBase: classes.switch
                          }}
                          checked={isDarkThemeEnabled}
                          color="primary"
                          disableRipple
                        />
                      }
                      label={intl.formatMessage({
                        defaultMessage: "Enable Dark Mode",
                        description: "button"
                      })}
                      onChange={onThemeToggle}
                    />
                  </MenuItem>*/}
                </Menu>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};
UserChip.displayName = "UserChip";
export default UserChip;

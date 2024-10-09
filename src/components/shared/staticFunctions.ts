/**
 * ConfigProvider will not take effect on static methods such as message.xxx, Modal.xxx, notification.xxx,
 * because in these methods, antd will dynamically create new ones through ReactDOM.render React entities.
 * Its context is not the same as the context of the current code, so context information cannot be obtained.
 * Ref: https://ant.design/docs/react/customize-theme
 *
 * So we need to use the App component to get the static methods of antd.
 */

import { App } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
import type { NotificationInstance } from 'antd/es/notification/interface';

let message: MessageInstance;
let notification: NotificationInstance;
let modal: Omit<ModalStaticFunctions, 'warn'>;

export default () => {
  const staticFunction = App.useApp();
  message = staticFunction.message;
  modal = staticFunction.modal;
  notification = staticFunction.notification;
};

export { message, modal, notification };

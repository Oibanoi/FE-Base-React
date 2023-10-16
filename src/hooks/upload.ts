import { FormInstance, notification } from 'antd';
import { useState } from 'react';

const useUpload = (form: FormInstance, defaultFileList = [] as any[]) => {
  const [fileList, setFileList] = useState<any[]>(defaultFileList);
  const [loading, setLoading] = useState(false);

  const uploadAction = `${window.config.apiServices.client}/images/upload`;

  const onChange = (info: any) => {
    setLoading(true);
    if (info && info.hasOwnProperty('fileList')) {
      setFileList(info.fileList);
      setLoading(false);
      if (info.file.status === 'error') {
        notification.error({
          message: 'Có lỗi',
          description: 'Tải tệp lên thất bại',
        });
      }
    }
  };

  const uploadConfigs = {
    action: uploadAction,
    onChange,
    loading,
    disabled: loading,
  };

  return {
    uploadConfigs,
    fileList,
  };
};

export default {
  useUpload,
};

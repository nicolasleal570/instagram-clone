import { useMemo } from 'react';
import { toast } from 'react-toastify';
import type { ToastOptions } from 'react-toastify';

export enum NotificationKind {
  Success = 'success',
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
}

export function useNotify() {
  const notificationKind = useMemo(
    () => ({
      success: (msg: string, params?: ToastOptions) =>
        toast.success(msg, params),
      error: (msg: string, params?: ToastOptions) => toast.error(msg, params),
      warn: (msg: string, params?: ToastOptions) => toast.warn(msg, params),
      info: (msg: string, params?: ToastOptions) => toast.info(msg, params),
    }),
    []
  );

  const notify = (
    kindKey: NotificationKind,
    msg: string,
    params?: ToastOptions
  ) => {
    if (notificationKind[kindKey]) {
      notificationKind[kindKey](msg, params);
    }
  };

  return {
    notify,
  };
}

import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const state_map = {
  success: 'success',
  error:   'error',
  info:    'info',
  warning: 'warning',  
}

const toast_options = {
  position:  'top-right',
  duration:  3000,
  dismissible: true,
}

export function useNotification() {
  const toast = useToast()

  function notify(type, message, overrides = {}) {
    const method = state_map[type] || state_map.info
    const config = { ...toast_options, ...overrides }
    return toast[method](message, config)
  }

  return { notify }
}
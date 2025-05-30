import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

function toastNotification(state, message) { 
    const $toast = useToast();
    switch(state){
        case 'error':
            $toast.error(message);
            break;
        case 'success':
            $toast.success(message);
            break;
        default:
            $toast.info(message);
    }
}

export default toastNotification
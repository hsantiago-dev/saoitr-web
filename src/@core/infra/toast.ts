import { toast } from 'react-toastify';

const TIME_TO_AUTOCLOSE = 4000; //ms

export function showToastNotification(message: string, type: 'error' | 'success' | 'info' | 'warning') {
    
    if (type === 'error') {
        showToastError(message);
    } else if (type === 'success') {
        showToastSuccess(message);
    } else if (type === 'info') {
        showToastInfo(message);
    } else if (type === 'warning') {
        showToastWarning(message);
    }
}

function showToastError(message: string) {

    toast.error('💀 ' + message, {
        position: "bottom-right",
        autoClose: TIME_TO_AUTOCLOSE,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        icon: false,
    });
}

function showToastSuccess(message: string) {
    toast.success('😎 ' + message, {
        position: "bottom-right",
        autoClose: TIME_TO_AUTOCLOSE,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        icon: false,
    });
}

function showToastInfo(message: string) {
    toast.info('😉 ' + message, {
        position: "bottom-right",
        autoClose: TIME_TO_AUTOCLOSE,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        icon: false,
    });
}

function showToastWarning(message: string) {
    toast.warning('😥 ' + message, {
        position: "bottom-right",
        autoClose: TIME_TO_AUTOCLOSE,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        icon: false,
    });
}
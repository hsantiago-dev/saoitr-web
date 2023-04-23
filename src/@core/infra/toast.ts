import { type } from 'os';
import { Id, toast } from 'react-toastify';

const TIME_TO_AUTOCLOSE = 3000; //ms

let toastId: Id | undefined;

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

    toast.error(message, {
        position: "bottom-right",
        autoClose: TIME_TO_AUTOCLOSE,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
    });
}

function showToastSuccess(message: string) {
    toast.success(message, {
        position: "bottom-right",
        autoClose: TIME_TO_AUTOCLOSE,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
    });
}

function showToastInfo(message: string) {
    toast.info(message, {
        position: "bottom-right",
        autoClose: TIME_TO_AUTOCLOSE,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
    });
}

function showToastWarning(message: string) {
    toast.warning(message, {
        position: "bottom-right",
        autoClose: TIME_TO_AUTOCLOSE,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
    });
}

export function showToastLoading(message: string) {
    toastId = toast.loading(message, {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
    });
}

export function updateToastLoading(message: string, type: 'error' | 'success' | 'info' | 'warning') {

    if (toastId) {
        toast.update(toastId, {
            render: message,
            type: type,
            isLoading: false,
            autoClose: TIME_TO_AUTOCLOSE,
            theme: "dark",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            icon: true,
        });
    }
}
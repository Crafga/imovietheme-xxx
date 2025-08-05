import type { ToastSettings } from '@skeletonlabs/skeleton';

const alertSuccess = async (message: string) => {
    const t: ToastSettings = {
        message: message,
        background: 'variant-filled-success',
    };
    return t
} 
const alertPrimary = async (message: string) => {
    const t: ToastSettings = {
        message: message,
        background: 'variant-filled-primary',
    };
    return t
} 

const alertSecondary = async (message: string) => {
    const t: ToastSettings = {
        message: message,
        background: 'variant-filled-secondary',
    };
    return t
}
const alertTertiary = async (message: string) => {
    const t: ToastSettings = {
        message: message,
        background: 'variant-filled-tertiary',
    };
    return t
}
const alertWrning = async (message: string) => {
    const t: ToastSettings = {
        message: message,
        background: 'variant-filled-warning',
    };
    return t
}
const alertError = async (message: string) => {
    const t: ToastSettings = {
        message: message,
        background: 'variant-filled-error',
    };
    return t
}

export {
    alertSuccess,
    alertPrimary,
    alertSecondary,
    alertTertiary,
    alertWrning,
    alertError
}
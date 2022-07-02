import { toast } from 'react-toastify';

export const notifyError = (input) => toast.error(input);
export const notifySuccess = (input) => toast.success(input);

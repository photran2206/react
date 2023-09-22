import { create } from 'zustand';

export { useAlertService };

// Constants
const ALERT_SUCCESS = 'alert-success';
const ALERT_DANGER = 'alert-danger';
const TIMEOUT = 3000;

// alert state store
const alertStore = create<IAlertStore>(() => ({}));

function useAlertService(): IAlertService {
    const { alert } = alertStore();

    const showAlert = (type: string, message: string, showAfterRedirect = false) => {
        alertStore.setState({
            alert: { type, message, showAfterRedirect }
        });

        setTimeout(() => {
            alertStore.setState({
                alert: undefined
            });
        }, TIMEOUT);
    };

    return {
        alert,
        success: (message: string, showAfterRedirect = false) => {
            showAlert(ALERT_SUCCESS, message, showAfterRedirect);
        },
        error: (message: string, showAfterRedirect = false) => {
            showAlert(ALERT_DANGER, message, showAfterRedirect);
        },
        clear: () => {
            alertStore.setState(state => {
                let alert = state.alert;

                if (alert?.showAfterRedirect) {
                    alert.showAfterRedirect = false;
                } else {
                    alert = undefined;
                }

                return { alert };
            });
        }
    }
}

// interfaces

interface IAlert {
    type: string,
    message: string,
    showAfterRedirect: boolean
}

interface IAlertStore {
    alert?: IAlert
}

interface IAlertService extends IAlertStore {
    success: (message: string, showAfterRedirect?: boolean) => void,
    error: (message: string, showAfterRedirect?: boolean) => void,
    clear: () => void,
}

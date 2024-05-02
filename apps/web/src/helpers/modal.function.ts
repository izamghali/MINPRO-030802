

export function closeModal(modalIDToClose: string) {
    (document.getElementById(modalIDToClose) as HTMLFormElement)?.close();
}

export function showCloseModal(modalID : string, modalIDToClose?: string | any) {
    (document.getElementById(modalID) as HTMLFormElement)?.showModal();
    closeModal(modalIDToClose);
}
export function enableBtn(arr: any, btnRef: any) {
    if (arr) {
        btnRef.current?.classList.remove('btn-disabled')
        return true;
    } else {
        btnRef.current?.classList.add('btn-disabled')
        return false;
    }
}
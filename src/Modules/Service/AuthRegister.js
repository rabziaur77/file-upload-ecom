

const CheckAuth = () => {
    let session = window.localStorage.getItem("session");
    if (session == null) {
        return false;
    }
    else {
        return true;
    }
}

export default CheckAuth;
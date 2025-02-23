import { useEffect, useState } from "react";
import APIService from "../../Service/API_Service";

const AccountLoginLogic = () => {
    const [loginModel, setLoginModel] = useState({ UserID: '', Password: '', Submited: false, isRootUser: true })
    const Change = (e) => {
        const { name, value } = e.target;

        if (e.target.type === "radio") {
            setLoginModel(prev => ({ ...prev, isRootUser: value==="root"?true:false }));
        }
        else {
            setLoginModel(prev => ({ ...prev, [name]: value }));
        }
    }

    useEffect(() => {
        setLoginModel(prev => ({ ...prev, isRootUser: true }))
    }, [])

    const login = (e) => {
        e.preventDefault();
        let model = {
            username: loginModel.UserID,
            password: loginModel.Password
        };
        setLoginModel(prev => ({ ...prev, Submited: true }));
        APIService.PostService('/api/UserAccount/loginUser', model)
            .then(response => {
                setLoginModel(prev => ({ ...prev, Submited: false }));
                if (response.message === "Login successful") {
                    window.localStorage.setItem("session", JSON.stringify(response.token));
                    window.location.href = "/";
                }
                else {
                    alert(response.status);
                }
            }).catch(ex => {
                setLoginModel(prev => ({ ...prev, Submited: false }));
                console.log(ex)
            })
    }
    return {
        loginModel,
        Change,
        login
    }
}

export default AccountLoginLogic;
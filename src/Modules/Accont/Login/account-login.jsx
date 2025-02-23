import React from "react";
import '../style/login.css'
import AccountLoginLogic from "./account-login-logic";
import { NavLink } from "react-router-dom";

const AccountLogin = () => {
    const { Change, loginModel, login } = AccountLoginLogic();
    return (
        <div className="container container-login containerPad mt-5">
            <form className="login-form" onSubmit={login}>
                <div className="row form-group mb-4">
                    <div className="col-md-12">
                        <div className="text-center mt-2">
                            <h5 className="text-primary">
                                Welcome Back !
                            </h5>
                            <p className="text-muted">
                                Sign in to access your billing.
                            </p>
                        </div></div>
                </div>
                {/* <div className="row form-group mb-3">
                    <div className="col-md-12 user-type">
                        <div>
                            <input type="radio" name="user-type" id="root-user" value="root" checked={loginModel.isRootUser} onChange={Change} /><label htmlFor="root-user">Root User</label>
                        </div>
                        <div>
                            <input type="radio" name="user-type" id="emp-user"  value="not-root" onChange={Change} /><label htmlFor="emp-user">Employee User</label>
                        </div>
                    </div>
                </div> */}
                <div className="row form-group mb-3">
                    <div className="col-md-12">
                        <p>User Name</p>
                        <input type="text" placeholder="UserID" name="UserID"
                            onChange={Change}
                            value={loginModel.UserID}
                            autoComplete="off"
                            required
                            className="form-control textboxlook" />
                    </div>
                </div>
                <div className="row form-group mb-3">
                    <div className="col-md-12">
                        <p>Password</p>
                        <input type="password" placeholder="Password" name="Password"
                            onChange={Change}
                            value={loginModel.Password}
                            required
                            autoComplete="off"
                            className="form-control textboxlook" />
                    </div>
                </div>
                <div className="row form-group mb-3">
                    <div className="col-md-12">
                        <input type="checkbox" /> Remember Me
                    </div>
                </div>
                <div className="row form-group mb-3">
                    <div className="col-md-12">
                        <input type="submit"
                            disabled={loginModel.Submited}
                            value={loginModel.Submited == true ? "Wait..." : "Login"}
                            className="btn btn-primary btn-block w-100" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <NavLink to="/account/reset-pass">Forgot Password?</NavLink>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default AccountLogin;
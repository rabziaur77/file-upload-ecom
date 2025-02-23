import React from "react";
import AccountLoginLogic from "./account-login-logic";
import { NavLink } from "react-router-dom";

const AccountForgot = () => {
    const { Change, loginModel, login } = AccountLoginLogic();
    return (
        <div className="container container-login containerPad mt-5">
            <form className="login-form" onSubmit={login}>
                <div className="row form-group mb-4">
                    <div className="col-md-12">
                        <div className="text-center mt-2">
                            <h5 className="text-primary">Forgot Password?</h5>
                            <p className="text-muted">Reset password with Email</p>
                            <lord-icon src="https://cdn.lordicon.com/rhvddzym.json" trigger="loop" colors="primary:#0ab39c" className="avatar-xl">
                            </lord-icon>

                        </div>
                    </div>
                    <div className="col-md-12">
                    <div className="alert border-0 alert-warning text-center mb-2 mx-2" role="alert">
                                    Enter your email and instructions will be sent to you!
                                </div>
                    </div>
                </div>
                <div className="row form-group mb-3">
                    <div className="col-md-12">
                        <p>Email</p>
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
                        <input type="submit"
                            disabled={loginModel.Submited}
                            value={loginModel.Submited == true ? "Wait..." : "Send Reset Link"}
                            className="btn btn-primary btn-block w-100" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                    <NavLink to="/account/login">Login...</NavLink>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default AccountForgot;
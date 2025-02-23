import React from "react";

function Anonymous({ children }) {
    return (
        <div id="containerbar">
            <div className="contentbar">
                {children}
            </div>
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-center">
                                <p className="mb-0 text-muted">©
                                    2024 AccurateAppSolution. Crafted with by AccurateAppSolution
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Anonymous;
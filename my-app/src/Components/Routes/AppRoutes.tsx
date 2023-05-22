import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./listRoutes";

const AppRoutes = () => {
    const user = false

    return (!user ?
            (
                <Routes>
                    {publicRoutes.map(pub => (
                        <Route path={pub.path} element={<pub.component/>}/>
                    ))}
                    <Route
                        path="/*"
                        element={<Navigate to="/" replace />}
                    />
                </Routes>
            )
                :
                (
                    <Routes>
                        {privateRoutes.map(priv => (
                            <Route path={priv.path} element={<priv.component/>}/>
                        ))}
                    </Routes>
                )
    );
};

export default AppRoutes;
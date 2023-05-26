import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./listRoutes";
import {useAuth} from "../Provider/useAuth";

const AppRoutes = () => {
    const {user} = useAuth()

    return (!user ?
            (
                <Routes>
                    {publicRoutes.map(pub => (
                        <Route key={pub.path} path={pub.path} element={<pub.component/>}/>
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
                            <Route key={priv.path} path={priv.path} element={<priv.component/>}/>
                        ))}
                        <Route
                            path="/*"
                            element={<Navigate to="/news" replace />}
                        />
                    </Routes>
                )
    );
};

export default AppRoutes;
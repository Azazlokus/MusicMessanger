import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import LocalPage from './Components/Pages/Local page/localPage';

test('Проверка перехода на /LocalPage', () => {
    render(
        <MemoryRouter initialEntries={['/LocalPage']}>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/LocalPage" element={<LocalPage />} />
            </Routes>
        </MemoryRouter>
    );
    const localPageElement = screen.getByTestId('local-page');
    expect(localPageElement).toBeInTheDocument();
});
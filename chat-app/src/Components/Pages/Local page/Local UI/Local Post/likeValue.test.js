import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import PostItem from './PostItem';

describe('PostItem', () => {
    test('Проверка на начальное значение лайков', () => {
        render(<PostItem post={{ title: 'Test', text: 'Test text' }} />);
        const likeElement = screen.getByText(/0/i);
        expect(likeElement).toBeInTheDocument();
    });
});
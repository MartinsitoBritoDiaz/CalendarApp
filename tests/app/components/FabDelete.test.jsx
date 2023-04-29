/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { FabDelete } from '../../../src/app/components/FabDelete';
import { store } from '../../../src/store';
import { useCalendarStore } from '../../../src/hooks';

jest.mock('../../../src/hooks/useCalendarStore');

describe('Testing inside <FabDelete />', () => {
  test('should render the button', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: false
    })

    render(
        <FabDelete />
    );

    const btn = screen.getByLabelText('btn-delete');

    expect( btn.style.display ).toBe('none');

    screen.debug();
  });
});

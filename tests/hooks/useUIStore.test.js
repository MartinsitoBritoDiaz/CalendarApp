/**
 * @jest-environment jsdom
 */

const { renderHook, act } = require('@testing-library/react')
const { useUIStore } = require('../../src/hooks/useUIStore');
const { uiSlice } = require('../../src/store');
const { configureStore } = require('@reduxjs/toolkit');
const { Provider } = require('react-redux');

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        }
    })
}
describe('Testing inside useUIStore', () => { 
    test('should load the default values', () => { 
        const mockStore = getMockStore({ isDateModalOpen: true});
        const {result} = renderHook( () => useUIStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{children}</Provider>
        });

        // console.log(result.current)
        // expect(result.current).toEqual({
        //     isDateModalOpen: true,
        //     openDateModal: expect.any(Function),
        //     closeDateModal: expect.any(Function),
        // })
     });

     test('openModal should set true to isDateModalOpen', () => { 
        const mockStore = getMockStore({ isDateModalOpen: false});
        const {result} = renderHook( () => useUIStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{children}</Provider>
        });

        const { openDateModal } = result.current;

        act(() => {
            openDateModal();
        })

        expect(result.current.isDateModalOpen).toBeTruthy();
     });

     test('closeDateModal should set true to isDateModalOpen', () => { 
        const mockStore = getMockStore({ isDateModalOpen: false});
        const {result} = renderHook( () => useUIStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{children}</Provider>
        });

        const { closeDateModal } = result.current;

        act(() => {
            closeDateModal();
        })

        expect(result.current.isDateModalOpen).toBeFalsy();
     });
 })
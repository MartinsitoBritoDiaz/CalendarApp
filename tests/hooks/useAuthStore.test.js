/**
 * @jest-environment jsdom
 */
import { act, renderHook, waitFor } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { authSlice } from "../../src/store";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { notAuthenticatedState } from "../__fixtures__/authStates";
import { testUserCredentials } from "../__fixtures__/testUser";
import { calendarAPI } from "../../src/api";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

describe("Testing inside useAuthStore", () => {
  beforeEach(() => localStorage.clear());

  test("should load the default values", () => {
    const mockStore = getMockStore({});
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    // console.log(result.current)

    expect(result.current).toEqual({
      status: undefined,
      user: undefined,
      errorMessage: undefined,
      startLogin: expect.any(Function),
      startCreatingUser: expect.any(Function),
      checkAuthToken: expect.any(Function),
      startLogOut: expect.any(Function),
    });
  });

  test("startLogin should login correctly", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin(testUserCredentials);
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: { name: "test", uid: "644c532b8419eddfd8535680" },
    });

    expect(localStorage.getItem("token")).toEqual(expect.any(String));
    expect(localStorage.getItem("token-init-date")).toEqual(expect.any(String));
  });

  test("startLogin should fail the authentication ", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin({
        email: "brfd@gamil.com",
        passord: "ksndf",
      });
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: expect.any(String),
      status: "not-authenticated",
      user: {},
    });
    expect(localStorage.getItem("token")).toBeNull();

    await waitFor(() => {
      expect(result.current.errorMessage).toBe(undefined);
    });
  });

  test("startRegister should create a new user", async () => {
    const newUser = {
      name: "test user 2",
      email: "test2@gmail.com",
      passord: "ksndf",
    };

    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    
    const spy = jest.spyOn( calendarAPI, 'post' ).mockReturnValue({
        data: {
            ok: true,
            uid: '6452126178',
            name: 'test user',
            token: 'kjlshdkjhdku',
        }
    })
    await act(async () => {
      await result.current.startCreatingUser(newUser)
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
        errorMessage: undefined,
        status: 'authenticated',
        user: { name: 'test user', uid: '6452126178' }
      });

    spy.mockRestore();
  });
});

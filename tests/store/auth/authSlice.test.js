import { authSlice, clearErrorMessage, onChecking, onLogin, onLogout } from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState, notAuthenticatedState } from "../../__fixtures__/authStates";
import { testUserCredentials } from "../../__fixtures__/testUser";

describe("Testing AuthSlice", () => {
  test("should load the initial state", () => {
    expect(authSlice.getInitialState()).toStrictEqual(initialState);
  });

  test("should do a login", () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials) );

    // console.log(state);
    expect(state).toEqual({
        status: 'authenticated',
        user: testUserCredentials,
        errorMessage: undefined
      });
  });

  test("should do a logout", () => {
    const errorMessage = 'test';
    const state = authSlice.reducer(authenticatedState, onLogout() );

    // console.log(state);
    expect(state).toEqual({
        status: 'not-authenticated',
        user: {},
        errorMessage: undefined
      });
  });

  test("should clean the errorMessage", () => {
    const errorMessage = 'test';
    const state = authSlice.reducer(authenticatedState, onLogout() );
    const newState = authSlice.reducer(state, clearErrorMessage() );

    // console.log(state);
    expect(newState.errorMessage).toBe(undefined);
  });

  test("should change the state to cheking", () => {
    const state = authSlice.reducer(authenticatedState, onChecking() );
    expect(state.status).toBe('checking');
  });
});

/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { FabDelete } from "../../../src/app/components/FabDelete";
import { store } from "../../../src/store";

describe("Testing inside <FabDelete />", () => {
  test("should render the button", () => {
    render(
      <Provider store={store}>
        <FabDelete />
      </Provider>
    );

    // screen.debug();
  });
});

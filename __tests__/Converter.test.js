import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import Converter from '../pages/component/Converter';

let rgb;
let hex;
let r;
let g;
let b;
let preview;

beforeEach(() => {
  render(<Converter />);
  rgb = screen.getByTestId("rgb");
  hex = screen.getByTestId("hex");
  r = screen.getByTestId("r");
  g = screen.getByTestId("g");
  b = screen.getByTestId("b");
  preview = screen.getByTestId("preview");
});

test('renders Converter correctly', () => {
  expect(screen.getByText('RGB to HEX converter')).toBeInTheDocument();
});

test('check rgbHandler', async () => {
  await act(async () => {
    fireEvent.change(rgb, { target: { value: "rgb(0,0,0)" } });
  });
  await waitFor(() => {
    expect(rgb).toHaveValue("rgb(0,0,0)");
    expect(hex).toHaveValue("#000000");
    expect(r).toHaveValue(0);
    expect(g).toHaveValue(0);
    expect(b).toHaveValue(0);
    expect(preview).toHaveValue("#000000");
  });
});

test('check hexHandler', async () => {
  await act(async () => {
    fireEvent.change(hex, { target: { value: "00ff00" } });
  });
  await waitFor(() => {
    expect(rgb).toHaveValue("rgb(0, 255, 0)");
    expect(hex).toHaveValue("#00ff00");
    expect(r).toHaveValue(0);
    expect(g).toHaveValue(255);
    expect(b).toHaveValue(0);
    expect(preview).toHaveValue("#00ff00");
  });
});

test('check rHandler', async () => {
  await act(async () => {
    fireEvent.change(r, { target: { value: 122 } });
  });
  await waitFor(() => {
    expect(rgb).toHaveValue("rgb(122, 255, 255)");
    expect(hex).toHaveValue("#7affff");
    expect(r).toHaveValue(122);
    expect(g).toHaveValue(255);
    expect(b).toHaveValue(255);
    expect(preview).toHaveValue("#7affff");
  });
});

test('check gHandler', async () => {
  await act(async () => {
    fireEvent.change(g, { target: { value: 77 } });
  });
  await waitFor(() => {
    expect(rgb).toHaveValue("rgb(255, 77, 255)");
    expect(hex).toHaveValue("#ff4dff");
    expect(r).toHaveValue(255);
    expect(g).toHaveValue(77);
    expect(b).toHaveValue(255);
    expect(preview).toHaveValue("#ff4dff");
  });
});

test('check gHandler', async () => {
  await act(async () => {
    fireEvent.change(b, { target: { value: 0 } });
  });
  await waitFor(() => {
    expect(rgb).toHaveValue("rgb(255, 255, 0)");
    expect(hex).toHaveValue("#ffff00");
    expect(r).toHaveValue(255);
    expect(g).toHaveValue(255);
    expect(b).toHaveValue(0);
    expect(preview).toHaveValue("#ffff00");
  });
});

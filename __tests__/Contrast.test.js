import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import Contrast from '../pages/component/Contrast';

let foreground;
let contrastRatio;
let background;
let aaNormal;
let aaaNormal;
let aaLarge;
let aaaLarge;

beforeEach(() => {
  render(<Contrast />);
  foreground = screen.getByTestId("foreground");
  contrastRatio = screen.getByTestId("contrast-ratio");
  background = screen.getByTestId("background");
  aaNormal = screen.getByTestId("aa-normal");
  aaaNormal = screen.getByTestId("aaa-normal");
  aaLarge = screen.getByTestId("aa-large");
  aaaLarge = screen.getByTestId("aaa-large");
});

test('renders Contrast correctly', () => {
  expect(screen.getByText('Contrast Checker')).toBeInTheDocument();
});

test('check setForegroundHandler', async () => {
  await act(async () => {
    fireEvent.change(foreground, { target: { value: "000" } });
  });
  await waitFor(() => {
    expect(foreground).toHaveValue("#000");
  });
});

test('check setForegroundHandler invalid color', async () => {
  await act(async () => {
    fireEvent.change(foreground, { target: { value: "abcd" } });
  });
  await waitFor(() => {
    expect(contrastRatio).toHaveTextContent("Invalid color");
  });
});

test('check seBackgroundHandler', async () => {
  await act(async () => {
    fireEvent.change(background, { target: { value: "fff" } });
  });
  await waitFor(() => {
    expect(background).toHaveValue("#fff");
  });
});

test('check contrast 1', async () => {
  await act(async () => {
    fireEvent.change(foreground, { target: { value: "#000" } });
    fireEvent.change(background, { target: { value: "#fff" } });
  });
  await waitFor(() => {
    expect(aaNormal).toHaveTextContent("OK");
    expect(aaaNormal).toHaveTextContent("OK");
    expect(aaLarge).toHaveTextContent("OK");
    expect(aaaLarge).toHaveTextContent("OK");
    expect(contrastRatio).toHaveTextContent("21:1");
  });
});

test('check contrast 2', async () => {
  await act(async () => {
    fireEvent.change(foreground, { target: { value: "#00FFFF" } });
    fireEvent.change(background, { target: { value: "#fff" } });
  });
  await waitFor(() => {
    expect(aaNormal).toHaveTextContent("FAIL");
    expect(aaaNormal).toHaveTextContent("FAIL");
    expect(aaLarge).toHaveTextContent("FAIL");
    expect(aaaLarge).toHaveTextContent("FAIL");
    expect(contrastRatio).toHaveTextContent("1.25:1");
  });
});

test('check contrast 3', async () => {
  await act(async () => {
    fireEvent.change(foreground, { target: { value: "#0044FF" } });
    fireEvent.change(background, { target: { value: "#fff" } });
  });
  await waitFor(() => {
    expect(aaNormal).toHaveTextContent("OK");
    expect(aaaNormal).toHaveTextContent("FAIL");
    expect(aaLarge).toHaveTextContent("OK");
    expect(aaaLarge).toHaveTextContent("OK");
    expect(contrastRatio).toHaveTextContent("6.4:1");
  });
});

test('check contrast 4', async () => {
  await act(async () => {
    fireEvent.change(foreground, { target: { value: "#0676e0" } });
    fireEvent.change(background, { target: { value: "#ffff11" } });
  });
  await waitFor(() => {
    expect(aaNormal).toHaveTextContent("FAIL");
    expect(aaaNormal).toHaveTextContent("FAIL");
    expect(aaLarge).toHaveTextContent("OK");
    expect(aaaLarge).toHaveTextContent("FAIL");
    expect(contrastRatio).toHaveTextContent("4.18:1");
  });
});

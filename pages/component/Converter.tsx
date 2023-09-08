import { useState } from "react";
import {labelClass, inputClass} from '../css.class.js';

export default function Converter() {

  const [rgb, setRgb] = useState("rgb(255,255,255)");
  const [hex, setHex] = useState<string | undefined>("#FFFFFF");
  const [r, setR] = useState<number | undefined>(255);
  const [g, setG] = useState<number | undefined>(255);
  const [b, setB] = useState<number | undefined>(255);

  function hexToRgb(hex: string) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  const componentToHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };

  const rgbToHex = (r: number, g: number, b: number) =>
    "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);

  const isNumber = (value?: string | number): boolean =>
    value != null && value !== "" && !isNaN(Number(value.toString()));

  const setRgbHandler = (value: string) => {
    setRgb(value);
    const nums = value
      .match(
        /^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)$/i
      )
      ?.filter((n) => isNumber(n))
      .map((n) => Number(n))
      .filter((n) => n >= 0 && n <= 255);
    if (nums?.length == 3 || nums?.length == 4) {
      setR(nums[0]);
      setG(nums[1]);
      setB(nums[2]);
      setHex(rgbToHex(nums[0], nums[1], nums[2]));
    } else {
      setHex(undefined);
    }
  };

  const setHexHandler = (value: string) => {
    if (!value.startsWith("#")) {
      value = "#" + value;
    }
    value = value.trim();
    setHex(value);
    const rgb = hexToRgb(value);
    if (rgb) {
      setRgb(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
      setR(rgb.r);
      setG(rgb.g);
      setB(rgb.b);
    } else {
      setRgb("");
    }
  };

  const setRHandler = (value: string) => {
    let r = +value;
    if (r > 255) {
      r = 255;
    } else if (r < 0) {
      r = 0;
    }
    setR(r);
    if (r != undefined && g != undefined && b != undefined) {
      setRgb(`rgb(${r}, ${g}, ${b})`);
      setHex(rgbToHex(r, g, b));
    }
  };

  const setGHandler = (value: string) => {
    let g = +value;
    if (g > 255) {
      g = 255;
    } else if (g < 0) {
      g = 0;
    }
    setG(g);
    if (r != undefined && g != undefined && b != undefined) {
      setRgb(`rgb(${r}, ${g}, ${b})`);
      setHex(rgbToHex(r, g, b));
    }
  };

  const setBHandler = (value: string) => {
    let b = +value;
    if (b > 255) {
      b = 255;
    } else if (b < 0) {
      b = 0;
    }
    setB(b);
    if (r != undefined && g != undefined && b != undefined) {
      setRgb(`rgb(${r}, ${g}, ${b})`);
      setHex(rgbToHex(r, g, b));
    }
  };

  return (
    <>
      <h2 className="text-4xl font-bold dark:text-white mb-2">
        RGB to HEX converter
      </h2>
      <div className="sm:flex gap-3">
        <div className="flex-1 mb-2">
          <label htmlFor="rgb" className={`${labelClass}`}>
            RGB(a)
          </label>
          <input
            type="text"
            id="rgb"
            className={`${inputClass}`}
            value={rgb}
            onChange={(e) => setRgbHandler(e.target.value)}
          />
        </div>
        <div className="flex-1 mb-2">
          <label htmlFor="hex" className={`${labelClass}`}>
            HEX
          </label>
          <input
            type="text"
            id="hex"
            className={`${inputClass}`}
            value={hex}
            onChange={(e) => setHexHandler(e.target.value)}
            maxLength={7}
          />
        </div>
      </div>
      <div className="sm:flex mb-16 gap-3">
        <div className="sm:w-4/5">
          <div className="flex gap-3">
            <div className="flex-1 mb-2">
              <label htmlFor="r" className={`${labelClass}`}>
                R
              </label>
              <input
                type="number"
                id="r"
                min="0"
                max="255"
                className={`${inputClass}`}
                value={r}
                onChange={(e) => setRHandler(e.target.value)}
              />
            </div>
            <div className="flex-1 mb-2">
              <label htmlFor="g" className={`${labelClass}`}>
                G
              </label>
              <input
                type="number"
                id="g"
                min="0"
                max="255"
                className={`${inputClass}`}
                value={g}
                onChange={(e) => setGHandler(e.target.value)}
              />
            </div>
            <div className="flex-1 mb-2">
              <label htmlFor="b" className={`${labelClass}`}>
                B
              </label>
              <input
                type="number"
                id="b"
                min="0"
                max="255"
                className={`${inputClass}`}
                value={b}
                onChange={(e) => setBHandler(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="sm:w-1/5 mb-2">
          <label htmlFor="preview" className={`${labelClass}`}>
            Preview
          </label>
          <input
            type="color"
            id="preview"
            className={`${inputClass} p-1 h-10`}
            value={hex}
            onChange={(e) => setHexHandler(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

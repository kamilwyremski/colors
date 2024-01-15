import { useCallback, useEffect, useState } from "react";
import { labelClass, inputClass, buttonClass } from "../css.class.js";

export default function Converter() {
  const [rgba, setRgba] = useState(false);
  const [rgb, setRgb] = useState("rgb(255, 255, 255)");
  const [hex, setHex] = useState<string | undefined>("#FFFFFF");
  const [r, setR] = useState<number | undefined>(255);
  const [g, setG] = useState<number | undefined>(255);
  const [b, setB] = useState<number | undefined>(255);
  const [a, setA] = useState<GLfloat | undefined>(1);
  const [fieldActive, setFieldActive] = useState<string | undefined>("");
  const [clipboardAlert, setClipboardAlert] = useState(false);

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

  const rgbToHex = useCallback(
    (r: number, g: number, b: number) =>
      "#" + componentToHex(r) + componentToHex(g) + componentToHex(b),
    []
  );

  const isNumber = (value?: string | number): boolean =>
    value != null && value !== "" && !isNaN(Number(value.toString()));

  useEffect(() => {
    if (fieldActive !== "rgb") {
      if (rgba) {
        setRgb(`rgba(${r}, ${g}, ${b}, ${a})`);
      } else {
        setRgb(`rgb(${r}, ${g}, ${b})`);
      }
    }
    if (fieldActive !== "hex") {
      setHex(
        isNumber(r) && isNumber(g) && isNumber(b)
          ? rgbToHex(r || 0, g || 0, b || 0)
          : undefined
      );
    }
  }, [rgba, r, g, b, a, rgbToHex, fieldActive]);

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
      setA(nums[3] ? (nums[3] > 1 ? 1 : nums[3] < 0 ? 0 : nums[3]) : 1);
    }
  };

  const setRgbHandlerBlur = () => {
    if (/^rgba/.test(rgb)) {
      setRgba(true);
    } else {
      setRgba(false);
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
  };

  const setGHandler = (value: string) => {
    let g = +value;
    if (g > 255) {
      g = 255;
    } else if (g < 0) {
      g = 0;
    }
    setG(g);
  };

  const setBHandler = (value: string) => {
    let b = +value;
    if (b > 255) {
      b = 255;
    } else if (b < 0) {
      b = 0;
    }
    setB(b);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setClipboardAlert(false);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [clipboardAlert]);

  function copyToclipboard(value: string | undefined) {
    if (value) {
      navigator.clipboard.writeText(value);
      setClipboardAlert(true);
    }
  }

  return (
    <>
      {clipboardAlert && (
        <div
          className="fixed bottom-10 right-10 z-[10] rounded bg-black px-6 py-3 text-zinc-100"
          role="alert"
        >
          Text copied!
        </div>
      )}
      <h2 className="text-4xl font-bold dark:text-white mb-2">
        RGB to HEX converter
      </h2>
      <p className="mb-2">
        Quickly convert colors from rgb(a) to HEX and vice versa.
      </p>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="rgba"
          checked={rgba}
          onChange={(e) => {
            setFieldActive("rgba");
            setRgba(e.target.checked);
          }}
          className="form-checkbox h-4 w-4 text-blue-500"
          data-testid="rgba"
        />
        <label htmlFor="rgba">Generate rgba code</label>
      </div>
      <div className="sm:flex gap-3">
        <div className="flex-1 mb-2">
          <label htmlFor="rgb" className={`${labelClass}`}>
            RGB(a)
          </label>
          <div className="flex">
            <input
              type="text"
              id="rgb"
              data-testid="rgb"
              className={`${inputClass} me-1`}
              value={rgb}
              onChange={(e) => {
                setFieldActive("rgb");
                setRgbHandler(e.target.value);
              }}
              onBlur={setRgbHandlerBlur}
            />
            <button
              className={`${buttonClass}`}
              onClick={() => copyToclipboard(rgb)}
            >
              Copy
            </button>
          </div>
        </div>
        <div className="flex-1 mb-2">
          <label htmlFor="hex" className={`${labelClass}`}>
            HEX
          </label>
          <div className="flex">
            <input
              type="text"
              id="hex"
              data-testid="hex"
              className={`${inputClass} me-1`}
              value={hex}
              onChange={(e) => {
                setFieldActive("hex");
                setHexHandler(e.target.value);
              }}
              maxLength={7}
            />
            <button
              className={`${buttonClass}`}
              onClick={() => copyToclipboard(hex)}
            >
              Copy
            </button>
          </div>
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
                data-testid="r"
                min="0"
                max="255"
                className={`${inputClass}`}
                value={r}
                onChange={(e) => {
                  setFieldActive("r");
                  setRHandler(e.target.value);
                }}
              />
            </div>
            <div className="flex-1 mb-2">
              <label htmlFor="g" className={`${labelClass}`}>
                G
              </label>
              <input
                type="number"
                id="g"
                data-testid="g"
                min="0"
                max="255"
                className={`${inputClass}`}
                value={g}
                onChange={(e) => {
                  setFieldActive("g");
                  setGHandler(e.target.value);
                }}
              />
            </div>
            <div className="flex-1 mb-2">
              <label htmlFor="b" className={`${labelClass}`}>
                B
              </label>
              <input
                type="number"
                id="b"
                data-testid="b"
                min="0"
                max="255"
                className={`${inputClass}`}
                value={b}
                onChange={(e) => {
                  setFieldActive("b");
                  setBHandler(e.target.value);
                }}
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
            data-testid="preview"
            className={`${inputClass} p-1 h-10`}
            value={hex}
            onChange={(e) => {
              setFieldActive("preview");
              setHexHandler(e.target.value);
            }}
          />
        </div>
      </div>
    </>
  );
}

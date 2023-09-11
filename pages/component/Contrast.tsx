import { useState } from "react";
import { labelClass, inputClass, badgeRed, badgeGreen } from "../css.class.js";

export default function Contrast() {

  const [foreground, setForeground] = useState("#000000");
  const [background, setBackground] = useState("#ffffff");

  const setForegroundHandler = (value: string) => {
    if (!value.startsWith("#")) {
      value = "#" + value;
    }
    setForeground(value);
  };

  const setBackgroundHandler = (value: string) => {
    if (!value.startsWith("#")) {
      value = "#" + value;
    }
    setBackground(value);
  };

  const getLuminanace = (values: { r: number; g: number; b: number }) => {
    const rgb = Object.values(values).map((v) => {
      const val = v / 255;
      return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
    });
    return Number(
      (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3)
    );
  };

  const getContrastRatio = (
    colorA: { r: number; g: number; b: number } | null,
    colorB: { r: number; g: number; b: number } | null
  ) => {
    if (colorA && colorB) {
      const lumA = getLuminanace(colorA);
      const lumB = getLuminanace(colorB);
      return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
    } else {
      return undefined;
    }
  };

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

  const contrastRatio = getContrastRatio(
    hexToRgb(background),
    hexToRgb(foreground)
  );

  return (
    <>
      <h2 className="text-4xl font-bold dark:text-white mb-2">
        Contrast Checker
      </h2>
      <p className="mb-2">Check whether the text and background color complies with the WCAG AA standard and the WCAG AAA standard.</p>
      <div className="sm:flex gap-3">
        <div className="flex-1 mb-2">
          <label htmlFor="foreground" className={`${labelClass}`}>
            Foreground Color
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                id="foreground"
                data-testid="foreground"
                className={`${inputClass}`}
                value={foreground}
                onChange={(e) => setForegroundHandler(e.target.value)}
                maxLength={7}
              />
            </div>
            <div className="flex-1">
              <input
                type="color"
                aria-label="Foreground Color"
                className={`${inputClass} p-1 h-10`}
                value={foreground}
                onChange={(e) => setForegroundHandler(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 mb-2">
          <label htmlFor="background" className={`${labelClass}`}>
            Background Color
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                id="background"
                data-testid="background"
                className={`${inputClass}`}
                value={background}
                onChange={(e) => setBackgroundHandler(e.target.value)}
                maxLength={7}
              />
            </div>
            <div className="flex-1">
              <input
                type="color"
                aria-label="Background Color"
                className={`${inputClass} p-1 h-10`}
                value={background}
                onChange={(e) => setBackgroundHandler(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <h3 className="text-xl font-bold dark:text-slate-300 dark:border-slate-300 border-gray-500 text-gray-500 mt-2 mb-2 border-2 p-2 inline-block" data-testid="contrast-ratio">
        Contrast ratio:{" "}
        {contrastRatio
          ? `${Math.round(contrastRatio * 100) / 100}:1`
          : "Invalid color"}
      </h3>
      <div className="lg:flex mb-2">
        <div className="lg:w-1/3">
          <h4 className="text-lg dark:text-slate-300 text-gray-500 mb-1">Normal Text</h4>
          <p className="mb-1" data-testid="aa-normal">
            WCAG AA:{" "}
            {contrastRatio && +contrastRatio >= 4.5 ? (
              <span className={`${badgeGreen}`}>OK</span>
            ) : (
              <span className={`${badgeRed}`}>FAIL</span>
            )}
          </p>
          <p className="mb-1" data-testid="aaa-normal">
            WCAG AAA:{" "}
            {contrastRatio && +contrastRatio >= 7 ? (
              <span className={`${badgeGreen}`}>OK</span>
            ) : (
              <span className={`${badgeRed}`}>FAIL</span>
            )}
          </p>
        </div>
        <div className="lg:w-2/3">
          <p className="m-3 p-1" style={{'color': foreground, 'backgroundColor': background}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
        </div>
      </div>
      <div className="lg:flex mb-3">
        <div className="lg:w-1/3">
          <h4 className="text-lg dark:text-slate-300 text-gray-500 mb-1">Large Text</h4>
          <p className="mb-1" data-testid="aa-large">
            WCAG AA:{" "}
            {contrastRatio && +contrastRatio >= 3 ? (
              <span className={`${badgeGreen}`}>OK</span>
            ) : (
              <span className={`${badgeRed}`}>FAIL</span>
            )}
          </p>
          <p className="mb-1" data-testid="aaa-large">
            WCAG AAA:{" "}
            {contrastRatio && +contrastRatio >= 4.5 ? (
              <span className={`${badgeGreen}`}>OK</span>
            ) : (
              <span className={`${badgeRed}`}>FAIL</span>
            )}
          </p>
        </div>
        <div className="lg:w-2/3">
          <p className="m-3 p-1 text-lg font-bold" style={{'color': foreground, 'backgroundColor': background}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
        </div>
      </div>
      <p>
        WCAG 2.0 level AA requires a contrast ratio of at least 4.5:1 for normal
        text and 3:1 for large text. WCAG Level AAA requires a contrast ratio of
        at least 7:1 for normal text and 4.5:1 for large text.
      </p>
      <p className="mb-10">
        Large text is defined as 14 point (typically 18.66px) and bold or
        larger, or 18 point (typically 24px) or larger.
      </p>
    </>
  );
}

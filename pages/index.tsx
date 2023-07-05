import { Inter } from 'next/font/google'
import Head from 'next/head';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

const labelClass = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

const inputClass = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

export default function Home() {

  const [rgb, setRgb] = useState('');
  const [hex, setHex] = useState('');
  const [r, setR] = useState<number>();
  const [g, setG] = useState<number>();
  const [b, setB] = useState<number>();

  const [foreground, setForeground] = useState('#ffffff');
  const [background, setBackground] = useState('#000000');

  function hexToRgb(hex: string) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  const componentToHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  const rgbToHex = (r: number, g: number, b: number) => "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);

  const isNumber = (value?: string | number): boolean => (value != null) && (value !== '') && !isNaN(Number(value.toString()));

  const setRgbHandler = (value: string) => {
    setRgb(value);
    const nums = value.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)$/i)?.filter(n => isNumber(n)).map(n => Number(n)).filter(n => n >=0 && n <= 255);
    if (nums?.length == 3 || nums?.length == 4) {
      setR(nums[0]);
      setG(nums[1]);
      setB(nums[2]);
      setHex(rgbToHex(nums[0], nums[1], nums[2]));
    }else{
      setR(undefined);
      setG(undefined);
      setB(undefined);
      setHex("");
    }
  }

  const setHexHandler = (value: string) => {
    if (!value.startsWith('#')) {
      value = '#' + value;
    }
    setHex(value);
    const rgb = hexToRgb(value);
    if(rgb){
      setRgb(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
      setR(rgb.r);
      setG(rgb.g);
      setB(rgb.b);
    }else{
      setRgb("");
      setR(undefined);
      setG(undefined);
      setB(undefined);
    }
  }

  const setRHandler = (value: string) => {
    let r = +value;
    if(r > 255){
      r = 255;
    }else if(r < 0){
      r = 0;
    }
    setR(r);
    if(r != undefined && g != undefined && b != undefined){
      setRgb(`rgb(${r}, ${g}, ${b})`);
      setHex(rgbToHex(r, g, b));
    }
  }

  const setGHandler = (value: string) => {
    let g = +value;
    if(g > 255){
      g = 255;
    }else if(g < 0){
      g = 0;
    }
    setG(g);
    if(r != undefined && g != undefined && b != undefined){
      setRgb(`rgb(${r}, ${g}, ${b})`);
      setHex(rgbToHex(r, g, b));
    }
  }

  const setBHandler = (value: string) => {
    let b = +value;
    if(b > 255){
      b = 255;
    }else if(b < 0){
      b = 0;
    }
    setB(b);
    if(r != undefined && g != undefined && b != undefined){
      setRgb(`rgb(${r}, ${g}, ${b})`);
      setHex(rgbToHex(r, g, b));
    }
  }

  const setForegroundHandler = (value: string) => {
    if (!value.startsWith('#')) {
      value = '#' + value;
    }
    setForeground(value);
  }

  const setBackgroundHandler = (value: string) => {
    if (!value.startsWith('#')) {
      value = '#' + value;
    }
    setBackground(value);
  }

  const getLuminanace = (values: {r: number, g: number, b: number}) => {
    const rgb = Object.values(values).map((v) => {
      const val = v / 255;
      return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
    });
    return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
  };
  
  const getContrastRatio = (colorA: {r: number, g: number, b: number} | null, colorB: {r: number, g: number, b: number} | null) => {
    if(colorA && colorB){
      const lumA = getLuminanace(colorA);
      const lumB = getLuminanace(colorB);
      return ((Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05));
    }else{
      return undefined;
    }
  };

  const contrastRatio = getContrastRatio(hexToRgb(background), hexToRgb(foreground));
  
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-5 sm:p-16 ${inter.className}`}
    >
      <Head>
        <title>HEX to RGB converter and Contrast Checker</title>
      </Head>
      <div className="w-full max-w-5xl">
        <h2 className="text-4xl font-bold dark:text-white mb-2">RGB to HEX converter</h2>
        <div className="sm:flex gap-3">
          <div className="flex-1 mb-2">
              <label htmlFor="rgb" className={`${labelClass}`}>RGB(a)</label>
              <input type="text" id="rgb" className={`${inputClass}`} value={rgb} onChange={e => setRgbHandler(e.target.value)}/>
          </div>
          <div className="flex-1 mb-2">
              <label htmlFor="hex" className={`${labelClass}`}>HEX</label>
              <input type="text" id="hex" className={`${inputClass}`} value={hex} onChange={e => setHexHandler(e.target.value)} maxLength={7}/>
          </div>
        </div>
        <div className="sm:flex mb-16 gap-3">
          <div className="sm:w-4/5">
            <div className="flex gap-3">
              <div className="flex-1 mb-2">
                <label htmlFor="r" className={`${labelClass}`}>R</label>
                <input type="number" id="r" min="0" max="255" className={`${inputClass}`} value={r} onChange={e => setRHandler(e.target.value)}/>
              </div>
              <div className="flex-1 mb-2">
                <label htmlFor="g" className={`${labelClass}`}>G</label>
                <input type="number" id="g" min="0" max="255" className={`${inputClass}`} value={g} onChange={e => setGHandler(e.target.value)}/>
              </div>
              <div className="flex-1 mb-2">
                <label htmlFor="b" className={`${labelClass}`}>B</label>
                <input type="number" id="b" min="0" max="255" className={`${inputClass}`} value={b} onChange={e => setBHandler(e.target.value)}/>
              </div>
            </div>
          </div>
          <div className="sm:w-1/5 mb-2">
              <label htmlFor="preview" className={`${labelClass}`}>Preview</label>
              <input type="color" id="preview" className={`${inputClass} p-1 h-10`} value={hex} onChange={e => setHexHandler(e.target.value)}/>
          </div>
        </div>
        <h2 className="text-4xl font-bold dark:text-white mb-2">Contrast Checker</h2>
        <div className="sm:flex gap-3">
          <div className="flex-1 mb-2">
              <label htmlFor="foreground" className={`${labelClass}`}>Foreground Color</label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <input type="text" id="foreground" className={`${inputClass}`} value={foreground} onChange={e => setForegroundHandler(e.target.value)} maxLength={7}/>
                </div>
                <div className="flex-1">
                  <input type="color" className={`${inputClass} p-1 h-10`} value={foreground} onChange={e => setForegroundHandler(e.target.value)}/>
                </div>
              </div>
          </div>
          <div className="flex-1 mb-2">
              <label htmlFor="background" className={`${labelClass}`}>Background Color</label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <input type="text" id="background" className={`${inputClass}`} value={background} onChange={e => setBackgroundHandler(e.target.value)} maxLength={7}/>
                </div>
                <div className="flex-1">
                  <input type="color" className={`${inputClass} p-1 h-10`} value={background} onChange={e => setBackgroundHandler(e.target.value)}/>
                </div>
              </div>
          </div>
        </div>
        <h3 className="text-xl font-bold text-slate-300 mt-2 mb-2 border-2 p-2 inline-block">Contrast ratio: {contrastRatio ? `${Math.round(contrastRatio * 100) / 100}:1` : "wrong color"}</h3>
        <h4 className="text-lg text-slate-300 mb-1">Normal Text</h4>
        <p className="mb-1">WCAG AA: {contrastRatio && +contrastRatio >= 4.5 ? <span className="bg-green-500 p-1">OK</span> : <span className="bg-red-600 p-1">FAIL</span>}</p>
        <p className="mb-2">WCAG AAA: {contrastRatio && +contrastRatio >= 7 ? <span className="bg-green-500 p-1">OK</span> : <span className="bg-red-600 p-1">FAIL</span>}</p>
        <h4 className="text-lg text-slate-300 mb-1">Large Text</h4>
        <p className="mb-1">WCAG AA: {contrastRatio && +contrastRatio >= 3 ? <span className="bg-green-500 p-1">OK</span> : <span className="bg-red-600 p-1">FAIL</span>}</p>
        <p className="mb-3">WCAG AAA: {contrastRatio && +contrastRatio >= 4.5 ? <span className="bg-green-500 p-1">OK</span> : <span className="bg-red-600 p-1">FAIL</span>}</p>
        <p>WCAG 2.0 level AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. WCAG Level AAA requires a contrast ratio of at least 7:1 for normal text and 4.5:1 for large text.</p>
        <p className="mb-10">Large text is defined as 14 point (typically 18.66px) and bold or larger, or 18 point (typically 24px) or larger.</p>
        <p>Project 2023 by <a href="http://wyremski.pl/en" title="Web Developer">Kamil Wyremski</a></p>
      </div>
    </main>
  )
}

import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

const labelClass = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

const inputClass = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

export default function Home() {

  const [rgb, setRgb] = useState('');
  const [hex, setHex] = useState('');
  const [r, setR] = useState('');
  const [g, setG] = useState('');
  const [b, setB] = useState('');

  const toRGB = (color: string) => {
    const { style } = new Option();
    style.color = color;
    return style.color;
  }

  const componentToHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  const rgbToHex = (r:number, g: number, b: number) => "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);

  const setRgbHandler = (value: string) => {
    setRgb(value);
    console.log(value);
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="w-full max-w-5xl">
        <h2 className="text-4xl font-bold dark:text-white mb-2">RGB to HEX converter</h2>
        <div className="flex">
          <div className="flex-1 p-2">
              <label htmlFor="rgb" className={`${labelClass}`}>RGB</label>
              <input type="text" id="rgb" className={`${inputClass}`} value={rgb} onChange={e => setRgbHandler(e.target.value)}/>
          </div>
          <div className="flex-1 p-2">
              <label htmlFor="hex" className={`${labelClass}`}>HEX</label>
              <input type="text" id="hex" className={`${inputClass}`} value={hex} onChange={e => setHex(e.target.value)}/>
          </div>
        </div>
        <div className="flex">
          <div className="w-4/5">
            <div className="flex">
              <div className="flex-1 p-2">
                <label htmlFor="r" className={`${labelClass}`}>R</label>
                <input type="text" id="r" className={`${inputClass}`} value={r} onChange={e => setR(e.target.value)}/>
              </div>
              <div className="flex-1 p-2">
                <label htmlFor="g" className={`${labelClass}`}>G</label>
                <input type="text" id="g" className={`${inputClass}`} value={g} onChange={e => setG(e.target.value)}/>
              </div>
              <div className="flex-1 p-2">
                <label htmlFor="b" className={`${labelClass}`}>B</label>
                <input type="text" id="b" className={`${inputClass}`} value={b} onChange={e => setB(e.target.value)}/>
              </div>
            </div>
          </div>
          <div className="w-1/5 p-2">
              <label className={`${labelClass}`}>Preview</label>
              <div></div>
          </div>
        </div>
      </div>
    </main>
  )
}

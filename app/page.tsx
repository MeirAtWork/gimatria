'use client';
import { useState } from 'react';
import { calculateMiluy } from '../src/utils/miluy'

export default function Home() {
  const [input, setInput] = useState('');
  const { breakdown, totalValue, totalSuffixValue, totalBasicValue } = calculateMiluy(input);

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 font-sans' dir='rtl'>
      <h1 className='text-3xl font-bold mb-8 text-blue-700'>מחשבון מילוי אותיות</h1>
      
      <div className='w-full max-w-md bg-white p-6 rounded-xl shadow-md'>
        <label className='block mb-2 text-gray-700 font-semibold'>הכנס מילה:</label>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg'
          placeholder='למשל: שלום'
        />
      </div>

      {input && (
        <div className='mt-8 w-full max-w-md'>
          <div className='bg-white p-6 rounded-xl shadow-md'>
            <h2 className='text-xl font-bold mb-4 border-b pb-2'>תוצאות:</h2>
            
            <div className='space-y-3'>
              {/* Header Row */}
              <div className='flex items-center gap-2 text-xs text-gray-500 font-bold px-3'>
                  <div className='w-8 text-center shrink-0'>אות</div>
                  <div className='w-12 text-center shrink-0 border-l border-transparent pl-2'>ערך</div>
                  <div className='flex-1 text-right'>פשוט ומילוי</div>
                  <div className='w-16 text-center shrink-0 border-l border-transparent pl-2 ml-2'>ערך</div>
                  <div className='flex-1 text-right pr-2 mr-2'>מילוי בלבד</div>
                  <div className='w-16 text-center shrink-0 border-r border-transparent pr-2'>ערך</div>
              </div>

              {breakdown.map((item, index) => (
                <div key={index} className='flex items-center gap-2 bg-blue-50 p-3 rounded'>
                  {/* 1. Letter */}
                  <div className='w-8 font-bold text-2xl text-blue-600 text-center shrink-0'>{item.char}</div>
                  
                  {/* 2. Basic Value */}
                  <div className='w-12 font-mono font-bold text-lg text-gray-500 text-center shrink-0 border-l border-blue-200 pl-2'>{item.basicValue}</div>

                  {/* 3. Full Filling Text */}
                  <div className='flex-1 flex flex-col'>
                      <span className='font-bold text-gray-800 leading-none'>{item.full}</span>
                  </div>

                  {/* 4. Full Filling Value */}
                  <div className='w-16 flex flex-col items-center shrink-0 border-l border-blue-200 pl-2 ml-2'>
                       <span className='font-mono font-bold text-lg text-blue-700 leading-none'>{item.value}</span>
                  </div>

                  {/* 5. Partial Filling Text */}
                  <div className='flex-1 flex flex-col pr-2 mr-2'>
                      {item.suffix ? (
                              <span className='font-bold text-gray-800 leading-none'>{item.suffix}</span>
                      ) : <div className='flex-1'></div>}
                  </div>

                  {/* 6. Partial Filling Value */}
                  <div className='w-16 flex flex-col items-center shrink-0 border-r border-blue-200 pr-2'>
                      {item.suffix && (
                              <span className='font-mono font-bold text-green-600 leading-none'>{item.suffixValue}</span>
                      )}
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-3 flex items-center gap-2 bg-gray-200 p-3 rounded-lg font-bold'>
               {/* 1. Label (in place of Letter column spacer) */}
              <div className='w-8 shrink-0 text-right text-gray-700 text-sm'>סה"כ:</div>
              
               {/* 2. Total Basic Value */}
               <div className='w-12 text-center shrink-0 text-gray-600 border-l border-gray-400 pl-2'>
                  {totalBasicValue}
               </div>

              {/* 3. Spacer (Full Filling Text column) */}
              <div className='flex-1'></div>

               {/* 4. Total Full Value */}
               <div className='w-16 flex flex-col items-center shrink-0 border-l border-gray-400 pl-2 ml-2'>
                   <span className='text-xl text-blue-900 leading-none'>{totalValue}</span>
              </div>

              {/* 5. Spacer */}
              <div className='flex-1 pr-2 mr-2'></div>

              {/* 6. Total Partial Value */}
              <div className='w-16 flex flex-col items-center shrink-0 border-r border-gray-400 pr-2'>
                  <span className='text-lg text-green-800 leading-none'>{totalSuffixValue}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
'use client';
import { useState } from 'react';
import { calculateMiluy, MiluyType } from '../src/utils/miluy'

export default function Home() {
  const [input, setInput] = useState('');
  const [miluyType, setMiluyType] = useState<MiluyType>('alephin');
  const { breakdown, totalValue, totalSuffixValue, totalBasicValue } = calculateMiluy(input, miluyType);

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

        <div className='mt-4 pt-4 border-t border-gray-100'>
          <label className='block mb-2 text-gray-700 font-semibold'>סוג מילוי (עבור האותיות ה' ו-ו'):</label>
          <select 
            value={miluyType}
            onChange={(e) => setMiluyType(e.target.value as MiluyType)}
            className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg bg-white'
          >
            <option value="yodin">מילוי יודין (הי, ויו)</option>
            <option value="alephin">מילוי אלפין (הא, ואו)</option>
            <option value="hehin">מילוי ההין (הה, וו)</option>
          </select>
        </div>
      </div>

      {input && (
        <div className='mt-8 w-fit max-w-full'>
          <div className='bg-white p-6 rounded-xl shadow-md'>
            <h2 className='text-xl font-bold mb-4 border-b pb-2'>תוצאות:</h2>
            
            <div className='overflow-x-auto pb-2'>
              <div className='min-w-max'>
                <div className='space-y-3'>
                  {/* Header Row */}
                  <div className='flex items-center gap-2 text-xs text-gray-500 font-bold px-3'>
                      <div className='w-16 text-center shrink-0'>פשוט</div>
                      <div className='w-12 text-center shrink-0 border-l border-transparent pl-2'>ערך</div>
                      <div className='w-16 text-center'>פשוט ומילוי</div>
                      <div className='w-12 text-center shrink-0 border-l border-transparent pl-2'>ערך</div>
                      <div className='w-16 text-center'>מילוי</div>
                      <div className='w-12 text-center shrink-0 border-l border-transparent pl-2'>ערך</div>
                  </div>

                  {breakdown.map((item, index) => (
                    <div key={index} className='flex items-center gap-2 bg-blue-50 p-3 rounded'>
                      {/* 1. Letter */}
                      <div className='w-16 font-bold text-2xl text-blue-600 text-center shrink-0'>{item.char}</div>
                      
                      {/* 2. Basic Value */}
                      <div className='w-12 font-mono font-bold text-lg text-gray-500 text-center shrink-0 border-l border-blue-200 pl-2'>{item.basicValue}</div>

                      {/* 3. Full Filling Text */}
                      <div className='w-16 flex flex-col'>
                          <span className='font-bold text-gray-800 text-center leading-none'>{item.full}</span>
                      </div>

                      {/* 4. Full Filling Value */}
                      <div className='w-12 flex flex-col items-center shrink-0 border-l border-blue-200 pl-2'>
                          <span className='font-mono font-bold text-lg text-blue-700 leading-none'>{item.value}</span>
                      </div>

                      {/* 5. Partial Filling Text */}
                      <div className='w-16 flex flex-col'>
                          {item.suffix ? (
                                  <span className='font-bold text-gray-800 text-center leading-none'>{item.suffix}</span>
                          ) : <div className='flex-1'></div>}
                      </div>

                      {/* 6. Partial Filling Value */}
                      <div className='w-12 flex flex-col items-center shrink-0 border-l border-transparent pl-2'>
                          {item.suffix && (
                                  <span className='font-mono font-bold text-green-600 leading-none'>{item.suffixValue}</span>
                          )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className='mt-3 flex items-center gap-2 bg-gray-200 p-3 rounded-lg font-bold'>
                  {/* 1. Label (in place of Letter column spacer) */}
                  <div className='w-16 shrink-0 text-right text-gray-700 text-sm'>סה"כ:</div>
                  
                  {/* 2. Total Basic Value */}
                  <div className='w-12 text-center shrink-0 text-gray-600 border-l border-gray-400 pl-2'>
                      {totalBasicValue}
                  </div>

                  {/* 3. Spacer (Full Filling Text column) */}
                  <div className='w-16'></div>

                  {/* 4. Total Full Value */}
                  <div className='w-12 flex flex-col items-center shrink-0 border-l border-gray-400 pl-2'>
                      <span className='text-xl text-blue-900 leading-none'>{totalValue}</span>
                  </div>

                  {/* 5. Spacer */}
                  <div className='w-16'></div>

                  {/* 6. Total Partial Value */}
                  <div className='w-12 flex flex-col items-center shrink-0 border-l border-transparent pl-2'>
                      <span className='text-lg text-green-800 leading-none'>{totalSuffixValue}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
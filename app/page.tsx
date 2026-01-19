'use client';
import { useState } from 'react';
import { calculateMiluy } from '../src/utils/miluy'

export default function Home() {
  const [input, setInput] = useState('');
  const { breakdown, totalValue } = calculateMiluy(input);

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
              {breakdown.map((item, index) => (
                <div key={index} className='flex justify-between items-center bg-blue-50 p-3 rounded'>
                  <div className='flex items-center gap-4'>
                    <span className='font-bold text-2xl text-blue-600 w-8 text-center'>{item.char}</span>
                    <span className='text-gray-600'>המילוי: <span className='font-bold text-gray-800'>{item.full}</span></span>
                  </div>
                  <span className='font-mono font-bold text-lg text-green-700'>{item.value}</span>
                </div>
              ))}
            </div>

            <div className='mt-6 pt-4 border-t flex justify-between items-center bg-gray-50 p-4 rounded-lg'>
              <span className='font-bold text-xl'>ערך כולל (עם המילוי):</span>
              <span className='text-3xl font-bold text-blue-800'>{totalValue}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
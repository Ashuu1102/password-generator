import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
    const [length, setLength] = useState(8)
    const [numAllowed, setNumAllowed] = useState(false)
    const [charAllowed, setCharAllowed] = useState(true)
    const [password, setPassword] = useState("")

    // ref
    const passwordRef = useRef(null)

    const passwordGenerator = useCallback( () => {
      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(numAllowed) str += '0123456789'
      if(charAllowed) str += '@!#$%^&*'
      
      for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char)        
      }
      setPassword(pass)
    }, [length, numAllowed, charAllowed, setPassword])

    const copyPasswordToClipboard = useCallback(() => {
      passwordRef.current?.select()
      window.navigator.clipboard.writeText(password)
    }, [password])

    useEffect(() => {
      passwordGenerator()
    }, [length,numAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg
       px-6 py-5 my-10 text-orange-500 bg-gray-800'>
       <div className='text-white text-center text-3xl mb-4 my-3'>Password Generator</div>
        <div className='flex shadow rounded-lg overflow-hidden mb-6'>
          <input
          type='text'
          value={password}
          className='outline-none w-full py-2 px-5 text-2xl'
          placeholder='password'
          readOnly
          ref={passwordRef}
           />
          <button onClick={copyPasswordToClipboard} 
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
            type='range'
            min={8}
            max={25}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
             />
             <label>Length={length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={numAllowed}
              id='numberInput'
              onChange={() => {setNumAllowed((prev) => !prev)}}
            />
            <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={charAllowed}
              id='characterInput'
              onChange={() => {setCharAllowed((prev) => !prev)}}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>  
    </>
  )
}

export default App

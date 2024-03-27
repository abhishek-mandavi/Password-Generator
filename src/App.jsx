
import { useState , useCallback , useEffect , useRef } from 'react'


function App() {

  /*useState Hook:
  In React, useState is a special function that lets you add state to functional components. 
  It provides a way to declare and manage state variables directly within a function component. 
  It should be noted that one use of useState() can only be used to declare one state variable.
  */
  const [length, setLength] = useState(10);
  const [numallow , setNumallow] = useState(false);
  const [characterallow , setCharacterallow] = useState(false);
  const [password , setPassword] = useState("")

  /*useRef Hook:
  The main use of useRef hook is to access the DOM elements in a more efficient way as compared to simple refs. 
  Since useRef hooks preserve value across various re-renders and do not cause re-renders whenever a value is changed they make the application faster and helps in caching and storing previous values
  */
 const passwordRef = useRef(null)


  const passwordgenerator = useCallback(function(){
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxzy"
    if(numallow) str += "0123456789" 
      if(characterallow) str +=  "@!#$%&*/?"
      for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char)
        
      }
    setPassword(pass)
  } , [length , numallow , characterallow , setPassword])

  const copytoclipboard =  useCallback(() => {
    passwordRef.current?.select();
    /*Copying in range*/
   // passwordRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(password)
  },[password])

  const resetpassword = useCallback(() => {
   setPassword('');
  },[password])
   /* useEffect Hook:
   The useEffect in ReactJS is used to handle the side effects such as fetching data and updating DOM. 
   This hook runs on every render but there is also a way of using a dependency array using which we can control the effect of rendering.
   */
  useEffect(() => {
    passwordgenerator()
  } , [length,numallow,characterallow,passwordgenerator])
  return (
    
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-red-500 bg-gray-800'>
    <h1 className='text-4xl text center text-white my-3'>PassWord Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
        type='text'
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
        />
        <button 
        onClick={copytoclipboard}
        className='outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0'>
          copy
       </button>
        <button 
        onClick={resetpassword}
        className='outline-none bg-orange-500 text-white px-3 py-0.5 shrink-0'>
          reset
        </button>



      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
           type='range'
           min={0}
           max={20}
           value={length}
           className='cursor-pointer'
           onChange={(e) =>{setLength(e.target.value)}}
          />
           <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
           type='checkbox'
           defaultChecked={numallow}
           id='number-input'
           onChange={function(){
            //reverse the previous value
            setNumallow((prev) => !prev);
           }}
          />
          <label className='numberinput'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
           type='checkbox'
           defaultChecked = {characterallow}
           id='character-input'
           onChange={function(){
            
            setCharacterallow((previous) => !previous);
           }}
          />
          <label className='characterinput'>Characters</label>

        </div>
      </div>
    </div>
    

  )
}

export default App

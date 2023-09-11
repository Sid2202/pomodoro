import {useState, useEffect} from 'react'
import { FaBeer, FaPlay, FaPause } from 'react-icons/fa';

function App() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [button, setButton] = useState("Start");
  const [gradientStyle, setGradientStyle] = useState({
    background: 'radial-gradient(at center, #3498db, #9b59b6)',
  });


  function start() {
    if(isRunning) {
      if(seconds > 0){
        setSeconds(seconds - 1);
      }else if(minutes > 0 ){
        setMinutes(minutes - 1);
        setSeconds(59);
      }else{
        setIsRunning(false);
      }
    }
  }

  function handleClick() {
    if(isRunning) {
      setIsRunning(false);
      setButton("Start")
    }else{
      setIsRunning(true);
      setButton("Pause");
    }
  }
  

  function handleTime(time){
    setMinutes(time);
    setSeconds(0);
    setIsRunning(false);
    setButton("Start");
  }

  useEffect(() => {
    let intervalId;
    if(minutes>0 || seconds>0){
      intervalId= setInterval(start, 1000);
    }else if (minutes === 0 && seconds === 0) {
      setButton("Start");
      setIsRunning(false);
      setMinutes(25);
    }
    return () => clearInterval(intervalId);

  }, [minutes, isRunning, seconds])

  useEffect(() => {
    const handleMouseMove = (event) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const mouseXpercentage = Math.round((event.pageX / windowWidth) * 100);
      const mouseYpercentage = Math.round((event.pageY / windowHeight) * 100);

      setGradientStyle({
        background: `radial-gradient(at ${mouseXpercentage}% ${mouseYpercentage}%, #dd83ad , #3498db)`,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  

  return (
    <div className="App">
      <div className="flex flex-col w-screen h-screen bg-slate-400 items-center justify-center" style = {gradientStyle}>

        <div className='flex'>
          <button className='p-2 m-4 px-4 rounded-3xl border text-xl text-white font-mono hover:bg-white hover:text-black' onClick={() =>{handleTime(25)}}>Pomodoro</button>
          <button  className='p-2 m-4 px-4 rounded-3xl border text-xl text-white font-mono hover:bg-white hover:text-black' onClick={() =>{handleTime(5)}}>Short Break</button>
          <button  className='p-2 m-4 px-4 rounded-3xl border text-xl text-white font-mono hover:bg-white hover:text-black' onClick={() =>{handleTime(10)}}>Long Break</button>
        </div>
        <div className='m-6'>
          <h1 className="text-8xl font-semibold font-mono text-white">
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </h1>
        </div>
 
        <button  className='p-4 m-5 text-3xl rounded-full border text-white hover:bg-white hover:text-black' onClick= {handleClick}>
          {button==="Start"? 
            (<FaPlay />):
            (<FaPause />)
          }</button>
        
      </div>
    </div>
  );
}

export default App;

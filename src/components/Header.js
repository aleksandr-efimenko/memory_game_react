export default function Header({turns, onShuffle}){
  return (
    <>
      <h1 className="header">Test your memory!</h1>
      <button type='button' onClick={onShuffle}>New Game</button>
      <div>
        <p className='turns'>Turns completed: {turns}</p>
      </div>
    </>
  );
};
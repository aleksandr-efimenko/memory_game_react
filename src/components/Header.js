export default function Header(){
  return (
    <>
      <h1>Test your memory!</h1>
      <button type='button' onClick={onShuffle}>New Game</button>
      <div>
        <p className='turns'>Turns completed: {turns}</p>
      </div>
    </>
  );
};
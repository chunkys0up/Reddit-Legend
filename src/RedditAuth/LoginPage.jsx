export default function LoginPage( {onLogin} ) {
  return (
    <div className="w-screen h-screen bg-zinc-900 flex justify-center items-center">
      <div className="p-10 rounded-lg bg-white flex flex-col items-center">

        <div className="font-bold text-5xl">
            Info Legends
        </div>

        <div className="text-lg mb-3">
            Grid layout with subreddit
        </div>
       
        <button className="bg-orange-500 hover:bg-orange-400 p-1 px-3 rounded-lg text-white"
            onClick={onLogin}
        >
            Login With Reddit
        </button>
      </div>
    </div>
  );
}

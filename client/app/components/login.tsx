const Login = ({ playerAdd, setName }: { playerAdd: () => void; setName: (name: string) => void }) => (
  <div className="text-center">
    <p className="text-2xl">Enter your name</p>
    <div className="py-5">
      <input onInput={(e) => setName((e.target as HTMLInputElement).value.trim())} className="input mr-4" autoComplete="false" />
      <button
        onClick={playerAdd}
        className="btn btn-primary"
        type="button"
      >
        Join
      </button>
    </div>
  </div>
);

export default Login;

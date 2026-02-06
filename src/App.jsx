import { useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [tam, setTam] = useState(15);
  const [senha, setSenha] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  const letras = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];
  const gerarSenha = () => {
    let novaSenha = "";
    for (let i = 0; i < tam; i++) {
      const posicao = Math.floor(Math.random() * letras.length);
      novaSenha += letras[posicao];
    }
    setSenha(novaSenha);
  }
  async function buscarDados() {
      try {
        const resposta = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!resposta.ok) {
          throw new Error("Erro ao buscar dados")
        }
        const dados = await resposta.json();
        setUsuarios(dados);
      }
      catch (erro) {
        console.log(erro);
      }
    }
  return (
    <div>
      <div className="bg-green-200 p-6 rounded mx-auto">
        <h2 className='text-3xl'>Escolha o tamanho da sua senha</h2>
        <div className='flex flex-col items-center justify-center'><input type="range" className='mt-2' id="tam" value={tam} min="10" max="30" onChange={(e) => setTam(Number(e.target.value))} /> {tam}
          <button className='bg-green-500 w-1/4 p-3 mt-2 ' onClick={gerarSenha}>Gerar</button></div>
        <p>Senha: <span className='text-red-600'>{senha}</span></p>
      </div>
      <div className="container">
        <h2 className='text-3xl mt-3'>Lista de usuários</h2>
        <ul>
          {usuarios.map((u) => (
            <li key={u.id}>{u.name}</li>
          ))}
        </ul>
        <button className='bg-red-500 w-1/4 p-3 mt-2' onClick={buscarDados}>Buscar usuários</button></div>
    </div>

  )
}

export default App

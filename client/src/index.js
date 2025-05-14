import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleBuscar = async () => {
    setCarregando(true);
    setCodigo('');
    setErro('');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/codigo?email=${email}`);
      const data = await response.json();

      if (data.codigo) {
        setCodigo(data.codigo);
      } else {
        setErro('Nenhum código encontrado.');
      }
    } catch (err) {
      setErro('Erro ao buscar o código.');
    }

    setCarregando(false);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Bem-vindo ao Email Receiver</h1>

      <input
        type="email"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: '0.5rem', width: '300px' }}
      />
      <button onClick={handleBuscar} style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}>
        Buscar Código
      </button>

      <div style={{ marginTop: '2rem' }}>
        {carregando && <p>🔄 Buscando...</p>}
        {codigo && <p>✅ Código encontrado: <strong>{codigo}</strong></p>}
        {erro && <p style={{ color: 'red' }}>❌ {erro}</p>}
      </div>
    </div>
  );
}

export default App;

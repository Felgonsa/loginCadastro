
function showForm(form) {
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('cadastroForm').classList.remove('active');
    document.querySelectorAll('.tabs button').forEach(btn => btn.classList.remove('active'));

    if (form === 'login') {
        document.getElementById('loginForm').classList.add('active');
        document.querySelectorAll('.tabs button')[0].classList.add('active');
    } else {
        document.getElementById('cadastroForm').classList.add('active');
        document.querySelectorAll('.tabs button')[1].classList.add('active');
    }
}


// cadastro
document.getElementById('cadastroForm').addEventListener('submit', async (e) => {
    e.preventDefault() // impede a página de recarregar ao enviar o formulário
  
    const nome = e.target.nome.value
    const email = e.target.email.value
    const senha = e.target.senha.value
  
    const res = await fetch('http://localhost:5000/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    })
  
    const msg = await res.text()
  
    if (res.ok) {
      alert('Cadastro realizado com sucesso!')

    } else {
      alert('Erro no cadastro: ' + msg)
    }
  })

//login


document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault()
  
    const email = e.target.email.value
    const senha = e.target.senha.value
  
    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    })
  
    const data = await res.json()
  
    if (res.ok) {
      localStorage.setItem('token', data.token) // Armazena o token no localStorage
      // window.location.href = '/usuarios.html';


      alert(data.message)
      window.location.href = '/usuarios.html';

      console.log(data);
      

    } else {
      alert('Erro: ' + data.message )
    }
  })
  
  
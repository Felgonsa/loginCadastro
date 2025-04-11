document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Você precisa estar logado para acessar esta página.');
    window.location.href = '/';
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/usuarios', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    if (!res.ok) {
      throw new Error('Não autorizado');
    }

    const usuarios = await res.json();
    const lista = document.getElementById('listaUsuarios');


    usuarios.forEach(user => {
      const li = document.createElement('li');

      const divNome = document.createElement('div');
      divNome.textContent = `Nome: ${user.nome}`;

      const divEmail = document.createElement('div');
      divEmail.textContent = `Email: ${user.email}`;

      li.appendChild(divNome);
      li.appendChild(divEmail);
      lista.appendChild(li);

     
    });

    document.body.appendChild(lista);
  } catch (err) {
    alert('Erro ao carregar usuários:  ' + err.message);
    window.location.href = '/';
  }
});


document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('token'); // Remove o token do localStorage
  window.location.href = '/index.html'; // Redireciona para a tela de login
});

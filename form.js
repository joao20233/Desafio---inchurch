//  let alertaDoLogin = alert('USERNAME: recrutador' + " / " + 'SENHA: 12345678')

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    let username = document.getElementById('username').value.trim(); // Remover espaços em branco e converter para minúsculas
    let password = document.getElementById('password').value.trim(); // Remover espaços em branco

    let usernameTrue = "recrutador";
    let passwordTrue = "12345678";

    if (username === usernameTrue && password === passwordTrue) {
        console.log("Login bem-sucedido. Redirecionando...");
        window.location.href = './pages/home/home.html';
    } else {
        console.log("Usuário ou senha incorretos.");
        erro("Usuário ou senha incorretos. Por favor, verifique e tente novamente.");
    }
});



function erro() {
    let elementos = document.querySelectorAll('.error');
    elementos.forEach(elemento => {
        elemento.style.visibility = 'visible';
    });
}
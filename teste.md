# Phovi - Teste

Na plataforma da phovi existe um game de trivia de V ou F, e estamos implementando um modo de múltipla escolha.

Precisamos que trivias sejam gerados o mais rápido possível, assim, foi passada a tarefa para nosso estagiário criar o <br>
'Trivia Maker' um site para que seja possível ler os trivias de V/F do banco de dados,adaptar para múltipla escolha e <br>
enviar direto no servidor.

O estagiário fez o front, agora a sua missão é fazer o backend da aplicação, primeiramente é necessário conectar a <br>
aplicação com firebase, para isso você precisará criar uma aplicação no firebase e conectar com o front end da aplicação.


## Steps

- [ ] 1) Assim que a aplicação estiver conectada, a versão web deve funcionar normalmente, para poder acessar o <br>
Trivia Maker vai ser necessário criar um usuário e senha no firebase auth, para poder fazer login

- [ ] 2) Para carregar os trivias, tem que adicionar um trivia no Firestore, apesar de não ter sido passado a <br>
estrutura da database, é só fazer "engenharia reversa" das requisições

- [ ] 3) Quando um trivia é adicionado, ele acaba indo com uma url de imagem de sites de terceiros,assim, a imagem <br>
pode cair, ficar fora do ar,ou ter acesso bloqueado. Para evitar isso, uma funcionalidade importante é pegar a <br>
imagem que foi armazenada no Firestore, baixar, comprimir e enviar para o Storage do firebase, e depois substituir <br>
o link que antes era de um site de terceiro, pelo link do Storage, isso pode ser realizado pelo Functions do firebase

- [ ] 4) Como é importante garantir que os trivias só sejam acessados/alterados por quem está autenticado, é importante <br>
criar regras de segurança no firestore e storage para garantir isso, crie as regras que achar necessário, podendo criar<br>
regras individuais de cada campo

- [ ] 5) É interessante armazenar qual foi o último usuário que entrou nessa aplicação web, assim, a cada login na <br>
aplicação web, adicione em uma tabela no Real Time Database do firebase (/adminAccess), o uid do usuário que acessou <br>
e o timestamp, também crie regras dessa tabela

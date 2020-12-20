# Phovi - Teste

Na plataforma da phovi existe um game de trivia de V ou F, e estamos implementando um modo de múltipla escolha.

Precisamos que trivias sejam gerados o mais rápido possível, assim, foi passada a tarefa para nosso estagiário criar o <br>
'Trivia Maker' um site para que seja possível ler os trivias de V/F do banco de dados,adaptar para múltipla escolha e <br>
enviar direto no servidor.

O estagiário fez o front, agora a sua missão é fazer o backend da aplicação, primeiramente é necessário conectar a <br>
aplicação com firebase, para isso você precisará criar uma aplicação no firebase e conectar com o front end da aplicação.


## Tasks

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


## Steps

- ```npm install``` -> 1 vulnerabilidade encontrada. Usei ```npm audit``` e vi a vulnerabilidade no *react-scripts@4.0.1*.<br>
Em seguida fiz ```npm install react-scripts@4.0.1``` para corrigir isso.

- ```npm start``` -> alguns warnings foram gerados, porém a aplicação começou a funcionar. Mesmo assim a interface web<br>
estava apenas uma página em branco.

- Alguns warnings e erros foram encontrados na página e por isso ela estava em branco. Para corrigir os warnings <br>
precisei alterar alguns pequenos trechos de código. Feito isso, percebi que faltava uma API KEY do Firebase para<br>
a aplicação funcionar.

- Entrei no site do [Firebase](https://firebase.google.com) e criei o projeto "trivia-maker". Dessa forma pude <br>
adicionar ao arquivo de configuração do Firebase nesse projeto (/src/firebase/index.ts) as informações necessárias<br>
para que a aplicação funcionasse, exceto pela "databaseURL", a qual ainda não entendi a função. Com isso a página web<br>
passou a apresentar a tela de login conforme a imagem abaixo :

![tela-inicial](images/tela-inicial-trivia-maker.png)

- ~~Para que eu pudesse criar usuários e senhas no Firebase auth, além de autenticar múltiplas features etc, foi preciso<br>
adicionar o **Firebase Admin SDK** ao Trivia Maker. Para isso tive que modificar novamente o arquivo de configuração<br>
do Firebase com alguns trechos de código.~~

    - ~~Ainda nisso, foi preciso instalar o pacote **firebase-admin** : ```npm install firebase-admin --save```. Assim <br>
    esse pacote já foi salvo no *package.json*.~~

    - ~~Para inicializar o SDK foi preciso adicionar uma chave privada para esse serviço. Tentei Seguir o padrão sugerido na<br>
    [documentação](https://firebase.google.com/docs/admin/setup?authuser=0#initialize-sdk) utilizando variáveis locais, porém acabei utilizando o caminho relativo<br>
    para o arquivo json contendo a chave no próprio código.~~

    - ~~TODO : resolver warnings de compilação~~

    OBS.: Reconsiderei os passos marcados acima e decidi continuar sem eles. Acho que é desnecessário por enquanto.

- Adicionei ao Firebase Auth a opção de log in via email + senha, e criei o primeiro usuário : ```teste@phovi.com```.<br>
**Task 1 -> ok.**
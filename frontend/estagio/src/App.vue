!<template>
  <div id = "app">
    <div class="container">
        <h1>Lista de usuários</h1>
        <b>Endereço</b>
        <!-- TABELA de Usuario -->
        <table witht="100%">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Data nascimento</th>
              <th>Email</th>
              <th>Rua</th>
              <th>Numero</th>
              <th>Bairro</th>
              <th>Remover</th>
              <th>Atualizar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for=" user in users" v-bind:key="user.id">

              <td>{{user.nome}}</td>
              <td>{{(user.datanasc).substring(0,10)}}</td>
              <td>{{user.email}}</td>
              <td>{{user.rua}}</td>
              <td>{{user.numero}}</td>
              <td>{{user.bairro}}</td>
              <td>
                <button class="btnRemove" @click="removeUser(user.id)">Remover</button>
              </td>
              <td>
                <button id="btnUpdadte" class="btnAtt" @click="openModalUpdate(user.id)">Atualizar</button>
              </td>

            </tr>
          </tbody>
        </table>

        <!-- TABELA de Usuario -->

          <!-- MODAL ADD -->
        <div id="add">
          <button id="add" class="button" @click="openModal()">Adicionar usuário</button>

          <div id="simpleModal" class="modal">
            <div class="modal-content">
          
                <span class="closeBtn" @click="closeModal()">&times;</span>
              
                <div class="inputs">
                  <p>Nome</p>
                  <input type="input" placeholder="Ex: João da Silva" v-model="nome">
                  <p>Data de nascimento</p>
                  <input type="input" placeholder="Ex: 2001-06-30 (ano-mes-dia)" v-model="datanasc">
                  <p>Email</p>
                  <input type="input" placeholder="Ex: joao@joao.com" v-model="email">
                  <h2 class = "endereco">Seu endereço</h2>
                  <p>Rua</p>
                  <input type="input" placeholder="Ex: Rua 123" v-model="rua"> 
                  <p>Número</p>
                  <input type="input" placeholder="Ex: 321" v-model="numero">
                  <p>Bairro</p>
                  <input type="input" placeholder="Ex: Jardim Colonial" v-model="bairro">
                  <button class="btnAdd" @click="addUser()">Adicionar</button>
                 </div> 
            </div>

          </div>

        </div>
        <!-- ModalADD -->

        <!-- ModalUpdate -->
        <div id="update">
          <div id="simpleModalUp" class= "modal">
            <div class="modal-content">

              <span class="closeBtn" @click="closeModalUpdate()">&times;</span>
                <div class = "submit-form">
                  <div>
                    <p>Nome</p>
                    <input type="input"  v-model="nome" >
                    <p>Data de nascimento</p>
                    <input type="input" v-model="datanasc" >
                    <p>Email</p>
                    <input type="input" v-model="email">
                    <h2 class = "endereco">Seu endereço</h2>
                    <p>Rua</p>
                    <input type="input" v-model="rua"> 
                    <p>Número</p>
                    <input type="input" v-model="numero">
                    <p>Bairro</p>
                    <input type="input" v-model="bairro">
                    <button class="btnAttConfirm" @click="updateUser(id)">Atualizar</button>
                 </div> 
                </div>


            </div>
          </div>
        </div>

        <!-- ModalUpdate -->

    </div>
  </div>
</template>

<script>
import api from '../api'; /// api para fazer as requisições
let cont = 0; //contador que vai auxiliar no id de usuário

export default {
  
  data: function () {
    return {
    users: null,
    id: '',
    nome: '',
    datanasc: '',
    email: '',
    rua: '',
    numero: '',
    bairro: ''
    }
  
  },
  methods: {
    ///Retorna a lista de usuário
    async getUsers() {
      const response = await api.get('/');
      this.users = response.data.data;
    },
    //Abre o modal para adicional um usuário
    openModal() {
      const modal = document.getElementById('simpleModal');

      modal.style.display='block';
    },
    //Fecha o modal de adicionar um usuário
    closeModal() {
      const modal = document.getElementById('simpleModal');
      modal.style.display='none';
    },
    //Abre o modal para atualizar dados de um usuário
    openModalUpdate(id) {
      this.getUser(id);
      const modalUp = document.getElementById('simpleModalUp');
      modalUp.style.display = 'block';
      console.log('oi')
    },
    //Fecha o modal que atualiza dados de um usuário
    closeModalUpdate() {
      const modalUp = document.getElementById('simpleModalUp');
      modalUp.style.display = 'none';
            this.nome = '';
      this.email = '';
      this.datanasc = '';
      this.rua = '';
      this.numero = '';
      this.bairro = '';
    },
    //Retorna dados de apenas um usúario
    async getUser(id){
      const response = await api.get(`/user/${id}`)
      this.id = id;
      this.nome = response.data.data[0].nome;
      this.datanasc = (response.data.data[0].datanasc).substring(0,10);
      this.rua = response.data.data[0].rua;
      this.email = response.data.data[0].email;
      this.bairro = response.data.data[0].bairro;
      this.numero = response.data.data[0].numero;

    },

    //Adiciona um usuário
    async addUser() {
      
        const id = cont++;
        const nome = this.nome
        const datanasc = this.datanasc;
        const email = this.email;
        const rua = this.rua;
        const numero = parseInt(this.numero);
        const bairro = this.bairro;

      await api.post('/adduser', {
        id,
        nome,
        datanasc,
        email,
        rua,
        numero,
        bairro
      });
      alert('Usuario adicionado');
      this.closeModal();
      this.id = '';
      this.nome = '';
      this.email = '';
      this.datanas = '';
      this.rua = '';
      this.numero = '';
      this.bairro = '';
      this.getUsers();
    },

    //Remove um usuário
    async removeUser(id) {
    await api.delete(`/delete/${id}`);
    alert('Usuário deletado');
    this.getUsers();
    },

    //Atualiza dados de um usuário
    async updateUser(id) {
        console.log(id);
        const nome = this.nome
        const datanasc = this.datanasc;
        const email = this.email;
        const rua = this.rua;
        const numero = parseInt(this.numero);
        const bairro = this.bairro;

      await api.put(`/update/${id}`, {
        id,
        nome,
        datanasc,
        email,
        rua,
        numero,
        bairro
      })
      alert('Usuario alterado');
      this.closeModalUpdate();
      this.getUsers();
    }
  },

  mounted() {
    //Invocando função que retorna a lista de usuários
    this.getUsers();
  }
}
</script>

<style>
@font-face {
    font-family: 'RobotoMono';
    src: url("./fonts/RobotoMono-Thin.ttf");
}
* {
    font-family: "RobotoMono", monospace;
}

body {
    margin: 0;
}

#app{
  background: linear-gradient(to right, #bdc3c7, #2c3e50);
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  position:fixed;
  margin:0px;
  align-items: center;

}
h1 {
  font-size: x-large;
}
b{
margin-left: 47%;
font-size: 17px
}

.button {
  margin-left: 80%;
  border-radius: 5px;
  outline: none;
  width: 157px;
  height: 30px;
  background: #bdc3c7;
  text-align: center;
  top: 50%;
  position: relative;
  border:0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0%;
  margin-top: 15px;
}
.button:hover{
  background: #2c3e50;
}
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-content{
  background-color: white;
  margin: 20% auto;
  padding: 5px;
  margin-top: 5px;
  width: 255px;
  height:350px;
  flex-direction: row;
}


.closeBtn{
  color: #ccc;
  float: right;
  font-size: 30px;
}
.closeBtn:hover, .closeBtn:focus{
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
p{
  font-size: 10px;
  color: black;
  margin-bottom: 0cm;
  
}

h2 {
  font-size: 15px;
  align-self: center;
  justify-self: center;
  
}
input {
  font-size: 10px;
  width: 250px;
  height: 10px;
}
.btnAdd {

  border: 0;
  border-radius: 30px;
  margin-left: 90px;
  background-color: green;
  font-size: bold;
  outline: none;
  margin-top: 10px;
}
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
.btnRemove {
  background-color: red;
  border: 0;
  border-radius: 5px;
}
.btnAtt {
  background-color:lightcyan;
  border: 0;
  border-radius: 5px;
}
.btnAttConfirm {
  border: 0;
  border-radius: 30px;
  margin-left: 90px;
  background-color: green;
  font-size: bold;
  outline: none;
  margin-top: 10px;
}

</style>
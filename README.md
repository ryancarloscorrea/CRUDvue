# CRUDvue

//// CRIAR BANCO////
# Banco de dados MariaDB #

CREATE DATABASE testeestagio DEFAULT CHARACTER SET utf8;

#criando a tabela usuario
CREATE TABLE testeestagio.usuario (
	  id INTEGER (6) NOT NULL,
	  nome VARCHAR (100) NOT NULL,
    datanasc DATE NOT NULL,
    email VARCHAR (50) NOT NULL,
    rua VARCHAR (50) NOT NULL,
    numero INTEGER (7) NOT NULL,
    bairro VARCHAR (50) NOT NULL,
    PRIMARY KEY (id)
);

#

/// Na pasta backend, em index
da linha 13 a 18, substitua as informações, para a do seu banco pessoal.

Rode com "yarn dev"

/// Front-end
No arquivo api.js:
Em baseURL, coloque o rota que está rodando o backend;

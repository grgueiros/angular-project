# Angular

Projeto desenvolvido utilizando o Angular. Consiste em uma aplicação de fotos, que consome uma API, tem um sistema de login que permite identificar o usuário ou registrá-lo. É capaz de adicionar novas fotos (autorizando ou não a adição de comentários), removê-las e ver comentários. Possui uma página que lista as fotos do usuário, e uma que detalha as fotos, mostrando número de "likes" e comentários.

### Login

O Sistema de login basea-se no token que é gerado pelo back-end para cada usuário gerado. A partir deste token que recebemos na resposta da requisição e a aplicação devolve no cabeçalho de todas as requisições feitas a partir de que o login  identificado. Esse processo é feito através de um interceptor que, através do service, sabe se o login foi feito e a partir daí, envia o token no corpo de todas as requisições.


(projeto desenvolvido no decorrer do curso de Angular da Alura - cursos de Tecnologia)

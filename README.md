# RadixThemes UI
O RadixThemes é um serviço para pesquisa de assuntos e de palavras que possam ser de seu interesse. Este é a parte relativa ao tela de aplicação, e a parte de back-end do serviço está disponível em: https://github.com/phebueno/radix-themes-backend.

<p align="center">
  <img src="themes.PNG?raw=true" width="450" alt="themes page"/>
  <img src="links.PNG?raw=true" width="450" alt="links page"/>
</p>

## Sobre
Esta é uma aplicação que dispõe de duas telas: uma para cadastro e visualização de Assuntos, e a outra para visualização de Links associados. Após o cadastro de um assunto, o mesmo pode tentar realizar a pesquisa, que é enviada posteriormente para a API da GDELT 2.0 API, cuja documentação está disponível em https://blog.gdeltproject.org/gdelt-doc-2-0-api-debuts/. Quando bem sucedida a pesquisa, o usuário tem a opção de visualizar as notícias relacionadas à sua pesquisa. Tanto a página de visualização de Assuntos quanto de Links conta com paginação infinita, o que auxília na usabilidade do usuário!

**DICA:** a API da GDELT faz muitas consultas internacionais, então são recomendadas o uso de consultas na língua inglesa! 

## Tecnologias
Foram utilizadas as seguintes ferramentas para a construção deste app:<br>

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)!

## Como rodar

1. Clone este repositório
2. Clone o repositório de back-end em https://github.com/phebueno/radix-themes-backend
3. Siga as intruções para preparar o back-end em https://github.com/phebueno/radix-themes-backend
4. Crie um .env com a variável VITE_BASE_API_URL com a conexão para o seu servidor back-end, de acordo com o .env.example
5. Instale dependências
```bash
npm i
```
6. Rode o front-end com
```bash
npm run dev
```
7. Opcionalmente, monte uma build nova do projeto com
```bash
npm run build
```
8. Finalmente, acesse http://localhost:5173 no seu navegador favorito!

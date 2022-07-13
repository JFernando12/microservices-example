const commentsById = {
  10: [
    { id: 1, text: "Hola mundo" },
    { id: 2, text: "Que tal mundo" },
    { id: 3, text: "Adios mundo" },
  ],
  11: [
    { id: 1, text: "Hola mundo" },
    { id: 2, text: "Que tal mundo" },
    { id: 3, text: "Adios mundo" },
  ]
};
console.log(commentsById);
const comments = commentsById[10];

const comment = comments.find((comment) => comment.id === 2);
console.log("Comentario filtrado: ", comment);

comment.text = "jeje";

console.log("Comentario filtrado modificado: ", comment);
console.log(commentsById);

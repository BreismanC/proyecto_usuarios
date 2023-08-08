const app = require("./app");
const sequelize = require("./database/database");

// require("./models/usuarios")

const PORT = 3000;

/* CONSULTAR PARA QUE SIRVE MORGAN Y EL USO DE ESTOS MIDDLEWARES
//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
*/

async function main() {
  try {
    await sequelize.sync({ force: false });
    console.log("Conexion establecida correctamente");

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();

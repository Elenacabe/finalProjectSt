| URL                   | Description                                                     | API          | Protected  |
|-----------------------|-----------------------------------------------------------------|--------------|------------|
| `/`                   | Inicio                                                          |              |            |
| `/signUp`             | Registro                                                        |              |            |
| `/logIn`              | Log-in                                                          |              |            |
| `/logOut`             | Log-out                                                         | USER         | isLogged   |
| `/concursos`          | Listado de concursos                                            | CONTEST      |            |
| `/concursos/_id`      | Detalles concursos con relatos                                  | CONTEST      |            |
| `/users`              | Listado USERS                                                   | USER         | isLogged   |
| `/users/_id`          | Detalle USER, link a relatos                                    | USER,CONTEST | isLogged   |
| `/ranking`            | USER con más votos                                              | USER         | isLogged   |
| `/microrrelatos`      | Lista de microrelatos                                           | USER,CONTEST |            |
| `/microrrelatos/_id/` | Detalle de microrrelatos, creator, comments, votos,isInContest? | USER         |            |
| `/microrrelatos/_id/edit` | Editar contenido relato o título                            | USER         |isLogged/isOwner     |
| `/microrrelatos/crear`| Crear microrelato                                               | USER         | isLogged   |

import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Put,
  Patch,
  Req,
  Res,
} from '@nestjs/common';
import { FriendsService } from './friends.service';

// Este é /friends controller. Acesse através de http://localhost:8002/friends ou http://127.0.0.1:8002
@Controller('/friends')
export class FriendsController {
  // Import do friends service. Acesse seus dados através do this.service no conteúdo abaixo.
  constructor(private readonly service: FriendsService) {}

  @Get()
  async getAll(@Req() req: any, @Res() res: any) {
    const friends = this.service.getAll();
    // Variável friend recebe o valor de getAll que está contido no 'FriendsController', que retorna friends do service.
    // LEMBRANDO QUE THIS.SERVICE.GETALL SIGNIFICA QUE ESTÁ CHAMANDO DO CONSTRUTOR, MESMO QUE EXISTA JÁ A FUNÇÃO GETALL AQUI.

    res.status(HttpStatus.OK).json(friends);
    // 'res' no caso, a resposta que é enviada, está retornando a variável 'friends', contendo a lista de amigos.
  }

  @Get('/:name')
  // Especificando que você precisa receber o parametro 'name' no url
  async getByName(@Req() req: any, @Res() res: any) {
    const name = req.params.name;
    // O dado recebido do 'url' está sendo armazenado nessa variável, sendo 'req' a requisição, 'params' o parametro inserido, e 'name', o nome

    const found = this.service.getByName(name);
    // const found está recebendo o valor de 'name' que está em getByName < Efetivamente, o nome do amigo pesquisado

    res.status(HttpStatus.OK).json(found);
    // Respondendo com o nome do amigo e suas informações, que estão contidas na variável found
  }

  @Put()
  async addFriend(@Req() req: any, @Res() res: any) {
    const addFriend = req.body;
    // Recebendo os dados do body ( podendo ser: nome, idade, genero e desejo nesse exemplo ) e atribuindo seus valores a variável addFriend.

    this.service.addFriend(addFriend);
    // Chamando addFriend do FriendService, e passando seus valores.

    res.status(HttpStatus.OK).json({ success: true });
    // Retorna resultado positivo
  }

  @Patch('/:name')
  // Recebe nome do amigo que deseja alterar
  async updateFriend(@Req() req: any, @Res() res: any) {
    const nameFriend = req.params.name;
    // Salvando o nome do amigo a ser alterado na variável nameFriend, para uso na função

    const editFriend = req.body;
    // Salvando os dados a serem alterados do amigo em especifico, dando o valor de 'body' a variável 'editFriend'

    this.service.updateFriend(nameFriend, editFriend);
    // Chama a função com os novos valores

    res.status(HttpStatus.OK).json({ success: true });
  }

  @Delete('/:name')
  async deleteByNickname(@Req() req: any, @Res() res: any) {
    const deleteByName = req.params.name;
    // Novamente estou atribuindo o valor do parametro da url na variável deleteByName, para armazenar o dado e usa-lo.

    this.service.deleteFriend(deleteByName);
    // Chamando a função para confirmar a remoção do nome

    res.status(HttpStatus.OK).json({ success: true });
  }
}

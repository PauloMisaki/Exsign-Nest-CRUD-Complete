import { Injectable } from '@nestjs/common';
import { Friend } from './friend.interface';

let friends: Friend[] = [
  { name: 'Davi', age: 22, gender: 'Man', wish: 'Disco' },
  { name: 'Misakiti', age: 22, gender: 'Man', wish: 'Cloth' },
  { name: 'Kayle', age: 29, gender: 'Mulher', wish: 'Keyboard' },
  { name: 'Stephanie', age: 28, gender: 'Mulher', wish: 'Microphone' },
];

@Injectable()
export class FriendsService {
  getAll() {
    return friends;
    // Por ser um comando não especifico, ou seja, não deseja filtrar os dados ou realizar qualquer alteração,
    // O service só precisa retornar a variável friends.
  }

  getByName(name) {
    const found = friends.find(friend => {
      // friends.find procura o nome no array Friends e retorna o resultado na variável 'found'
      return name.toLowerCase() === friend.name.toLowerCase();
      // Aqui é especificado que a found vai retornar o nome que for igual ao parâmetro 'name'
      // toLowerCase faz com que ele ignore o 'case sensitive'
    });
    return found;
    // E, por fim, retorna o 'found' para o controller
  }

  addFriend(addFriend) {
    friends = [...friends, addFriend];
    // Aqui estou dizendo que friends agora tem o valor de todos os amigos atuais MAIS o que estiver contido na addFriend.
  }

  updateFriend(nameFriend, editFriend) {
    friends.forEach(friend => {
      // friends.forEach(friend => {}) vai passar a função feita para cada friend presente na lista

      if (friend.name == nameFriend) {
        // if vai verificar o name do friend na lista, e, se tiver o mesmo valor de nameFriend, realizará a função abaixo

        const { name, age, gender, wish } = editFriend;
        friend.name = name ? name : friend.name;
        friend.age = age ? age : friend.age;
        friend.gender = gender ? gender : friend.gender;
        friend.wish = wish ? wish : friend.wish;
        // A const especifica os possíveis parâmetros que editFriend pode receber
        // Em seguida, é feita a verificação se tem alguma informação no parâmetro, e se diverge da atual
        // Se a ultima for verdadeira, realiza a atualização
      }
    });
  }

  deleteFriend(deleteByName) {
    // 'deleteByName' = valor do nome, armazenado na variável

    const newList = friends.filter(friend => {
      // Variável vai filtrar e remover o amigo de nome igual

      return deleteByName !== friend.name;
      // filter retorna os elementos que cumprem um requisito espeficado, no caso, o requisito é ser DIFERENTE do nome em 'deleteByName'
      // Sendo assim, ele retorna todos os outros nomes que NÃO SERÃO DELETADOS, efetivamente, excluindo o deletado da lista
    });
    friends = newList;
    // E, por fim, diz que friends agora contém o que está na variável newList, que está sem o nome a ser deletado
  }
}

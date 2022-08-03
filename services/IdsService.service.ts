export class HandleIdsService {
  static createUniqueId = () => {
    return (Math.floor(Math.random() * 100) + Date.now()).toString();
  };
}

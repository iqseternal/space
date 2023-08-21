
export class SingleInstanceService {
  private static instance?: SingleInstanceService;

  static getInstance() {
    if (!SingleInstanceService.instance) SingleInstanceService.instance = new SingleInstanceService();
    return SingleInstanceService.instance;
  }
}

export class A extends SingleInstanceService {

}

const a = A.getInstance();

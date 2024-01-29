import { IAuthRepository } from "../../../Repositories/Auth/IAuthRepository";

class SetExpiredTokensFalseUseCase {
  private readonly _repository: IAuthRepository;

  constructor(repository: IAuthRepository) {
    this._repository = repository;
  }

  async execute() {
    await this._repository.setExpiredTokensFalse(30);
  }
}

export { SetExpiredTokensFalseUseCase };

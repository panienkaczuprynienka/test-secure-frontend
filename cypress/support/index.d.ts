import { User } from "../util/userProvider";

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Promise<string>;
      register(username: string, password: string, firstName: string, lastName: string, email: string): void;
      deleteUser(username: string, jwtToken: string): void;
      mockLogin(user: User): void;
    }
  }
}

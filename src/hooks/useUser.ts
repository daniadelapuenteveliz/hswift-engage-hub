import { useAuth } from 'react-oidc-context';

export class User {
  auth = useAuth();
  data = this.auth.user;
  public getPlan() {
    return this.auth.user?.profile['custom:plan'] || 'free';
  }
  public getAuth() {
    return this.auth;
  }
}
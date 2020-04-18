import { Injectable } from '@angular/core';
import { TokenService } from '../auth/token/token.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './user';
import * as jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root'})
export class UserService {
   

    private userSubject = new BehaviorSubject<User>(null);
    private userName: string;
    private userId: number;

    constructor(private tokenService: TokenService) {
        
        if(this.tokenService.hasToken()) this.decodeAndNotify();
    }

    setToken(token: string) {
        this.tokenService.setToken(token);
        this.decodeAndNotify();
    }

    getUser(): Observable<User>{
        return this.userSubject.asObservable();
    }

    logout(){
        this.tokenService.removeToken();
        this.userSubject.next(null);
    }
    
    private decodeAndNotify(){
        const token = this.tokenService.getToken()
        const user = jwt_decode(token) as User;
        this.userName = user.name;
        this.userId = user.id;
        this.userSubject.next(user);
    }

    isLogged() : boolean {
        return this.tokenService.hasToken();
    }

    getUserName(): string {

        return this.userName;
    }

    getUserId(): number {

        return this.userId;
    }
}
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Photo } from './photo';
import { PhotoComment } from './photo-comment';

const API = 'http://localhost:3000/'

@Injectable({ providedIn: 'root' })
export class PhotoService {

    constructor(
        private http: HttpClient,
    ) { }

    listFromUser(username: string): Observable<Photo[]> {


        return this.http
            .get<Photo[]>(`${API}${username}/photos`)
    }

    listFromUserPaginated(username: string, page: number): Observable<Photo[]> {

        const params: HttpParams = new HttpParams()
            .append('page', page.toString());



        return this.http
            .get<Photo[]>(`${API}${username}/photos`, { params });
    }

    upload(description: string, allowComments: boolean, file: File) {

        let formData = new FormData();
        formData.append('description', description);
        formData.append('allowComments', allowComments ? 'true' : 'false');
        formData.append('imageFile', file)

        return this.http.post(
            API + 'photos/upload', 
            formData,
             {
                 observe: 'events', 
                 reportProgress: true 
            })

    }

    getPhotoById(id: number): Observable<Photo> {

        return this.http.get<Photo>(API + 'photos/' + id);
    }

    getCommentsById(id: number): Observable<PhotoComment[]> {

        return this.http.get<PhotoComment[]>(API + 'photos/' + id + '/comments');

    }

    addComment(photoId: number, commentText: string) {

        return this.http
            .post(
                API + 'photos/' + photoId + '/comments',
                { commentText }
            )
    }

    removePhoto(photoId: number){

        return this.http.delete(API + 'photos/' + photoId);

    }

    addLike(photoId: number){

        return this.http.post(API + 'photos/' + photoId + '/like', {}, {observe: 'response'})
    }





}
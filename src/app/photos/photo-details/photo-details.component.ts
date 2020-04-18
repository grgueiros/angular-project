import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';
import { UserService } from 'src/app/core/user/user.service';
import { AlertService } from 'src/app/core/alert/alert.service';


@Component({

    templateUrl: './photo-details.component.html',
    styleUrls: ['photo-details.component.css']

})
export class PhotoDetailsComponent implements OnInit {

    photo$: Observable<Photo>;

    photoId: number;

    isTheSameUser$: Observable<boolean>;


    constructor(
        private route: ActivatedRoute,
        private photoService: PhotoService,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService
    ) { }


    ngOnInit(): void {
        this.photoId = this.route.snapshot.params.photoId;

        this.photo$ = this.photoService.getPhotoById(this.photoId);
        this.photo$.subscribe(()=>{}, err=> {
            console.log(err);
            this.router.navigate(['not-found']);
        })

        this.isTheSameUser$ = this.photoService
            .getPhotoById(this.photoId)
            .pipe(map(photo => {
                if (photo.userId == this.userService.getUserId()) {
                    return true
                } else {
                    return false
                }
            }))
    }

    remove() {
        this.photoService
            .removePhoto(this.photoId)
            .subscribe(() => {
                this.alertService.success('Foto removida com sucesso');
                this.router.navigate(['']);
            })
    }

    like(){
        
        this.photoService.addLike(this.photoId)
        .subscribe(() => {
            this.alertService.success("Your like was successfully shared =)")
            this.photo$ = this.photoService.getPhotoById(this.photoId);
            },
            err => {
                if(err.status == '304'){
                    this.alertService.info("Your like was already sent")
                } else {
                    this.alertService.danger("Connection failed, try again later")
                    throwError(err);
                }
            }
            )
    }

}
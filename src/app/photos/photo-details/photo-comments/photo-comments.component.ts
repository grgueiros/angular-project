import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { PhotoComment } from '../../photo/photo-comment';
import { PhotoService } from '../../photo/photo.service';
import { loginRequiredValidator } from 'src/app/shared/validators/loginRequired.validator';

@Component({
    selector: 'ap-photo-comments',
    templateUrl: './photo-comments.component.html',
    styleUrls: ['photo-comments.css']
})
export class PhotoCommentsComponent implements OnInit {

    photoId: number;
    commentForm: FormGroup;
    comments$: Observable<PhotoComment[]>;

    constructor(
        private photoService: PhotoService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private loginValidator: loginRequiredValidator

    ) { }



    ngOnInit(): void {
        this.photoId = this.route.snapshot.params.photoId;
        this.comments$ = this.photoService.getCommentsById(this.photoId)

        this.commentForm = this.formBuilder.group({
            text: ['', [
                Validators.required,
                Validators.maxLength(300),
                this.loginValidator.validate()
            ]
            ]
        })
    }

    uploadComment() {
        this.comments$ = this.photoService
            .addComment(this.photoId, this.commentForm.get('text').value)
//          Troca o fluxo do Observable, que agora devolverá o valor retornado pelo
//          callbak do switchMap
            .pipe(switchMap(() => this.photoService.getCommentsById(this.photoId)))
//          Executa m código arbitrário que não influencia no retorno do Observable 
            .pipe(tap(() => this.commentForm.reset()))
    }

}
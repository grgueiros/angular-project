import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PhotoService } from '../photo/photo.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/alert/alert.service';
import { HttpEventType, HttpResponse, HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  uploadForm: FormGroup
  file: File;
  preview: string = "";
  percent: number = 0;

  constructor(
      private formBuilder: FormBuilder,
      private photoService: PhotoService,
      private router: Router,
      private alertService: AlertService
    ) { }

  ngOnInit() {

    this.uploadForm = this.formBuilder.group({
      
      image:['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]


    })
  }

  upload(){

    const description = this.uploadForm.get('description').value;
    const allowComments = this.uploadForm.get('allowComments').value;

    this.photoService
      .upload(description,allowComments,this.file)
      .subscribe( (event:HttpEvent<any>) => {
        if(event.type == HttpEventType.UploadProgress){
            this.percent = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse){
          this.alertService.success('Photo successfully added');
          this.router.navigate(['']);
        }
      },
      err => console.log(err));
  }

  handleFile(file: File){
    this.file = file;

    const fileReader = new FileReader();
    fileReader.onload = () => this.preview = fileReader.result as string;
    fileReader.readAsDataURL(file);


  }

}

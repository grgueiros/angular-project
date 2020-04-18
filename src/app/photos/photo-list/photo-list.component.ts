import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo/photo';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from '../photo/photo.service';
import { LoadingService } from 'src/app/shared/component/loading/loading.service';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];

  filter: string = '';
  hasMore: boolean = true;
  userName: string = '';
  currentPage: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private service: PhotoService,
    private loadingService: LoadingService
    
    ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe(params => {
        this.userName = params.userName;
        this.photos = this.activatedRoute.snapshot.data['photos'];
      })
  }
  load() {

    this.service
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
        this.filter = '';
        this.photos = this.photos.concat(photos)
        if (!photos.length) this.hasMore = false;
      });

  }
}


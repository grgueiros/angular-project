import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Photo } from '../../photo/photo';
import { Router } from '@angular/router';

@Component({
    
    selector: 'ap-photos',
    templateUrl: './photos.component.html'
})
export class PhotosComponent implements OnChanges {

    
    @Input() photos: Photo[] = [];
    rows = [];
    
    constructor(private router: Router) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.photos)
            this.rows = this.groupCollumns(this.photos);
    }
    
    groupCollumns(photos: Photo[]) {
        let newRows = [];

        for(let index = 0; index < photos.length; index+=3)
            newRows.push(photos.slice(index,index + 3))
        
        return newRows;
    }

    redirectToPhoto(photo: Photo): void{
        this.router.navigate(['photo',photo.id]);
    }
}

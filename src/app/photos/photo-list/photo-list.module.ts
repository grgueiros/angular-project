import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoListComponent } from './photo-list.component';
import { LoadButtonComponent } from './load-button/load-button.component';
import { FilterByDesciption } from './filter-by-description.pipe';
import { PhotosComponent } from './photos/photos.component';
import { PhotoModule } from '../photo/photo.module';
import { CardModule } from 'src/app/shared/component/card/card.module';
import { SearchModule } from './search/search.module';
import { DarkenOnHoverModule } from 'src/app/shared/directives/darken-on-hover/darken-on-hover.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations:[
        PhotoListComponent,
        PhotosComponent,
        FilterByDesciption,
        LoadButtonComponent
    ],
    imports: [
        CommonModule,
        PhotoModule,
        CardModule,
        SearchModule,
        DarkenOnHoverModule,
        RouterModule
    ]
})
export class PhotoListModule { }
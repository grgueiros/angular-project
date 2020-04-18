import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoListModule } from './photo-list/photo-list.module';
import { PhotoModule } from './photo/photo.module';
import { SearchModule } from './photo-list/search/search.module';
import { PhotoDetailsModule } from './photo-details/photo-details.module';



@NgModule({
    
    declarations: [],
    imports : [ 
        CommonModule,
        PhotoModule,
        PhotoFormModule,
        PhotoListModule,
        SearchModule,
        PhotoDetailsModule
     ]
})
export class PhotosModule { }
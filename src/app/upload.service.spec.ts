import { TestBed } from '@angular/core/testing';

import { UploadService } from './upload.service';
import { MzToastModule } from 'ngx-materialize';
import { RouterTestingModule } from '@angular/router/testing';

describe('UploadService', () => {
    beforeEach(() => TestBed.configureTestingModule({ imports: [MzToastModule, RouterTestingModule] }));

    it('should be created', () => {
        const service: UploadService = TestBed.get(UploadService);
        expect(service).toBeTruthy();
    });
});

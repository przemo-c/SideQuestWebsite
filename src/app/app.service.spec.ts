import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';
import { MzToastModule } from 'ngx-materialize';

describe('AppService', () => {
    beforeEach(() => TestBed.configureTestingModule({ imports: [MzToastModule] }));

    it('should be created', () => {
        const service: AppService = TestBed.get(AppService);
        expect(service).toBeTruthy();
    });
});

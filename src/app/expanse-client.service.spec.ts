import { TestBed } from '@angular/core/testing';

import { ExpanseClientService } from './expanse-client.service';
import { MzToastModule } from 'ngx-materialize';

describe('ExpanseClientService', () => {
    beforeEach(() => TestBed.configureTestingModule({ imports: [MzToastModule] }));

    it('should be created', () => {
        const service: ExpanseClientService = TestBed.get(ExpanseClientService);
        expect(service).toBeTruthy();
    });
});

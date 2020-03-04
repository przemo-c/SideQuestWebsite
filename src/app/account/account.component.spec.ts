import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountComponent } from './account.component';
import { NotOverNinePipe } from '../not-over-nine.pipe';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FromNowPipe } from '../from-now.pipe';
import { MzTextareaModule, MzModalModule, MzIconModule, MzButtonModule, MzIconMdiModule, MzToastModule } from 'ngx-materialize';
import { ExpanseClientService } from '../expanse-client.service';

class MockExpanseClientService extends ExpanseClientService {
    async getCurrentSession() {
        return { token: 'invaid-token' };
    }
}

describe('AccountComponent', () => {
    let component: AccountComponent;
    let fixture: ComponentFixture<AccountComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                FormsModule,
                MzTextareaModule,
                MzModalModule,
                MzIconModule,
                MzButtonModule,
                MzIconMdiModule,
                MzToastModule,
            ],
            declarations: [AccountComponent, NotOverNinePipe, FromNowPipe],
            providers: [{ provide: ExpanseClientService, useClass: MockExpanseClientService }],
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(AccountComponent);
        component = fixture.componentInstance;
        await component.expanseService.refreshSession();
        fixture.detectChanges();
    });

    afterEach(() => {
        fixture = null;
        component = null;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

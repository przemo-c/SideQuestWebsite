import { TestBed, async } from '@angular/core/testing';

import { AppService } from './app.service';
import { MzToastModule } from 'ngx-materialize';
import { ExpanseClientService } from './expanse-client.service';

class MockModal {
    openModal() {}
    closeModal() {}
}

describe('AppService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [MzToastModule] });
        localStorage.clear();
    });

    it('should be created', () => {
        const service: AppService = TestBed.get(AppService);
        expect(service).toBeTruthy();
    });

    it('initializes the app index', () => {
        const service = TestBed.get<AppService>(AppService);
        expect(JSON.stringify(service.app_index)).toEqual('{}');
    });

    it('can persist and then loads the persisted app index', () => {
        const service = TestBed.get<AppService>(AppService);
        const exampleAppIndex = { 1: 'app1', 2: 'app2' };
        expect(service.app_index).toBeTruthy();
        expect(service.app_index[1]).not.toEqual('app1');
        expect(service.app_index[2]).not.toEqual('app2');
        service.app_index = exampleAppIndex;
        expect(service.app_index[1]).toEqual('app1');
        expect(service.app_index[2]).toEqual('app2');
        service.saveAppMeta();
        expect(service.app_index[1]).toEqual('app1');
        expect(service.app_index[2]).toEqual('app2');
        service.app_index = null;
        expect(service.app_index).toBeFalsy();
        service.loadAppIndex();
        expect(service.app_index).toBeTruthy();
        expect(service.app_index[1]).toEqual('app1');
        expect(service.app_index[2]).toEqual('app2');
    });

    it('initializes the app meta dictionary', () => {
        const service = TestBed.get<AppService>(AppService);
        expect(JSON.stringify(service.app_meta)).toEqual('{}');
    });

    it('can persist and then loads the persisted app meta', () => {
        const service = TestBed.get<AppService>(AppService);
        const exampleAppMeta = { 1: { v: 0, c: 1, d: 2, ct: 3, vc: 4 }, 2: { v: 100, c: 1000, d: 20000, ct: 300000, vc: null } };
        expect(service.app_meta).toBeTruthy();
        expect(service.app_meta[1]).not.toBeTruthy();
        service.app_meta = exampleAppMeta;
        expect(service.app_meta).toBeTruthy();
        expect(service.app_meta[1]).toBeTruthy();
        expect(service.app_meta[1].vc).toEqual(4);
        expect(service.app_meta[2]).toBeTruthy();
        expect(service.app_meta[2].v).toEqual(100);
        service.saveAppMeta();
        expect(service.app_meta).toBeTruthy();
        expect(service.app_meta[1]).toBeTruthy();
        expect(service.app_meta[1].vc).toEqual(4);
        expect(service.app_meta[2]).toBeTruthy();
        expect(service.app_meta[2].v).toEqual(100);
        service.app_meta = null;
        expect(service.app_meta).toBeFalsy();
        service.loadAppMeta();
        expect(service.app_meta).toBeTruthy();
        expect(service.app_meta[1]).toBeTruthy();
        expect(service.app_meta[1].vc).toEqual(4);
        expect(service.app_meta[2]).toBeTruthy();
        expect(service.app_meta[2].v).toEqual(100);
    });

    it('initializes the event meta dictionary', () => {
        const service = TestBed.get<AppService>(AppService);
        expect(JSON.stringify(service.event_meta)).toEqual('{}');
    });

    it('can persist and then loads the persisted event meta', () => {
        const service = TestBed.get<AppService>(AppService);
        const exampleEventMeta = { 1: { v: 0, ct: 1, a: 1, l: 1 }, 2: { v: 1, ct: 0, a: 1, l: 1 } };
        expect(service.event_meta).toBeTruthy();
        expect(service.event_meta[1]).not.toBeTruthy();
        service.event_meta = exampleEventMeta;
        expect(service.event_meta).toBeTruthy();
        expect(service.event_meta[1]).toBeTruthy();
        expect(service.event_meta[1].ct).toEqual(1);
        expect(service.event_meta[2]).toBeTruthy();
        expect(service.event_meta[2].a).toEqual(1);
        service.saveAppMeta();
        expect(service.event_meta).toBeTruthy();
        expect(service.event_meta[1]).toBeTruthy();
        expect(service.event_meta[1].ct).toEqual(1);
        expect(service.event_meta[2]).toBeTruthy();
        expect(service.event_meta[2].a).toEqual(1);
        service.event_meta = null;
        expect(service.event_meta).toBeFalsy();
        service.loadAppMeta();
        expect(service.event_meta).toBeTruthy();
        expect(service.event_meta[1]).toBeTruthy();
        expect(service.event_meta[1].ct).toEqual(1);
        expect(service.event_meta[2]).toBeTruthy();
        expect(service.event_meta[2].a).toEqual(1);
    });

    it('initializes the space meta dictionary', () => {
        const service = TestBed.get<AppService>(AppService);
        expect(JSON.stringify(service.space_meta)).toEqual('{}');
    });

    it('can persist and then loads the persisted space meta', () => {
        const service = TestBed.get<AppService>(AppService);
        const exampleSpaceMeta = { 1: { v: 0, ct: 1, a: 1, l: 1 }, 2: { v: 1, ct: 0, a: 1, l: 1 } };
        expect(service.space_meta).toBeTruthy();
        expect(service.space_meta[1]).not.toBeTruthy();
        service.space_meta = exampleSpaceMeta;
        expect(service.space_meta).toBeTruthy();
        expect(service.space_meta[1]).toBeTruthy();
        expect(service.space_meta[1].ct).toEqual(1);
        expect(service.space_meta[2]).toBeTruthy();
        expect(service.space_meta[2].a).toEqual(1);
        service.saveAppMeta();
        expect(service.space_meta).toBeTruthy();
        expect(service.space_meta[1]).toBeTruthy();
        expect(service.space_meta[1].ct).toEqual(1);
        expect(service.space_meta[2]).toBeTruthy();
        expect(service.space_meta[2].a).toEqual(1);
        service.space_meta = null;
        expect(service.space_meta).toBeFalsy();
        service.loadAppMeta();
        expect(service.space_meta).toBeTruthy();
        expect(service.space_meta[1]).toBeTruthy();
        expect(service.space_meta[1].ct).toEqual(1);
        expect(service.space_meta[2]).toBeTruthy();
        expect(service.space_meta[2].a).toEqual(1);
    });

    it('clears authentication after logout', () => {
        const service = TestBed.get<AppService>(AppService);
        const expanseService = TestBed.get<ExpanseClientService>(ExpanseClientService);
        expanseService.currentSession = { token: 'a-fake-token' };
        service.isAuthenticated = true;
        service.logout(expanseService);
        expect(expanseService.currentSession).toBeNull();
        expect(service.isAuthenticated).toEqual(false);
    });

    it('opens a URL without opening a modal when embedded in the SQ app', async () => {
        const service = TestBed.get<AppService>(AppService);
        service.hideLogo = true;
        const spy = spyOn(service, 'retrySidequestUrl');
        expect(spy.calls.count()).toEqual(0);
        await service.openSidequestUrl('https://justanexample.url');
        expect(spy.calls.count()).toEqual(1);
    });

    it('opens a URL and attempts a confirmation when not embedded in the SQ app', async () => {
        const service = TestBed.get<AppService>(AppService);
        service.confirmOpen = new MockModal();
        service.hideLogo = false;
        service.urlConfirmDelay = 2;
        const spy = spyOn(service, 'retrySidequestUrl');
        let resolved = false;
        service.openSidequestUrl('https://justanexample.url').then(() => (resolved = true));
        expect(spy.calls.count()).toEqual(1);
        const beforeCheck = new Promise((resolve, reject) => {
            setTimeout(() => {
                expect(resolved).toEqual(false);
                resolve();
            }, (1 / 2) * service.urlConfirmDelay * 1000);
        });
        const afterCheck = new Promise((resolve, reject) => {
            setTimeout(() => {
                expect(resolved).toEqual(true);
                resolve();
            }, (3 / 2) * service.urlConfirmDelay * 1000);
        });
        return Promise.all([beforeCheck, afterCheck]);
    });

    it('has isEmbedded mirror the value of hideLogo', () => {
        const service = TestBed.get<AppService>(AppService);
        service.hideLogo = true;
        expect(service.isEmbedded).toEqual(true);
        service.hideLogo = false;
        expect(service.isEmbedded).toEqual(false);
    });
});

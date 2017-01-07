/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { RecipeCatalogComponent } from './recipe-catalog.component';

describe('RecipeCatalogComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecipeCatalogComponent
      ],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(RecipeCatalogComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    let fixture = TestBed.createComponent(RecipeCatalogComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(RecipeCatalogComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));
});

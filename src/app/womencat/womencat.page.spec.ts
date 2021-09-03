import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WomencatPage } from './womencat.page';

describe('WomencatPage', () => {
  let component: WomencatPage;
  let fixture: ComponentFixture<WomencatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomencatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WomencatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BagdetailPage } from './bagdetail.page';

describe('BagdetailPage', () => {
  let component: BagdetailPage;
  let fixture: ComponentFixture<BagdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BagdetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BagdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

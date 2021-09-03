import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JewelleryPage } from './jewellery.page';

describe('JewelleryPage', () => {
  let component: JewelleryPage;
  let fixture: ComponentFixture<JewelleryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JewelleryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JewelleryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShirtPage } from './shirt.page';

describe('ShirtPage', () => {
  let component: ShirtPage;
  let fixture: ComponentFixture<ShirtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShirtPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShirtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

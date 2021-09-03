import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WomenbagPage } from './womenbag.page';

describe('WomenbagPage', () => {
  let component: WomenbagPage;
  let fixture: ComponentFixture<WomenbagPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomenbagPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WomenbagPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

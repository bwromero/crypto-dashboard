import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreemapCellComponent } from './treemap-cell.component';

describe('TreemapCellComponent', () => {
  let component: TreemapCellComponent;
  let fixture: ComponentFixture<TreemapCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreemapCellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreemapCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BubbleViewHeaderComponent } from './bubble-view-header.component';

describe('BubbleViewHeaderComponent', () => {
  let component: BubbleViewHeaderComponent;
  let fixture: ComponentFixture<BubbleViewHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BubbleViewHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BubbleViewHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search change', () => {
    spyOn(component.searchChange, 'emit');
    component.onSearchChange('test');
    expect(component.searchChange.emit).toHaveBeenCalledWith('test');
  });

  it('should emit row limit change', () => {
    spyOn(component.rowLimitChange, 'emit');
    component.onRowLimitChange('20');
    expect(component.rowLimitChange.emit).toHaveBeenCalledWith('20');
  });

  it('should emit view mode change', () => {
    spyOn(component.viewModeChange, 'emit');
    component.onViewModeChange('list');
    expect(component.viewModeChange.emit).toHaveBeenCalledWith('list');
  });
});

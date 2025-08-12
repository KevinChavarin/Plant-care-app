import React from 'react';
import { 
  WaterNeed, 
  Habitat, 
  LightRequirement, 
  WATER_NEEDS, 
  HABITATS, 
  LIGHT_REQUIREMENTS 
} from '@/types/plant';

interface FilterPanelProps {
  isOpen: boolean;
  filters: {
    waterNeed?: WaterNeed[];
    habitat?: Habitat[];
    lightRequirement?: LightRequirement[];
    difficulty?: ('easy' | 'medium' | 'hard')[];
    isIndoor?: boolean;
  };
  onFiltersChange: (filters: FilterPanelProps['filters']) => void;
  onClearFilters: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  isOpen,
  filters,
  onFiltersChange,
  onClearFilters
}) => {
  if (!isOpen) return null;

  const handleWaterNeedChange = (waterNeed: WaterNeed, checked: boolean) => {
    const current = filters.waterNeed || [];
    const updated = checked 
      ? [...current, waterNeed]
      : current.filter(w => w !== waterNeed);
    onFiltersChange({ ...filters, waterNeed: updated });
  };

  const handleHabitatChange = (habitat: Habitat, checked: boolean) => {
    const current = filters.habitat || [];
    const updated = checked 
      ? [...current, habitat]
      : current.filter(h => h !== habitat);
    onFiltersChange({ ...filters, habitat: updated });
  };

  const handleLightChange = (light: LightRequirement, checked: boolean) => {
    const current = filters.lightRequirement || [];
    const updated = checked 
      ? [...current, light]
      : current.filter(l => l !== light);
    onFiltersChange({ ...filters, lightRequirement: updated });
  };

  const handleDifficultyChange = (difficulty: 'easy' | 'medium' | 'hard', checked: boolean) => {
    const current = filters.difficulty || [];
    const updated = checked 
      ? [...current, difficulty]
      : current.filter(d => d !== difficulty);
    onFiltersChange({ ...filters, difficulty: updated });
  };

  return (
    <div className="bg-card border-b border-border px-4 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-foreground">Filters</h3>
          <button
            onClick={onClearFilters}
            className="text-sm text-accent hover:text-accent-dark font-medium"
          >
            Clear filters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Water Need */}
          <div>
            <h4 className="font-medium text-foreground mb-2">Water Requirements</h4>
            <div className="space-y-2">
              {Object.entries(WATER_NEEDS).map(([key, value]) => (
                <label key={key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.waterNeed?.includes(key as WaterNeed) || false}
                    onChange={(e) => handleWaterNeedChange(key as WaterNeed, e.target.checked)}
                    className="rounded border-border focus:ring-accent"
                  />
                  <span className="text-sm text-foreground">{value.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Habitat */}
          <div>
            <h4 className="font-medium text-foreground mb-2">Habitat</h4>
            <div className="space-y-2">
              {Object.entries(HABITATS).map(([key, value]) => (
                <label key={key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.habitat?.includes(key as Habitat) || false}
                    onChange={(e) => handleHabitatChange(key as Habitat, e.target.checked)}
                    className="rounded border-border focus:ring-accent"
                  />
                  <span className="text-sm text-foreground">{value.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Light Requirement */}
          <div>
            <h4 className="font-medium text-foreground mb-2">Light Requirements</h4>
            <div className="space-y-2">
              {Object.entries(LIGHT_REQUIREMENTS).map(([key, value]) => (
                <label key={key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.lightRequirement?.includes(key as LightRequirement) || false}
                    onChange={(e) => handleLightChange(key as LightRequirement, e.target.checked)}
                    className="rounded border-border focus:ring-accent"
                  />
                  <span className="text-sm text-foreground">{value.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Other Filters */}
          <div>
            <h4 className="font-medium text-foreground mb-2">Other</h4>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Difficulty</p>
                {[
                  { key: 'easy', label: 'Easy' },
                  { key: 'medium', label: 'Medium' },
                  { key: 'hard', label: 'Hard' }
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.difficulty?.includes(key as 'easy' | 'medium' | 'hard') || false}
                      onChange={(e) => handleDifficultyChange(key as 'easy' | 'medium' | 'hard', e.target.checked)}
                      className="rounded border-border focus:ring-accent"
                    />
                    <span className="text-sm text-foreground">{label}</span>
                  </label>
                ))}
              </div>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.isIndoor === true}
                  onChange={(e) => onFiltersChange({ 
                    ...filters, 
                    isIndoor: e.target.checked ? true : undefined 
                  })}
                  className="rounded border-border focus:ring-accent"
                />
                <span className="text-sm text-foreground">Indoor only</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

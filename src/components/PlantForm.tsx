import React, { useState } from 'react';
import { Plant, WaterNeed, Habitat, LightRequirement, WATER_NEEDS, HABITATS, LIGHT_REQUIREMENTS } from '@/types/plant';
import { X, Save } from 'lucide-react';

interface PlantFormProps {
  plant?: Plant;
  isOpen: boolean;
  onClose: () => void;
  onSave: (plant: Omit<Plant, '_id'>) => void;
}

export const PlantForm: React.FC<PlantFormProps> = ({ 
  plant, 
  isOpen, 
  onClose, 
  onSave 
}) => {
  const [formData, setFormData] = useState<Omit<Plant, '_id'>>({
    name: plant?.name || '',
    scientificName: plant?.scientificName || '',
    description: plant?.description || '',
    waterNeed: plant?.waterNeed || 'mesophyte',
    habitat: plant?.habitat || 'temperate',
    lightRequirement: plant?.lightRequirement || 'partial-shade',
    imageUrl: plant?.imageUrl || '',
    careInstructions: {
      watering: plant?.careInstructions?.watering || '',
      fertilizing: plant?.careInstructions?.fertilizing || '',
      pruning: plant?.careInstructions?.pruning || '',
      temperature: plant?.careInstructions?.temperature || ''
    },
    difficulty: plant?.difficulty || 'medium',
    isIndoor: plant?.isIndoor || true,
    bloomingSeason: plant?.bloomingSeason || [],
    maxHeight: plant?.maxHeight || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleSeasonChange = (season: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      bloomingSeason: checked 
        ? [...(prev.bloomingSeason || []), season]
        : (prev.bloomingSeason || []).filter(s => s !== season)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-foreground">
              {plant ? 'Edit Plant' : 'New Plant'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Scientific Name
                </label>
                <input
                  type="text"
                  value={formData.scientificName}
                  onChange={(e) => setFormData(prev => ({ ...prev, scientificName: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description *
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            {/* Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Water Requirements *
                </label>
                <select
                  required
                  value={formData.waterNeed}
                  onChange={(e) => setFormData(prev => ({ ...prev, waterNeed: e.target.value as WaterNeed }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  {Object.entries(WATER_NEEDS).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Habitat *
                </label>
                <select
                  required
                  value={formData.habitat}
                  onChange={(e) => setFormData(prev => ({ ...prev, habitat: e.target.value as Habitat }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  {Object.entries(HABITATS).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Light Requirements *
                </label>
                <select
                  required
                  value={formData.lightRequirement}
                  onChange={(e) => setFormData(prev => ({ ...prev, lightRequirement: e.target.value as LightRequirement }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  {Object.entries(LIGHT_REQUIREMENTS).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Additional Properties */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Difficulty *
                </label>
                <select
                  required
                  value={formData.difficulty}
                  onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as 'easy' | 'medium' | 'hard' }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Max Height
                </label>
                <input
                  type="text"
                  value={formData.maxHeight}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxHeight: e.target.value }))}
                  placeholder="e.g. 1-2m"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>

              <div className="flex items-center space-x-2 pt-6">
                <input
                  type="checkbox"
                  id="isIndoor"
                  checked={formData.isIndoor}
                  onChange={(e) => setFormData(prev => ({ ...prev, isIndoor: e.target.checked }))}
                  className="rounded border-border focus:ring-accent"
                />
                <label htmlFor="isIndoor" className="text-sm font-medium text-foreground">
                  Indoor plant
                </label>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            {/* Blooming Seasons */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Blooming Season
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {['Spring', 'Summer', 'Fall', 'Winter'].map(season => (
                  <label key={season} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.bloomingSeason?.includes(season) || false}
                      onChange={(e) => handleSeasonChange(season, e.target.checked)}
                      className="rounded border-border focus:ring-accent"
                    />
                    <span className="text-sm text-foreground">{season}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Care Instructions */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Watering Instructions *
              </label>
              <textarea
                required
                rows={2}
                value={formData.careInstructions.watering}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  careInstructions: { 
                    ...prev.careInstructions, 
                    watering: e.target.value 
                  } 
                }))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Fertilizing
                </label>
                <textarea
                  rows={2}
                  value={formData.careInstructions.fertilizing}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    careInstructions: { 
                      ...prev.careInstructions, 
                      fertilizing: e.target.value 
                    } 
                  }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Pruning
                </label>
                <textarea
                  rows={2}
                  value={formData.careInstructions.pruning}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    careInstructions: { 
                      ...prev.careInstructions, 
                      pruning: e.target.value 
                    } 
                  }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Temperature
              </label>
              <input
                type="text"
                value={formData.careInstructions.temperature}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  careInstructions: { 
                    ...prev.careInstructions, 
                    temperature: e.target.value 
                  } 
                }))}
                placeholder="e.g. 18-24°C"
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3 pt-6 border-t border-border">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-border hover:bg-muted/10 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-accent hover:bg-accent-dark text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {plant ? 'Update' : 'Create'} Plant
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

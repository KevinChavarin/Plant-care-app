'use client';

import React, { useState, useEffect } from 'react';
import { Plant } from '@/types/plant';
import { Header } from '@/components/Header';
import { FilterPanel } from '@/components/FilterPanel';
import { PlantCard } from '@/components/PlantCard';
import { PlantForm } from '@/components/PlantForm';
import { Loader2, Sprout } from 'lucide-react';

export default function Home() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingPlant, setEditingPlant] = useState<Plant | undefined>();
  const [filters, setFilters] = useState<{
    waterNeed?: Plant['waterNeed'][];
    habitat?: Plant['habitat'][];
    lightRequirement?: Plant['lightRequirement'][];
    difficulty?: ('easy' | 'medium' | 'hard')[];
    isIndoor?: boolean;
  }>({});

  // Fetch plants
  const fetchPlants = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/plants');
      if (response.ok) {
        const data = await response.json();
        setPlants(data);
      }
    } catch (error) {
      console.error('Error fetching plants:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter and search plants
  useEffect(() => {
    let filtered = plants;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(plant => 
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.scientificName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filters
    if (filters.waterNeed?.length) {
      filtered = filtered.filter(plant => 
        filters.waterNeed!.includes(plant.waterNeed)
      );
    }

    if (filters.habitat?.length) {
      filtered = filtered.filter(plant => 
        filters.habitat!.includes(plant.habitat)
      );
    }

    if (filters.lightRequirement?.length) {
      filtered = filtered.filter(plant => 
        filters.lightRequirement!.includes(plant.lightRequirement)
      );
    }

    if (filters.difficulty?.length) {
      filtered = filtered.filter(plant => 
        filters.difficulty!.includes(plant.difficulty)
      );
    }

    if (filters.isIndoor === true) {
      filtered = filtered.filter(plant => plant.isIndoor);
    }

    setFilteredPlants(filtered);
  }, [plants, searchTerm, filters]);

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleSavePlant = async (plantData: Omit<Plant, '_id'>) => {
    try {
      const url = editingPlant ? `/api/plants/${editingPlant._id}` : '/api/plants';
      const method = editingPlant ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(plantData),
      });

      if (response.ok) {
        fetchPlants(); // Refresh the list
        setShowForm(false);
        setEditingPlant(undefined);
      }
    } catch (error) {
      console.error('Error saving plant:', error);
    }
  };

  const handleDeletePlant = async (plantId: string) => {
    if (!confirm('Are you sure you want to delete this plant?')) {
      return;
    }

    try {
      const response = await fetch(`/api/plants/${plantId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchPlants(); // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting plant:', error);
    }
  };

  const handleEditPlant = (plant: Plant) => {
    setEditingPlant(plant);
    setShowForm(true);
  };

  const handleAddPlant = () => {
    setEditingPlant(undefined);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-accent animate-spin mx-auto mb-4" />
          <p className="text-muted">Loading plants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        onAddPlant={handleAddPlant}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />

      {/* Filter Panel */}
      <FilterPanel
        isOpen={showFilters}
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={() => setFilters({})}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="mb-8">
          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  My Digital Garden
                </h2>
                <p className="text-muted">
                  {filteredPlants.length} of {plants.length} plants
                </p>
              </div>
              <div className="p-4 bg-accent/10 rounded-full">
                <Sprout className="w-8 h-8 text-accent" />
              </div>
            </div>
          </div>
        </div>

        {/* Plants Grid */}
        {filteredPlants.length === 0 ? (
          <div className="text-center py-12">
            <div className="p-4 bg-muted/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Sprout className="w-8 h-8 text-muted" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              {plants.length === 0 ? 'Start your garden!' : 'No plants match your filters'}
            </h3>
            <p className="text-muted mb-6">
              {plants.length === 0 
                ? 'Add your first plant to start caring for your digital garden.'
                : 'Try adjusting the filters or search term.'
              }
            </p>
            {plants.length === 0 && (
              <button
                onClick={handleAddPlant}
                className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Add First Plant
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlants.map((plant) => (
              <PlantCard
                key={plant._id}
                plant={plant}
                onEdit={handleEditPlant}
                onDelete={handleDeletePlant}
                onCareLog={() => {}} // TODO: Implement care logging
              />
            ))}
          </div>
        )}
      </main>

      {/* Plant Form Modal */}
      <PlantForm
        plant={editingPlant}
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingPlant(undefined);
        }}
        onSave={handleSavePlant}
      />
    </div>
  );
}

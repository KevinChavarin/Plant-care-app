# PlantCare - Aplicación de Cuidado de Plantas

Una aplicación web moderna para gestionar el cuidado de plantas con categorización avanzada según sus necesidades hídricas, hábitat y requerimientos de luz solar.

## 🌱 Características

### Categorización Avanzada
- **Necesidades de Riego**: Xerófitas, Mesófitas e Higrófitas
- **Hábitat**: Tropicales, Desérticas, Templadas, Mediterráneas, Subtropicales y Alpinas  
- **Luz Solar**: Sol directo, Semisombra y Sombra

### Funcionalidades
- ✅ CRUD completo de plantas
- ✅ Sistema de filtros avanzado
- ✅ Búsqueda inteligente
- ✅ Responsive design
- ✅ Paleta de colores "Brisa Neutra"
- ✅ Integración con MongoDB
- 🔄 Sistema de logging de cuidados (próximamente)
- 🔄 Recordatorios de riego (próximamente)
- 🔄 Calendario de cuidados (próximamente)

## 🎨 Diseño

La aplicación utiliza una paleta de colores minimalista llamada "Brisa Neutra":
- **Verde Salvia** (#9caf88): Color principal y acentos
- **Negro Suave** (#2c2c2c): Texto principal
- **Grises** (#6b6b6b, #d4d4d4): Texto secundario y bordes
- **Blancos** (#ffffff, #f8f8f8): Fondos y cards

## 🚀 Tecnologías

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Base de Datos**: MongoDB con Mongoose
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 📋 Prerequisitos

- Node.js 18+
- MongoDB (local o Atlas)
- npm o yarn

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repo>
   cd plant-care
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   
   Editar `.env.local` con tu URI de MongoDB:
   ```
   MONGODB_URI=mongodb://localhost:27017/plantcare
   ```

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 📊 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── api/               # API Routes
│   │   └── plants/        # Endpoints de plantas
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── Header.tsx         # Barra de navegación
│   ├── FilterPanel.tsx    # Panel de filtros
│   ├── PlantCard.tsx      # Tarjeta de planta
│   └── PlantForm.tsx      # Formulario de planta
├── lib/                   # Utilidades
│   └── mongodb.ts         # Conexión a MongoDB
├── models/                # Modelos de Mongoose
│   └── Plant.ts           # Modelo de Planta
├── types/                 # Tipos de TypeScript
│   └── plant.ts           # Tipos de planta
└── styles/               # Estilos globales
    └── globals.css       # CSS personalizado
```

## 🌿 Modelo de Datos

### Planta
```typescript
interface Plant {
  name: string;                    // Nombre común
  scientificName?: string;         // Nombre científico
  description: string;             // Descripción
  waterNeed: WaterNeed;           // xerophyte | mesophyte | hygrophyte
  habitat: Habitat;               // tropical | desert | temperate | etc
  lightRequirement: LightRequirement; // sun | partial-shade | shade
  careInstructions: {
    watering: string;
    fertilizing?: string;
    pruning?: string;
    temperature?: string;
  };
  difficulty: 'easy' | 'medium' | 'hard';
  isIndoor: boolean;
  bloomingSeason?: string[];
  maxHeight?: string;
  imageUrl?: string;
}
```

## 🎯 Próximas Características

- [ ] Sistema de logging de cuidados
- [ ] Recordatorios automáticos
- [ ] Calendario de actividades
- [ ] Exportar/Importar datos
- [ ] Galería de fotos
- [ ] Estadísticas de cuidado
- [ ] Compartir plantas en redes sociales
- [ ] Modo offline con PWA

## 🤝 Contribuir

1. Fork del proyecto
2. Crear branch de feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit cambios (`git commit -am 'Agregar nueva característica'`)
4. Push al branch (`git push origin feature/nueva-caracteristica`)
5. Crear Pull Request

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

## 🙏 Créditos

- Icons por [Lucide](https://lucide.dev/)
- Diseño inspirado en principios de diseño material y minimalista
- Paleta de colores "Brisa Neutra" - diseño original

---

**PlantCare** - Cuidado inteligente para plantas felices 🌱

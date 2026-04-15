import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // ── Títulos ──────────────────────────────────────────────
  await prisma.title.createMany({
    data: [
      // Desarrollo Web
      { titleName: 'Desarrollador Backend', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { titleName: 'Desarrollador Frontend', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { titleName: 'Desarrollador Full Stack', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      { titleName: 'DevOps Engineer', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { titleName: 'Mobile Developer', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg' },
      { titleName: 'UI/UX Designer', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },

      // Arte Digital 2D
      { titleName: 'Ilustrador Digital', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' },
      { titleName: 'Concept Artist', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' },
      { titleName: 'Character Designer', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' },
      { titleName: 'Motion Graphics Artist', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-plain.svg' },
      { titleName: 'Pixel Artist', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' },
      { titleName: 'Diseñador Gráfico', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg' },

      // Arte 3D
      { titleName: 'Modelador 3D', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg' },
      { titleName: 'Artista de Efectos Visuales (VFX)', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg' },
      { titleName: 'Animador 3D', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg' },
      { titleName: 'Environment Artist', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg' },
      { titleName: 'Character Artist 3D', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg' },
      { titleName: 'Technical Artist', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg' },

      // Música
      { titleName: 'Productor Musical', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg' },
      { titleName: 'Compositor', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg' },
      { titleName: 'Diseñador de Sonido', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg' },
      { titleName: 'Músico', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg' },
      { titleName: 'Mezclador y Masterizador', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg' },

      // Desarrollo de Videojuegos
      { titleName: 'Game Developer', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg' },
      { titleName: 'Game Designer', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg' },
      { titleName: 'Level Designer', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg' },
      { titleName: 'Narrative Designer', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg' },
      { titleName: 'Game Programmer', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg' },

      // Contenido y Redes
      { titleName: 'Creador de Contenido', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg' },
      { titleName: 'Video Editor', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-plain.svg' },
      { titleName: 'Streamer', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg' },
      { titleName: 'Community Manager', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg' },
      { titleName: 'Fotógrafo', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' },

      // Ciencia de Datos e IA
      { titleName: 'Data Scientist', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { titleName: 'Machine Learning Engineer', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
      { titleName: 'Data Analyst', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { titleName: 'AI Engineer', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
      { titleName: 'Data Engineer', titleIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg' },
    ],
    skipDuplicates: true,
  });

  // ── Categorías con tecnologías ────────────────────────────
  await prisma.techCategory.create({
    data: {
      techCategoryName: 'Backend',
      Technologies: {
        create: [
          { techName: 'NestJS',      imgURL: 'https://raw.githubusercontent.com/devicons/devicon/7330accdbc47e2dc0c19789a48533c4a3c50fe58/icons/nestjs/nestjs-original.svg' },
          { techName: 'Node.js',     imgURL: 'https://raw.githubusercontent.com/devicons/devicon/7330accdbc47e2dc0c19789a48533c4a3c50fe58/icons/nodejs/nodejs-original.svg' },
          { techName: 'Express',     imgURL: 'https://raw.githubusercontent.com/devicons/devicon/7330accdbc47e2dc0c19789a48533c4a3c50fe58/icons/express/express-original.svg' },
          { techName: 'Python',      imgURL: 'https://raw.githubusercontent.com/devicons/devicon/7330accdbc47e2dc0c19789a48533c4a3c50fe58/icons/python/python-original.svg' },
          { techName: 'PostgreSQL',  imgURL: 'https://raw.githubusercontent.com/devicons/devicon/7330accdbc47e2dc0c19789a48533c4a3c50fe58/icons/postgresql/postgresql-original.svg' },
          { techName: 'MySQL',       imgURL: 'https://raw.githubusercontent.com/devicons/devicon/7330accdbc47e2dc0c19789a48533c4a3c50fe58/icons/mysql/mysql-original.svg' },
        ],
      },
    },
  });
  console.log('✅ Categoría Backend creada');

  await prisma.techCategory.create({
    data: {
      techCategoryName: 'Frontend',
      Technologies: {
        create: [
          { techName: 'React',       imgURL: 'https://raw.githubusercontent.com/devicons/devicon/7330accdbc47e2dc0c19789a48533c4a3c50fe58/icons/react/react-original.svg' },
          { techName: 'Angular',     imgURL: 'https://raw.githubusercontent.com/devicons/devicon/7330accdbc47e2dc0c19789a48533c4a3c50fe58/icons/angularjs/angularjs-original.svg' },
          { techName: 'Vue',         imgURL: 'https://raw.githubusercontent.com/devicons/devicon/7330accdbc47e2dc0c19789a48533c4a3c50fe58/icons/vuejs/vuejs-original.svg' },
          { techName: 'TypeScript',  imgURL: 'https://raw.githubusercontent.com/devicons/devicon/7330accdbc47e2dc0c19789a48533c4a3c50fe58/icons/typescript/typescript-original.svg' },
          { techName: 'TailwindCSS', imgURL: 'https://raw.githubusercontent.com/devicons/devicon/7330accdbc47e2dc0c19789a48533c4a3c50fe58/icons/tailwindcss/tailwindcss-original.svg' },
          { techName: 'NextJS',      imgURL: 'https://raw.githubusercontent.com/devicons/devicon/7330accdbc47e2dc0c19789a48533c4a3c50fe58/icons/nextjs/nextjs-original.svg' },
        ],
      },
    },
  });
  console.log('✅ Categoría Frontend creada');

  await prisma.techCategory.create({
    data: {
      techCategoryName: 'DevOps',
      Technologies: {
        create: [
          { techName: 'Docker',      imgURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
          { techName: 'Kubernetes',  imgURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg' },
          { techName: 'GitHub Actions', imgURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
          { techName: 'AWS',         imgURL: 'https://raw.githubusercontent.com/devicons/devicon/7330accdbc47e2dc0c19789a48533c4a3c50fe58/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
          { techName: 'Linux',       imgURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
        ],
      },
    },
  });
  console.log('✅ Categoría DevOps creada');


  

  console.log('🌱 Seed completado');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // ── Títulos ──────────────────────────────────────────────
  await prisma.title.createMany({
    data: [
      { titleName: 'Desarrollador Backend' },
      { titleName: 'Desarrollador Frontend' },
      { titleName: 'Desarrollador Full Stack' },
      { titleName: 'DevOps Engineer' },
      { titleName: 'Mobile Developer' },
      { titleName: 'UI/UX Designer' },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Títulos creados');

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
import { PrismaClient } from '@prisma/client';
import { initialSellers, mockProducts } from '../src/data/mockProducts';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Seed Categories
  const categories = [
    { id: 'all', nameAm: 'ሁሉም ምርቶች', nameEn: 'All Categories' },
    { id: 'electronics', nameAm: 'ኤሌክትሮኒክስ', nameEn: 'Electronics' },
    { id: 'fashion', nameAm: 'አልባሳት እና ጫማ', nameEn: 'Fashion & Clothes' },
    { id: 'vehicles', nameAm: 'ተሽከርካሪዎች', nameEn: 'Vehicles' },
    { id: 'agriculture', nameAm: 'የግብርና ምርቶች', nameEn: 'Agricultural Products' },
    { id: 'spices_honey', nameAm: 'ማር እና ቅመማ ቅመም', nameEn: 'Honey & Spices' },
    { id: 'home_furniture', nameAm: 'የቤት እቃዎች', nameEn: 'Home & Furniture' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: cat,
      create: cat,
    });
  }
  console.log('✅ Categories seeded');

  // 2. Seed Sellers
  for (const seller of initialSellers) {
    await prisma.seller.upsert({
      where: { email: seller.email },
      update: {
        name: seller.name,
        businessName: seller.businessName,
        phone: seller.phone,
        whatsapp: seller.whatsapp,
        city: seller.city,
        rentAmount: seller.rentAmount,
        dueDate: seller.dueDate,
        subscriptionStatus: seller.subscriptionStatus,
      },
      create: {
        id: seller.id,
        name: seller.name,
        businessName: seller.businessName,
        email: seller.email,
        phone: seller.phone,
        whatsapp: seller.whatsapp,
        city: seller.city,
        rentAmount: seller.rentAmount,
        dueDate: seller.dueDate,
        subscriptionStatus: seller.subscriptionStatus,
        joinedDate: seller.joinedDate ? new Date(seller.joinedDate) : new Date(),
      },
    });
  }
  console.log('✅ Sellers seeded');

  // 3. Seed Products
  for (const prod of mockProducts) {
    await prisma.product.upsert({
      where: { id: prod.id },
      update: {
        name: prod.name,
        nameAm: prod.nameAm,
        category: prod.category,
        price: prod.price,
        originalPrice: prod.originalPrice,
        rating: prod.rating,
        reviewsCount: prod.reviewsCount,
        image: prod.image,
        description: prod.description,
        descriptionAm: prod.descriptionAm,
        features: JSON.stringify(prod.features || []),
        inStock: prod.inStock,
        isFeatured: prod.isFeatured,
        city: prod.city,
        sellerId: prod.sellerId,
      },
      create: {
        id: prod.id,
        name: prod.name,
        nameAm: prod.nameAm,
        category: prod.category,
        price: prod.price,
        originalPrice: prod.originalPrice,
        rating: prod.rating,
        reviewsCount: prod.reviewsCount,
        image: prod.image,
        description: prod.description,
        descriptionAm: prod.descriptionAm,
        features: JSON.stringify(prod.features || []),
        inStock: prod.inStock,
        isFeatured: prod.isFeatured,
        city: prod.city,
        sellerId: prod.sellerId,
      },
    });
  }
  console.log('✅ Products seeded');

  // 4. Seed Default Site Settings
  await prisma.siteSetting.upsert({
    where: { key: 'monthly_rent_etb' },
    update: { value: '1500' },
    create: { id: 'monthly_rent_etb', key: 'monthly_rent_etb', value: '1500' },
  });

  await prisma.siteSetting.upsert({
    where: { key: 'telebirr_account' },
    update: { value: '+251911000111' },
    create: { id: 'telebirr_account', key: 'telebirr_account', value: '+251911000111' },
  });

  console.log('✅ Site Settings seeded');
  console.log('🎉 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during database seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

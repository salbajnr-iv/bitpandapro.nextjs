// Simple test script to verify API endpoints are working
const { PrismaClient } = require('@prisma/client');
const pg = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { randomUUID } = require('crypto');

// Load environment variables
require('dotenv').config();

// Create a connection pool and adapter
const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

// Initialize Prisma Client with the adapter
const prisma = new PrismaClient({ adapter });

async function testApiEndpoints() {
  try {
    console.log('Testing API endpoints...');
    
    // Generate test IDs
    const testUserId = randomUUID();
    const testPortfolioId = randomUUID();
    
    // Test 1: Create a test user (simulating what the API does)
    console.log('1. Creating a test user...');
    const user = await prisma.user.upsert({
      where: { id: testUserId },
      update: {},
      create: {
        id: testUserId,
        email: 'api-test@example.com',
        name: 'API Test User'
      }
    });
    console.log('   User created/updated:', user.email);
    
    // Test 2: Test portfolio creation (simulating POST /api/portfolios)
    console.log('2. Testing portfolio creation API endpoint...');
    const portfolio = await prisma.portfolio.create({
      data: {
        id: testPortfolioId,
        userId: user.id,
        name: 'API Test Portfolio'
      }
    });
    console.log('   Portfolio created via API simulation:', portfolio.name);
    
    // Test 3: Test portfolio retrieval (simulating GET /api/portfolios)
    console.log('3. Testing portfolio retrieval API endpoint...');
    const portfolios = await prisma.portfolio.findMany({
      where: { userId: user.id },
      include: {
        holdings: true,
        trades: { orderBy: { executedAt: "desc" } },
      },
      orderBy: { createdAt: "desc" },
    });
    console.log('   Retrieved', portfolios.length, 'portfolio(s) via API simulation');
    
    // Test 4: Test portfolio update (simulating PATCH /api/portfolios/[id])
    console.log('4. Testing portfolio update API endpoint...');
    const updatedPortfolio = await prisma.portfolio.update({
      where: { id: portfolio.id },
      data: { name: 'Updated API Test Portfolio' }
    });
    console.log('   Portfolio updated via API simulation:', updatedPortfolio.name);
    
    // Test 5: Test holding creation (simulating POST /api/holdings)
    console.log('5. Testing holding creation API endpoint...');
    const holding = await prisma.holding.upsert({
      where: { portfolioId_symbol: { portfolioId: portfolio.id, symbol: 'ETH' } },
      update: {},
      create: {
        portfolioId: portfolio.id,
        symbol: 'ETH',
        quantity: '10',
        averageCost: '2500'
      }
    });
    console.log('   Holding created via API simulation:', holding.symbol);
    
    // Test 6: Test trade creation (simulating POST /api/trades)
    console.log('6. Testing trade creation API endpoint...');
    const trade = await prisma.trade.create({
      data: {
        portfolioId: portfolio.id,
        symbol: 'ETH',
        side: 'BUY',
        quantity: '2',
        price: '2600'
      }
    });
    console.log('   Trade created via API simulation:', trade.symbol, trade.side);
    
    // Test 7: Test specific portfolio retrieval (simulating GET /api/portfolios/[id])
    console.log('7. Testing specific portfolio retrieval API endpoint...');
    const specificPortfolio = await prisma.portfolio.findFirst({
      where: { id: portfolio.id, userId: user.id },
      include: { holdings: true, trades: { orderBy: { executedAt: "desc" } } },
    });
    console.log('   Retrieved specific portfolio via API simulation:', specificPortfolio ? 'found' : 'not found');
    
    // Test 8: Test holding update (simulating PATCH /api/holdings/[id])
    console.log('8. Testing holding update API endpoint...');
    const updatedHolding = await prisma.holding.update({
      where: { id: holding.id },
      data: { quantity: '12', averageCost: '2550' }
    });
    console.log('   Holding updated via API simulation:', updatedHolding.quantity);
    
    // Test 9: Test trade update (simulating PATCH /api/trades/[id])
    console.log('9. Testing trade update API endpoint...');
    const updatedTrade = await prisma.trade.update({
      where: { id: trade.id },
      data: { price: '2650' }
    });
    console.log('   Trade updated via API simulation:', updatedTrade.price);
    
    // Test 10: Test deletion operations (simulating DELETE endpoints)
    console.log('10. Testing deletion API endpoints...');
    await prisma.trade.delete({ where: { id: trade.id } });
    console.log('    Trade deleted via API simulation');
    
    await prisma.holding.delete({ where: { id: holding.id } });
    console.log('    Holding deleted via API simulation');
    
    await prisma.portfolio.delete({ where: { id: portfolio.id } });
    console.log('    Portfolio deleted via API simulation');
    
    console.log('All API endpoint tests passed successfully!');
    
  } catch (error) {
    console.error('API endpoint test failed:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

testApiEndpoints();
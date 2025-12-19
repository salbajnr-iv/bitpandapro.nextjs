// Simple test script to verify POST API endpoints are working
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

async function testPostApi() {
  try {
    console.log('Testing POST API endpoints...');
    
    // Generate test IDs
    const testUserId = randomUUID();
    const testPortfolioId = randomUUID();
    
    // Create a test user directly in database
    console.log('1. Creating a test user...');
    const user = await prisma.user.upsert({
      where: { id: testUserId },
      update: {},
      create: {
        id: testUserId,
        email: `api-test-${Date.now()}@example.com`,
        name: 'API Test User'
      }
    });
    console.log('   User created:', user.email);
    
    // Test portfolio creation (simulating POST /api/portfolios)
    console.log('2. Testing portfolio creation...');
    const portfolioData = {
      name: 'Test Portfolio'
    };
    
    const portfolio = await prisma.portfolio.create({
      data: {
        userId: user.id,
        name: portfolioData.name
      }
    });
    console.log('   Portfolio created:', portfolio.name);
    
    // Test holding creation (simulating POST /api/holdings)
    console.log('3. Testing holding creation...');
    const holdingData = {
      portfolioId: portfolio.id,
      symbol: 'BTC',
      quantity: '1.5',
      averageCost: '45000'
    };
    
    const holding = await prisma.holding.upsert({
      where: { portfolioId_symbol: { portfolioId: holdingData.portfolioId, symbol: holdingData.symbol } },
      update: {},
      create: {
        portfolioId: holdingData.portfolioId,
        symbol: holdingData.symbol,
        quantity: holdingData.quantity,
        averageCost: holdingData.averageCost
      }
    });
    console.log('   Holding created:', holding.symbol);
    
    // Test trade creation (simulating POST /api/trades)
    console.log('4. Testing trade creation...');
    const tradeData = {
      portfolioId: portfolio.id,
      symbol: 'ETH',
      side: 'BUY',
      quantity: '2.0',
      price: '2600'
    };
    
    const trade = await prisma.trade.create({
      data: {
        portfolioId: tradeData.portfolioId,
        symbol: tradeData.symbol,
        side: tradeData.side,
        quantity: tradeData.quantity,
        price: tradeData.price
      }
    });
    console.log('   Trade created:', trade.symbol, trade.side);
    
    console.log('All POST API tests completed successfully!');
    
    // Cleanup
    console.log('Cleaning up test data...');
    await prisma.trade.delete({ where: { id: trade.id } });
    await prisma.holding.delete({ where: { id: holding.id } });
    await prisma.portfolio.delete({ where: { id: portfolio.id } });
    await prisma.user.delete({ where: { id: user.id } });
    console.log('Cleanup completed.');
    
  } catch (error) {
    console.error('POST API test failed:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

testPostApi();
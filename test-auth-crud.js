// Simple test script to verify authentication and CRUD operations
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

async function testAuthAndCrud() {
  try {
    console.log('Testing authentication and CRUD operations...');
    
    // Generate test IDs
    const testUserId = randomUUID();
    const testPortfolioId = randomUUID();
    
    // Test 1: Create a test user
    console.log('1. Creating a test user...');
    const user = await prisma.user.upsert({
      where: { id: testUserId },
      update: {},
      create: {
        id: testUserId,
        email: 'test@example.com',
        name: 'Test User'
      }
    });
    console.log('   User created/updated:', user.email);
    
    // Test 2: Create a portfolio for the user
    console.log('2. Creating a test portfolio...');
    const portfolio = await prisma.portfolio.create({
      data: {
        id: testPortfolioId,
        userId: user.id,
        name: 'Test Portfolio'
      }
    });
    console.log('   Portfolio created:', portfolio.name);
    
    // Test 3: Create a holding in the portfolio
    console.log('3. Creating a test holding...');
    const holding = await prisma.holding.upsert({
      where: { portfolioId_symbol: { portfolioId: portfolio.id, symbol: 'BTC' } },
      update: {},
      create: {
        portfolioId: portfolio.id,
        symbol: 'BTC',
        quantity: '1.5',
        averageCost: '45000'
      }
    });
    console.log('   Holding created:', holding.symbol, holding.quantity);
    
    // Test 4: Create a trade
    console.log('4. Creating a test trade...');
    const trade = await prisma.trade.create({
      data: {
        portfolioId: portfolio.id,
        symbol: 'BTC',
        side: 'BUY',
        quantity: '0.5',
        price: '46000'
      }
    });
    console.log('   Trade created:', trade.symbol, trade.side, trade.quantity);
    
    // Test 5: Read operations
    console.log('5. Reading data...');
    const portfolios = await prisma.portfolio.findMany({
      where: { userId: user.id },
      include: { holdings: true, trades: true }
    });
    console.log('   Found', portfolios.length, 'portfolio(s)');
    if (portfolios.length > 0) {
      console.log('   Portfolio contains', portfolios[0].holdings.length, 'holding(s)');
      console.log('   Portfolio contains', portfolios[0].trades.length, 'trade(s)');
    }
    
    // Test 6: Update operations
    console.log('6. Updating data...');
    const updatedPortfolio = await prisma.portfolio.update({
      where: { id: portfolio.id },
      data: { name: 'Updated Test Portfolio' }
    });
    console.log('   Portfolio updated:', updatedPortfolio.name);
    
    // Test 7: Delete operations (in reverse order to respect foreign keys)
    console.log('7. Deleting data...');
    await prisma.trade.deleteMany({ where: { portfolioId: portfolio.id } });
    console.log('   Trades deleted');
    
    await prisma.holding.deleteMany({ where: { portfolioId: portfolio.id } });
    console.log('   Holdings deleted');
    
    await prisma.portfolio.delete({ where: { id: portfolio.id } });
    console.log('   Portfolio deleted');
    
    console.log('All tests passed successfully!');
    
  } catch (error) {
    console.error('Test failed:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

testAuthAndCrud();
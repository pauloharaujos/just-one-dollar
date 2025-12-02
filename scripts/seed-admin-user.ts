import { hashPassword } from '@/services/admin/auth/passwordService';
import { createAdminUser } from '@/repository/adminUserRepository';

async function seedAdminUser() {
  try {
    const email = 'paulo@justonedollar.com';
    const password = 'Santos96';
    const name = 'Paulo';

    // Check if admin user already exists
    const existing = await fetch('http://localhost:3000/api/admin/check-admin');
    // Note: This is just a check, we'll create the user directly

    const hashedPassword = await hashPassword(password);

    const adminUser = await createAdminUser({
      email,
      password: hashedPassword,
      name,
      role: 'SUPER_ADMIN',
    });

    console.log('Admin user created successfully:', {
      id: adminUser.id,
      email: adminUser.email,
      name: adminUser.name,
      role: adminUser.role,
    });

    console.log('\nYou can now login with:');
    console.log('Email: paulo@justonedollar.com');
    console.log('Password: Santos96');
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

seedAdminUser()
  .then(() => {
    console.log('Done');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });

